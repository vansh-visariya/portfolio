# Portfolio Transformation Plan

Two goals:
1. **Static export** — migrate off Prisma/SQLite/API routes so the site builds with `output: 'export'` and deploys to GitHub Pages.
2. **Gamified experience** — rebuild the portfolio as an explorable game ("Neural Explorer") using the existing Three.js / React Three Fiber stack, with a classic non-game fallback.

---

## Phase 1 — Static Migration (remove server dependencies)

### 1.1 Replace the blog backend with static content

The only server-dependent feature is the blog (Prisma + SQLite + `/api/blogs` routes). Replace it with a build-time content layer.

**Create:**
- `src/content/blogs.ts` — typed array of blog posts (title, excerpt, content, date, readTime, tags as `string[]`, slug). Port the seed data currently embedded in `src/app/api/blogs/route.ts` and `prisma/seed.ts`.
  - *Optional upgrade later:* move to `content/blog/*.mdx` with `gray-matter` + `next-mdx-remote` if rich formatting is needed. Start with the TS module — zero new dependencies and the current content is plain text.
- `src/lib/blog.ts` — helpers: `getAllPosts()`, `getPostBySlug(slug)` (sorted by date, used by pages below).

**Modify:**
- `src/app/blog/page.tsx` — remove `'use client'` fetch-from-`/api/blogs` pattern (`useState`/`useEffect`). Render from `getAllPosts()` directly (server component reading static data at build time; keep Framer Motion pieces in a small client child component if needed). Change `tags: string` (JSON string) to `tags: string[]`.
- Add `src/app/blog/[slug]/page.tsx` — full post page with `generateStaticParams()` returning all slugs, so each post is pre-rendered to static HTML.

**Delete:**
- `src/app/api/` (both `blogs/route.ts` and `blogs/[id]/route.ts`) — API routes are unsupported in static export.
- `src/lib/prisma.ts`
- `prisma/` (schema, migrations, `dev.db`, `seed.js`, `seed.ts`)
- `src/generated/` (generated Prisma client + query engine binaries)
- `.env` `DATABASE_URL` entry (if present)

**Dependencies (use npm, not manual edits):**
- `npm uninstall prisma @prisma/client`
- Remove the `"seed"` script from `package.json` via the same cleanup commit.

### 1.2 Configure Next.js for static export

**Modify `next.config.ts`:**
```ts
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },   // next/image optimizer needs a server
  trailingSlash: true,             // emits folder/index.html → clean URLs on Pages
  // Only needed if served from https://<user>.github.io/<repo>/ :
  // basePath: isGithubPages ? '/portfolio' : '',
  // assetPrefix: isGithubPages ? '/portfolio/' : '',
};
```

> **Note on basePath:** the repo contains a `CNAME` file (`vanshvisariya.is-a.dev`), meaning the site is served from the domain root. In that case **no basePath/assetPrefix is required**. Keep the env-guarded version commented in case the custom domain is ever dropped.

**Verify nothing else breaks under export:**
- `src/app/layout.tsx`, `page.tsx`, `contact/page.tsx` — already static/client-only; no changes expected.
- `Scene3D.tsx`, `CursorEffect.tsx`, `LoadingScreen.tsx`, etc. — all `'use client'`; fine for export.
- Audit for any other `fetch('/api/...')` calls and remove them.

### 1.3 Local validation

- `npm run build` → confirm `out/` is produced with `index.html`, `blog/index.html`, `blog/<slug>/index.html`, `contact/index.html`.
- Smoke-test with a static server: `npx serve out`.

---

## Phase 2 — GitHub Pages Deployment

### 2.1 GitHub Actions workflow

**Create `.github/workflows/deploy.yml`:**
- Trigger: `push` to `main` + `workflow_dispatch`.
- Permissions: `contents: read`, `pages: write`, `id-token: write`.
- Jobs:
  1. **build**: checkout → `actions/setup-node@v4` (Node 20, npm cache) → `npm ci` → `npm run build` → add empty `.nojekyll` to `out/` (prevents Jekyll from ignoring `_next/`) → copy `CNAME` into `out/` → `actions/upload-pages-artifact@v3` with `path: out`.
  2. **deploy**: `actions/deploy-pages@v4`, environment `github-pages`.

### 2.2 Repository settings (manual, one-time)

- Settings → Pages → Source: **GitHub Actions**.
- Custom domain: `vanshvisariya.is-a.dev` (matches `CNAME`); enforce HTTPS.

### 2.3 Post-deploy checks

- All routes load directly (deep links like `/blog/<slug>/` work thanks to `trailingSlash`).
- Assets under `_next/` resolve (confirms `.nojekyll` worked).
- 3D scenes render; no 404s in console.

