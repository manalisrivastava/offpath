import type { EdgeCaseCategory } from "@/types/edgeCase";

export default function CategoryBadge({
  category,
}: {
  category: EdgeCaseCategory;
}) {
  return (
    <span className="inline-flex items-center rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600">
      {category}
    </span>
  );
}
