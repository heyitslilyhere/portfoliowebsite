# lilymcgann.com: project handoff

Portfolio website for **Lily McGann**, an integrated creative producer based in Sydney. It's a plain static site (HTML, CSS and vanilla JS, with no build step and no framework), hosted on **Cloudflare Pages**. It was rebuilt from a Canva layout.

Status as of 14 Nov 2026 (AEDT): **live at https://lilymcgann.com** (and www).

---

## 1. Where everything is

| Thing | Location |
|---|---|
| Local repo (source of truth) | `~/Desktop/portfoliowebsite` on Lily's MacBook |
| GitHub repo | https://github.com/heyitslilyhere/portfoliowebsite (branch `main`, pushed over HTTPS; token saved in the macOS keychain) |
| Cloudflare account | Lily's account, ID `ca43efdfdc93efacb323fabaa55f1fe9` |
| Pages project | `portfoliowebsite` (**Git-connected** to the repo above; preset None, no build command, output `/`) at https://portfoliowebsite-1fw.pages.dev |
| Custom domains | `lilymcgann.com` and `www.lilymcgann.com` on the `portfoliowebsite` project (re-attached at launch on 14 Nov 2026). The pages.dev address can't be deleted, so `main.js` redirects visitors from it to the same path on lilymcgann.com. |
| Raw video masters | `~/Desktop/Desktop/Canva/Canva Growth YT Videos/`: 59 Canva ad files, many in several aspect ratios (16x9, 9x16, 1x1, 4x5). Use the **16x9** versions. Most are 20–300 MB. |

The old Direct Upload project `lilymcgann` was deleted on 13 Nov 2026.

---

## 2. Deploying

Every push to `main` deploys automatically to lilymcgann.com: `git add -A && git commit -m "..." && git push`. Xcode Command Line Tools are installed, so git works; `gh` and Homebrew are not installed.

**Caching:** every `media/...` path gets `?v=<SITE.mediaVersion>` added by `main.js` (and the favicon links in the HTML carry `?v=3`). After replacing any media file with the same name, **bump `mediaVersion` in content.js** so phones and browsers fetch the new file instead of a saved copy. Separately, lilymcgann.com is a proxied Cloudflare zone, so its edge cache keeps `/media/*` files for up to an hour (`_headers`). After swapping a media file with the same name, either wait an hour or purge: Cloudflare → lilymcgann.com → Caching → Configuration → Purge Everything. (At launch the zone was still serving day-old low-res images until purged.)

---

## 3. Site structure

```
index.html      Home: full-screen looping video with the notebook "name card" on top
work.html       Work: grid of 15 tiles; clicking opens a video pop-up (<dialog>)
about.html      About: B&W photo + notebook card with bio paragraphs typed on top
say-hi.html     Say hi: notebook card with email + LinkedIn links typed on top
404.html        Not-found page (Cloudflare serves it automatically)
content.js      ← ALL copy, links and media paths (window.SITE). Edit this, not the HTML.
main.js         Fills each page from content.js. Each section is null-guarded, so one script serves every page.
style.css       All styles; colour/spacing tokens are in :root
_headers        Cloudflare headers (cache for /media/*, nosniff, referrer policy)
favicon-32.png / favicon-192.png / apple-touch-icon.png (Lily's drawn LILY oval), robots.txt, README.md (Lily-facing guide: swapping media + deploying)
media/
  home/   home-video.mp4 (1920x1080, 22.8 s, 13 MB, no audio), home-poster.jpg
  notes/  note-home.png, note-about.png, note-sayhi.png (transparent notebook cutouts)
  about/  about-photo.jpg
  work/   01.jpg … 15.jpg (thumbnails), 01–14 .mp4 work videos (TikTok/IG tiles use `social` links instead)
  handwriting/  work, about, say-hi, home, name (LILY McGANN), arrow — Lily's handwriting as transparent PNGs
```

**URLs:** pages are linked as clean paths (`/work`, `/about`, `/say-hi`, `/`), which is how Cloudflare Pages serves `work.html` and the others. Each link also has `data-page="work"` etc. When the site runs from `file://` or `localhost`, `main.js` rewrites those links to `work.html`, so local previews work too. All asset paths are relative, and every page sits at the root, so they resolve the same way everywhere.

---

## 4. Core requirement: everything is easy to swap

Lily wants **every image, video and notebook card to be replaceable without touching code**. Keep it that way:

