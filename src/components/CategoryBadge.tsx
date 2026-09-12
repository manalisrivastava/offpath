import type { EdgeCaseCategory } from "@/types/edgeCase";

export default function CategoryBadge({
  category,
}: {
  category: EdgeCaseCategory;
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
      {category}
    </span>
  );
}
