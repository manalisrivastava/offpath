import type { EdgeCase } from "@/types/edgeCase";
import SeverityBadge from "@/components/SeverityBadge";
import CategoryBadge from "@/components/CategoryBadge";

export default function EdgeCaseCard({ edgeCase }: { edgeCase: EdgeCase }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <SeverityBadge severity={edgeCase.severity} />
        <CategoryBadge category={edgeCase.category} />
      </div>

      <h3 className="mt-3 text-lg font-semibold text-slate-900">
        {edgeCase.title}
      </h3>
      <p className="mt-1.5 text-sm leading-6 text-slate-600">
        {edgeCase.description}
      </p>

      <div className="mt-4 rounded-lg border-l-4 border-blue-300 bg-blue-50/50 p-3">
        <h4 className="text-xs font-semibold tracking-wide text-blue-800 uppercase">
          Why it matters
        </h4>
        <p className="mt-1 text-sm leading-6 text-slate-700">
          {edgeCase.whyItMatters}
        </p>
      </div>
    </article>
  );
}
