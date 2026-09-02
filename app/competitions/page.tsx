import { WorkPage } from "@/components/work-page"
import { competitions } from "@/lib/work"

export const metadata = {
  title: "Competitions",
  description:
    "Hackathons and university competitions entered and won by Kaviraj Gosaye.",
}

export const dynamic = "error"

export default function CompetitionsPage() {
  return (
    <WorkPage
      title="Competitions"
      eyebrow="Hackathons"
      lede="Short-format builds under a clock — 24 hours to a working website, 48 to a pitched product, three days to something that had to survive a demo."
      items={competitions}
      active="/competitions"
    />
  )
}
