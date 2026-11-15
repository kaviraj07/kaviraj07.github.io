"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Shell } from "@/components/section"
import { Mark } from "@/components/mark"
import { cn } from "@/lib/utils"
import { siteData } from "@/lib/site"

const links = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
]

function isActive(pathname: string, href: string) {
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

  // Sticky, but out of the way: it slides off while reading downwards and
  // returns on any scroll up, which is usually when someone wants to go
  // somewhere else.
  const ref = React.useRef<HTMLElement>(null)
  const [hidden, setHidden] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 8)
        // A small dead zone keeps trackpad jitter from flickering it.
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 120)
          last = y
        }
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const shown = !hidden || open

  // Tell sticky things below (margin titles, reading progress) how much room
  // the header is taking, so they move clear of it instead of underneath.
  React.useEffect(() => {
    const h = shown && scrolled ? (ref.current?.offsetHeight ?? 0) : 0
    document.documentElement.style.setProperty("--header-offset", `${h}px`)
  }, [shown, scrolled])

  const navLink = (l: (typeof links)[number], className: string) => {
    const active = isActive(pathname, l.href)
    return (
      <Link
        href={l.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          className,
          "transition-colors hover:text-ink",
          active ? "text-ink" : "text-muted"
        )}
      >
        {l.label}
      </Link>
    )
  }

  return (
    <header
      ref={ref}
      className={cn(
        "sticky top-0 z-50 border-b transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] focus-within:translate-y-0",
        scrolled ? "border-rule bg-bg/85 backdrop-blur-md" : "border-transparent",
        !shown && "-translate-y-full"
      )}
    >
      <Shell className="flex items-center justify-between gap-6 py-6">
        <Link
          href="/"
          className="group flex items-center gap-3 text-[0.9375rem] font-medium"
          translate="no"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <Mark />
          {siteData.name}
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6 text-[0.9375rem]">
              {links.map((l) => (
                <li key={l.href}>{navLink(l, "block py-1")}</li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-9 items-center px-2 text-[0.9375rem] text-muted transition-colors hover:text-ink md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              style={{ touchAction: "manipulation" }}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </Shell>

      <nav
        id="mobile-nav"
        aria-label="Primary (mobile)"
        hidden={!open}
        className="md:hidden"
      >
        <Shell>
          <ul className="flex flex-col border-y border-rule py-2 text-lg">
            {links.map((l) => (
              <li key={l.href}>{navLink(l, "block py-2.5")}</li>
            ))}
          </ul>
        </Shell>
      </nav>
    </header>
  )
}
