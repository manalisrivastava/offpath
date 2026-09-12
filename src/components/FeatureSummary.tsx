export default function FeatureSummary({
  summary,
  count,
}: {
  summary: string;
  count: number;
}) {
  return (
    <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/60 p-5">
      <h2 className="text-xs font-semibold tracking-wide text-blue-800 uppercase">
        Feature understood as
      </h2>
      <p className="mt-1 text-lg leading-7 text-slate-800">“{summary}”</p>
      <p className="mt-3 text-sm font-medium text-blue-800">
        {count} edge case{count === 1 ? "" : "s"} found
      </p>
    </div>
  );
}
