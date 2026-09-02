"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { siteData } from "@/lib/site"

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  if (href === "/work") {
    return ["/work", "/projects", "/competitions"].some((p) => pathname.startsWith(p))
  }
  if (href === "/about") return ["/about", "/skills"].some((p) => pathname.startsWith(p))
  return pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => setOpen(false), [pathname])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${siteData.name} — home`}
        >
          {/* The monogram is set in the site's own display face rather than
              the old raster logo, which was drawn for a different palette. */}
          <span
            aria-hidden
            className="frame frame-hover grid h-9 w-9 shrink-0 place-items-center bg-raised"
          >
            <span className="t-monogram">{siteData.branding.monogram}</span>
          </span>
          {/* Name only: the hero's own eyebrow already reads "AI & software",
              and the two sat within a second of each other on the home page. */}
          <span
            className="hidden text-sm font-semibold tracking-tight sm:block"
            translate="no"
          >
            {siteData.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const active = isActive(pathname, l.href)
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "t-meta relative block px-3 py-2 transition-colors hover:text-ink",
                      active && "text-ink"
                    )}
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-signal-bright transition-transform duration-200",
                        active && "scale-x-100"
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="frame frame-hover inline-flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-signal md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            style={{ touchAction: "manipulation" }}
          >
            {open ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-rule bg-paper md:hidden"
      >
        <nav aria-label="Primary (mobile)" className="mx-auto w-full max-w-6xl px-5 py-2 sm:px-8">
          <ul className="flex flex-col">
            {links.map((l) => {
              const active = isActive(pathname, l.href)
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "t-meta flex items-center justify-between border-b border-rule py-3 last:border-0 hover:text-ink",
                      active && "text-signal"
                    )}
                  >
                    {l.label}
                    {active ? <span aria-hidden>—</span> : null}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
