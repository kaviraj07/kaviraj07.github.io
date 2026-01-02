import { cn } from "@/components/cn"

export function Section({
  title,
  eyebrow,
  children,
  className,
}: {
  title: string
  eyebrow?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("py-12", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
        <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 opacity-60" />
      <div className="mt-6">{children}</div>
    </section>
  )
}
