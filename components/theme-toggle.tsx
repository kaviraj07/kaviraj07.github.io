"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { siteData } from "@/lib/site"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Server + first client render: stable output to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="group inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100"
      >
        <span className="flex items-center gap-2">
          {/* empty placeholder to keep layout identical */}
          <span className="h-4 w-4" />
          <span className="hidden sm:inline">Theme</span>
        </span>
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"
  const iconSrc = isDark ? siteData.themeIcons.sun : siteData.themeIcons.moon
  const aria = isDark ? "Switch to light mode" : "Switch to dark mode"
  // const label = isDark ? "Light" : "Dark"

  return (
    <button
      type="button"
      aria-label={aria}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100 dark:hover:bg-zinc-950"
    >
      <span className="flex items-center gap-2">
        <Image
          src={iconSrc}
          alt=""
          width={18}
          height={18}
          className="h-4 w-4 opacity-90"
          priority
        />
        {/* <span className="hidden sm:inline">{label}</span> */}
      </span>
    </button>
  )
}
