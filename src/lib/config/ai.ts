export type AiMode = "demo" | "ollama";

function resolveAiMode(): AiMode {
  return process.env.AI_MODE === "ollama" ? "ollama" : "demo";
}

export const AI_MODE: AiMode = resolveAiMode();
export const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
export const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "qwen3:4b";

// A local model can be slow, especially on CPU-only hardware, but a request
// still shouldn't be allowed to hang forever.
export const OLLAMA_TIMEOUT_MS = 60_000;
