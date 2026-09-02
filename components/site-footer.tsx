import Link from "next/link"
import { siteData } from "@/lib/site"
import { SocialIcon } from "@/components/social-icon"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="t-meta text-ink">
          © {new Date().getFullYear()} {siteData.name}
        </p>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {siteData.socials.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                className="group inline-flex items-center gap-2 py-2 text-sm text-muted transition-colors hover:text-ink"
              >
                <span className="text-faint transition-colors group-hover:text-signal-bright">
                  <SocialIcon src={s.icon} />
                </span>
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
