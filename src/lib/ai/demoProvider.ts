import type { GenerationResult } from "@/types/edgeCase";
import {
  passwordResetDemo,
  shoppingCartDemo,
  fileUploadDemo,
} from "@/data/demoResponses";

// Demo mode doesn't run any real analysis — it just picks one of a few
// realistic canned responses based on keywords in the feature description,
// so manual testing with different inputs still feels representative.
export function getDemoResult(featureDescription: string): GenerationResult {
  const lower = featureDescription.toLowerCase();

  if (lower.includes("cart") || lower.includes("checkout")) {
    return shoppingCartDemo;
  }

  if (lower.includes("upload") || lower.includes("file")) {
    return fileUploadDemo;
  }

  return passwordResetDemo;
}
