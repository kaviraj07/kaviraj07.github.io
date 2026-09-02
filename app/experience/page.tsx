import { ArrowUpRight } from "lucide-react"
import { PageHeader, SectionHeading, Shell } from "@/components/section"
import { AwardPanel } from "@/components/award-panel"
import { Reveal } from "@/components/reveal"
import { siteData } from "@/lib/site"

export const metadata = {
  title: "Experience",
  description:
    "Work history, awards and published research — Kaviraj Gosaye, data engineer and MSc AI graduate.",
}

export const dynamic = "error"

export default function ExperiencePage() {
  return (
    <Shell>
      <PageHeader
        title="Experience"
        eyebrow="Work, awards, research"
        meta={`${siteData.work.length} roles · ${siteData.publications.length} paper`}
        lede="Software and data roles in Mauritius, a scholarship that moved the work to the UK, and one paper that put a deep-learning model into the hands of farmers."
      />

      {/* Roles are a chronology, so the date carries the structure. */}
      <section className="mt-16">
        <SectionHeading title="Roles" />
        <ol className="mt-8 space-y-4">
          {siteData.work.map((w) => (
            <li key={`${w.company}-${w.role}`}>
              <Reveal>
                <article className="frame frame-hover grid gap-4 p-6 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:p-8">
                  <p className="t-meta sm:pt-1">{w.date}</p>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{w.role}</h3>
                    <p className="mt-1 text-sm text-muted">{w.company}</p>
                    <ul className="mt-4 space-y-2">
                      {w.bullets.map((b) => (
                        <li
                          key={b}
                          className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:bg-signal-bright"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <SectionHeading title="Awards" />
        <div className="mt-8 space-y-4">
          {siteData.awards.map((a) => (
            <Reveal key={a.title}>
              <AwardPanel
                title={a.title}
                body={a.body[0]}
                quote={a.body[1]?.replace(/^"|"$/g, "")}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading title="Publications" />
        <div className="mt-8 space-y-4">
          {siteData.publications.map((p) => (
            <Reveal key={p.venue}>
              <article className="frame frame-hover p-6 sm:p-8">
                <p className="t-meta text-signal">{p.venue}</p>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                  {p.details[0]?.replace(/^Title:\s*/, "")}
                </h3>
                {p.details.slice(1).map((d) => (
                  <p key={d} className="t-prose mt-4 max-w-2xl">
                    {d}
                  </p>
                ))}

                {p.links.length ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {p.links.map((l) => (
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
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </Shell>
  )
}
