import type { EdgeCase } from "@/types/edgeCase";
import EdgeCaseCard from "@/components/EdgeCaseCard";

export default function EdgeCaseList({
  edgeCases,
}: {
  edgeCases: EdgeCase[];
}) {
  return (
    <ul className="flex flex-col gap-4">
      {edgeCases.map((edgeCase) => (
        <li key={edgeCase.title}>
          <EdgeCaseCard edgeCase={edgeCase} />
        </li>
      ))}
    </ul>
  );
}
