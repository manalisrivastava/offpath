"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeatureInput from "@/components/FeatureInput";
import LoadingState from "@/components/LoadingState";
import ErrorMessage from "@/components/ErrorMessage";
import { loadResult, saveResult } from "@/lib/resultStorage";

export default function Home() {
  const router = useRouter();
  const [feature, setFeature] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If the user comes back here via "Edit description", restore what they
  // typed last time instead of leaving the textarea blank. sessionStorage
  // only exists in the browser, so this can only run after mount.
  useEffect(() => {
    const stored = loadResult();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of a browser-only API, not a derived/cascading update
      setFeature(stored.feature);
    }
  }, []);

  async function handleGenerate() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feature }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ??
            "Something went wrong while generating edge cases. Please try again.",
        );
        return;
      }

      saveResult(feature, data);
      router.push("/results");
    } catch {
      setError(
        "Something went wrong while generating edge cases. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-4 py-12 sm:px-6">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Edge Case <span className="text-indigo-600">Generator</span>
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Find the edge cases your happy path missed.
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Describe a software feature and get structured, prioritized edge
          cases before you start building.
        </p>
      </header>

      <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <FeatureInput value={feature} onChange={setFeature} />

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLoading ? (
            "Generating…"
          ) : (
            <>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M10 2a1 1 0 01.894.553l1.382 2.764 3.05.443a1 1 0 01.554 1.706l-2.207 2.152.521 3.037a1 1 0 01-1.451 1.054L10 12.347l-2.723 1.432a1 1 0 01-1.451-1.054l.52-3.037-2.206-2.152a1 1 0 01.554-1.706l3.05-.443L9.106 2.553A1 1 0 0110 2z" />
              </svg>
              Generate Edge Cases
            </>
          )}
        </button>

        {isLoading && <LoadingState />}
        {error && !isLoading && <ErrorMessage message={error} />}
      </section>
    </main>
  );
}
