import { cn } from "@/lib/utils"

/** Page gutter. Every full-width band uses this so edges stay aligned. */
export function Shell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  )
}

/**
 * Top-of-page masthead. `meta` carries something true about the page —
 * a count, a date range, a venue — never a decorative number.
 */
export function PageHeader({
  title,
  eyebrow,
  meta,
  lede,
}: {
  title: string
  eyebrow: string
  meta?: string
  lede?: string
}) {
  return (
    <header className="pt-14 sm:pt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="t-meta text-signal">{eyebrow}</p>
        {meta ? <p className="t-meta">{meta}</p> : null}
      </div>
      <h1 className="t-display mt-4 text-[clamp(2.5rem,7vw,4.5rem)]">{title}</h1>
      <div className="mt-6 h-px bg-rule" />
      {lede ? <p className="t-prose mt-6 max-w-2xl">{lede}</p> : null}
    </header>
  )
}

/** Heading for a band within a page. */
export function SectionHeading({
  title,
  meta,
  action,
  className,
}: {
  title: string
  meta?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="flex items-baseline gap-4">
        <h2 className="t-display text-[clamp(1.5rem,3.2vw,2.125rem)]">{title}</h2>
        {meta ? <span className="t-meta">{meta}</span> : null}
      </div>
      {action}
    </div>
  )
}

/** Small inline link with the signal underline treatment. */
export function ArrowLink({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "t-meta inline-flex items-center gap-2 text-signal transition-colors hover:text-ink",
        className
      )}
    >
      {children}
      <span aria-hidden>→</span>
    </span>
  )
}
