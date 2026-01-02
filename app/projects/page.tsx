import { Section } from "@/components/section"
import { MediaCard } from "@/components/media-card"
import { siteData } from "@/lib/site"

export const dynamic = "error"

export default function ProjectsPage() {
  return (
    <div>
      <Section title="Projects" eyebrow="Selected work">
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {siteData.projects.map((p) => (
            <MediaCard
              key={p.title}
              title={p.title}
              description={p.description}
              image={p.image}
              links={p.links}
            />
          ))}
        </div>
      </Section>
    </div>
  )
}
