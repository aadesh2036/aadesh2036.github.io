# Aadesh Deshmukh — Portfolio

Personal portfolio site. Plain static HTML/CSS/JS — no build step, no dependencies.

## Structure

```
index.html          page markup (Home, About, Projects, Resume, Contact)
css/style.css       all styles; theme tokens live in :root (light + dark)
js/main.js          interactions: project cards, nav pill, cursor, theme toggle
assets/             hero video (webm + mp4), poster, portrait, mini avatar
```

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Editing content

- **Project cards** — edit the `PROJECTS` and `MORE` arrays at the top of `js/main.js`.
  Each entry takes `title`, `tag`, `img` (screenshot path, or `""` for the placeholder) and `href`.
- **Resume PDF** — drop the file in `assets/` and set `RESUME_PDF = "assets/resume.pdf"` in `js/main.js`
  to show the Download button.
- **Resume / About text** — edit directly in `index.html`.

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages) — publish the repo root as-is.
