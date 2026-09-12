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

// A local model can be genuinely slow on CPU-only hardware — measured
// 158-240+ seconds for a 4B model generating a full edge-case report
// during testing, with real run-to-run variance wide enough that a
// 240s cap itself got cut off once. Timeout is set with real headroom
// above the observed range so a slower run doesn't lose completed work
// right before finishing, but a request still shouldn't hang forever.
export const LOCAL_AI_TIMEOUT_MS = 360_000;
