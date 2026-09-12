import {
  LOCAL_AI_BASE_URL,
  LOCAL_AI_MODEL,
  LOCAL_AI_TIMEOUT_MS,
} from "@/lib/config/ai";
import { buildPrompt } from "@/lib/ai/prompt";
import {
  LocalAiConnectionError,
  LocalAiModelError,
  LocalAiTimeoutError,
} from "@/lib/ai/localAiErrors";
import { EDGE_CASE_CATEGORIES, SEVERITY_LEVELS } from "@/types/edgeCase";

interface ChatCompletionsResponse {
  choices?: { message?: { content?: string } }[];
}

// Constrains the model's output to our exact shape using the OpenAI
// "structured outputs" standard (response_format: json_schema), which
// Ollama and LM Studio both support. Built from the same canonical
// category/severity lists the rest of the app uses.
const RESPONSE_JSON_SCHEMA = {
  type: "json_schema",
  json_schema: {
    name: "edge_case_report",
    strict: true,
    schema: {
      type: "object",
      properties: {
        featureSummary: { type: "string" },
        edgeCases: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              category: { type: "string", enum: EDGE_CASE_CATEGORIES },
              severity: { type: "string", enum: SEVERITY_LEVELS },
              whyItMatters: { type: "string" },
            },
            required: [
              "title",
              "description",
              "category",
              "severity",
              "whyItMatters",
            ],
            additionalProperties: false,
          },
        },
      },
      required: ["featureSummary", "edgeCases"],
      additionalProperties: false,
    },
  },
} as const;

// Talks to any local AI server that implements the OpenAI-compatible chat
// completions API. Ollama, LM Studio, and LocalAI all support this same
// format, so switching local tools is a config change, not a code change.
export async function getLocalAiResult(
  featureDescription: string,
): Promise<unknown> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), LOCAL_AI_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${LOCAL_AI_BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: LOCAL_AI_MODEL,
        messages: [
          { role: "user", content: buildPrompt(featureDescription) },
        ],
        stream: false,
        response_format: RESPONSE_JSON_SCHEMA,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new LocalAiTimeoutError();
    }
    throw new LocalAiConnectionError();
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const bodyText = await response.text().catch(() => "");
    if (
      response.status === 404 ||
      bodyText.toLowerCase().includes("not found")
    ) {
      throw new LocalAiModelError(
        `The model "${LOCAL_AI_MODEL}" isn't available. Make sure it's downloaded and loaded in your local AI tool, then try again.`,
      );
    }
    throw new LocalAiConnectionError();
  }

  const data = (await response.json()) as ChatCompletionsResponse;
  const content = data.choices?.[0]?.message?.content;

  if (typeof content !== "string") {
    throw new Error("Local AI response did not include any generated text.");
  }

  try {
    return JSON.parse(content);
  } catch {
    console.error("Failed to parse local AI response as JSON:", content);
    throw new Error("The local AI server did not return valid JSON.");
  }
}
