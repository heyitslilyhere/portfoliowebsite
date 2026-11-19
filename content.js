/* ==========================================================================
   LILY McGANN — SITE CONTENT
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to change words, links, images,
   videos and notebook cards. Every image/video is just a file path inside
   the /media folder.

   EASIEST WAY TO SWAP MEDIA: keep the same file name and drop the new file
   into the same folder (e.g. replace media/home/home-video.mp4). No code
   changes needed. Or change the path below to point at a new file.
   ========================================================================== */

window.SITE = {

  // Bump this number after replacing any image or video (same file name) so every
  // browser and phone downloads the new version instead of an old saved copy.
  mediaVersion: "4",

  name: "Lily McGann",
  description: "Lily McGann is an integrated creative producer based in Sydney, with 10+ years across in-house and agency.",

  /* --------------------------------------------------------- HANDWRITING
     Lily's handwritten labels, used in the page headers, footers and the work
     pop-up arrows. Replace a PNG (same file name) to redraw a word; set a path
     to "" to fall back to typed text. All PNGs share one pen thickness, so
     they line up when shown at the same scale (--hw-scale in style.css).
  ------------------------------------------------------------------------ */
  handwriting: {
    work:     "media/handwriting/work.png",
    about:    "media/handwriting/about.png",
    "say-hi": "media/handwriting/say-hi.png",
    home:     "media/handwriting/home.png",
    name:     "media/handwriting/name.png",    // LILY McGANN, top right
    arrow:    "media/handwriting/arrow.png",   // drawn pointing right; flipped/rotated for ← and ↑
  },

  /* ---------------------------------------------------------------- HOME */
  home: {
    video:  "media/home/home-video.mp4",   // full-screen background video (MP4, 16:9, muted, loops)
    // Optional vertical (9:16, 1080x1920) version for phones. The 16:9 video has to be blown up
    // ~2.3x to fill a tall phone screen, which looks soft. Drop the file in and put its path here.
    videoMobile: "",
    poster: "media/home/home-poster.jpg",  // still frame shown while the video loads

    // The notebook card on top of the video.
    // Swap the picture by replacing media/notes/note-home.png
    // (export from Canva as a PNG with a transparent background, ideally 3x size).
    note: {
      image: "media/notes/note-home.png",
      alt:   "Lily McGann — Integrated Creative Producer",
      width:  "clamp(230px, 22vw, 400px)", // how big the card is on screen
      left:   "6.4vw",                      // distance from the left edge
      bottom: "13vh",                       // distance from the bottom edge
      rotate: "0deg",                       // tilt, e.g. "-2deg"
      // WORK / ABOUT / SAY HI are handwritten INTO the card picture, so each link is an invisible
      // button placed over its word (left/top/width/height as % of the card).
      // If you re-export the card and the words move, nudge these numbers.
      // Set hotspots to null to go back to typed links (then navTop/navRotate apply).
      hotspots: {
        work:     { left: "5%",  top: "78%", width: "24%", height: "18%" },
        about:    { left: "35%", top: "78%", width: "23.5%", height: "18%" },
        "say-hi": { left: "63%", top: "76%", width: "29%", height: "18%" },
      },
      navTop: "73%",
      navRotate: "-2.7deg",
    },
  },

  /* ---------------------------------------------------------------- WORK
     Each tile = one project. Add, remove or reorder freely.
       thumb : the image shown in the grid (any size; it's cropped to fit)
       video : the MP4 that plays in the pop-up when clicked
               (leave as "" if there's no video yet — the pop-up says "coming soon")
       social: OR a TikTok / Instagram post link (tiktok.com/@canva/video/… or
               instagram.com/p/…) — the pop-up plays it in that app's own player
       title / client / role : shown in the pop-up
  ------------------------------------------------------------------------ */
  work: [
    { thumb: "media/work/01.jpg", video: "media/work/01.mp4", title: "Paid Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/08.jpg", video: "media/work/08.mp4", title: "Canva Create 2026 Keynote", client: "Canva", role: "Motion Producer" },
    { thumb: "media/work/03.jpg", video: "media/work/03.mp4", title: "Paid Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/04.jpg", video: "media/work/04.mp4", title: "Happyfield x Canva Partnership · Paid Socials", client: "Canva", role: "Producer" },
    { thumb: "media/work/16.jpg", social: "https://www.tiktok.com/@canva/video/7488227195203161351", title: "Organic Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/06.jpg", social: "https://www.tiktok.com/@canva/video/7490699253078052104", title: "Organic Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/07.jpg", video: "media/work/07.mp4", title: "Paid Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/02.jpg", social: "https://www.tiktok.com/@canva/video/7389406778397641991", title: "Organic Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/09.jpg", video: "media/work/09.mp4", title: "Paid Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/10.jpg", social: "https://www.instagram.com/p/DJJlExzvDwo/", title: "Organic Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/11.jpg", social: "https://www.tiktok.com/@canva/video/7543871154147183928", title: "Organic Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/12.jpg", video: "media/work/12.mp4", title: "Paid Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/13.jpg", video: "media/work/13.mp4", title: "Paid Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/14.jpg", video: "media/work/14.mp4", title: "Paid Social", client: "Canva", role: "Producer" },
    { thumb: "media/work/15.jpg", social: "https://www.tiktok.com/@canva/video/7369487185151528208", title: "Organic Social", client: "Canva", role: "Producer" },
  ],

  /* --------------------------------------------------------------- ABOUT */
  about: {
    photo:    "media/about/about-photo.jpg",
    photoAlt: "Portrait of Lily McGann",
    // Notebook card. The handwritten "Hi! I'm Lily," is part of the picture;
    // the paragraphs below are typed on top of it.
    note: {
      image: "media/notes/note-about.png",
      textTop: "36%",       // where the typed paragraphs start (% down the card)
      textSize: "3.45cqw",  // text size relative to card width (bigger number = bigger text)
      textRotate: "-1deg",   // tilt of the typed text (negative = up to the right). The paper itself is ~0.3°; 1° makes the slope visible
    },
    paragraphs: [
      "I’m an integrated creative producer based in Sydney, with 10+ years across in-house and agency.",
      "I love making great work with great people. Whether it’s a complex event keynote, back-to-back shoots or a steady stream of organic and paid social, I’m happiest finding the smartest and most efficient way to get a brief out the door.",
    ],
  },

  /* -------------------------------------------------------------- SAY HI */
  sayHi: {
    // The handwritten "want to say hi?" is part of the picture; links are typed on top.
    note: {
      image: "media/notes/note-sayhi.png",
      textTop: "49%",
      textSize: "4.4cqw",
    },
    links: [
      { label: "lily.mcgann1@gmail.com",     href: "mailto:lily.mcgann1@gmail.com" },
      { label: "linkedin.com/in/lilymcgann", href: "https://www.linkedin.com/in/lilymcgann" },
    ],
  },
};
