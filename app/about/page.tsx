import Image from "next/image"
import Link from "next/link"
import { Section } from "@/components/section"
import { siteData } from "@/lib/site"

export const dynamic = "error" // keeps everything static-export friendly

export default function AboutPage() {
  return (
    <div>
      <section className="py-12">
        <div className="grid items-start gap-8 md:grid-cols-[0.9fr_1.3fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet-500/15 blur-3xl" />
            <Image
              src={siteData.branding.profile}
              alt={`${siteData.name} profile photo`}
              width={420}
              height={540}
              className="h-auto w-full rounded-[1.5rem] object-cover"
            />
            <div className="mt-5">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{siteData.name}</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Data Engineering · AI · Computer Vision</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/projects"
                  className="rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                >
                  Projects
                </Link>
                <Link
                  href="/contact"
                  className="rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:text-zinc-50 dark:hover:bg-zinc-950"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div>
            <Section title="About" eyebrow="Bio" className="py-0">
              <div className="prose prose-zinc max-w-none dark:prose-invert">
                <p>{siteData.tagline}</p>
                <p>
                  {siteData.aboutme}
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/skills"
                  className="group rounded-3xl border border-zinc-200/70 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:hover:bg-zinc-950"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">Stack</p>
                  <p className="mt-3 text-lg font-semibold">Skills & tools</p>
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Overview of my day-to-day toolkit.</p>
                  <p className="mt-4 text-sm font-semibold text-violet-700 group-hover:underline group-hover:underline-offset-4 dark:text-violet-300">View →</p>
                </Link>

                <Link
                  href="/experience"
                  className="group rounded-3xl border border-zinc-200/70 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:hover:bg-zinc-950"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">Highlights</p>
                  <p className="mt-3 text-lg font-semibold">Experience</p>
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Work history, awards and publications.</p>
                  <p className="mt-4 text-sm font-semibold text-violet-700 group-hover:underline group-hover:underline-offset-4 dark:text-violet-300">Explore →</p>
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </section>

      <Section title="Education" eyebrow="Timeline">
        <div className="space-y-4">
          {siteData.education.map((e) => (
            <div
              key={`${e.date}-${e.title}`}
              className="rounded-3xl p-6 border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-white/10"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">{e.date}</span>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                {e.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
