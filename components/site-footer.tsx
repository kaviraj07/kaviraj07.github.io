import Link from "next/link"
import Image from "next/image"
import { siteData } from "@/lib/site"
import clsx from "clsx"

type SiteFooterProps = {
  className?: string
}

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={clsx(
        "w-full border-t border-zinc-200/70 py-10 dark:border-zinc-800/70",
        className
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} {siteData.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {siteData.socials.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                className="group inline-flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-white/60 px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:text-zinc-200 dark:hover:bg-zinc-950"
              >
                {s.icon ? (
                  <Image
                    src={s.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="h-4 w-4 opacity-90"
                  />
                ) : null}
                <span>{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
