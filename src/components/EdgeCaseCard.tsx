import type { EdgeCase } from "@/types/edgeCase";
import SeverityBadge from "@/components/SeverityBadge";
import CategoryBadge from "@/components/CategoryBadge";

export default function EdgeCaseCard({ edgeCase }: { edgeCase: EdgeCase }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <SeverityBadge severity={edgeCase.severity} />
        <CategoryBadge category={edgeCase.category} />
      </div>

      <h3 className="mt-3 text-base font-semibold text-slate-900">
        {edgeCase.title}
      </h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        {edgeCase.description}
      </p>

      <div className="mt-4 border-t border-slate-100 pt-3">
        <h4 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Why it matters
        </h4>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          {edgeCase.whyItMatters}
        </p>
      </div>
    </article>
  );
}
