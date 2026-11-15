import { siteData } from "@/lib/site"

/**
 * The site mark: the monogram as a detected object — a box around the
 * initials with a blank label tab. On hover of its link (`group`) the box
 * tightens onto the letters, the same lock-on the hero plays on load.
 */
export function Mark() {
  return (
    <span aria-hidden className="relative inline-grid h-8 w-8 shrink-0 place-items-center">
      <span className="absolute inset-0 border-[1.5px] border-accent transition-[inset] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:inset-[3px]">
        <span className="absolute -left-[1.5px] bottom-full h-[5px] w-3 bg-accent" />
      </span>
      <span className="text-[0.8125rem] font-semibold leading-none tracking-[-0.02em] [font-stretch:80%]">
        {siteData.branding.monogram}
      </span>
    </span>
  )
}
