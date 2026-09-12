import {
  OLLAMA_BASE_URL,
  OLLAMA_MODEL,
  OLLAMA_TIMEOUT_MS,
} from "@/lib/config/ai";
import { buildPrompt } from "@/lib/ai/prompt";
import {
  OllamaConnectionError,
  OllamaModelError,
  OllamaTimeoutError,
} from "@/lib/ai/ollamaErrors";

interface OllamaGenerateResponse {
  response?: string;
}

export async function getOllamaResult(
  featureDescription: string,
): Promise<unknown> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: buildPrompt(featureDescription),
        stream: false,
        format: "json",
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new OllamaTimeoutError();
    }
    throw new OllamaConnectionError();
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const bodyText = await response.text().catch(() => "");
    if (
      response.status === 404 ||
      bodyText.toLowerCase().includes("not found")
    ) {
      throw new OllamaModelError(
        `The model "${OLLAMA_MODEL}" isn't available locally. Run "ollama pull ${OLLAMA_MODEL}" and try again.`,
      );
    }
    throw new OllamaConnectionError();
  }

  const data = (await response.json()) as OllamaGenerateResponse;

  if (typeof data.response !== "string") {
    throw new Error("Ollama response did not include any generated text.");
  }

  try {
    return JSON.parse(data.response);
  } catch {
    console.error("Failed to parse Ollama response as JSON:", data.response);
    throw new Error("Ollama did not return valid JSON.");
  }
}
