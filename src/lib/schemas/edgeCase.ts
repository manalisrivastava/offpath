import { z } from "zod";
import { EDGE_CASE_CATEGORIES, SEVERITY_LEVELS } from "@/types/edgeCase";

// Reuses the same category/severity lists the rest of the app uses, so the
// allowed values only ever live in one place (src/types/edgeCase.ts).
export const categorySchema = z.enum(EDGE_CASE_CATEGORIES);
export const severitySchema = z.enum(SEVERITY_LEVELS);

export const edgeCaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: categorySchema,
  severity: severitySchema,
  whyItMatters: z.string().min(1),
});

export const generationResultSchema = z.object({
  featureSummary: z.string().min(1),
  // A zero-result list isn't useful, and a very long list stops being
  // scannable, so the array length is bounded on both ends (see PRD
  // section 19: preferred 10-15, hard maximum 25).
  edgeCases: z.array(edgeCaseSchema).min(1).max(25),
});
