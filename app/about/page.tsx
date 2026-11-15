import Image from "next/image"
import Link from "next/link"
import { PageHeader, Row, Section, Shell } from "@/components/section"
import { ToolkitGrid } from "@/components/toolkit"
import { siteData } from "@/lib/site"
import { formatDate } from "@/lib/utils"
import { Timeline, isCurrent } from "@/components/timeline"

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

      <Row
        className="mt-12"
        margin={
          <div className="relative aspect-[4/5] w-28 overflow-hidden rounded-md bg-surface md:w-full">
            <Image
              src={siteData.branding.profile}
              alt={`${siteData.name}, portrait`}
              fill
              sizes="(max-width: 768px) 112px, 192px"
              priority
              className="object-cover"
            />
          </div>
        }
      >
        <div className="space-y-5">
          <p className="max-w-[38rem] text-xl leading-[1.55] tracking-[-0.01em]">
            {siteData.aboutme}
          </p>
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

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/experience" className="btn">
            Experience
          </Link>
          <Link href="/projects" className="link text-[0.9375rem] font-medium">
            Projects
          </Link>
        </div>
      </Row>

      <Section title="Education" id="education">
        <Timeline
          entries={siteData.education.map((e) => ({
            key: `${e.date}-${e.title}`,
            date: formatDate(e.date),
            current: isCurrent(e.date),
            children: (
              <article>
                <h3 className="text-lg font-medium leading-snug tracking-tight">{e.title}</h3>
                <ul className="ticks mt-3 max-w-[38rem]">
                  {e.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </article>
            ),
          }))}
        />
      </Section>

      <Section
        title="Toolkit"
        action={
          <Link href="/skills" className="link">
            Full list
          </Link>
        }
      >
        <ToolkitGrid />
      </Section>
    </Shell>
  )
}
