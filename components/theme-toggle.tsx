"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // Before hydration the resolved theme is unknown, so the control is
      // rendered but inert rather than swapped out — no layout shift, no
      // hydration mismatch.
      disabled={!mounted}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      className="frame frame-hover inline-flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-signal disabled:opacity-60"
      style={{ touchAction: "manipulation" }}
    >
      {mounted ? (
        isDark ? (
          <Sun size={16} aria-hidden />
        ) : (
          <Moon size={16} aria-hidden />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  )
}
