import { siteData } from "@/lib/site"

/**
 * What each tool is for. A flat list of twelve names says nothing; grouped,
 * the same names describe a shape of work. Any skill added to site.json
 * without a group here still shows, under "Also".
 */
const GROUPS: Array<{ name: string; tools: string[] }> = [
  { name: "Languages", tools: ["Python", "Java", "C#"] },
  {
    name: "Machine learning",
    tools: ["PyTorch", "TensorFlow", "Keras", "Scikit-Learn", "MLflow"],
  },
  { name: "Vision & robotics", tools: ["OpenCV", "ROS"] },
  { name: "Data & tooling", tools: ["MySQL", "Git"] },
]

function grouped() {
  const known = new Set(siteData.skills.map((s) => s.label))
  const groups = GROUPS.map((g) => ({
    name: g.name,
    tools: g.tools.filter((t) => known.has(t)),
  }))
  const placed = new Set(groups.flatMap((g) => g.tools))
  const rest = [...known].filter((t) => !placed.has(t))
  if (rest.length) groups.push({ name: "Also", tools: rest })
  return groups.filter((g) => g.tools.length)
}

export function ToolkitGrid() {
  return (
    <dl className="divide-y divide-rule border-y border-rule">
      {grouped().map((g) => (
        <div
          key={g.name}
          className="grid gap-x-8 gap-y-3 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline"
        >
          <dt className="t-small">{g.name}</dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {g.tools.map((t) => (
                <li key={t} className="label" translate="no">
                  {t}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  )
}
