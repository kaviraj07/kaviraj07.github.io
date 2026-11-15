import Link from "next/link"
import { Row, Shell } from "@/components/section"
import { siteData } from "@/lib/site"
import { SocialIcon } from "@/components/social-icon"

export function SiteFooter() {
  return (
    <Shell className="mt-28 sm:mt-36">
      <Row
        as="footer"
        className="border-t border-rule py-8"
        margin={
          <p className="t-small">
            © {new Date().getFullYear()} {siteData.name}
          </p>
        }
      >
        {/* Icons only: six well-known services read at a glance. Each keeps
            its name for screen readers and as a hover tooltip, and a padded
            hit area that is larger than the mark itself. Right-aligned from
            md up, mirroring the header: name left, links right. */}
        <ul className="-m-2 flex flex-wrap items-center gap-x-2 md:justify-end">
          {siteData.socials.map((s) => {
            const external = s.href.startsWith("http")
            return (
              <li key={s.href}>
                <Link
                  href={s.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex p-2 text-faint transition-colors hover:text-accent"
                >
                  <SocialIcon src={s.icon} />
                </Link>
              </li>
            )
          })}
        </ul>
      </Row>
    </Shell>
  )
}
