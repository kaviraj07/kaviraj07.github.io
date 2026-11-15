import Link from "next/link"
import { Section, Shell } from "@/components/section"
import { Hero } from "@/components/hero"
import { WorkIndex } from "@/components/work-index"
import { AwardPanel } from "@/components/award-panel"
import { ToolkitGrid } from "@/components/toolkit"
import { siteData } from "@/lib/site"
import { getAllPostMeta } from "@/lib/posts"

export const metadata = {
  title: siteData.name,
  description: siteData.tagline,
}

export const dynamic = "error"

export default function HomePage() {
  const posts = getAllPostMeta().slice(0, 2)
  const award = siteData.awards[0]
  const quote = award?.body[1]?.replace(/^"|"$/g, "")

  return (
    <>
      <Shell>
        <Hero />

        <WorkIndex />

        {award ? (
          <Section title="Award">
            <AwardPanel title={award.title} body={award.body[0]} quote={quote} />
          </Section>
        ) : null}

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

        {/* Writing is a single line until there's something to list, so an
            empty state doesn't get a full section's weight. */}
        <Section
          title="Writing"
          className="sm:mt-24"
          action={
            <Link href="/blog" className="link">
              All posts
            </Link>
          }
        >
          {posts.length ? (
            <ul className="divide-y divide-rule border-y border-rule">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}/`}
                    className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                  >
                    <span className="text-lg tracking-tight transition-colors group-hover:text-accent">
                      {p.meta.title}
                    </span>
                    <span className="t-small">{p.meta.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="t-prose md:pt-0.5">Nothing published yet but coming soon…</p>
          )}
        </Section>

        <Section title="Next step">
          <p className="max-w-[30rem] text-xl tracking-tight">
            Want to talk through any of this? I&rsquo;m easy to reach.
          </p>
          <Link href="/contact" className="btn mt-6">
            Get in touch
          </Link>
        </Section>
      </Shell>
    </>
  )
}
