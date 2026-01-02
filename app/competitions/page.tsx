import { Section } from "@/components/section"
import { MediaCard } from "@/components/media-card"
import { siteData } from "@/lib/site"

export const dynamic = "error"

export default function CompetitionsPage() {
  return (
    <div>
      <Section title="Competitions" eyebrow="Wins & participation">
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {siteData.competitions.map((c) => (
            <MediaCard
              key={c.title}
              title={c.title}
              description={c.description}
              image={c.image}
              links={c.links}
            />
          ))}
        </div>
      </Section>
    </div>
  )
}
