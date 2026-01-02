import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { siteData } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
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
  authors: [{ name: NAME, url: SITE_URL }], // maps to meta author tags
  alternates: {
    canonical: "./", // generates canonical per-route based on metadataBase
  },

  icons: {
    icon: "/Assets/logo.PNG",
  },

  // Google Search Console verification meta tag
  other: {
    "google-site-verification": "k36yppWGcHGMBiEZnIACAOnAnOSy-GbN3J59I-9-N5A",
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen flex flex-col bg-purple-50 text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50`}
      >
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-5xl px-4 py-10">
              {children}
            </div>
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}

