import { WorkPage } from "@/components/work-page"
import { projects } from "@/lib/work"

export const metadata = {
  title: "Builds",
  description:
    "Computer vision, robotics and machine learning builds by Kaviraj Gosaye.",
}

export const dynamic = "error"

export default function BuildsPage() {
  return (
    <WorkPage
      title="Builds"
      eyebrow="Selected builds"
      lede="Deep learning, classical computer vision, search and robotics — each one built end to end rather than left in a notebook."
      items={projects}
      active="/projects/builds"
    />
  )
}
