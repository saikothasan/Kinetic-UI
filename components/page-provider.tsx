"use client";

import { useState, useEffect, type ReactNode } from "react";
import { CommandPalette } from "@/components/command-palette";

export function PageProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {children}
      <CommandPalette open={open} setOpen={setOpen} />
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 text-xs text-gray-400 shadow-lg backdrop-blur-md transition-colors hover:text-white border border-white/10"
        aria-label="Open command palette"
      >
        <span>Command</span>
        <kbd className="flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5 font-sans">
          <span className="text-base">⌘</span>K
        </kbd>
      </button>
    </>
  );
}
