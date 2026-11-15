"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Section } from "@/components/section"
import { cn } from "@/lib/utils"
import { allWork, competitions, kindLabel, projects } from "@/lib/work"

const groups = [
  { label: "Builds", noun: "build", items: projects },
  { label: "Competitions", noun: "competition", items: competitions },
]

/** Rows shown per group before "Show more", so the home page stays the same
 *  length as work is added. Order in site.json decides which come first. */
const LIMIT = 4

/**
 * The work as a readable index: titles always visible, grouped by kind.
 * Pointing at a row puts its image in the margin preview, where a detection
 * box locks onto it; clicking opens the row in place with the full write-up
 * and links, so reading a piece never costs a page load.
 */
export function WorkIndex() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const current = allWork[active]

  return (
    <Section
      title="Projects"
      action={
        <Link href="/projects" className="link">
          All projects
        </Link>
      }
      note={
        // Mirrors the row the pointer is on; the rows carry the real names.
        <figure aria-hidden>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-surface">
            {allWork.map((w, i) =>
              w.image ? (
                <Image
                  key={w.slug}
                  src={w.image}
                  alt=""
                  fill
                  sizes="192px"
                  className={cn(
                    "object-cover transition-opacity duration-300",
                    i === active ? "opacity-100" : "opacity-0"
                  )}
                />
              ) : null
            )}
            {/* Keyed so the box re-mounts, and re-locks, on every change. */}
            <span key={active} className="detect detect-photo relock inset-[14%]">
              <span className="tag">{kindLabel[current.kind]}</span>
            </span>
          </div>
          <figcaption className="t-small mt-3 text-ink">{current.title}</figcaption>
        </figure>
      }
    >
      {/* Leaving the list hands the preview back to the open row, if any. */}
      <div className="space-y-10" onMouseLeave={() => open !== null && setActive(open)}>
        {groups.map((g) => {
          const all = expanded[g.label]
          const hidden = g.items.length - LIMIT
          const shown = all ? g.items : g.items.slice(0, LIMIT)
          return (
            <div key={g.label}>
              <h3 className="t-small border-b border-rule pb-2.5">{g.label}</h3>
              <ul>
                {shown.map((w) => {
                  const i = allWork.indexOf(w)
                  const isOpen = open === i
                  const panelId = `work-panel-${w.slug}`
                  return (
                    <li key={w.slug} id={w.slug} className="border-b border-rule">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => {
                          setActive(i)
                          setOpen(isOpen ? null : i)
                        }}
                        className="index-row flex w-full items-center gap-4 py-3 text-left md:py-3.5"
                        style={{ touchAction: "manipulation" }}
                      >
                        <span className="relative size-11 shrink-0 overflow-hidden rounded-[3px] bg-surface md:hidden">
                          {w.image ? (
                            <Image src={w.image} alt="" fill sizes="44px" className="object-cover" />
                          ) : null}
                        </span>
                        <span className="index-title min-w-0 flex-1 text-lg leading-snug tracking-tight">
                          {w.title}
                        </span>
                        {/* Wide screens have room to say what each piece is —
                            until the row opens and says it in full. */}
                        <span
                          className={cn(
                            "t-small hidden w-[20rem] shrink-0 truncate transition-opacity duration-200 lg:block",
                            isOpen && "opacity-0"
                          )}
                        >
                          {w.description}
                        </span>
                        <span aria-hidden className="index-toggle" />
                      </button>

                      <div
                        id={panelId}
                        className="index-panel"
                        data-open={isOpen ? "" : undefined}
                        inert={!isOpen}
                      >
                        <div>
                          <div className="pb-6 pt-1 md:pl-0">
                            <p className="t-prose">{w.description}</p>
                            {w.links.length ? (
                              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                                {w.links.map((l) => (
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
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              {hidden > 0 ? (
                <button
                  type="button"
                  onClick={() => setExpanded((e) => ({ ...e, [g.label]: !all }))}
                  aria-expanded={all}
                  className="link mt-3 text-[0.9375rem] font-medium"
                >
                  {all ? "Show fewer" : `Show ${hidden} more ${hidden === 1 ? g.noun : g.label.toLowerCase()}`}
                </button>
              ) : null}
            </div>
          )
        })}
      </div>
    </Section>
  )
}
