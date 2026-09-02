import Link from "next/link"
import { ArrowLink, SectionHeading, Shell } from "@/components/section"
import { Hero } from "@/components/hero"
import { ContactSheet } from "@/components/contact-sheet"
import { AwardPanel } from "@/components/award-panel"
import { ToolkitGrid } from "@/components/toolkit"
import { Reveal } from "@/components/reveal"
import { siteData } from "@/lib/site"
import { allWork } from "@/lib/work"
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
      </Shell>

      <Shell className="mt-16 sm:mt-24">
        <Reveal>
          <SectionHeading
            title="Work"
            meta={`${allWork.length} artifacts`}
            action={
              <Link href="/work">
                <ArrowLink>All work</ArrowLink>
              </Link>
            }
          />
          <div className="mt-6">
            <ContactSheet />
          </div>
        </Reveal>
      </Shell>

      <Shell className="mt-16 sm:mt-24">
        {award ? (
          <Reveal>
            <AwardPanel title={award.title} body={award.body[0]} quote={quote} />
          </Reveal>
        ) : null}
      </Shell>

      <Shell className="mt-16 sm:mt-24">
        <Reveal>
          <SectionHeading
            title="Toolkit"
            meta={`${siteData.skills.length} tools`}
            action={
              <Link href="/skills">
                <ArrowLink>Full list</ArrowLink>
              </Link>
            }
          />
          <div className="mt-6">
            <ToolkitGrid compact />
          </div>
        </Reveal>
      </Shell>

      <Shell className="mt-16 sm:mt-24">
        <Reveal>
          <SectionHeading
            title="Writing"
            meta={posts.length ? `${posts.length} recent` : undefined}
            action={
              <Link href="/blog">
                <ArrowLink>All posts</ArrowLink>
              </Link>
            }
          />

          {posts.length ? (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}/`}
                    className="frame frame-hover block h-full p-5 transition-colors hover:bg-sunk/50"
                  >
                    <p className="t-meta">{p.meta.date}</p>
                    <p className="mt-2 font-semibold tracking-tight">{p.meta.title}</p>
                    {p.meta.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {p.meta.description}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 border border-dashed border-rule-strong p-6 sm:p-8">
              <p className="t-meta text-signal">Empty for now</p>
              <p className="t-prose mt-3 max-w-xl">
                Nothing published yet but coming soon...
              </p>
            </div>
          )}
        </Reveal>
      </Shell>

      <Shell className="mt-16 sm:mt-24">
        <Reveal>
          <div className="frame flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="t-meta text-signal">Next step</p>
              <p className="mt-2 max-w-md text-lg font-semibold tracking-tight">
                Want to talk through any of this? I&rsquo;m easy to reach.
              </p>
            </div>
            <Link
              href="/contact"
              className="t-meta inline-flex shrink-0 items-center gap-2 border border-ink bg-ink px-5 py-3.5 text-paper transition-opacity hover:opacity-90"
            >
              Get in touch →
            </Link>
          </div>
        </Reveal>
      </Shell>
    </>
  )
}
