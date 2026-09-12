"use client";

import { useState } from "react";

export default function TechBuddy({ message }: { message: string }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="status"
          className="relative max-w-[220px] rounded-2xl rounded-br-sm border border-subtle bg-zinc-900/90 p-4 text-sm leading-6 text-zinc-300 shadow-2xl backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Dismiss tip"
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-subtle bg-zinc-900 text-xs text-zinc-400 shadow-sm hover:text-zinc-300"
          >
            ×
          </button>
          <span className="mb-1 block font-mono text-xs font-semibold tracking-wide text-indigo-400 uppercase">
            Byte
          </span>
          {message}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Hide Byte the assistant" : "Show Byte's tips"}
        className="accent-gradient flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-lg shadow-indigo-500/25 transition-transform hover:scale-105 focus:ring-4 focus:ring-indigo-500/30 focus:outline-none"
      >
        🤖
      </button>
    </div>
  );
}
