import Link from "next/link"
import { Shell } from "@/components/section"

export default function NotFound() {
  return (
    <Shell>
      <div className="py-24 sm:py-32">
        <p className="t-meta text-signal">Error 404</p>
        <h1 className="t-display mt-4 text-[clamp(2.5rem,7vw,4.5rem)]">
          Nothing at this <span className="marker">address</span>.
        </h1>
        <p className="t-prose mt-6 max-w-lg">
          The page has moved or never existed. The work, the writing and the way
          to reach me are all one click away.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/"
            className="t-meta inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3.5 text-paper transition-opacity hover:opacity-90"
          >
            Back to the index →
          </Link>
          <Link
            href="/work"
            className="t-meta inline-flex items-center gap-2 border border-rule-strong px-5 py-3.5 text-ink transition-colors hover:border-signal-bright hover:text-signal"
          >
            See the work →
          </Link>
        </div>
      </div>
    </Shell>
  )
}
