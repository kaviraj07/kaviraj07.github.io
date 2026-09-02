import { WorkPage } from "@/components/work-page"
import { allWork } from "@/lib/work"

export const metadata = {
  title: "Work",
  description:
    "Projects and competition entries in computer vision, robotics and applied machine learning.",
}

export const dynamic = "error"

export default function Work() {
  return (
    <WorkPage
      title="Work"
      eyebrow="Projects & competitions"
      lede="Coursework, research and weekend builds, plus the competitions that started most of it. Open any card for the full write-up and links."
      items={allWork}
      active="/work"
    />
  )
}
