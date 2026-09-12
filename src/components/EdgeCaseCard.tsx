"use client";

import { useState } from "react";
import type { EdgeCase, Severity } from "@/types/edgeCase";
import SeverityBadge from "@/components/SeverityBadge";
import CategoryBadge from "@/components/CategoryBadge";

const SEVERITY_ACCENT_BAR: Record<Severity, string> = {
  Critical: "bg-red-500",
  High: "bg-orange-500",
  Medium: "bg-yellow-500",
  Low: "bg-zinc-500",
};

function formatForClipboard(edgeCase: EdgeCase): string {
  return `[${edgeCase.severity}] ${edgeCase.title}\nCategory: ${edgeCase.category}\n\n${edgeCase.description}\n\nWhy this breaks production: ${edgeCase.whyItMatters}`;
}

export default function EdgeCaseCard({ edgeCase }: { edgeCase: EdgeCase }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(formatForClipboard(edgeCase));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be denied by the browser — silently no-op,
      // the button simply won't show the "Copied" confirmation.
    }
  }

  return (
    <article className="relative overflow-hidden rounded-2xl border border-subtle bg-zinc-900/60 p-6 backdrop-blur-xl transition-colors hover:border-white/20">
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 ${SEVERITY_ACCENT_BAR[edgeCase.severity]}`}
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <SeverityBadge severity={edgeCase.severity} />
          <CategoryBadge category={edgeCase.category} />
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy this edge case"
          className="rounded-lg border border-subtle p-1.5 text-zinc-500 transition-colors hover:border-white/20 hover:text-zinc-200"
        >
          {copied ? (
            <span className="px-1 font-mono text-xs text-emerald-400">
              Copied
            </span>
          ) : (
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M7 3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V8.414a2 2 0 0 0-.586-1.414l-3.414-3.414A2 2 0 0 0 10.586 3H7Z" />
              <path d="M4 7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1H6a3 3 0 0 1-3-3V7Z" />
            </svg>
          )}
        </button>
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-100">
        {edgeCase.title}
      </h3>
      <p className="mt-1.5 text-sm leading-6 text-zinc-400">
        {edgeCase.description}
      </p>

      <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-4">
        <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-indigo-300 uppercase">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M11.3 1.046A1 1 0 0 1 12 2v6h4a1 1 0 0 1 .82 1.573l-7 10A1 1 0 0 1 8 19v-6H4a1 1 0 0 1-.82-1.573l7-10a1 1 0 0 1 1.12-.38Z" />
          </svg>
          Why this breaks production
        </h4>
        <p className="mt-1 text-sm leading-6 text-zinc-300">
          {edgeCase.whyItMatters}
        </p>
      </div>
    </article>
  );
}
