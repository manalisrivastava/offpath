import { EDGE_CASE_CATEGORIES, SEVERITY_LEVELS } from "@/types/edgeCase";

const CATEGORY_GUIDANCE = `
- User & Permissions: logged-in/out users, expired sessions, roles, missing permissions, suspended or deleted accounts.
- Input & Validation: empty, malformed, minimum/maximum, unexpected characters, huge values, invalid formats, duplicates.
- State & Workflow: incorrect sequence, stale state, abandoned workflows, repeated actions, conflicting or deleted resources.
- Network & Failure: slow or offline network, server errors, timeouts, interrupted or partial requests, retries.
- Time & Concurrency: simultaneous actions, double clicks, multiple tabs, race conditions, expiration, timezone differences.
- Security & Abuse: unauthorized access, permission bypass, sensitive data exposure, malicious input, brute force, misuse. Describe the risk and its consequence only, never exploitation steps.
- External Integrations: API downtime, delayed responses, third-party errors, inconsistent responses, webhook failure. Only use this if the feature genuinely involves an external dependency.
- Accessibility & UX: keyboard-only use, screen readers, unclear feedback, missing loading or empty states, unclear error messages.
`.trim();

const SEVERITY_GUIDANCE = `
- Critical: severe security consequences, significant financial loss, serious data corruption, irreversible actions, major privacy problems. Should be rare.
- High: prevents an important workflow, significantly incorrect behaviour, impacts many users, major trust or support problems.
- Medium: meaningful inconvenience, incorrect but recoverable behaviour, confuses users, requires a workaround.
- Low: minor inconvenience, uncommon situations, cosmetic or low-impact behaviour.
`.trim();

export function buildPrompt(featureDescription: string): string {
  return `You are an experienced product-minded software engineer reviewing a software feature specifically to identify realistic edge cases the author's "happy path" description may have missed.

FEATURE DESCRIPTION:
"""
${featureDescription}
"""

Think about the feature's likely actors, the states it can be in, and how it could realistically fail before listing edge cases. Consider the categories below, but only use ones that are genuinely relevant to this specific feature. Do not force coverage of a category just to fill space.

CATEGORIES:
${CATEGORY_GUIDANCE}

SEVERITY LEVELS (use realistic judgement; do not label everything Critical or High):
${SEVERITY_GUIDANCE}

RULES:
- Return between 8 and 20 edge cases, preferring 10-15 for a feature of typical complexity.
- Each edge case must be concrete and specific to this feature, not generic filler like "something may go wrong".
- Do not include duplicate edge cases or trivial variations of the same issue.
- Every category value must be exactly one of: ${EDGE_CASE_CATEGORIES.join(", ")}.
- Every severity value must be exactly one of: ${SEVERITY_LEVELS.join(", ")}.

OUTPUT FORMAT:
Respond with ONLY valid JSON, no markdown code fences and no commentary before or after it, matching exactly this shape:

{
  "featureSummary": "one sentence restating the feature in your own words",
  "edgeCases": [
    {
      "title": "short title",
      "description": "one or two sentences describing the scenario",
      "category": "one of the category values above",
      "severity": "one of the severity values above",
      "whyItMatters": "one or two sentences explaining the real consequence"
    }
  ]
}`;
}
