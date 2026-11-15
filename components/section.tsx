import { cn } from "@/lib/utils"

/** Page gutter. Every band uses this so the margin column lines up. */
export function Shell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[68rem] px-5 sm:px-8", className)}>
      {children}
    </div>
  )
}

/**
 * The layout's one rule: whatever labels a block sits in the margin,
 * whatever is read sits in the column. Below `md` the margin stacks on top.
 */
export function Row({
  margin,
  children,
  className,
  id,
  sticky = false,
  as: Tag = "div",
}: {
  margin?: React.ReactNode
  children: React.ReactNode
  className?: string
  id?: string
  /** Keep the margin in view while a long column scrolls past (md and up). */
  sticky?: boolean
  as?: "div" | "section" | "header" | "footer"
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "grid gap-x-12 gap-y-4 md:grid-cols-[12rem_minmax(0,1fr)]",
        className
      )}
    >
      <div
        className={cn(
          "min-w-0",
          // Clears the header while it is showing; see SiteHeader.
          sticky &&
            "md:sticky md:top-[calc(var(--header-offset,0px)+2rem)] md:self-start md:transition-[top] md:duration-300"
        )}
      >
        {margin}
      </div>
      <div className="min-w-0">{children}</div>
    </Tag>
  )
}

/** Top of every inner page. The eyebrow becomes the page's margin label. */
export function PageHeader({
  title,
  eyebrow,
  lede,
}: {
  title: string
  eyebrow: string
  lede?: string
}) {
  return (
    <Row
      as="header"
      className="pt-16 sm:pt-24"
      margin={<p className="t-small md:pt-[0.9rem]">{eyebrow}</p>}
    >
      <div>
        <h1 className="t-display text-[clamp(2.25rem,5vw,3.5rem)]">{title}</h1>
        {lede ? <p className="t-prose mt-6 text-lg">{lede}</p> : null}
      </div>
    </Row>
  )
}

/**
 * A titled band within a page. `action` sits under the title in the margin;
 * `note` sits further down it, on wide screens only.
 */
export function Section({
  title,
  action,
  note,
  children,
  className,
  id,
}: {
  title: string
  action?: React.ReactNode
  note?: React.ReactNode
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <Row
      as="section"
      id={id}
      sticky
      className={cn("mt-20 sm:mt-28", className)}
      margin={
        <div className="flex items-baseline justify-between gap-4 md:flex-col md:gap-1.5">
          <h2 className="text-lg font-medium tracking-tight">{title}</h2>
          {action ? <div className="t-small">{action}</div> : null}
          {note ? <div className="hidden md:mt-8 md:block md:w-full">{note}</div> : null}
        </div>
      }
    >
      {children}
    </Row>
  )
}
