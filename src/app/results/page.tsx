"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FeatureSummary from "@/components/FeatureSummary";
import EdgeCaseList from "@/components/EdgeCaseList";
import TechBuddy from "@/components/TechBuddy";
import { loadResult, type StoredResult } from "@/lib/resultStorage";
import { formatReportAsMarkdown, formatReportAsText } from "@/lib/formatReport";
import {
  EDGE_CASE_CATEGORIES,
  SEVERITY_LEVELS,
  type EdgeCaseCategory,
  type Severity,
} from "@/types/edgeCase";

const SEVERITY_DOT: Record<Severity, string> = {
  Critical: "🔴",
  High: "🟠",
  Medium: "🟡",
  Low: "⚪",
};

function downloadMarkdown(markdown: string) {
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "edge-case-report.md";
  link.click();
  URL.revokeObjectURL(url);
}

export default function ResultsPage() {
  // undefined = "haven't checked sessionStorage yet" (avoids a flash of the
  // empty state while that check runs), null = "nothing stored".
  const [data, setData] = useState<StoredResult | null | undefined>(
    undefined,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<Severity | "All">(
    "All",
  );
  const [categoryFilter, setCategoryFilter] = useState<
    EdgeCaseCategory | "All"
  >("All");
  const [copiedAll, setCopiedAll] = useState(false);
  const [shared, setShared] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // sessionStorage only exists in the browser, so this can only run after
  // mount. Not a derived/cascading update, just a one-time external read.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(loadResult());
  }, []);

  // ⌘K / Ctrl+K focuses the search box, matching the shortcut hint shown
  // next to it.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  async function handleCopyAll() {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(formatReportAsText(data.result));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1500);
    } catch {
      // Clipboard access can be denied by the browser. No-op.
    }
  }

  function handleExportMarkdown() {
    if (!data) return;
    downloadMarkdown(formatReportAsMarkdown(data.result));
  }

  async function handleShare() {
    if (!data) return;
    const text = formatReportAsText(data.result);
    if (navigator.share) {
      try {
        await navigator.share({ title: "Edge Case Report", text });
      } catch {
        // User cancelled the native share sheet. Nothing to do.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 1500);
    } catch {
      // Clipboard access can be denied by the browser. No-op.
    }
  }

  if (data === undefined) {
    return null;
  }

  if (!data) {
    return (
      <>
        <header className="border-b border-subtle bg-zinc-950/80 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text font-mono text-sm font-semibold text-transparent">
              EdgeCase
            </span>
          </div>
        </header>

        <main className="mx-auto flex min-h-full w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
            No results yet
          </h2>
          <p className="mt-2 text-zinc-400">
            Describe a feature first, then generate edge cases to see them
            here.
          </p>
          <Link
            href="/"
            className="accent-gradient mt-6 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-opacity hover:opacity-90"
          >
            Describe a feature
          </Link>

          <TechBuddy message="Head back and describe a feature. I'll help you spot what's easy to miss." />
        </main>
      </>
    );
  }

  const { edgeCases } = data.result;

  const severityCounts = SEVERITY_LEVELS.reduce(
    (acc, level) => {
      acc[level] = edgeCases.filter((ec) => ec.severity === level).length;
      return acc;
    },
    {} as Record<Severity, number>,
  );

  const query = searchQuery.trim().toLowerCase();
  const filteredEdgeCases = edgeCases.filter((edgeCase) => {
    const matchesSeverity =
      severityFilter === "All" || edgeCase.severity === severityFilter;
    const matchesCategory =
      categoryFilter === "All" || edgeCase.category === categoryFilter;
    const matchesQuery =
      query.length === 0 ||
      edgeCase.title.toLowerCase().includes(query) ||
      edgeCase.description.toLowerCase().includes(query);
    return matchesSeverity && matchesCategory && matchesQuery;
  });

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-subtle bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="rounded-lg px-2 py-1 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            ← Back to studio
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyAll}
              className="rounded-full border border-subtle px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              📋 {copiedAll ? "Copied!" : "Copy All"}
            </button>
            <button
              type="button"
              onClick={handleExportMarkdown}
              className="rounded-full border border-subtle px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              ⬇ Export as Markdown
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="rounded-full border border-subtle px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              🔗 {shared ? "Copied!" : "Share Report"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col px-4 py-8 sm:px-6">
        <FeatureSummary summary={data.result.featureSummary} />

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-subtle bg-zinc-900/60 p-4">
          <span className="font-mono text-sm text-zinc-300">
            {edgeCases.length} Edge Case{edgeCases.length === 1 ? "" : "s"}{" "}
            Identified
          </span>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-300">
            {SEVERITY_LEVELS.filter((level) => severityCounts[level] > 0).map(
              (level) => (
                <span key={level}>
                  {SEVERITY_DOT[level]} {severityCounts[level]} {level}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search edge cases…"
              aria-label="Search edge cases"
              className="w-full rounded-lg border border-subtle bg-zinc-900/60 py-2 pr-14 pl-9 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-indigo-500/50 focus:outline-none"
            />
            <kbd className="absolute top-1/2 right-2 -translate-y-1/2 rounded border border-subtle bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
              ⌘K
            </kbd>
          </div>

          <div className="relative">
            <select
              value={severityFilter}
              onChange={(event) =>
                setSeverityFilter(event.target.value as Severity | "All")
              }
              aria-label="Filter by severity"
              className="appearance-none rounded-lg border border-subtle bg-zinc-900/60 py-2 pr-8 pl-3 text-sm text-zinc-300 focus:border-indigo-500/50 focus:outline-none"
            >
              <option value="All">All severities</option>
              {SEVERITY_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value as EdgeCaseCategory | "All",
                )
              }
              aria-label="Filter by category"
              className="appearance-none rounded-lg border border-subtle bg-zinc-900/60 py-2 pr-8 pl-3 text-sm text-zinc-300 focus:border-indigo-500/50 focus:outline-none"
            >
              <option value="All">All categories</option>
              {EDGE_CASE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <EdgeCaseList edgeCases={filteredEdgeCases} />
        </div>

        <TechBuddy message="Nice! Skim the “Why this breaks production” notes first. That's where the real risk is explained." />
      </main>
    </>
  );
}
