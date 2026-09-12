import { AI_MODE } from "@/lib/config/ai";
import { getDemoResult } from "@/lib/ai/demoProvider";
import type { GenerationResult } from "@/types/edgeCase";

// Single entry point the rest of the app calls. Callers don't need to know
// which provider (demo data vs. a real local model) produced the result.
export async function generateEdgeCases(
  featureDescription: string,
): Promise<GenerationResult> {
  if (AI_MODE === "demo") {
    return getDemoResult(featureDescription);
  }

  throw new Error(
    "Ollama mode is not implemented yet. Set AI_MODE=demo in .env.local.",
  );
}
