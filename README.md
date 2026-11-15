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
- **next-themes**: dark by default, with a light/dark toggle that remembers the choice
- **Motion** + [motion-primitives](https://motion-primitives.com/docs): the reading-progress
  bar on posts

---

## Pages

| Route | What it holds |
| --- | --- |
| `/` | Hero, projects index (rows open in place), scholarship, grouped toolkit, latest writing |
| `/projects` | Builds and competitions laid out in full, with a sticky contents list that tracks the reader |
| `/projects/builds`, `/projects/competitions` | The same page pre-filtered — real URLs so filters are linkable |
| `/experience` | Roles, awards, publications |
| `/about` | Bio, education, toolkit |
| `/skills` | The toolkit on its own |
| `/blog` | Markdown posts from `content/blog` |
| `/contact` | Email and social links |

## Features

- **Markdown Blog** with reading-progress bar
- **Static Export** for GitHub Pages (`output: "export"`)
- **GitHub Actions deployment** (build → export → publish)
- Respects `prefers-reduced-motion`: the hero entrance, header slide and
  hover boxes collapse to instant changes

## Design notes

- Content lives in `content/site.json`; `lib/work.ts` merges projects and
  competitions into one model with slugs used for deep links.
- Minimal layout with one rule: labels (section titles, page eyebrows,
  filters) sit in a narrow margin column, and everything meant to be read
  sits in the main column (`Row` in `components/section.tsx`). Below `md`
  the margin stacks on top.
- Signature: the detection box (`.detect` + `.tag` in `app/globals.css`),
  the way a vision model marks what it found. It appears in the `KG` mark
  and favicon, on the home work index preview, on work cards (on hover)
  and around the LinkedIn link on the contact page.
- The hero paragraph cites its own claims: numbered markers link to
  sources drawn from `site.json`, and hovering either end highlights both.
- Colour: cool paper, neutral ink and one deep green (mint in dark mode)
  reserved for annotation — boxes, citations, links and focus. Tokens are defined once
  in `app/globals.css` and swapped under `.dark`.
- Type: Instrument Sans only; its width axis gives the box labels a
  condensed voice. The font variable is set on `<html>` so `:root` can
  read it.
- Motion: one staggered hero entrance per page load; boxes lock on in
  response to hover. Nothing animates on scroll.
- `components/motion-primitives/` holds copied motion-primitives sources.
  Local edits are marked with a `Local fix:` comment.

---
## Resources

Icons from:
1. [Icons8](https://icons8.com/)
2. [UXWing](https://uxwing.com/)

Components from [motion-primitives](https://motion-primitives.com/docs) by
[@ibelick](https://github.com/ibelick) (MIT), copied into
`components/motion-primitives/`.