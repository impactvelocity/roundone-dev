"use client";

import { createContext, useContext, type ReactNode } from "react";
import { PixelIcon } from "./pixel-icon";

// True on the /h pages when the viewer can look but not change anything (a
// demo account on a demo hackathon, see lib/demo.ts). Inputs, save, add and
// delete controls read it and switch themselves off; the database refuses
// the writes either way.
const ReadOnlyContext = createContext(false);

export function ReadOnlyProvider({ value, children }: { value: boolean; children: ReactNode }) {
  return <ReadOnlyContext.Provider value={value}>{children}</ReadOnlyContext.Provider>;
}

/** Whether this view is read-only: turn off anything that would change data. */
export function useReadOnly() {
  return useContext(ReadOnlyContext);
}

/** The strip above a demo account's pages saying why nothing can be changed. */
export function DemoBanner({ children }: { children: ReactNode }) {
  return (
    <div className="bg-accent text-accent-foreground">
      <p className="mx-auto flex max-w-7xl items-center gap-2.5 px-4 py-2 text-sm font-medium sm:px-8">
        <PixelIcon name="eye" size={12} className="shrink-0" />
        <span>{children}</span>
      </p>
    </div>
  );
}
