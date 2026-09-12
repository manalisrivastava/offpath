"use client";

import { useState } from "react";
import FeatureInput from "@/components/FeatureInput";
import FeatureSummary from "@/components/FeatureSummary";
import EdgeCaseList from "@/components/EdgeCaseList";
import LoadingState from "@/components/LoadingState";
import ErrorMessage from "@/components/ErrorMessage";
import type { GenerationResult } from "@/types/edgeCase";

export default function Home() {
  const [feature, setFeature] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerationResult | null>(null);

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
        setResult(null);
        return;
      }

      setResult(data);
    } catch {
      setError(
        "Something went wrong while generating edge cases. Please try again.",
      );
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Edge Case Generator
        </h1>
        <p className="mt-2 text-lg text-slate-700">
          Find the edge cases your happy path missed.
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Describe a software feature and get structured, prioritized edge
          cases before you start building.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <FeatureInput value={feature} onChange={setFeature} />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading}
          className="self-start rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Generating…" : "Generate Edge Cases"}
        </button>
      </section>

      {isLoading && <LoadingState />}
      {error && !isLoading && <ErrorMessage message={error} />}

      {result && !isLoading && !error && (
        <section className="mt-10">
          <FeatureSummary
            summary={result.featureSummary}
            count={result.edgeCases.length}
          />
          <EdgeCaseList edgeCases={result.edgeCases} />
        </section>
      )}
    </main>
  );
}
