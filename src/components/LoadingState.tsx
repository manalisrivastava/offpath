"use client";

import { useEffect, useState } from "react";

// Demo mode resolves almost instantly, so most people never see past the
// first message. Local AI mode can genuinely take a couple of minutes on
// CPU-only hardware (measured 158-180+ seconds during testing), so this
// rotates through a few messages before settling on a longer-wait notice,
// rather than leaving one static line up for minutes looking frozen.
const MESSAGES = [
  "Looking for things that could go wrong…",
  "Thinking through edge cases…",
  "Weighing severity and impact…",
];

const ROTATE_INTERVAL_MS = 6000;
const LONG_WAIT_MESSAGE =
  "Local models can take a couple of minutes on CPU-only hardware. Still working…";
const LONG_WAIT_THRESHOLD_MS = MESSAGES.length * ROTATE_INTERVAL_MS;

export default function LoadingState() {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMs((ms) => ms + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const message =
    elapsedMs >= LONG_WAIT_THRESHOLD_MS
      ? LONG_WAIT_MESSAGE
      : MESSAGES[Math.floor(elapsedMs / ROTATE_INTERVAL_MS)];

  return (
    <p
      role="status"
      aria-live="polite"
      className="mt-6 text-sm font-medium text-zinc-500"
    >
      {message}
    </p>
  );
}
