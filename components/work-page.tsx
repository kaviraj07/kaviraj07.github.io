import { PageHeader, Shell } from "@/components/section"
import { WorkFilters, WorkGrid } from "@/components/work-grid"
import type { WorkItem } from "@/lib/work"

/** Shared body for /work, /projects and /competitions. */
export function WorkPage({
  title,
  eyebrow,
  lede,
  items,
  active,
}: {
  title: string
  eyebrow: string
  lede: string
  items: WorkItem[]
  active: string
}) {
  return (
    <Shell className="pb-4">
      <PageHeader
        title={title}
        eyebrow={eyebrow}
        meta={`${items.length} ${items.length === 1 ? "entry" : "entries"}`}
        lede={lede}
      />

      <div className="mt-8">
        <WorkFilters active={active} />
      </div>

      <div className="mt-6">
        <WorkGrid items={items} />
      </div>
    </Shell>
  )
}
