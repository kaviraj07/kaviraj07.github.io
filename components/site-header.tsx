'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/components/cn"
import { siteData } from "@/lib/site"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/competitions", label: "Competitions" },
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-purple-75 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="group flex items-center gap-3 font-semibold tracking-tight">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl ring-1 ring-zinc-900/10 dark:ring-white/10">
            <span className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-sky-500 opacity-90" />
            {siteData.branding?.logo ? (
              <Image
                src={siteData.branding.logo}
                alt={`${siteData.name} logo`}
                width={24}
                height={24}
                className="relative h-6 w-6 object-contain"
                priority
              />
            ) : (
              <span className="relative text-sm font-black tracking-tight text-white">{siteData.branding?.monogram ?? "KG"}</span>
            )}
          </span>

          <span className="hidden text-sm font-semibold text-zinc-900 dark:text-zinc-100 sm:block">
            {siteData.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-900",
                  active && "bg-zinc-100 dark:bg-zinc-900"
                )}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-medium shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:bg-zinc-950 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-zinc-200/70 px-4 py-2 dark:border-zinc-800/70 md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-1">
            {links.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-900",
                    active && "bg-zinc-100 dark:bg-zinc-900"
                  )}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
