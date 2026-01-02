import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Section } from "@/components/section"
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
    return { title: "Blog", description: "Posts coming soon." }
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
      <Section title="Blog" eyebrow="Coming soon">
        <p className="text-zinc-600 dark:text-zinc-400">
          No posts yet — check back soon.
        </p>
      </Section>
    )
  }

  const post = await getPostBySlug(slug)

  return (
    <div>
      <Section title={post.meta.title} eyebrow={post.meta.date}>
        <article
          className="prose prose-zinc max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Section>
    </div>
  )

}