- Swapping a file with the **same filename** must just work.
- All text and paths live in `content.js`, and the HTML stays a bare template.
- Notebook cards are **images**: the paper and the handwritten heading are exported from Canva. Body text, links and the home nav are **live HTML** laid on top, positioned by settings in `content.js`:
  - Home: `home.note.width`, `left`, `bottom`, `rotate`. Since 14 Nov 2026 the card PNG has WORK / ABOUT / SAY HI handwritten into it, so `home.note.hotspots` places an invisible link over each word (left/top/width/height as % of the card); hover swipes a pink highlighter (multiply blend). Set `hotspots: null` to fall back to typed links positioned by `navTop` / `navRotate`.
  - About / Say hi: `note.textTop` (where the text starts, as a % of card height) and `note.textSize` (text size in `cqw`, a fraction of the card's width, via container queries). Because of this, the text scales with the card and lands in the same place at every screen width, matching the Canva design.
  - If the text overflows (very narrow screens), the card grows: the image is drawn `object-fit: fill` behind an `aspect-ratio` box.
- Handwriting: header page names, LILY McGANN, footer words and all arrows are PNGs from `SITE.handwriting`. Elements are marked `data-hw="key"` / `data-hw-arrow="left|right|up"`; `main.js` swaps the typed text for the image (typed text stays as alt text and as the fallback). Every PNG is normalised to a 24px pen stroke, so they're sized by one shared `--hw-scale` in style.css (`--hw-k` per element to nudge). The arrow is drawn pointing right; ← flips it, ↑ rotates it. The pop-up arrows are the same PNG turned white with a CSS filter.
- Work tiles: `{ thumb, video | social, title, client, role }` objects in `SITE.work`. `social` is a TikTok/Instagram post URL; the pop-up embeds that platform's player in a tall 9:16 frame. A missing or broken video makes the pop-up show the thumbnail with "Video coming soon".

---

## 5. Design spec (from the Canva layout, 1366×768 frames)

- Page background `#f8f7fd` (soft lavender-white). Ink `#1d1d1f`.
- Labels: 13px uppercase Helvetica Neue/Arial. Header has "LILY MCGANN" on the left (links home) and the page name on the right, both handwritten. Footer has ← previous on the left and next → on the right.
- Footer links: Work (← Home, Say hi →); About (← Work, Say hi →); Say hi (← About, Home ↑).
- Home: video `object-fit: cover`, full `100svh`. The notebook card sits bottom-left (about 22vw wide, 6.4vw from the left, 13vh from the bottom). Nav is bold Arial, about 0.82vw.
- Work grid: 5 columns, tiles **2:1**, gap about 21px, running edge to edge (no side gutter). 3 columns under 1100px, 2 columns under 720px (labels always visible on phones).
- About: photo about 16vw wide (ratio 219:272) next to the note (about 28vw). They stack on phones.
- Say hi: note centred, rotated 0.6°.
- Respects `prefers-reduced-motion`: the home video doesn't autoplay and the poster shows instead. The video also pauses while the tab is hidden.
- There are no web fonts on purpose. All handwriting is baked into the notebook PNGs. (Google Fonts was unreachable from the build sandbox, which is why the PNG approach was chosen. It also matches Canva exactly.)

---

## 6. What's still placeholder

| Item | Now | Needed |
|---|---|---|
| Work thumbnails `media/work/01–15.jpg` | 256×128 crops from a Canva screen recording (low-res) | 1200px-wide frames from the real videos |
| Work videos `media/work/01–15.mp4` | **Missing**, so the pop-up shows "coming soon" | Pick 15 from the masters folder, compress, drop in |
| Work titles / clients / roles in `content.js` | "Project title" / "Client" / "Producer" (tile 10 = "Design Dares") | Real info from Lily |
| About photo | 219×272 crop from the Canva recording | Original high-res photo |
| Notebook PNGs | Real Canva exports, but only about 300–390px wide | Re-export from Canva at 3× with a transparent background |
| Home video | ✅ Final (Lily's own edit) | Lily may re-edit; it's a drop-in replacement |

**Cloudflare Pages has a 25 MiB per-file limit.** Compress the masters before adding them:

```bash
# pop-up video
ffmpeg -i in.mp4 -vf "scale=-2:1080" -c:v libx264 -crf 24 -preset slow -c:a aac -b:a 128k -movflags +faststart media/work/01.mp4
# thumbnail
ffmpeg -ss 3 -i in.mp4 -frames:v 1 -vf "scale=1200:-2" -q:v 3 media/work/01.jpg
```

If the total media gets large (over about 500 MB), move videos to Cloudflare R2 or Stream and point the paths in `content.js` at those URLs.

---

## 7. Ideas not yet done (only if Lily asks)

- Muted hover previews on work tiles.
- Separate mobile (portrait) home video: supported via `home.videoMobile` in content.js (empty until Lily supplies a 9:16 1080x1920 export). The 16:9 video is upscaled ~2.3x on phones, which is why it looks soft there.
- A `www` → apex redirect (Cloudflare Redirect Rule or a second custom domain).
- A downloadable CV, or an Instagram link on Say hi.
- Web Analytics (free in Cloudflare; one toggle on the Pages project).

## 8. Testing checklist

- Desktop 1366×768 and iPhone-size: all four pages, footer and header links, and the home nav.
- Work pop-up: a real video plays; a missing one shows "coming soon"; Esc, the backdrop and the Close button all close it.
- About text sits below "Hi! I'm Lily," without overlapping, at every width.
- Opening `index.html` straight from the folder works, and links go to the `.html` files.
