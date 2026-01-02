import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkHtml from "remark-html"
import remarkGfm from "remark-gfm"

export type PostMeta = {
  title: string
  date: string // ISO date or any sortable string
  description?: string
  tags?: string[]
  draft?: boolean
}

export type Post = {
  slug: string
  meta: PostMeta
  html: string
}

const POSTS_DIR = path.join(process.cwd(), "content", "blog")

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.(md|mdx)$/, ""))
}

export function getAllPostMeta(): Array<{ slug: string; meta: PostMeta }> {
  return getAllSlugs()
    .map((slug) => {
      const fullPath = path.join(POSTS_DIR, `${slug}.md`)
      const altPath = path.join(POSTS_DIR, `${slug}.mdx`)
      const filePath = fs.existsSync(fullPath) ? fullPath : altPath
      const raw = fs.readFileSync(filePath, "utf8")
      const { data } = matter(raw)
      return { slug, meta: data as PostMeta }
    })
    .filter((p) => !p.meta.draft)
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`)
  const altPath = path.join(POSTS_DIR, `${slug}.mdx`)
  // const filePath = fs.existsSync(fullPath) ? fullPath : altPath
  const filePath = fs.existsSync(fullPath)
    ? fullPath
    : fs.existsSync(altPath)
      ? altPath
      : null

  if (!filePath) {
    throw new Error(`Post not found: ${slug}`)
  }
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content)
  const html = processed.toString()

  return {
    slug,
    meta: data as PostMeta,
    html,
  }
}
