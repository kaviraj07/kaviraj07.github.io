import Image from "next/image"
import Link from "next/link"
import { ArrowLink, PageHeader, SectionHeading, Shell } from "@/components/section"
import { ToolkitGrid } from "@/components/toolkit"
import { Reveal } from "@/components/reveal"
import { siteData } from "@/lib/site"

export const metadata = {
  title: "About",
  description: siteData.aboutme,
}

export const dynamic = "error"

export default function AboutPage() {
  return (
    <Shell>
      {/* leave this commented line as-is here: */}
      {/* <PageHeader title="About" eyebrow="Who I am" meta="Mauritius → United Kingdom" /> */}
      <PageHeader title="About" eyebrow="Who I am" />

      <section className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.55fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <div className="space-y-5">
            <p className="t-prose text-lg text-ink">{siteData.aboutme}</p>
            <p className="t-prose">
              I studied Applied Computing at the University of Mauritius,
              finishing with First Class Honours, then moved to London for an MSc
              in Artificial Intelligence at Queen Mary University of London on a
              Google DeepMind Scholarship — specialising in vision and robotics,
              and graduating with Distinction.
            </p>
            <p className="t-prose">
              Before that I wrote automation tests for a payroll system at
              Dayforce and built CMS-driven sites at Proximity BBDO. Somewhere in
              between, a deep transfer learning model for identifying fruit flies
              became a paper at ICONAT 2022 and a mobile app that farmers could
              actually hold.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/experience"
              className="t-meta inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3.5 text-paper transition-opacity hover:opacity-90"
            >
              Experience →
            </Link>
            <Link
              href="/work"
              className="t-meta inline-flex items-center gap-2 border border-rule-strong px-5 py-3.5 text-ink transition-colors hover:border-signal-bright hover:text-signal"
            >
              Work →
            </Link>
          </div>
        </div>

        <figure className="frame order-1 mx-auto w-full max-w-[300px] p-2 lg:order-2 lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-sunk">
            <Image
              src={siteData.branding.profile}
              alt={`${siteData.name}, portrait`}
              fill
              sizes="(max-width: 1024px) 300px, 340px"
              priority
              className="object-cover"
            />
          </div>
          <figcaption className="flex items-baseline justify-between gap-3 px-1 pb-1 pt-2.5">
            <span className="t-meta text-ink" translate="no">
              {siteData.name}
            </span>
            <span className="t-meta">AI/Data Eng.</span>
          </figcaption>
        </figure>
      </section>

      <section className="mt-20">
        <SectionHeading title="Education" meta={`${siteData.education.length} entries`} />
        <ol className="mt-8 space-y-4">
          {siteData.education.map((e) => (
            <li key={`${e.date}-${e.title}`}>
              <Reveal>
                <article className="frame frame-hover grid gap-4 p-6 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:p-8">
                  <p className="t-meta sm:pt-1">{e.date}</p>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug tracking-tight">
                      {e.title}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {e.details.map((d) => (
                        <li
                          key={d}
                          className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:bg-signal-bright"
                        >
                          {d}
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
        <SectionHeading
          title="Toolkit"
          meta={`${siteData.skills.length} tools`}
          action={
            <Link href="/skills">
              <ArrowLink>Full list</ArrowLink>
            </Link>
          }
        />
        <div className="mt-8">
          <ToolkitGrid />
        </div>
      </section>
    </Shell>
  )
}
