import Image from "next/image"
import Link from "next/link"
import { siteData } from "@/lib/site"
import { getAllPostMeta } from "@/lib/posts"

export const dynamic = "error"

export default function HomePage() {
  const posts = getAllPostMeta().slice(0, 2)
  const topSkills = siteData.skills.slice(0, 6)

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-white/60 p-8 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 md:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="relative grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:text-zinc-200">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500" />
              Portfolio
            </p>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
              Hi, I’m{" "}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                {siteData.name}
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-lg">
              {siteData.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 hover:ring-1 hover:ring-violet-500 "
              >
                View projects
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:ring-1 hover:ring-violet-500 dark:bg-zinc-950/40 dark:text-zinc-50 dark:hover:bg-zinc-950/80"
              >
                Read the blog
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:ring-1 hover:ring-violet-500 dark:bg-zinc-950/40 dark:text-zinc-50 dark:hover:bg-zinc-950/80"
              >
                Get in touch
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {topSkills.map((s) => (
                <span
                  key={s.label}
                  className="rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:text-zinc-200"
                >
                  {s.label}
                </span>
              ))}
              <Link
                href="/skills"
                className="rounded-full border border-zinc-200/70 bg-white/0 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-white/60 dark:border-zinc-800/70 dark:text-zinc-200 dark:hover:bg-zinc-950/40"
              >
                View all →
              </Link>
            </div>
          </div>

          <div className="justify-self-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-violet-600/25 via-fuchsia-500/10 to-sky-500/25 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-white/70 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950/40">
                <Image
                  src={siteData.branding.profile}
                  alt={`${siteData.name} profile photo`}
                  width={420}
                  height={540}
                  priority
                  className="h-auto w-[280px] object-cover md:w-[320px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick highlights */}
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <Link
          href="/experience"
          className="group rounded-3xl border border-zinc-200/70 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:hover:bg-zinc-950"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">Experience</p>
          <p className="mt-3 text-lg font-semibold">Work & research</p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Roles, awards and publications.</p>
          <p className="mt-4 text-sm font-semibold text-violet-700 group-hover:underline group-hover:underline-offset-4 dark:text-violet-300">Explore →</p>
        </Link>

        <Link
          href="/projects"
          className="group rounded-3xl border border-zinc-200/70 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:hover:bg-zinc-950"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">Projects</p>
          <p className="mt-3 text-lg font-semibold">Hands-on builds</p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Computer Vision, robotics and apps.</p>
          <p className="mt-4 text-sm font-semibold text-violet-700 group-hover:underline group-hover:underline-offset-4 dark:text-violet-300">See work →</p>
        </Link>

        <Link
          href="/competitions"
          className="group rounded-3xl border border-zinc-200/70 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:hover:bg-zinc-950"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">Competitions</p>
          <p className="mt-3 text-lg font-semibold">Wins & challenges</p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Hackathons, web/app competitions.</p>
          <p className="mt-4 text-sm font-semibold text-violet-700 group-hover:underline group-hover:underline-offset-4 dark:text-violet-300">View →</p>
        </Link>
      </section>

      {/* Latest writing */}
      <section className="mt-12 rounded-3xl border border-zinc-200/70 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">Blog</p>
            <h2 className="mt-2 text-xl font-semibold">Latest writing</h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-violet-700 hover:underline hover:underline-offset-4 dark:text-violet-300"
          >
            All posts →
          </Link>
        </div>

        {posts.length ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="group rounded-3xl border border-zinc-200/70 bg-white/70 p-5 transition hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:hover:bg-zinc-950"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{p.meta.title}</p>
                    {p.meta.description ? (
                      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{p.meta.description}</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">{p.meta.date}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Posts coming soon!
          </p>
        )}
      </section>
    </div>
  )
}