---

## Phase 3 — Game Design: "Neural Explorer"

### 3.1 Concept and why it fits

**You play a signal pulse traveling through a stylized 3D neural network.** The world is a dark space (matching the existing indigo/violet/cyan dark theme) containing five glowing **neuron clusters** — one per portfolio section. The player steers the pulse along synaptic pathways between clusters; approaching a cluster "activates" it, opening that section as an in-world overlay.

Why this concept:
- Directly extends the existing brand: the site already renders a neural-network-themed `Scene3D` with R3F — the game reuses that visual language and the installed stack (`three`, `@react-three/fiber`, `@react-three/drei`). No new heavyweight engine needed.
- "Signal exploring a brain" is a natural metaphor for an AI/ML engineer's portfolio (activations, attention, layers).
- Free-roam exploration with proximity-triggered content is simple to implement, performs well, and degrades gracefully (vs. physics-heavy or combat mechanics).

### 3.2 World map → portfolio mapping

| Zone (neuron cluster) | Visual identity | Content revealed on activation |
|---|---|---|
| **Input Layer — About** | Cyan cluster, entry point, player spawns here | Bio, tech-stack ticker (PyTorch, Transformers, LangChain…) |
| **Hidden Layer — Projects** | Indigo cluster with 3 orbiting nodes (one per project: Kaito-AI, Kaito-Model, etc.) | Project cards from `WorkSection` data; each orbiting node = one project, links to GitHub |
| **Attention Block — Skills** | Violet cluster with interlinked sub-nodes | The three `Capabilities` groups (AI/ML Engineering, Development, Research) |
| **Memory Bank — Blog** | Amber/teal cluster of "stored" nodes | Blog post list from `src/content/blogs.ts`; selecting one routes to `/blog/<slug>/` |
| **Output Layer — Contact** | Bright white/cyan terminal cluster | Contact links/form content from `contact/page.tsx` |

Progression: each activated zone fills a **"network trained: N/5"** HUD meter. Activating all five triggers a celebratory full-network pulse animation and reveals a "résumé/CV" easter-egg node. Progress persists in `localStorage`.


### 3.3 Controls and interaction design

| Input | Action |
|---|---|
| **Keyboard** | `WASD` / arrow keys — steer the pulse; `E` / `Enter` / `Space` — activate nearby cluster; `Esc` — close overlay; `M` — toggle map; `Tab` — cycle zones (accessibility shortcut, teleports focus) |
| **Mouse** | Click a cluster → pulse auto-pilots to it (click-to-move); drag — orbit camera; scroll — zoom (clamped) |
| **Touch** | Virtual joystick (bottom-left, via `@use-gesture/react`, already in `node_modules` as a drei dependency — verify, else add `nipplejs`); tap cluster — auto-pilot; pinch — zoom |

Interaction rules:
- Camera: smooth follow-cam behind the pulse (lerped), auto-frames a cluster when within activation radius.
- Proximity UI: cluster glows + label ("Press E — Projects") fades in within radius; activation opens a Framer Motion overlay panel rendered in DOM (not in-canvas) for crisp, selectable, SEO-visible text.
- A persistent minimal HUD: zone names, progress meter, "Skip to classic site" link, controls hint (dismissable, remembered in `localStorage`).

### 3.4 Fallback and accessibility

- **Classic mode is never removed.** The existing scrolling site (current `page.tsx` sections) moves to `/classic/` and remains fully functional. The game landing page shows a clear "Explore as a game / View classic site" choice on first visit (choice remembered, switchable any time from the HUD and nav).
- `prefers-reduced-motion` → default to classic mode; in-game animations minimized.
- No-WebGL / weak GPU (use `detect-gpu`, already installed as a drei dependency) → auto-redirect to classic mode with a notice.
- All overlay content is real DOM: semantic headings, focus-trapped dialogs, `aria-live` announcements ("Projects zone activated"), full keyboard operability (`Tab` zone-cycling means the game is completable without WASD).
- Blog posts and contact remain standalone crawlable routes (`/blog/`, `/blog/<slug>/`, `/contact/`) regardless of mode.

### 3.5 Performance for static hosting

- **Code-split the game:** load the game canvas via `next/dynamic` (`ssr: false`) only after the user picks "Explore" — classic visitors never download Three.js game code.
- Low-poly instanced geometry: clusters are `InstancedMesh` spheres + line segments (synapses); particle counts capped (~1–2k); no shadows; bloom via cheap emissive materials instead of postprocessing (or a single `EffectComposer` pass behind a quality toggle).
- Throttle rendering when idle; pause the render loop when the tab is hidden or an overlay is open.
- DPR clamp (`dpr={[1, 1.75]}`), `powerPreference: 'high-performance'`.
- Assets: no external textures/models needed (procedural geometry) → keeps the static bundle small; everything served from GitHub Pages CDN.
- Budget targets: < 350 KB gzipped JS for classic route; game chunk lazy-loaded; 60 fps desktop / 30 fps mobile.

