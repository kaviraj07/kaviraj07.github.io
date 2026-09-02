import Link from "next/link"
import { PageHeader, Shell } from "@/components/section"
import { ToolkitGrid } from "@/components/toolkit"
import { siteData } from "@/lib/site"

export const metadata = {
  title: "Skills",
  description:
    "The languages, frameworks and tools Kaviraj Gosaye works with day to day.",
}

export const dynamic = "error"

export default function SkillsPage() {
  return (
    <>
      <Shell>
        <PageHeader
          title="Toolkit"
          eyebrow="Languages & tools"
          meta={`${siteData.skills.length} tools`}
          lede="What I reach for. Python and PyTorch do most of the work; the rest come from coursework, competitions and the two engineering roles that came before them."
        />
      </Shell>

      <Shell className="mt-12">
        <ToolkitGrid />

        <p className="mt-10 text-sm text-muted">
          See where these actually get used in{" "}
          <Link
            href="/work"
            className="text-signal underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            the work
          </Link>
          .
        </p>
      </Shell>
    </>
  )
}
