import { AI_MODE } from "@/lib/config/ai";
import { getDemoResult } from "@/lib/ai/demoProvider";
import { getOllamaResult } from "@/lib/ai/ollamaProvider";
import { generationResultSchema } from "@/lib/schemas/edgeCase";
import type { GenerationResult } from "@/types/edgeCase";

// Single entry point the rest of the app calls. Callers don't need to know
// which provider (demo data vs. a real local model) produced the result,
// and every provider's output is validated the same way before it's trusted.
export async function generateEdgeCases(
  featureDescription: string,
): Promise<GenerationResult> {
  const raw: unknown =
    AI_MODE === "demo"
      ? getDemoResult(featureDescription)
      : await getOllamaResult(featureDescription);

  const parsed = generationResultSchema.safeParse(raw);

  if (!parsed.success) {
    console.error(
      "Generated result failed schema validation:",
      parsed.error.format(),
    );
    throw new Error("The generated result did not match the expected structure.");
  }

  return parsed.data;
}
