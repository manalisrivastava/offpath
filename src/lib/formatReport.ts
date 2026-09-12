import type { GenerationResult } from "@/types/edgeCase";

export function formatReportAsText(result: GenerationResult): string {
  const lines = [
    `Feature: ${result.featureSummary}`,
    "",
    ...result.edgeCases.map(
      (edgeCase) =>
        `[${edgeCase.severity}] ${edgeCase.title}\nCategory: ${edgeCase.category}\n${edgeCase.description}\nWhy this breaks production: ${edgeCase.whyItMatters}\n`,
    ),
  ];
  return lines.join("\n");
}

export function formatReportAsMarkdown(result: GenerationResult): string {
  const lines = [
    "# Edge Case Report",
    "",
    `**Feature:** ${result.featureSummary}`,
    "",
    ...result.edgeCases.map(
      (edgeCase) =>
        `## [${edgeCase.severity}] ${edgeCase.title}\n\n- **Category:** ${edgeCase.category}\n\n${edgeCase.description}\n\n> **Why this breaks production:** ${edgeCase.whyItMatters}\n`,
    ),
  ];
  return lines.join("\n");
}
