import Link from "next/link"
import { Section } from "@/components/section"
import { siteData } from "@/lib/site"

export const dynamic = "error"

export default function ExperiencePage() {
  return (
    <div>
      <Section title="Experience" eyebrow="Work">

        <div className="space-y-4 mt-8">
          {siteData.work.map((w) => (
            <div
              key={`${w.company}-${w.role}`}
              className="rounded-3xl p-6 border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-white/10"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{w.role}</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{w.company}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">{w.date}</span>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                {w.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Awards" eyebrow="Highlights">
        <div className="space-y-4">
          {siteData.awards.map((a) => (
            <div
              key={a.title}
              className="rounded-3xl p-6 border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-white/10"
            >
              <h3 className="text-lg font-semibold">{a.title}</h3>

              <div className="mt-3 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                {a.body.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Publications" eyebrow="Research">
        <div className="space-y-4">
          {siteData.publications.map((p) => (
            <div
              key={p.venue}
              className="rounded-3xl p-6 border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-white/10"
            >
              <h3 className="text-lg font-semibold">{p.venue}</h3>
              <div className="mt-3 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                {p.details.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
              {p.links.length ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
