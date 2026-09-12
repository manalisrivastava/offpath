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

  return (
    <ul className="flex flex-col gap-5">
      {sortedEdgeCases.map((edgeCase) => (
        <li key={edgeCase.title}>
          <EdgeCaseCard edgeCase={edgeCase} />
        </li>
      ))}
    </ul>
  );
}
