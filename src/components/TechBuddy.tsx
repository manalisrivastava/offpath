"use client";

import { useState } from "react";

export default function TechBuddy({ message }: { message: string }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="status"
          className="relative max-w-[220px] rounded-2xl rounded-br-sm border border-blue-100 bg-white p-4 text-sm leading-6 text-slate-700 shadow-lg"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Dismiss tip"
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-xs text-slate-400 shadow-sm hover:text-slate-600"
          >
            ×
          </button>
          <span className="mb-1 block text-xs font-semibold tracking-wide text-blue-800 uppercase">
            Byte
          </span>
          {message}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Hide Byte the assistant" : "Show Byte's tips"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-800 text-2xl shadow-lg transition-transform hover:scale-105 hover:bg-blue-900 focus:ring-4 focus:ring-blue-200 focus:outline-none"
      >
        🤖
      </button>
    </div>
  );
}
