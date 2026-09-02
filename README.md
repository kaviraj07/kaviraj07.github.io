# Kaviraj Gosaye - Portfolio & Blog

A modern, fast portfolio website built with Next.js and deployed using GitHub Pages.  
Also includes a Markdown blog and light/dark theme toggle.

**Live site:** https://kaviraj07.github.io

---

## Tech Stack

- **Next.js (App Router)**: static export for GitHub Pages
- **React**
- **TypeScript**
- **Tailwind CSS v4**: configured CSS-first in `app/globals.css` (no `tailwind.config.ts`)
- **next-themes**: dark/light mode with system preference
- **Motion** + [motion-primitives](https://motion-primitives.com/docs): scroll reveals,
  text reveal, morphing project dialogs, border trail, reading progress

---

## Pages

| Route | What it holds |
| --- | --- |
| `/` | Hero, the work contact sheet, scholarship, toolkit, latest writing |
| `/work` | Projects and competitions together; cards open a detail dialog |
| `/projects`, `/competitions` | The same grid pre-filtered — kept as real URLs so filters are linkable |
| `/experience` | Roles, awards, publications |
| `/about` | Bio, education, toolkit |
| `/skills` | The toolkit on its own |
| `/blog` | Markdown posts from `content/blog` |
| `/contact` | Email and social links |

## Features

- **Markdown Blog** with reading-progress bar
- **Static Export** for GitHub Pages (`output: "export"`)
- **GitHub Actions deployment** (build → export → publish)
- Respects `prefers-reduced-motion` throughout; every animated section
  renders its content plainly when motion is reduced

## Design notes

- Content lives in `content/site.json`; `lib/work.ts` merges projects and
  competitions into one model with slugs used for deep links.
- Colour tokens come from the Okabe–Ito colour-blind-safe series, defined
  once in `app/globals.css` and swapped under `.dark`.
- Type: Archivo (display/UI, variable width axis), Newsreader (prose),
  JetBrains Mono (metadata). The font variables are set on `<html>` so
  `:root` can read them. The `KG` mark and `public/favicon.svg` are drawn
  from the same system — no raster logo.
- `components/motion-primitives/` holds copied motion-primitives sources.
  Local edits are marked with a `Local fix:` comment — React 19 type
  updates, an accessible name for the dialog trigger, and returning focus
  to the trigger on close.

---
## Resources

Icons from:
1. [Icons8](https://icons8.com/)
2. [UXWing](https://uxwing.com/)

Components from [motion-primitives](https://motion-primitives.com/docs) by
[@ibelick](https://github.com/ibelick) (MIT), copied into
`components/motion-primitives/`.