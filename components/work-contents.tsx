"use client"

import { useEffect, useState } from "react"
import { groupByKind } from "@/components/work-entries"
import { cn } from "@/lib/utils"
import type { WorkItem } from "@/lib/work"

/**
 * A table of contents for the projects page that follows the reader: the entry
 * crossing the upper middle of the viewport is the one marked as current.
 */
export function WorkContents({ items }: { items: WorkItem[] }) {
  const [current, setCurrent] = useState(items[0]?.slug)

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => el !== null)

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id)
      },
      // A thin band a third of the way down: one entry is in it at a time.
      { rootMargin: "-33% 0px -62% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  return (
    <nav aria-label="Projects on this page" className="hidden md:block">
      {groupByKind(items).map((g) => (
        <div key={g.kind} className="mt-6 first:mt-0">
          <p className="t-small mb-2">{g.label}</p>
          <ul className="border-l border-rule">
            {g.items.map((i) => {
              const isCurrent = current === i.slug
              return (
                <li key={i.slug}>
                  <a
                    href={`#${i.slug}`}
                    aria-current={isCurrent ? "location" : undefined}
                    className={cn(
                      "-ml-px block border-l-2 py-1 pl-3 text-[0.875rem] leading-snug transition-colors",
                      isCurrent
                        ? "border-accent text-ink"
                        : "border-transparent text-muted hover:text-ink"
                    )}
                  >
                    {i.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
