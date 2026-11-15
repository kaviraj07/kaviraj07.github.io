import Link from "next/link"
import { PageHeader, Row, Shell } from "@/components/section"
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
        lede="Thoughts, experiments and insights on modern technology."
      />

      {posts.length ? (
        <ol className="mt-16 space-y-10">
          {posts.map((p) => (
            <li key={p.slug}>
              <Row margin={<p className="t-small md:pt-0.5">{p.meta.date}</p>}>
                <Link href={`/blog/${p.slug}/`} className="group block">
                  <h2 className="text-xl font-medium tracking-tight transition-colors group-hover:text-accent">
                    {p.meta.title}
                  </h2>
                  {p.meta.description ? (
                    <p className="t-prose mt-2">{p.meta.description}</p>
                  ) : null}
                  {p.meta.tags?.length ? (
                    <p className="t-small mt-2">{p.meta.tags.join(", ")}</p>
                  ) : null}
                </Link>
              </Row>
            </li>
          ))}
        </ol>
      ) : (
        <Row className="mt-14">
          <p className="t-prose">No posts yet. Stay tuned - New content coming soon.</p>
          <Link href="/projects" className="link mt-5 inline-block font-medium">
            See the projects
          </Link>
        </Row>
      )}
    </Shell>
  )
}
