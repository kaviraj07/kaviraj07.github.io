import type { Metadata } from "next"
import { Archivo, Newsreader, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { siteData } from "@/lib/site"

// Display + UI. The width axis is what gives headlines their signage feel.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

// Prose only.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
})

// Metadata: dates, venues, counts.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

const SITE_URL = "https://kaviraj07.github.io"
const NAME = "Kaviraj Gosaye"
const DESCRIPTION = siteData.tagline

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: NAME,
    template: `%s · ${NAME}`,
  },
  description: DESCRIPTION,

  applicationName: "A portfolio website",
  authors: [{ name: NAME, url: SITE_URL }],
  alternates: {
    canonical: "./",
  },

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "16x16 32x32 64x64" },
    ],
    apple: "/apple-touch-icon.png",
  },

  other: {
    "google-site-verification": "k36yppWGcHGMBiEZnIACAOnAnOSy-GbN3J59I-9-N5A",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eff1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f0e" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The font variables live on <html> so `:root` can read them; on <body>
    // they would be out of scope for the stacks defined in globals.css.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${newsreader.variable} ${jetbrains.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-signal-bright focus:bg-raised focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
