"use client"

import { useEffect, useState } from "react"
import { groupByKind } from "@/components/work-entries"
import { cn } from "@/lib/utils"
import type { WorkItem } from "@/lib/work"

/**
 * A table of contents for the projects page that follows the reader: the last
 * entry whose top has passed a third of the way down the viewport is current.
 */
export function WorkContents({ items }: { items: WorkItem[] }) {
  const [current, setCurrent] = useState(items[0]?.slug)

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight / 3
      // On a tall screen the page ends before the last entries can reach the
      // line, so reaching the bottom counts as reaching the last entry.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let next = els[0]
      if (atBottom) next = els[els.length - 1]
      else for (const el of els) if (el.getBoundingClientRect().top <= line) next = el
      setCurrent(next.id)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
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
