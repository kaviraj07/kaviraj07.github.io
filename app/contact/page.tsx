import Link from "next/link"
import { Row, Shell } from "@/components/section"
import { SocialIcon } from "@/components/social-icon"
import { siteData } from "@/lib/site"

export const metadata = {
  title: "Contact",
  description: "Get in touch with Kaviraj Gosaye — LinkedIn, email and social links.",
}

export const dynamic = "error"

const LEDE =
  "LinkedIn is the surest way to reach me — I read everything and reply to anything that isn’t a template."

/** Most useful to someone looking at the work first; anything new goes last. */
const ORDER = ["Github", "Email", "X"]

function handle(href: string) {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}

export default function ContactPage() {
  const linkedin = siteData.socials.find((s) => s.label === "LinkedIn")
  const rest = siteData.socials
    .filter((s) => s !== linkedin)
    .sort((a, b) => {
      const rank = (l: string) => (ORDER.indexOf(l) + 1 || ORDER.length + 1)
      return rank(a.label) - rank(b.label)
    })

  // The sentence's first clause is the headline; the rest continues beneath
  // at reading size, so the message itself carries the page.
  const [lead, tail] = LEDE.split(/\s—\s/)

  return (
    <Shell>
      <Row
        as="header"
        className="pt-16 sm:pt-24"
        margin={
          <div className="md:pt-2">
            <h1 className="text-base font-medium">Contact</h1>
            <p className="t-small mt-0.5">Get in touch</p>
          </div>
        }
      >
        <p className="t-display max-w-[34rem] text-[clamp(2rem,4.6vw,3.5rem)]">{lead}</p>
        {tail ? <p className="t-prose mt-5 text-lg">— {tail}</p> : null}

        {linkedin ? (
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={linkedin.href} target="_blank" rel="noreferrer" className="btn">
              Message me on LinkedIn
              <span aria-hidden>↗</span>
            </a>
            <span className="t-small">{handle(linkedin.href)}</span>
          </div>
        ) : null}
      </Row>

      <Row
        as="section"
        className="mt-20 sm:mt-28"
        margin={<h2 className="text-lg font-medium tracking-tight">Elsewhere</h2>}
      >
        <ul className="border-t border-rule">
          {rest.map((s) => {
            const external = s.href.startsWith("http")
            return (
              <li key={s.href} className="border-b border-rule">
                <Link
                  href={s.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 py-4"
                >
                  <span className="flex text-faint transition-colors group-hover:text-accent">
                    <SocialIcon src={s.icon} size={20} />
                  </span>
                  <span className="flex-1 text-lg tracking-tight transition-colors group-hover:text-accent">
                    {s.label}
                  </span>
                  {/* Email shows what the row does, not the address. */}
                  <span className="t-small hidden truncate sm:block">
                    {external ? handle(s.href) : "Send an email"}
                  </span>
                  <span aria-hidden className="w-4 text-center text-sm text-faint transition-colors group-hover:text-accent">
                    {external ? "↗" : "→"}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Row>
    </Shell>
  )
}
