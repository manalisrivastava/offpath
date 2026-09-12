import type { Severity } from "@/types/edgeCase";

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "bg-red-100 text-red-800 border-red-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Low: "bg-slate-100 text-slate-700 border-slate-200",
};

export default function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-semibold tracking-wide uppercase ${SEVERITY_STYLES[severity]}`}
    >
      {severity}
    </span>
  );
}
