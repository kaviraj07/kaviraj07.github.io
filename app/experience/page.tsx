import { PageHeader, Section, Shell } from "@/components/section"
import { AwardPanel } from "@/components/award-panel"
import { siteData } from "@/lib/site"
import { formatDate } from "@/lib/utils"
import { slugify } from "@/lib/work"
import { Timeline, isCurrent } from "@/components/timeline"

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
        lede="Software and data roles in Mauritius, a scholarship that moved the work to the UK, and one paper that put a deep-learning model into the hands of farmers."
      />

      {/* Roles are a chronology, so each entry opens with its dates. */}
      <Section title="Roles">
        <Timeline
          entries={siteData.work.map((w) => ({
            key: `${w.company}-${w.role}`,
            date: formatDate(w.date),
            current: isCurrent(w.date),
            children: (
              <article id={slugify(w.company)}>
                <h3 className="text-xl font-medium leading-snug tracking-tight">{w.role}</h3>
                <p className="mt-0.5 text-muted">{w.company}</p>
                <ul className="ticks mt-4 max-w-[38rem]">
                  {w.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ),
          }))}
        />
      </Section>

      <Section title="Awards">
        <div className="space-y-12">
          {siteData.awards.map((a) => (
            <AwardPanel
              key={a.title}
              title={a.title}
              body={a.body[0]}
              quote={a.body[1]?.replace(/^"|"$/g, "")}
            />
          ))}
        </div>
      </Section>

      <Section title="Publications" id="publications">
        <div className="space-y-12">
          {siteData.publications.map((p) => (
            <article key={p.venue}>
              <p className="t-small">{p.venue}</p>
              <h3 className="mt-1.5 max-w-[40rem] text-xl font-medium tracking-tight">
                {p.details[0]?.replace(/^Title:\s*/, "")}
              </h3>
              {p.details.slice(1).map((d) => (
                <p key={d} className="t-prose mt-3">
                  {d}
                </p>
              ))}

              {p.links.length ? (
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link font-medium"
                      >
                        {l.label}
                        <span aria-hidden> ↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </Section>
    </Shell>
  )
}
