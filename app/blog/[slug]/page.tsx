import type { Metadata } from "next"
import Link from "next/link"
import { Shell } from "@/components/section"
import { ReadingProgress } from "@/components/reading-progress"
import { getAllSlugs, getPostBySlug } from "@/lib/posts"

export const dynamic = "error"
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return (slugs.length ? slugs : ["coming-soon"]).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const slugs = getAllSlugs()

  if (slug === "coming-soon" && slugs.length === 0) {
    return { title: "Writing", description: "Posts coming soon." }
  }
  const post = await getPostBySlug(slug)
  return {
    title: post.meta.title,
    description: post.meta.description,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const slugs = getAllSlugs()

  if (slug === "coming-soon" && slugs.length === 0) {
    return (
      <Shell>
        <div className="py-24">
          <p className="t-meta text-signal">Writing</p>
          <h1 className="t-display mt-4 text-[clamp(2.25rem,6vw,3.5rem)]">
            Nothing published yet.
          </h1>
          <p className="t-prose mt-6 max-w-lg">
            Check back soon — or take a look at what I&rsquo;ve built in the
            meantime.
          </p>
          <Link
            href="/work"
            className="t-meta mt-8 inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3.5 text-paper transition-opacity hover:opacity-90"
          >
            See the work →
          </Link>
        </div>
      </Shell>
    )
  }

  const post = await getPostBySlug(slug)

  return (
    <>
      <ReadingProgress />

      <Shell>
        <article className="pt-14 sm:pt-20">
          <header className="mx-auto max-w-2xl">
            <Link href="/blog" className="t-meta text-signal hover:text-ink">
              ← All writing
            </Link>
            <h1 className="t-display mt-6 text-[clamp(2rem,5.5vw,3.5rem)]">
              {post.meta.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="t-meta">{post.meta.date}</p>
              {post.meta.tags?.length
                ? post.meta.tags.map((t) => (
                    <span key={t} className="t-meta border border-rule px-2 py-1">
                      {t}
                    </span>
                  ))
                : null}
            </div>
            <div className="mt-8 h-px bg-rule" />
          </header>

          <div
            className="prose mx-auto mt-10 max-w-2xl"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className="mx-auto mt-16 max-w-2xl border-t border-rule pt-8">
            <Link
              href="/blog"
              className="t-meta inline-flex items-center gap-2 border border-rule-strong px-5 py-3.5 text-ink transition-colors hover:border-signal-bright hover:text-signal"
            >
              ← All writing
            </Link>
          </footer>
        </article>
      </Shell>
    </>
  )
}
