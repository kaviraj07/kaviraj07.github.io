import Link from "next/link"
import { PageHeader, Row, Shell } from "@/components/section"
import { ToolkitGrid } from "@/components/toolkit"

export const metadata = {
  title: "Skills",
  description:
    "The languages, frameworks and tools Kaviraj Gosaye works with day to day.",
}

export const dynamic = "error"

export default function SkillsPage() {
  return (
    <Shell>
      <PageHeader
        title="Toolkit"
        eyebrow="Languages & tools"
        lede="What I reach for. Python and PyTorch do most of the work; the rest come from coursework, competitions and the two engineering roles that came before them."
      />

      <Row className="mt-14">
        <ToolkitGrid />

        <p className="t-small mt-12">
          See where these actually get used in{" "}
          <Link href="/projects" className="link">
            the projects
          </Link>
          .
        </p>
      </Row>
    </Shell>
  )
}
