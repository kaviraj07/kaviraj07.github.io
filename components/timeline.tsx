import { cn } from "@/lib/utils"

export type TimelineEntry = {
  key: string
  /** Display-ready date or range. */
  date: string
  /** The entry still running. Its stretch of line is the only green on it. */
  current?: boolean
  children: React.ReactNode
}

/**
 * A chronology drawn as one hairline. Dates hang to its left, aligned with
 * each title, so the column of dates reads as the timeline itself. Below
 * `lg` the dates move inside, above each title, and the line keeps the edge.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol>
      {entries.map((e) => (
        <li key={e.key} className="group grid lg:grid-cols-[9.5rem_minmax(0,1fr)] lg:gap-x-6">
          <p className="t-small hidden whitespace-nowrap pt-[0.2rem] text-right lg:block">{e.date}</p>
          <div
            className={cn(
              "relative pb-12 pl-6 group-last:pb-0 before:absolute before:inset-y-0 before:left-0 before:w-px",
              e.current ? "before:w-0.5 before:bg-accent" : "before:bg-rule"
            )}
          >
            <p className="t-small mb-1.5 lg:hidden">{e.date}</p>
            {e.children}
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Content stores running roles as "… - CURRENT". */
export function isCurrent(date: string) {
  return /current|present/i.test(date)
}
