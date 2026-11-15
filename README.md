# Kaviraj Gosaye — Portfolio & Blog

[![Deploy to GitHub Pages](https://github.com/kaviraj07/kaviraj07.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/kaviraj07/kaviraj07.github.io/actions/workflows/pages.yml)

My personal website: who I am, the projects and competitions I've worked on,
my experience and education, and a place for writing.

**Live site:** https://kaviraj07.github.io

## Tech stack

- **Next.js** (App Router), exported as a static site
- **React** and **TypeScript**
- **Tailwind CSS v4**, configured in `app/globals.css`
- **next-themes** for the light/dark toggle (dark by default)
- **Markdown** blog posts via gray-matter and remark
- **GitHub Pages**, deployed by GitHub Actions

## Engineering highlights

- **Content as data:** every page is generated from one typed JSON file
  (`content/site.json`) plus Markdown posts, so updating the site needs no
  code changes.
- **No server:** fully static output, so it loads fast and hosts for free on
  GitHub Pages.
- **Accessible by default:** keyboard navigation with visible focus,
  reduced-motion support, semantic landmarks, and colours checked against
  WCAG contrast ratios in both themes.
- **Considered interactions:** a contents list that tracks your scroll
  position, project rows that open in place, and a header that hides while
  reading and returns on scroll up.

- **Lighthouse (mobile, live site):**

  | Performance | Accessibility | Best Practices | SEO |
  | :---: | :---: | :---: | :---: |
  | 100 | 100 | 100 | 100 |

## CI/CD

The site builds, deploys and stays up to date without manual steps, all on
GitHub Actions:

- **Continuous deployment:** every push to `main` builds the static export
  and publishes it to GitHub Pages
  ([`pages.yml`](.github/workflows/pages.yml)).
- **Automated dependency updates:** Dependabot groups npm updates weekly and
  GitHub Actions updates monthly into single pull requests
  ([`dependabot.yml`](.github/dependabot.yml)).
- **Safe auto-merge:** a workflow approves Dependabot pull requests and
  squash-merges minor and patch updates automatically. Major version bumps
  are held for manual review
  ([`dependabot-automerge.yml`](.github/workflows/dependabot-automerge.yml)).

## Credits

- Icons from [Icons8](https://icons8.com/) and [UXWing](https://uxwing.com/).
- The reading-progress bar is adapted from
[motion-primitives](https://motion-primitives.com/docs) by
[@ibelick](https://github.com/ibelick) (MIT).
