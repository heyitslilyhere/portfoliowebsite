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

  name: "Lily McGann",
  description: "Lily McGann is an integrated creative producer based in Sydney, with 10+ years across in-house and agency.",

  /* ---------------------------------------------------------------- HOME */
  home: {
    video:  "media/home/home-video.mp4",   // full-screen background video (MP4, 16:9, muted, loops)
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
      navTop: "73%",                        // how far down the card the WORK / ABOUT / SAY HI links sit
      navRotate: "-2.7deg",                 // tilt of the links, matched to the slope of the handwriting
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
    { thumb: "media/work/01.jpg", video: "media/work/01.mp4", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/08.jpg", video: "media/work/08.mp4", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/03.jpg", video: "media/work/03.mp4", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/04.jpg", video: "media/work/04.mp4", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/05.jpg", social: "https://www.tiktok.com/@canva/video/7416626448011693330", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/06.jpg", social: "https://www.tiktok.com/@canva/video/7490699253078052104", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/07.jpg", video: "media/work/07.mp4", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/02.jpg", social: "https://www.tiktok.com/@canva/video/7389406778397641991", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/09.jpg", video: "media/work/09.mp4", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/10.jpg", social: "https://www.instagram.com/p/DJJlExzvDwo/", title: "Design Dares", client: "Canva", role: "Producer" },
    { thumb: "media/work/11.jpg", social: "https://www.tiktok.com/@canva/video/7543871154147183928", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/12.jpg", video: "media/work/12.mp4", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/13.jpg", video: "media/work/13.mp4", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/14.jpg", video: "media/work/14.mp4", title: "Project title", client: "Canva", role: "Producer" },
    { thumb: "media/work/15.jpg", social: "https://www.tiktok.com/@canva/video/7369487185151528208", title: "Project title", client: "Canva", role: "Producer" },
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
    },
    paragraphs: [
      "I'm an integrated creative producer based in Sydney, with 10+ years across in-house and agency.",
      "To put it simply, I love making great work with great people. Whether it's producing a complex event keynote, juggling multiple shoots at a time or delivering high-volumes of organic & paid social, I love finding interesting ways to bring briefs to life.",
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
