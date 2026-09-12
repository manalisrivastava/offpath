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

interface ChatCompletionsResponse {
  choices?: { message?: { content?: string } }[];
}

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
        response_format: { type: "json_object" },
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
