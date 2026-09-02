"use client"

import { ScrollProgress } from "@/components/motion-primitives/scroll-progress"

/** Sits directly under the sticky header on long posts. */
export function ReadingProgress() {
  return (
    <div className="sticky top-[3.75rem] z-40 h-0.5 w-full" aria-hidden>
      <ScrollProgress className="h-0.5 bg-signal-bright" />
    </div>
  )
}
