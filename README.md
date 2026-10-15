# Aadesh Deshmukh — Portfolio

Personal portfolio site. Plain static HTML/CSS/JS — no build step, no dependencies.

## Structure

```
index.html          home: hero, about, featured projects, contact
projects.html       project gallery (opened from the "more..." card)
resume.html         printable resume with profile photo
css/style.css       all styles; theme tokens live in :root (light + dark)
js/data.js          content: email, links, projects, resume PDF, profile photo
js/site.js          shared interactions: cards, nav pill, cursor, theme, email copy
tools/covers.html   source for the project covers (one shared layout, a theme per project)
tools/render-covers.sh  renders the covers to assets/covers/*.webp
assets/             hero character: transparent webm + stacked-alpha mp4 (Safari, via WebGL); portrait, avatar
```

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Editing content

All shared content lives in `js/data.js`:

- **Projects** — the `PROJECTS` array. Each entry takes `title`, `tag`, `desc`, `stack`, `img`
  (cover image), `href` (code link), `demo` (YouTube video id, opens in a lightbox),
  and `featured: true` to show it on the home page.
- **Covers** — edit `tools/covers.html`, then with the local server running: `tools/render-covers.sh`.
- **Profile photo** — put it in `assets/` and set `SITE.profilePhoto = "assets/profile.jpg"`.
- **Resume PDF** — put it in `assets/` and set `SITE.resumePdf = "assets/resume.pdf"` to show the Download button.
- **About / resume text** — edit directly in `index.html` and `resume.html`.

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages) — publish the repo root as-is.
