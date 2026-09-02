import { siteData } from "@/lib/site"

export type WorkKind = "project" | "competition"

export type WorkItem = {
  slug: string
  kind: WorkKind
  title: string
  description: string
  image: string | null
  links: Array<{ label: string; href: string }>
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function toItems(
  entries: ReadonlyArray<{
    title: string
    description: string
    image?: string | null
    links?: ReadonlyArray<{ label: string; href: string }>
  }>,
  kind: WorkKind
): WorkItem[] {
  return entries.map((e) => ({
    slug: slugify(e.title),
    kind,
    title: e.title,
    description: e.description,
    image: e.image ?? null,
    links: e.links ? [...e.links] : [],
  }))
}

export const projects = toItems(siteData.projects, "project")
export const competitions = toItems(siteData.competitions, "competition")

/** Projects first, then competitions — the order the work page presents. */
export const allWork: WorkItem[] = [...projects, ...competitions]

export const kindLabel: Record<WorkKind, string> = {
  project: "Project",
  competition: "Competition",
}
