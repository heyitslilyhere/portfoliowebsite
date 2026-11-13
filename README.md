# lilymcgann.com

A simple static website: no build step, no frameworks. Upload the folder to Cloudflare Pages and it works.

Four separate pages, at clean addresses on Cloudflare:

| Page | File | Address |
|---|---|---|
| Home | `index.html` | lilymcgann.com |
| Work | `work.html` | lilymcgann.com/work |
| About | `about.html` | lilymcgann.com/about |
| Say hi | `say-hi.html` | lilymcgann.com/say-hi |

```
*.html         page structure (no need to edit)
style.css      colours and layout
main.js        fills each page from content.js (no need to edit)
content.js     ← ALL words, links, images, videos and notebook cards live here
media/
  home/        home-video.mp4, home-poster.jpg
  notes/       note-home.png, note-about.png, note-sayhi.png   (the notebook cards)
  about/       about-photo.jpg
  work/        01.jpg … 15.jpg (grid thumbnails) + 01.mp4 … 15.mp4 (pop-up videos)
```

---

## Swapping images, videos and notebooks

**The easy way:** replace a file with a new one that has the **exact same name**, in the same folder. Nothing else needs to change.

| To change… | Replace this file | Tips |
|---|---|---|
| Home background video | `media/home/home-video.mp4` | 16:9 MP4, no sound needed (it plays muted). Keep it under 25 MB (see "Video sizes" below). |
| Still frame shown while it loads | `media/home/home-poster.jpg` | Ideally the first frame of the video. |
| Home notebook (name card) | `media/notes/note-home.png` | Leave the bottom third blank: the WORK / ABOUT / SAY HI links are added on top. |
| About notebook | `media/notes/note-about.png` | Just paper plus "Hi! I'm Lily,". The paragraphs are typed on top from `content.js`. |
| Say hi notebook | `media/notes/note-sayhi.png` | Just paper plus "want to say hi?". The links are typed on top. |
| About photo | `media/about/about-photo.jpg` | Portrait shape, about 4:5. |
| Work thumbnails | `media/work/01.jpg` … `15.jpg` | Any size; they're cropped to a wide 2:1 strip. 1200px wide looks crisp. |
| Work pop-up videos | `media/work/01.mp4` … `15.mp4` | If a video is missing, the pop-up shows "Video coming soon" instead. |

**Notebook PNG tips (from Canva):** Download → PNG → tick **Transparent background**, and set the size to 3× for crisp results on phones and Retina screens. If the handwriting moves, adjust `textTop` / `navTop` in `content.js` so the typed text sits in the right place.

**Using a different file name:** change the path in `content.js` instead, e.g. `video: "media/home/new-reel.mp4"`.

### Editing work projects
Open `content.js` and edit the `work:` list. Each line is one tile:

```js
{ thumb: "media/work/01.jpg", video: "media/work/01.mp4", title: "Design Dares", client: "Canva", role: "Producer" },
```

Add a line for a new tile, delete a line to remove one, or reorder lines to change the order. The grid adjusts automatically: 5 across on desktop, 3 on tablet and 2 on phone.

### Editing words and links
Also in `content.js`: the About paragraphs (`about.paragraphs`), the Say hi links (`sayHi.links`), and the name and page title at the top.

---

## Video sizes (important for Cloudflare)

Cloudflare Pages allows a maximum of **25 MB per file**. Ad masters are often 50–300 MB, so compress them first. With [ffmpeg](https://ffmpeg.org) installed (`brew install ffmpeg` on Mac):

```bash
# Pop-up video: 1080p, good quality, usually 5–15 MB for 15–30 s
ffmpeg -i "input.mp4" -vf "scale=-2:1080" -c:v libx264 -crf 24 -preset slow -c:a aac -b:a 128k -movflags +faststart media/work/01.mp4

# Thumbnail from 3 seconds into a video
ffmpeg -ss 3 -i "input.mp4" -frames:v 1 -vf "scale=1200:-2" -q:v 3 media/work/01.jpg

# Home background (no audio, smaller)
ffmpeg -i "reel.mp4" -vf "scale=-2:1080" -an -c:v libx264 -crf 26 -preset slow -movflags +faststart media/home/home-video.mp4
```

If the videos ever add up to more than about 500 MB, they can move to **Cloudflare R2** or **Stream**. You would then point the paths in `content.js` at those URLs, and nothing else changes.

---

## Putting it live on lilymcgann.com (Cloudflare Pages)

The domain is already on Cloudflare, so:

1. Log in at **dash.cloudflare.com** and go to **Workers & Pages → Create → Pages → Upload assets** (also called "Direct Upload").
2. Name the project `lilymcgann` and click **Create project**.
3. Drag in **the contents of this folder** (index.html, content.js, media/ and the rest, not the folder around them). Click **Deploy site**.
4. It's now live at `lilymcgann.pages.dev`. Check it there first.
5. In the project, open **Custom domains → Set up a custom domain**, enter `lilymcgann.com` and confirm. Cloudflare adds the DNS record for you. Repeat for `www.lilymcgann.com` if you want that too.
6. Within a few minutes, https://lilymcgann.com is live with HTTPS.

**To update later:** open the project → **Create new deployment** → drag the folder in again.

*(Optional, if you're comfortable with Git: put this folder in a GitHub repo and choose **Connect to Git** in step 1. Leave the build command empty and set the output directory to `/`. Every push then redeploys automatically.)*

## Previewing on your own computer
Double-clicking `index.html` works for a quick look, and the links between pages work locally too.
