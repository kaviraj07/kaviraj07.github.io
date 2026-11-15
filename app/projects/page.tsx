import { WorkPage } from "@/components/work-page"
import { allWork } from "@/lib/work"

export const metadata = {
  title: "Projects",
  description:
    "Builds and competition entries in computer vision, robotics and applied machine learning.",
}

export const dynamic = "error"

export default function ProjectsPage() {
  return (
    <WorkPage
      title="Projects"
      eyebrow="Builds & competitions"
      lede="Coursework, research and weekend builds, plus the competitions that started most of it."
      items={allWork}
      active="/projects"
    />
  )
}
