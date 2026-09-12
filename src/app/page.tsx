"use client";

import { useState } from "react";
import FeatureInput from "@/components/FeatureInput";
import FeatureSummary from "@/components/FeatureSummary";
import EdgeCaseList from "@/components/EdgeCaseList";
import type { GenerationResult } from "@/types/edgeCase";

// Hardcoded stand-in for a real AI response, used only to prove the UI
// works before any backend or AI logic exists (Development Stage 1).
const SAMPLE_RESULT: GenerationResult = {
  featureSummary:
    "Users can reset their password using an email-based reset link.",
  edgeCases: [
    {
      title: "Multiple password-reset requests",
      description:
        "The user requests several password-reset emails before using any of the links.",
      category: "Time & Concurrency",
      severity: "High",
      whyItMatters:
        "Older and newer reset links may behave inconsistently unless token behaviour is clearly defined.",
    },
    {
      title: "Reset link used after expiry",
      description:
        "The user clicks the reset link after the 30-minute expiry window has passed.",
      category: "State & Workflow",
      severity: "Medium",
      whyItMatters:
        "Without a clear expired-link message, the user may think the application is broken.",
    },
    {
      title: "Reset requested for a nonexistent email",
      description:
        "The user submits an email address that has no matching account.",
      category: "Security & Abuse",
      severity: "Medium",
      whyItMatters:
        "Revealing whether an email exists in the system can leak account information to attackers.",
    },
    {
      title: "Reset link reused after password is changed",
      description:
        "The user clicks the same reset link a second time after already setting a new password.",
      category: "Input & Validation",
      severity: "Low",
      whyItMatters:
        "A reusable link could let someone silently overwrite a password again later.",
    },
  ],
};

export default function Home() {
  const [feature, setFeature] = useState("");
  const [showResults, setShowResults] = useState(false);

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
          onClick={() => setShowResults(true)}
          className="self-start rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:outline-none"
        >
          Generate Edge Cases
        </button>
      </section>

      {showResults && (
        <section className="mt-10">
          <FeatureSummary
            summary={SAMPLE_RESULT.featureSummary}
            count={SAMPLE_RESULT.edgeCases.length}
          />
          <EdgeCaseList edgeCases={SAMPLE_RESULT.edgeCases} />
        </section>
      )}
    </main>
  );
}
