import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader, Row, Shell } from "@/components/section"
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
        <PageHeader
          eyebrow="Writing"
          title="Nothing published yet."
          lede="Check back soon — or take a look at what I’ve built in the meantime."
        />
        <Row className="mt-9">
          <Link href="/projects" className="btn">
            See the projects
          </Link>
        </Row>
      </Shell>
    )
  }

  const post = await getPostBySlug(slug)

  return (
    <>
      <ReadingProgress />

      <Shell>
        <article>
          <Row
            as="header"
            className="pt-16 sm:pt-24"
            margin={
              <Link href="/blog" className="link t-small md:inline-block md:pt-[0.9rem]">
                All writing
              </Link>
            }
          >
            <h1 className="t-display text-[clamp(2rem,4.5vw,3.25rem)]">
              {post.meta.title}
            </h1>
            <p className="t-small mt-5">
              {post.meta.date}
              {post.meta.tags?.length ? `, ${post.meta.tags.join(", ")}` : null}
            </p>
          </Row>

          <Row className="mt-12">
            <div
              className="prose max-w-[38rem]"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </Row>
        </article>
      </Shell>
    </>
  )
}
