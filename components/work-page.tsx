import { PageHeader, Row, Shell } from "@/components/section"
import { WorkEntries, WorkFilters } from "@/components/work-entries"
import { WorkContents } from "@/components/work-contents"
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
    <Shell>
      <PageHeader title={title} eyebrow={eyebrow} lede={lede} />

      {/* The margin holds the filters and a contents list that tracks the
          reader, kept in view while the entries scroll past. */}
      <Row
        className="mt-16"
        sticky
        margin={
          <div className="space-y-10">
            <WorkFilters active={active} />
            <WorkContents items={items} />
          </div>
        }
      >
        <WorkEntries items={items} />
      </Row>
    </Shell>
  )
}
