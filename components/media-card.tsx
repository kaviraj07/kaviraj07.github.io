import Image from "next/image"
import Link from "next/link"

export function MediaCard({
  title,
  description,
  image,
  links,
}: {
  title: string
  description: string
  image?: string | null
  links?: Array<{ label: string; href: string }>
}) {


  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-900/5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-white/10">
      {image ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-purple-500/10 via-white/60 to-white/60 dark:from-fuchsia-500/10 dark:via-zinc-950/40 dark:to-zinc-950/40">
          <div className="absolute inset-0 p-4 sm:p-6">
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain transition duration-300 group-hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* subtle shine */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-40 dark:from-black/30" />
        </div>
      ) : null}


      <div className="p-6">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{description}</p>

        {links?.length ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:text-zinc-50 dark:hover:bg-zinc-950"
              >
                {l.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
