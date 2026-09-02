import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader, Shell } from "@/components/section"
import { SocialIcon } from "@/components/social-icon"
import { Reveal } from "@/components/reveal"
import { siteData } from "@/lib/site"

export const metadata = {
  title: "Contact",
  description: "Get in touch with Kaviraj Gosaye — email, LinkedIn and social links.",
}

export const dynamic = "error"

/** The two routes that actually get read; everything else is "Elsewhere". */
const PRIMARY = ["email", "linkedin"]

function displayHref(href: string) {
  return href.startsWith("mailto:")
    ? href.slice("mailto:".length)
    : href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}

export default function ContactPage() {
  const primary = PRIMARY.map((key) =>
    siteData.socials.find((s) => s.label.toLowerCase() === key)
  ).filter((s): s is (typeof siteData.socials)[number] => Boolean(s))

  const rest = siteData.socials.filter(
    (s) => !PRIMARY.includes(s.label.toLowerCase())
  )

  return (
    <Shell>
      <PageHeader
        title="Contact"
        eyebrow="Get in touch"
        lede="Email and LinkedIn are the surest ways to reach me — I read everything and reply to anything that isn’t a template."
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {primary.map((s) => {
          const external = s.href.startsWith("http")
          return (
            <li key={s.href}>
              <Link
                href={s.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="frame frame-hover flex h-full items-center justify-between gap-4 p-6 transition-colors hover:bg-sunk/50 sm:p-7"
              >
                <span className="min-w-0">
                  <span className="t-meta flex items-center gap-2 text-signal">
                    <SocialIcon src={s.icon} size={14} />
                    {s.label}
                  </span>
                  <span className="mt-2 block truncate text-base font-semibold tracking-tight sm:text-lg">
                    {displayHref(s.href)}
                  </span>
                </span>
                <ArrowUpRight size={18} aria-hidden className="shrink-0 text-faint" />
              </Link>
            </li>
          )
        })}
      </ul>

      <section className="mt-12">
        <p className="t-meta">Elsewhere</p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => (
            <li key={s.href}>
              <Reveal>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="frame frame-hover flex items-center gap-4 p-5 transition-colors hover:bg-sunk/50"
                >
                  <span className="shrink-0 text-signal">
                    <SocialIcon src={s.icon} size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold tracking-tight">
                      {s.label}
                    </span>
                    <span className="block truncate text-xs text-faint">
                      {displayHref(s.href)}
                    </span>
                  </span>
                  <ArrowUpRight size={15} aria-hidden className="shrink-0 text-faint" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  )
}
