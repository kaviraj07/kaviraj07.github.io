"use client"

import { useReducedMotion } from "motion/react"
import { InView } from "@/components/motion-primitives/in-view"

/**
 * Scroll-triggered reveal for whole sections. Fires once, and collapses to a
 * plain wrapper when the visitor has asked for reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <div className={className}>
      <InView
        once
        viewOptions={{ once: true, margin: "0px 0px -12% 0px" }}
        variants={{
          hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </InView>
    </div>
  )
}
