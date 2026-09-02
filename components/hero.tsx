"use client"

import Image from "next/image"
import Link from "next/link"
import { useReducedMotion } from "motion/react"
import { TextEffect } from "@/components/motion-primitives/text-effect"
import { Magnetic } from "@/components/motion-primitives/magnetic"
import { siteData } from "@/lib/site"

function Line({
  children,
  delay,
  className,
  per = "word",
}: {
  children: string
  delay: number
  className?: string
  per?: "word" | "char"
}) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={className}>{children}</span>
  return (
    <TextEffect
      as="span"
      per={per}
      preset="fade-in-blur"
      delay={delay}
      speedReveal={1.4}
      className={className}
    >
      {children}
    </TextEffect>
  )
}

function Action({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string
  children: React.ReactNode
  variant?: "primary" | "ghost"
  external?: boolean
}) {
  const reduce = useReducedMotion()

  const el = (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={
        variant === "primary"
          ? "t-meta inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3.5 text-paper transition-opacity hover:opacity-90"
          : "t-meta inline-flex items-center gap-2 border border-rule-strong px-5 py-3.5 text-ink transition-colors hover:border-signal-bright hover:text-signal"
      }
      style={{ touchAction: "manipulation" }}
    >
      {children}
    </Link>
  )

  return reduce ? el : <Magnetic intensity={0.25} range={90}>{el}</Magnetic>
}

export function Hero() {
  return (
    <section className="pt-10 sm:pt-14">
      {/* The portrait sits in a narrow right column beside the headline so the
          whole hero clears a 720px-tall laptop viewport without scrolling. */}
      <div className="grid gap-10 lg:grid-cols-[1fr_17rem] lg:gap-14">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {/* leave the commented lines following as-is: */}
            {/* <p className="t-meta text-signal">Mauritius → United Kingdom</p> */}
            <p className="t-meta">AI &amp; Data Engineer</p>
            {/* <p className="t-meta text-signal">AI &amp; software</p> */}
          </div>

          {/* Below 360px the last line no longer fits on one line, and a single
              clamp can't serve both that and the narrow lg column. */}
          <h1 className="t-display mt-5 text-2xl min-[360px]:text-[clamp(1.5rem,4vw,3rem)]">
            <Line delay={0.05} className="block">
              Building AI systems
            </Line>
            <span className="block">
              <Line delay={0.35} per="char" className="marker">
                that earn trust
              </Line>
            </span>
            <Line delay={0.55} className="block">
              and hold up.
            </Line>
          </h1>

          <p className="t-prose mt-7 max-w-xl">
            Models are only as good as the context around them. I build the systems that find that context, connect the pieces and make AI outputs more grounded and traceable. I started in computer vision, where the same problem showed up in a different form: separating signal from noise.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Action href="/work">See the work</Action>
            <Action href="/contact" variant="ghost">
              Get in touch
            </Action>
          </div>
        </div>

        {/* Subject, framed and captioned. */}
        <figure className="frame frame-hover mx-auto w-full max-w-[17rem] p-2 lg:mx-0 lg:max-w-none lg:self-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-sunk">
            <Image
              src={siteData.branding.profile}
              alt={`${siteData.name}, portrait`}
              fill
              sizes="(max-width: 1024px) 272px, 272px"
              priority
              className="object-cover"
            />
          </div>
          <figcaption className="flex items-baseline justify-between gap-3 px-1 pb-1 pt-2.5">
            <span className="t-meta text-ink" translate="no">
              {siteData.name}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
