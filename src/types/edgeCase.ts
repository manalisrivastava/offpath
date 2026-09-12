export const EDGE_CASE_CATEGORIES = [
  "User & Permissions",
  "Input & Validation",
  "State & Workflow",
  "Network & Failure",
  "Time & Concurrency",
  "Security & Abuse",
  "External Integrations",
  "Accessibility & UX",
] as const;

export type EdgeCaseCategory = (typeof EDGE_CASE_CATEGORIES)[number];

export const SEVERITY_LEVELS = ["Critical", "High", "Medium", "Low"] as const;

export type Severity = (typeof SEVERITY_LEVELS)[number];

export interface EdgeCase {
  title: string;
  description: string;
  category: EdgeCaseCategory;
  severity: Severity;
  whyItMatters: string;
}

export interface GenerationResult {
  featureSummary: string;
  edgeCases: EdgeCase[];
}