---

## Phase 4 — Game Implementation

### 4.1 New files

```
src/
  app/
    page.tsx                     # rework: mode chooser + lazy game mount
    classic/page.tsx             # current homepage content moves here
  components/game/
    GameCanvas.tsx               # R3F <Canvas>, lighting, fog, perf settings
    Player.tsx                   # pulse mesh, movement state, follow camera
    World.tsx                    # synapse paths + cluster layout (data-driven)
    NeuronCluster.tsx            # one zone: glow, label, activation radius
    ZoneOverlay.tsx              # DOM overlay shell (focus trap, Esc, aria)
    overlays/
      AboutOverlay.tsx           # content reuse from hero/about section
      ProjectsOverlay.tsx        # reuses project data from WorkSection
      SkillsOverlay.tsx          # reuses groups data from Capabilities
      BlogOverlay.tsx            # lists posts from src/content/blogs.ts
      ContactOverlay.tsx         # contact links/form content
    HUD.tsx                      # progress meter, hints, classic-mode link
    TouchControls.tsx            # virtual joystick (touch only)
    useGameInput.ts              # keyboard/mouse/touch → movement vector
    useGameProgress.ts           # zones visited, localStorage persistence
  content/
    blogs.ts                     # (from Phase 1)
    zones.ts                     # zone definitions: id, position, color, label
```

### 4.2 Modified files

- `src/app/page.tsx` — becomes the mode-choice landing + dynamic game import; sections it currently renders move to `classic/page.tsx`.
- `src/components/WorkSection.tsx` / `Capabilities.tsx` — extract their hardcoded `projects` / `groups` arrays into `src/content/projects.ts` and `src/content/skills.ts` so classic sections and game overlays share one source of truth.
- `src/components/Navigation.tsx` — add Game/Classic mode switch; ensure links work from both modes.
- `src/components/Scene3D.tsx` — keep for classic mode hero; game uses its own `GameCanvas` (avoid two simultaneous canvases).
- `src/app/globals.css` — HUD/overlay styles consistent with existing design tokens.

### 4.3 Implementation order

1. Extract shared content data (`projects.ts`, `skills.ts`, `zones.ts`).
2. Move current homepage to `/classic/`; new landing with mode chooser.
3. `GameCanvas` + `World` + `Player` with keyboard movement and follow camera.
4. Proximity detection + `NeuronCluster` activation states.
5. `ZoneOverlay` + the five content overlays (reusing shared data).
6. HUD, progress persistence, completion easter egg.
7. Mouse click-to-move, then touch joystick.
8. Accessibility pass: Tab-cycling, focus traps, reduced-motion, GPU detection fallback.

---

## Phase 5 — QA and Launch

1. **Build verification:** `npm run build` produces a clean `out/`; no API/Prisma references remain (search for `prisma` and `/api/`).
2. **Cross-browser/device:** Chrome, Firefox, Safari (incl. iOS), Android Chrome; verify touch joystick and WebGL fallback redirect.
3. **Accessibility:** keyboard-only full playthrough; screen-reader smoke test of overlays; Lighthouse a11y ≥ 95 on classic routes.
4. **Performance:** Lighthouse on classic route (game chunk must not load); FPS check on mid-range mobile; bundle analysis of the game chunk.
5. **Deploy:** push to `main` → Actions workflow → verify live site on `vanshvisariya.is-a.dev` (deep links, assets, both modes).
6. **Rollback plan:** Pages keeps the previous deployment; reverting the merge commit redeploys the prior build.

---

## Summary of removals vs. additions

| Removed / reworked | Replacement |
|---|---|
| `src/app/api/blogs/*` (GET/POST/PUT/DELETE) | Static `src/content/blogs.ts` + build-time rendering (no runtime mutations — editing posts = commit + redeploy) |
| `prisma/`, `src/lib/prisma.ts`, `src/generated/` | — (deleted) |
| `prisma`, `@prisma/client` deps, `seed` script | — (uninstalled) |
| Client-side `fetch('/api/blogs')` in `blog/page.tsx` | Server-component static rendering + `blog/[slug]` pages via `generateStaticParams` |
| Homepage as plain scroll site | Game mode (default-capable) + `/classic/` fallback preserving current experience |
| Vercel hosting | GitHub Pages via Actions (`output: 'export'`, `.nojekyll`, `CNAME`) |
