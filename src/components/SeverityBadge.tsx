import type { Severity } from "@/types/edgeCase";

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "bg-red-500/10 text-red-500 border-red-500/30",
  High: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  Medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  Low: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
};

export default function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-semibold tracking-wide uppercase ${SEVERITY_STYLES[severity]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {severity}
    </span>
  );
}
