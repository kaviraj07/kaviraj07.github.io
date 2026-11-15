"use client"

import { ScrollProgress } from "@/components/motion-primitives/scroll-progress"

/** A hairline pinned to the top of the viewport (or under the header, when
 *  it is showing) on long posts. */
export function ReadingProgress() {
  return (
    <div
      className="sticky top-[var(--header-offset,0px)] z-40 h-px w-full transition-[top] duration-300"
      aria-hidden
    >
      <ScrollProgress className="h-px bg-accent" />
    </div>
  )
}
