import Link from "next/link"
import { PageHeader, Shell } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { getAllPostMeta } from "@/lib/posts"

export const metadata = {
  title: "Writing",
  description:
    "Notes on data engineering, computer vision and machine learning by Kaviraj Gosaye.",
}

export const dynamic = "error"

export default function BlogIndexPage() {
  const posts = getAllPostMeta()

  return (
    <Shell>
      <PageHeader
        title="Writing"
        eyebrow="Notes"
        meta={posts.length ? `${posts.length} post${posts.length === 1 ? "" : "s"}` : undefined}
        lede="Thoughts, experiments and insights on modern technology."
      />

      {posts.length ? (
        <ol className="mt-10 border-t border-rule">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-rule">
              <Reveal>
                <Link
                  href={`/blog/${p.slug}/`}
                  className="group grid gap-3 py-7 transition-colors sm:grid-cols-[8rem_1fr] sm:gap-8"
                >
                  <p className="t-meta sm:pt-1.5">{p.meta.date}</p>
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-signal">
                      {p.meta.title}
                    </h2>
                    {p.meta.description ? (
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                        {p.meta.description}
                      </p>
                    ) : null}
                    {p.meta.tags?.length ? (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {p.meta.tags.map((t) => (
                          <li key={t} className="t-meta border border-rule px-2 py-1">
                            {t}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-10 border border-dashed border-rule-strong p-8">
          <p className="t-meta text-signal">Empty for now</p>
          <p className="t-prose mt-3 max-w-lg">
            No posts yet. Stay tuned - New content coming soon.
          </p>
          <Link
            href="/work"
            className="t-meta mt-6 inline-flex items-center gap-2 border border-rule-strong px-5 py-3.5 text-ink transition-colors hover:border-signal-bright hover:text-signal"
          >
            See the work →
          </Link>
        </div>
      )}
    </Shell>
  )
}
