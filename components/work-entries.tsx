import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { kindLabel, type WorkItem, type WorkKind } from "@/lib/work"

const filters = [
  { href: "/projects", label: "All" },
  { href: "/projects/builds", label: "Builds" },
  { href: "/projects/competitions", label: "Competitions" },
] as const

/**
 * The three views are real routes rather than client-side state, so a
 * filtered view is linkable and Back behaves the way people expect.
 */
export function WorkFilters({ active }: { active: string }) {
  return (
    <nav aria-label="Filter projects">
      <ul className="flex gap-5 md:flex-col md:gap-1.5">
        {filters.map((f) => {
          const isActive = f.href === active
          return (
            <li key={f.href}>
              <Link
                href={f.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "transition-colors hover:text-ink",
                  isActive ? "font-medium text-ink" : "text-muted"
                )}
              >
                {f.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const KINDS: WorkKind[] = ["project", "competition"]

export function groupByKind(items: WorkItem[]) {
  return KINDS.map((kind) => ({
    kind,
    label: `${kindLabel[kind]}s`,
    items: items.filter((i) => i.kind === kind),
  })).filter((g) => g.items.length)
}

/**
 * Each piece laid out in full: image, title, the whole write-up and its
 * links. Nothing to open — reading the page is reading the projects.
 */
export function WorkEntries({ items }: { items: WorkItem[] }) {
  if (!items.length) {
    return <p className="t-prose">Nothing here yet.</p>
  }

  return (
    <div className="space-y-16">
      {groupByKind(items).map((g) => (
        <section key={g.kind} aria-labelledby={`group-${g.kind}`}>
          <h2 id={`group-${g.kind}`} className="t-small border-b border-rule pb-2.5">
            {g.label}
          </h2>
          <div className="divide-y divide-rule">
            {g.items.map((item) => (
              <WorkEntry key={item.slug} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function WorkEntry({ item }: { item: WorkItem }) {
  return (
    <article
      id={item.slug}
      className="grid gap-6 py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10"
    >
      {/* Pointing at the image boxes it, the way a model marks a detection. */}
      <div className="hover-detect relative aspect-[16/10] overflow-hidden rounded-md bg-surface">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-contain p-5"
          />
        ) : null}
        <span aria-hidden className="detect detect-photo inset-[14%]">
          <span className="tag">{kindLabel[item.kind]}</span>
        </span>
      </div>

      <div className="lg:pt-1">
        <h3 className="text-2xl font-medium leading-tight tracking-tight">{item.title}</h3>
        <p className="t-prose mt-3">{item.description}</p>
        {item.links.length ? (
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {item.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link text-[0.9375rem] font-medium"
                >
                  {l.label}
                  <span aria-hidden> ↗</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="t-small mt-5">No public link for this one</p>
        )}
      </div>
    </article>
  )
}
