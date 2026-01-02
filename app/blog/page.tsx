import Link from "next/link"
import { Section } from "@/components/section"
import { getAllPostMeta } from "@/lib/posts"

export const dynamic = "error"

export default function BlogIndexPage() {
  const posts = getAllPostMeta()

  return (
    <div>
      <Section title="Blog" eyebrow="Writing">
        <div className="mt-6 space-y-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              className="block rounded-3xl border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-900/5
transition hover:-translate-y-0.5 hover:shadow-md
dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-white/10 p-6"
            >

              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{p.meta.title}</h3>
                  {p.meta.description ? (
                    <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{p.meta.description}</p>
                  ) : null}
                  {p.meta.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.meta.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
                  {p.meta.date}
                </p>
              </div>
            </Link>
          ))}

          {!posts.length ? (
            <div className="rounded-3xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
              No posts yet. Coming soon!
            </div>
          ) : null}
        </div>
      </Section>
    </div>
  )
}
