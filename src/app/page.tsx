"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeatureInput from "@/components/FeatureInput";
import LoadingState from "@/components/LoadingState";
import ErrorMessage from "@/components/ErrorMessage";
import TechBuddy from "@/components/TechBuddy";
import { loadResult, saveResult } from "@/lib/resultStorage";
import { MIN_FEATURE_LENGTH, MAX_FEATURE_LENGTH } from "@/lib/config/validation";

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "📝",
    title: "Describe",
    body: "Paste a feature description, user story, or rough spec. Plain English is enough.",
  },
  {
    step: "02",
    icon: "⚡",
    title: "Generate",
    body: "A local AI model reviews it and looks for what your happy path might miss.",
  },
  {
    step: "03",
    icon: "✅",
    title: "Review",
    body: "Get categorised, severity-ranked edge cases, each with a clear reason why it matters.",
  },
];

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
    // Belt-and-suspenders against a double-submit: the button's `disabled`
    // prop handles the normal case, but this guards the small window before
    // React commits that state to the DOM (e.g. two clicks in the same tick).
    if (isLoading) return;

    setError(null);

    const trimmed = feature.trim();
    if (trimmed.length === 0 || trimmed.length < MIN_FEATURE_LENGTH) {
      setError("Please describe the feature in a little more detail.");
      return;
    }
    if (feature.length > MAX_FEATURE_LENGTH) {
      setError(
        "Please shorten the feature description before generating edge cases.",
      );
      return;
    }

    setIsLoading(true);

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

  const overLimit = feature.length > MAX_FEATURE_LENGTH;

  return (
    <>
      <main className="mx-auto flex w-full max-w-3xl flex-col px-4 pt-16 pb-24 sm:px-6">
        <section className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Ship Bulletproof Software.{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Uncover Every Edge Case.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400 sm:text-lg">
            Describe a software feature and get structured, prioritised edge
            cases before you start building, powered by a local AI model.
          </p>
        </section>

        <section
          id="feature-input"
          className="relative mt-10 rounded-2xl border border-white/10 bg-zinc-900/90 p-4 shadow-2xl shadow-indigo-500/10 transition-all focus-within:border-indigo-500/50"
        >
          <FeatureInput value={feature} onChange={setFeature} />

          <div className="mt-2 flex items-center justify-between border-t border-subtle pt-3">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="accent-gradient flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
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

            <span
              className={`font-mono text-xs ${overLimit ? "text-red-400" : "text-zinc-500"}`}
            >
              {feature.length} / {MAX_FEATURE_LENGTH}
            </span>
          </div>
        </section>

        {isLoading && <LoadingState />}
        {error && !isLoading && <ErrorMessage message={error} />}

        <section id="how-it-works" className="mt-24 scroll-mt-28">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-zinc-50">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-zinc-500">
            From a feature description to a structured list of what could go
            wrong.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <span className="font-mono text-xs text-indigo-400">
                  {item.step}
                </span>
                <div className="mt-2 text-2xl" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="mt-2 text-sm font-semibold tracking-tight text-zinc-100">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <TechBuddy message="Hi, I'm Byte 👋 Describe a feature above. Mention user roles, timing, or outside services for richer edge cases." />
      </main>
    </>
  );
}
