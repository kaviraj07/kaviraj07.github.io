import Image from "next/image"
import { RosIcon } from "@/components/ros-icon"
import { cn } from "@/lib/utils"
import { siteData } from "@/lib/site"

type Skill = (typeof siteData.skills)[number]

function Mark({ skill }: { skill: Skill }) {
  if (!skill.icon) return <RosIcon className="h-5 w-5 text-ink" />
  return (
    <Image
      src={skill.icon}
      alt=""
      width={24}
      height={24}
      className="h-5 w-5 object-contain"
    />
  )
}

/**
 * A plain hairline grid — no marquee. The tools are a reference list, not a
 * logo wall, so nothing here moves.
 */
export function ToolkitGrid({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-px border border-rule bg-rule",
        compact ? "sm:grid-cols-4 lg:grid-cols-6" : "sm:grid-cols-3 lg:grid-cols-4"
      )}
    >
      {siteData.skills.map((s) => (
        <li
          key={s.label}
          className={cn(
            "flex items-center gap-3 bg-raised transition-colors hover:bg-sunk",
            compact ? "px-4 py-3.5" : "px-5 py-4"
          )}
        >
          <Mark skill={s} />
          <span className="min-w-0 truncate text-sm font-medium" translate="no">
            {s.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
