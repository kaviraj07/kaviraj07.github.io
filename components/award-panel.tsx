"use client"

import { useReducedMotion } from "motion/react"
import { BorderTrail } from "@/components/motion-primitives/border-trail"

/**
 * The scholarship is the strongest single credential on the site, so it gets
 * the page's one piece of continuous motion — a trail running the border.
 */
export function AwardPanel({
  title,
  body,
  quote,
}: {
  title: string
  body: string
  quote?: string
}) {
  const reduce = useReducedMotion()

  return (
    <div className="frame relative p-6 sm:p-8">
      {/* The trail is clipped by its own wrapper. Clipping on `.frame` itself
          would cut the corner brackets, which sit 1px outside the border. */}
      {!reduce ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <BorderTrail
            size={90}
            className="bg-[linear-gradient(to_right,transparent,var(--signal-bright),transparent)]"
            transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
          />
        </div>
      ) : null}

      <p className="t-meta text-signal">Award</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
      <p className="t-prose mt-4 max-w-5xl">{body}</p>

      {quote ? (
        <blockquote className="mt-6 border-l-2 border-signal-bright pl-5">
          <p className="font-serif text-lg italic leading-relaxed text-ink sm:text-xl">
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>
      ) : null}
    </div>
  )
}
