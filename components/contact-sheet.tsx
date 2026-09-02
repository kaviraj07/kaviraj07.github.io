"use client"

import Image from "next/image"
import Link from "next/link"
import { useReducedMotion } from "motion/react"
import { AnimatedGroup } from "@/components/motion-primitives/animated-group"
import { allWork, kindLabel } from "@/lib/work"

/**
 * The hero's thesis: ten real artifacts, laid out the way a batch of
 * validation images is — small, uniform, labelled. Each tile deep-links to
 * its entry on the work page.
 */
export function ContactSheet() {
  const reduce = useReducedMotion()

  const tiles = allWork.map((item) => (
    <Link
      key={item.slug}
      href={`/work#${item.slug}`}
      className="frame frame-hover group relative block aspect-square bg-sunk"
    >
      {/* Clipping lives on this inner layer so the corner brackets, which sit
          1px outside the border, survive. */}
      <span className="absolute inset-0 overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 20vw, 130px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : null}

        {/* Label rides in from the bottom edge on hover/focus. */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-paper/95 px-2 py-1.5 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
          <span className="t-meta block text-[0.5625rem] leading-tight text-signal">
            {kindLabel[item.kind]}
          </span>
          <span className="mt-0.5 block truncate text-[0.6875rem] font-semibold leading-tight">
            {item.title}
          </span>
        </span>
      </span>
    </Link>
  ))

  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
      {reduce ? (
        tiles
      ) : (
        <AnimatedGroup
          className="contents"
          variants={{
            container: { visible: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } } },
            item: {
              hidden: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
              visible: {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            },
          }}
        >
          {tiles}
        </AnimatedGroup>
      )}
    </div>
  )
}
