"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useReducedMotion } from "motion/react"
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogImage,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/motion-primitives/morphing-dialog"
import { AnimatedGroup } from "@/components/motion-primitives/animated-group"
import { cn } from "@/lib/utils"
import { kindLabel, type WorkItem } from "@/lib/work"

const filters = [
  { href: "/work", label: "All" },
  { href: "/projects", label: "Projects" },
  { href: "/competitions", label: "Competitions" },
] as const

/**
 * The three views are real routes rather than client-side state, so a
 * filtered view is linkable and Back behaves the way people expect.
 */
export function WorkFilters({ active }: { active: string }) {
  return (
    <nav aria-label="Filter work">
      <ul className="flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const isActive = f.href === active
          return (
            <li key={f.href}>
              <Link
                href={f.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "t-meta inline-flex items-center border px-3 py-2 transition-colors",
                  isActive
                    ? "border-signal-bright bg-signal-bright/10 text-signal"
                    : "border-rule text-faint hover:border-rule-strong hover:text-ink"
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

function WorkCard({ item }: { item: WorkItem }) {
  const hasLinks = item.links.length > 0

  return (
    <div id={item.slug} className="frame frame-hover h-full">
      <MorphingDialog
        transition={{ type: "spring", bounce: 0, duration: 0.28 }}
      >
        <MorphingDialogTrigger
          className="flex h-full w-full flex-col text-left"
          ariaLabel={`${item.title} — open details`}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-sunk p-4">
            {item.image ? (
              <MorphingDialogImage
                src={item.image}
                alt=""
                className="h-full w-full object-contain"
              />
            ) : null}
          </div>

          <div className="flex flex-1 flex-col gap-2 border-t border-rule p-5">
            <span className="t-meta text-signal">{kindLabel[item.kind]}</span>
            <MorphingDialogTitle className="text-base font-semibold leading-snug tracking-tight">
              {item.title}
            </MorphingDialogTitle>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
            <span className="t-meta mt-auto pt-3 text-ink">
              Details {hasLinks ? `· ${item.links.length} link${item.links.length > 1 ? "s" : ""}` : ""}
            </span>
          </div>
        </MorphingDialogTrigger>

        <MorphingDialogContainer>
          <MorphingDialogContent className="relative m-4 max-h-[85vh] w-full max-w-xl overflow-y-auto border border-rule-strong bg-raised shadow-[var(--shadow-lift)] overscroll-contain">
            {item.image ? (
              <div className="relative aspect-[16/10] w-full bg-sunk p-6">
                <MorphingDialogImage
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : null}

            <div className="border-t border-rule p-6 sm:p-8">
              <span className="t-meta text-signal">{kindLabel[item.kind]}</span>
              <MorphingDialogTitle className="mt-2 text-xl font-semibold tracking-tight">
                {item.title}
              </MorphingDialogTitle>
              <MorphingDialogDescription
                variants={{
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: 8 },
                }}
              >
                <p className="t-prose mt-4">{item.description}</p>

                {hasLinks ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {item.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="t-meta inline-flex items-center gap-2 border border-signal-bright bg-signal-bright/10 px-4 py-2.5 text-signal transition-colors hover:bg-signal-bright/20"
                      >
                        {l.label}
                        <ArrowUpRight size={13} aria-hidden />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="t-meta mt-6">No public link for this one</p>
                )}
              </MorphingDialogDescription>
            </div>

            <MorphingDialogClose className="absolute right-3 top-3 bg-paper/80 p-2 text-muted backdrop-blur transition-colors hover:text-ink" />
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    </div>
  )
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
  const reduce = useReducedMotion()

  if (!items.length) {
    return (
      <p className="border border-dashed border-rule-strong p-6 text-sm text-muted">
        Nothing here yet.
      </p>
    )
  }

  const cards = items.map((item) => <WorkCard key={item.slug} item={item} />)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reduce ? (
        cards
      ) : (
        <AnimatedGroup
          className="contents"
          variants={{
            container: { visible: { transition: { staggerChildren: 0.06 } } },
            item: {
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            },
          }}
        >
          {cards}
        </AnimatedGroup>
      )}
    </div>
  )
}
