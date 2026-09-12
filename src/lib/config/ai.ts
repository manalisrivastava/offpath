export type AiMode = "demo" | "ollama";

function resolveAiMode(): AiMode {
  return process.env.AI_MODE === "ollama" ? "ollama" : "demo";
}

export const AI_MODE: AiMode = resolveAiMode();
