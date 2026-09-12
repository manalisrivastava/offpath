import type { EdgeCaseCategory } from "@/types/edgeCase";

// Renders a category like "External Integrations" as "EXTERNAL_INTEGRATIONS"
// to match the code-like, monospace tag style used throughout the results page.
function toCodeTag(category: string): string {
  return category.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
}

export default function CategoryBadge({
  category,
}: {
  category: EdgeCaseCategory;
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-subtle bg-white/5 px-3 py-1 font-mono text-xs font-medium text-zinc-400">
      {toCodeTag(category)}
    </span>
  );
}
