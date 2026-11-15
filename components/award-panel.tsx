/**
 * An award: what it was, then the recipient's own words. The quote's first
 * sentence is pulled up as the headline of the block; the rest follows at
 * reading size, so seven lines of display type don't outweigh the award.
 */
export function AwardPanel({
  title,
  body,
  quote,
}: {
  title: string
  body: string
  quote?: string
}) {
  const [lead, ...rest] = quote?.split(/(?<=[.!?])\s+/) ?? []

  return (
    <div>
      <h3 className="text-xl font-medium tracking-tight">{title}</h3>
      <p className="t-prose mt-2">{body}</p>

      {lead ? (
        <figure className="mt-10 border-l-2 border-accent pl-6 sm:pl-8">
          <blockquote>
            <p className="t-display max-w-[32rem] text-[clamp(1.625rem,3.4vw,2.5rem)] leading-[1.12]">
              &ldquo;{lead}
              {rest.length ? null : <>&rdquo;</>}
            </p>
            {rest.length ? (
              <p className="t-prose mt-5">
                {rest.join(" ")}&rdquo;
              </p>
            ) : null}
          </blockquote>
        </figure>
      ) : null}
    </div>
  )
}
