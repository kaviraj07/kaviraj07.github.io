import Image from "next/image"
import Link from "next/link"
import { siteData } from "@/lib/site"
import { formatDate } from "@/lib/utils"
import { slugify } from "@/lib/work"

/** Staggered entrance index for the `.settle` keyframe in globals.css. */
const step = (i: number) => ({ "--i": i }) as React.CSSProperties

const role = siteData.work[0]
const msc = siteData.education[0]

/** The records the hero's claims rest on, drawn from the same content. */
const sources = [
  {
    title: `${role.role.split(" - ")[0]}, ${role.company}`,
    detail: formatDate(role.date),
    href: `/experience#${slugify(role.company)}`,
  },
  {
    // The MSc's specialism is what backs the computer-vision claim.
    title: msc.title,
    detail: msc.details.find((d) => /speciali[sz]ation/i.test(d)) ?? formatDate(msc.date),
    href: "/about#education",
  },
]

function Claim({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <span data-claim={n} className="claim">
      {children}
    </span>
  )
}

function Cite({ n }: { n: number }) {
  return (
    <a href={`#source-${n}`} data-cite={n} className="cite" aria-label={`Source ${n}`}>
      {n}
    </a>
  )
}

export function Hero() {
  return (
    // Same columns as <Row>, so from `md` up the portrait takes the margin and
    // the headline starts on the line every other page's content does. Below
    // `md` it can't stack like Row does: the headline sits beside a smaller
    // portrait and only the paragraph onwards spans the full width.
    <section className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-5 pt-12 sm:pt-20 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-x-12">
      <div className="settle relative aspect-[4/5] w-full self-start overflow-hidden rounded-md bg-surface md:row-span-2">
        <Image
          src={siteData.branding.profile}
          alt={`${siteData.name}, portrait`}
          fill
          sizes="(max-width: 768px) 88px, 192px"
          fetchPriority="high"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        {/* leave the commented lines following as-is: */}
        {/* <p className="t-meta text-signal">Mauritius → United Kingdom</p> */}
        {/* Leading trimmed so the letters, not the line box, sit level with
            the top of the portrait. */}
        <p className="settle t-small -mt-[0.1em] leading-none" style={step(1)}>
          AI &amp; Data Engineer
        </p>
        {/* <p className="t-meta text-signal">AI &amp; software</p> */}

        {/* Pulled left by roughly its side bearing so the stems line up with
            the eyebrow above. */}
        {/* Below `md` the size tracks the viewport so "Building AI systems"
            stays on one line beside the portrait down to ~360px phones. */}
        <h1 className="t-display -ml-[0.05em] mt-3 text-[clamp(1.375rem,6.9vw,1.75rem)] md:mt-5 md:text-[clamp(2rem,4.6vw,3.5rem)]">
          <span className="settle block" style={step(2)}>
            Building AI systems
          </span>
          <span className="settle block" style={step(3)}>
            that earn trust
          </span>
          <span className="settle block" style={step(4)}>
            and hold up.
          </span>
        </h1>
      </div>

      {/* The paragraph cites itself: each claim carries a marker pointing to
          the record behind it. Hovering either end lights up the other —
          see `.cites` in globals.css. */}
      <div className="col-span-2 min-w-0 md:col-span-1 md:col-start-2">
        <div className="cites mt-8 grid gap-x-12 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:grid-rows-[auto_1fr]">
          <p className="settle t-prose text-lg lg:col-start-1 lg:row-start-1" style={step(5)}>
            Models are only as good as the context around them. I build the systems that find that context, connect the pieces and make AI outputs <Claim n={1}>more grounded and traceable</Claim>.<Cite n={1} /> I started in <Claim n={2}>computer vision</Claim>,<Cite n={2} /> where the same problem showed up in a different form: separating signal from noise.
          </p>

          <ol
            className="settle order-last mt-10 space-y-5 border-t border-rule pt-5 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-1.5 lg:border-0 lg:pt-0"
            style={step(7)}
            aria-label="Sources"
          >
            {sources.map((s, i) => (
              <li key={s.href} id={`source-${i + 1}`} data-source={i + 1} className="source flex gap-3">
                <span className="t-small w-3 shrink-0 text-accent">{i + 1}</span>
                <Link href={s.href} className="t-small block transition-colors">
                  <span className="source-title block text-ink">{s.title}</span>
                  {s.detail}
                </Link>
              </li>
            ))}
          </ol>

          <div
            className="settle mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-start-1 lg:row-start-2"
            style={step(6)}
          >
            <Link href="/projects" className="btn">
              See the projects
            </Link>
            <Link href="/contact" className="link text-[0.9375rem] font-medium">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
