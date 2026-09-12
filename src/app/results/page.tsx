"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FeatureSummary from "@/components/FeatureSummary";
import EdgeCaseList from "@/components/EdgeCaseList";
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
      <main className="mx-auto flex min-h-full w-full max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-900">No results yet</h1>
        <p className="mt-2 text-slate-600">
          Describe a feature first, then generate edge cases to see them
          here.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          Describe a feature
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Edge Case <span className="text-indigo-600">Generator</span>
        </h1>
        <Link
          href="/"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
        >
          ← Edit description
        </Link>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <FeatureSummary
          summary={data.result.featureSummary}
          count={data.result.edgeCases.length}
        />
        <EdgeCaseList edgeCases={data.result.edgeCases} />
      </section>
    </main>
  );
}
