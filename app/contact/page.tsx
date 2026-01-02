import Image from "next/image"
import { Section } from "@/components/section"
import { siteData } from "@/lib/site"

export const dynamic = "error"

export default function ContactPage() {
  return (
    <div>
      <Section title="Contact" eyebrow="Get in touch">
        <div className="grid gap-4 md:grid-cols-2">
          {siteData.socials.map((s) => {
            const display = s.href.startsWith("mailto:")
              ? s.href.replace(/^mailto:/, "")
              : s.href

            const isExternal = s.href.startsWith("http")

            return (
              <a
                key={s.href}
                href={s.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-950 dark:ring-white/10">
                    {s.icon ? (
                      <Image
                        src={s.icon}
                        alt=""
                        width={22}
                        height={22}
                        className="h-5 w-5 opacity-90"
                      />
                    ) : null}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {s.label}
                    </p>
                    <p className="mt-1 break-all text-sm text-zinc-600 dark:text-zinc-400">
                      {display}
                    </p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
