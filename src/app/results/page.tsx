"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FeatureSummary from "@/components/FeatureSummary";
import EdgeCaseList from "@/components/EdgeCaseList";
import TechBuddy from "@/components/TechBuddy";
import { loadResult, type StoredResult } from "@/lib/resultStorage";

export default function ResultsPage() {
  // undefined = "haven't checked sessionStorage yet" (avoids a flash of the
  // empty state while that check runs), null = "nothing stored".
  const [data, setData] = useState<StoredResult | null | undefined>(
    undefined,
  );

  // sessionStorage only exists in the browser, so this can only run after
  // mount — not a derived/cascading update, just a one-time external read.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(loadResult());
  }, []);

  if (data === undefined) {
    return null;
  }

  if (!data) {
    return (
      <>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Edge Case <span className="text-blue-700">Generator</span>
            </h1>
          </div>
        </header>

        <main className="mx-auto flex min-h-full w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-slate-900">No results yet</h2>
          <p className="mt-2 text-slate-600">
            Describe a feature first, then generate edge cases to see them
            here.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900"
          >
            Describe a feature
          </Link>

          <TechBuddy message="Head back and describe a feature — I'll help you spot what's easy to miss." />
        </main>
      </>
    );
  }

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-6 sm:px-6">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Edge Case <span className="text-blue-700">Generator</span>
          </h1>
          <Link
            href="/"
            className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            ← Edit description
          </Link>
        </div>
      </header>

      <main className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-4 py-12 sm:px-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <FeatureSummary
            summary={data.result.featureSummary}
            count={data.result.edgeCases.length}
          />
          <EdgeCaseList edgeCases={data.result.edgeCases} />
        </section>

        <TechBuddy message="Nice! Skim the “Why it matters” notes first — that's where the real risk is explained." />
      </main>
    </>
  );
}
