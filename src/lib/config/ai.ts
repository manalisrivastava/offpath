export type AiMode = "demo" | "local";

function resolveAiMode(): AiMode {
  return process.env.AI_MODE === "local" ? "local" : "demo";
}

export const AI_MODE: AiMode = resolveAiMode();

// Works with any local AI server that speaks the OpenAI-compatible chat
// completions format: Ollama, LM Studio, LocalAI, and others. Ollama's
// default port (11434) is used as the default here since it's the
// recommended tool; override it if you're using something else (LM Studio
// defaults to port 1234, for example).
export const LOCAL_AI_BASE_URL =
  process.env.LOCAL_AI_BASE_URL ?? "http://localhost:11434";
export const LOCAL_AI_MODEL = process.env.LOCAL_AI_MODEL ?? "qwen3:4b";

// A local model can be slow, especially on CPU-only hardware, but a request
// still shouldn't be allowed to hang forever.
export const LOCAL_AI_TIMEOUT_MS = 60_000;
