# Euan Nicolas — portfolio

A split-screen portfolio built with Vite, React, and TypeScript.

- `/` — landing page. Drag the pink line toward a side to preview it, then let go near the edge to open it.
  Keyboard: focus the line, press the arrow keys to move it, then press Enter to open the side it favors.
  The two links at the bottom also work.
- `/developer` — projects, tools, and education.
- `/creative` — video, digital art, 3D art, graphics, and AI UGC, with a type filter, plus work experience. Each piece opens in a viewer.
- `/quick` — the resume, with working links. It also prints cleanly.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs ./dist
npm run preview    # test the production build
```

## Make it yours

Almost everything is in **`src/data/content.ts`**.

1. To update your resume, replace `public/resume.pdf` and the picture of it, `public/resume.png`.
   - If the layout changed, update the link positions in `src/pages/Quick.tsx`.
2. Add links to each project's `links` array, and a picture in `public/projects/` for its `preview`.
3. Add creative work to `works`.
   - Add images to `public/work/` and set `image: "/work/my-image.jpg"`. Keep each one under about 2000px.
   - For a video, set `video: vimeo(1234567890)` or `video: youtube("abc123")`. The image is its cover.
   - For a series, list the other images in `gallery`.
   - Set `aspect` to the width divided by the height, so the viewer opens at the right shape.
4. List the tools you use in `creativeTools`.

Also update the page title and description in `index.html`. For link previews on social media, add an image to `public/` and an `og:image` tag.

## Deploy

The site is static, so any static host works. All three configs below are already included.

**Render (static site)**

1. Push this folder to a GitHub repository.
2. In Render, choose New, then Blueprint, and select the repository. It reads `render.yaml`.
   Or choose New, then Static Site, with build command `npm ci && npm run build`, publish directory `dist`, and a rewrite rule from `/*` to `/index.html`.

**Vercel**

1. Import the repository in Vercel. It detects Vite automatically.
2. `vercel.json` sends every path to `index.html`, so pages like `/developer` work when opened directly.

**Netlify**: `public/_redirects` handles the same rewrite.

## Accessibility notes

- The landing seam is a keyboard slider (arrow keys, Home, End) and works by touch.
- Animations stop when the visitor's system asks for reduced motion.
- Every page has a skip link, visible focus styles, and its own title.
- Text meets contrast guidelines on both color themes.
