import Link from "next/link"
import { PageHeader, Row, Shell } from "@/components/section"

export default function NotFound() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Error 404"
        title="Nothing at this address."
        lede="The page has moved or never existed. The work, the writing and the way to reach me are all one click away."
      />
      <Row className="mt-9">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/" className="btn">
            Back to the index
          </Link>
          <Link href="/projects" className="link text-[0.9375rem] font-medium">
            See the projects
          </Link>
        </div>
      </Row>
    </Shell>
  )
}
