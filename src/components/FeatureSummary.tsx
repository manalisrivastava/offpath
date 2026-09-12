export default function FeatureSummary({
  summary,
  count,
}: {
  summary: string;
  count: number;
}) {
  return (
    <div className="mb-6 border-b border-slate-200 pb-6">
      <h2 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
        Feature understood as
      </h2>
      <p className="mt-1 text-lg leading-7 text-slate-800">“{summary}”</p>
      <p className="mt-3 text-sm font-medium text-slate-500">
        {count} edge case{count === 1 ? "" : "s"} found
      </p>
    </div>
  );
}
