import Image from "next/image"
import { Section } from "@/components/section"
import { RosIcon } from "@/components/ros-icon"
import { siteData } from "@/lib/site"

export const dynamic = "error"

export default function SkillsPage() {
  return (
    <div>
      <Section title="Skills" eyebrow="Stack">
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {siteData.skills.map((s) => (
            <div
              key={s.label}
              className="group flex items-center gap-4 p-5 rounded-3xl border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-900/5 transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-white/10"
            >

              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-950 dark:ring-white/10">
                {s.icon ? (
                  <Image
                    src={s.icon}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                ) : (
                  <RosIcon className="h-7 w-7 text-zinc-800 dark:text-zinc-100" />
                )}
              </div>
              <div>
                <p className="font-semibold">{s.label}</p>
                {/* <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Used in projects & coursework</p> */}
              </div>
            </div>
          ))
          }

        </div>
      </Section>
    </div>
  )
}
