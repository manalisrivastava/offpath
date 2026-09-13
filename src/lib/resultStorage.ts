import type { GenerationResult } from "@/types/edgeCase";

// Hands the generated result from the input page to the results page
// without a database. sessionStorage is per-tab and disappears when the
// tab closes, so nothing is actually persisted.
const STORAGE_KEY = "offpath:last-result";

export interface StoredResult {
  feature: string;
  result: GenerationResult;
}

export function saveResult(feature: string, result: GenerationResult): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ feature, result }));
  } catch {
    // sessionStorage can be unavailable (e.g. private browsing). The
    // results page falls back to its empty state in that case.
  }
}

export function loadResult(): StoredResult | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredResult) : null;
  } catch {
    return null;
  }
}
