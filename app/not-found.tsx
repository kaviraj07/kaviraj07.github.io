import Link from "next/link"

export default function NotFound() {
  return (
    <div className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">404</h1>
      <p className="mt-3 text-zinc-700 dark:text-zinc-300">That page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-950"
      >
        Go home
      </Link>
    </div>
  )
}
