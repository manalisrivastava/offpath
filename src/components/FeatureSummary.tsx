export default function FeatureSummary({ summary }: { summary: string }) {
  return (
    <div className="mb-6 rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-5">
      <h2 className="text-xs font-semibold tracking-wide text-indigo-300 uppercase">
        Feature understood as
      </h2>
      <p className="mt-1 text-lg leading-7 text-zinc-200">“{summary}”</p>
    </div>
  );
}
