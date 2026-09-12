import { SEVERITY_LEVELS, type EdgeCase } from "@/types/edgeCase";
import EdgeCaseCard from "@/components/EdgeCaseCard";

export default function EdgeCaseList({
  edgeCases,
}: {
  edgeCases: EdgeCase[];
}) {
  // Most severe first: Critical, High, Medium, Low.
  const sortedEdgeCases = [...edgeCases].sort(
    (a, b) =>
      SEVERITY_LEVELS.indexOf(a.severity) - SEVERITY_LEVELS.indexOf(b.severity),
  );

  if (sortedEdgeCases.length === 0) {
    return (
      <p className="rounded-2xl border border-subtle bg-zinc-900/40 p-8 text-center text-sm text-zinc-500">
        No edge cases match your current filters.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {sortedEdgeCases.map((edgeCase) => (
        <li key={edgeCase.title}>
          <EdgeCaseCard edgeCase={edgeCase} />
        </li>
      ))}
    </ul>
  );
}
