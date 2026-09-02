import { withBasePath } from "@/lib/base-path"

/**
 * The icons in /public/Assets are full-colour gradient marks, which fight the
 * rest of the page and don't adapt to the theme. Painting them as a mask keeps
 * the silhouette and takes the colour from `currentColor` instead.
 */
export function SocialIcon({
  src,
  size = 16,
}: {
  src: string | null
  size?: number
}) {
  if (!src) return null

  const url = `url(${withBasePath(src)})`

  return (
    <span
      aria-hidden
      className="inline-block shrink-0 bg-current"
      style={{
        width: size,
        height: size,
        maskImage: url,
        WebkitMaskImage: url,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  )
}
