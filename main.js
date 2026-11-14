/* Builds each page from content.js. You shouldn't need to edit this file. */
(function () {
  "use strict";
  var S = window.SITE || {};

  // The site's built-in Cloudflare address (portfoliowebsite-1fw.pages.dev) can't be deleted,
  // so anyone who lands there is sent to the real domain, keeping the same page.
  if (location.hostname === "portfoliowebsite-1fw.pages.dev") {
    location.replace("https://lilymcgann.com" + location.pathname + location.search + location.hash);
    return;
  }
  var $ = function (sel) { return document.querySelector(sel); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }
  function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }

  // Page links are written as clean URLs (/work, /about…), which is how Cloudflare serves them.
  // When previewing from a folder on your computer, point them at the .html files instead.
  var isPreview = location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  if (isPreview) {
    document.querySelectorAll("a[data-page]").forEach(function (a) {
      a.setAttribute("href", (a.dataset.page || "index") + ".html");
    });
  }

  // Give a paper card the shape of its picture, so typed text lands in the right place.
  function setupPaper(card, note) {
    if (!card || !note) return;
    var img = card.querySelector(".paper__img");
    img.src = note.image;
    card.style.setProperty("--top", note.textTop || "35%");
    if (note.textRotate) card.style.setProperty("--rot", note.textRotate);
    if (note.textSize) card.style.setProperty("--fs", note.textSize);
    function fit() { if (img.naturalWidth) card.style.setProperty("--ar", img.naturalWidth / img.naturalHeight); }
    img.complete ? fit() : img.addEventListener("load", fit);
  }

  document.querySelectorAll(".js-name").forEach(function (a) { a.textContent = S.name || "Lily McGann"; });

  /* ---- Handwriting: swap typed labels and arrows for Lily's drawn PNGs ---- */
  var HW = S.handwriting || {};
  // Each PNG is drawn at the same pen thickness, so size = its own pixels × one shared scale.
  function hwImage(src, alt, onSize) {
    var img = el("img", { class: "hw", src: src, alt: alt, decoding: "async" });
    function size() {
      if (!img.naturalWidth) return;
      img.style.setProperty("--nw", img.naturalWidth);   // style.css turns this into a width
      if (onSize) onSize(img);
    }
    img.complete ? size() : img.addEventListener("load", size);
    img.addEventListener("error", function () { img.replaceWith(document.createTextNode(alt)); });
    return img;
  }
  document.querySelectorAll("[data-hw]").forEach(function (n) {
    var src = HW[n.dataset.hw];
    if (!src) return;
    var word = n.textContent.trim();
    n.textContent = "";
    n.appendChild(hwImage(src, word));
    n.classList.add("has-hw");
  });
  document.querySelectorAll("[data-hw-arrow]").forEach(function (n) {
    if (!HW.arrow) return;
    var glyph = n.textContent;
    n.textContent = "";
    n.classList.add("hw-arrow", "hw-arrow--" + n.dataset.hwArrow);
    n.appendChild(hwImage(HW.arrow, "", function (img) {
      // ↑ is the → drawing turned 90°, so give its box the swapped width and height.
      if (n.dataset.hwArrow === "up") { n.style.setProperty("--aw", img.naturalWidth); n.style.setProperty("--ah", img.naturalHeight); }
    }));
    n.dataset.glyph = glyph;
  });

  /* ---- Home ---- */
  var video = $(".home__video");
  if (video) {
    var h = S.home || {};
    if (h.poster) video.poster = h.poster;
    if (h.video && !reduceMotion) { video.src = h.video; play(video); }
    var n = h.note || {};
    var card = $(".home__note");
    card.style.width = n.width || "clamp(230px, 22vw, 400px)";
    card.style.left = n.left || "6vw";
    card.style.bottom = n.bottom || "12vh";
    card.style.transform = "rotate(" + (n.rotate || "0deg") + ")";
    var cimg = card.querySelector("img");
    cimg.src = n.image; cimg.alt = n.alt || "";
    var nav = $(".home__nav");
    if (n.hotspots) {
      // The words are part of the picture: turn each link into an invisible button over its word.
      nav.classList.add("home__nav--hotspots");
      nav.querySelectorAll("a[data-page]").forEach(function (a) {
        var box = n.hotspots[a.dataset.page];
        if (!box) { a.hidden = true; return; }
        a.setAttribute("aria-label", a.dataset.text || a.textContent.trim());
        a.textContent = "";
        a.style.left = box.left; a.style.top = box.top; a.style.width = box.width; a.style.height = box.height;
      });
    } else {
      nav.style.top = n.navTop || "73%";
      if (n.navRotate) nav.style.transform = "rotate(" + n.navRotate + ")";
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) video.pause(); else if (!reduceMotion) play(video);
    });
  }

  /* ---- Work ---- */
  var grid = $("#work-grid");
  if (grid) {
    (S.work || []).forEach(function (w, i) {
      var label = [w.title, w.client].filter(Boolean).join(" — ");
      var btn = el("button", { class: "work-tile", type: "button", "aria-label": "Play " + (label || "project " + (i + 1)) }, [
        el("img", { src: w.thumb, alt: "", loading: i < 5 ? "eager" : "lazy", decoding: "async" })
      ]);
      btn.addEventListener("click", function () { openLightbox(i); });
      grid.appendChild(el("li", {}, [btn]));
    });
  }

  /* ---- About ---- */
  var photo = $("#about-photo");
  if (photo) {
    var a = S.about || {};
    photo.src = a.photo; photo.alt = a.photoAlt || "";
    setupPaper($("#about-note"), a.note);
    var at = $("#about-text");
    (a.paragraphs || []).forEach(function (t) { at.appendChild(el("p", { text: t })); });
  }

  /* ---- Say hi ---- */
  var sl = $("#sayhi-links");
  if (sl) {
    var s = S.sayHi || {};
    setupPaper($("#sayhi-note"), s.note);
    (s.links || []).forEach(function (l) {
      var attrs = { href: l.href, text: l.label };
      if (/^https?:/.test(l.href)) { attrs.target = "_blank"; attrs.rel = "noopener"; }
      sl.appendChild(el("a", attrs));
    });
  }

  /* ---- Video pop-up (Work page) ---- */
  var box = $("#lightbox");
  if (!box) return;
  var lv = box.querySelector(".lightbox__video"), frame = box.querySelector(".lightbox__frame"),
      soon = box.querySelector(".lightbox__soon"), cap = box.querySelector(".lightbox__caption");

  // Turns a TikTok or Instagram post link into its official embeddable player.
  function embedUrl(link) {
    var m = /tiktok\.com\/@[^/]+\/video\/(\d+)/.exec(link || "");
    if (m) return "https://www.tiktok.com/player/v1/" + m[1] + "?autoplay=1&rel=0&description=0&music_info=0";
    m = /instagram\.com\/(?:p|reel)\/([\w-]+)/.exec(link || "");
    if (m) return "https://www.instagram.com/p/" + m[1] + "/embed/";
    return "";
  }
  function clearEmbed() {
    var f = frame.querySelector(".lightbox__embed");
    if (f) f.remove();
    box.classList.remove("is-tall");
  }

  function showSoon(w) {
    lv.hidden = true; soon.hidden = false;
    soon.style.backgroundImage = w.thumb ? "url('" + w.thumb + "')" : "none";
  }
  var work = S.work || [], current = 0;
  function openLightbox(i) {
    current = (i + work.length) % work.length;   // wraps: → on the last tile goes to the first
    var w = work[current];
    lv.pause();
    cap.textContent = "";
    if (w.title) cap.appendChild(document.createTextNode(w.title));
    var meta = [w.client, w.role].filter(Boolean).join(" · ");
    if (meta) cap.appendChild(el("span", { text: (w.title ? " · " : "") + meta }));
    clearEmbed();
    soon.hidden = true; lv.hidden = false;
    var embed = embedUrl(w.social);
    if (embed) {
      lv.hidden = true; lv.removeAttribute("src");
      box.classList.add("is-tall");
      frame.appendChild(el("iframe", { class: "lightbox__embed", src: embed, title: w.title || "Social video",
        allow: "autoplay; encrypted-media; fullscreen; picture-in-picture", allowfullscreen: "" }));
    } else if (w.video) {
      lv.onerror = function () { showSoon(w); };
      lv.poster = w.thumb || "";
      lv.src = w.video;
      play(lv);
    } else { lv.removeAttribute("src"); showSoon(w); }
    if (!box.open) { if (box.showModal) box.showModal(); else box.setAttribute("open", ""); }
    // Focus the pop-up itself, not the Close button (otherwise browsers draw a focus box around "Close").
    box.focus({ preventScroll: true });
  }
  function closeLightbox() {
    lv.pause(); lv.removeAttribute("src"); lv.load(); clearEmbed();
    if (box.close) box.close(); else box.removeAttribute("open");
  }
  box.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  box.querySelector(".lightbox__nav--prev").addEventListener("click", function () { openLightbox(current - 1); });
  box.querySelector(".lightbox__nav--next").addEventListener("click", function () { openLightbox(current + 1); });
  // ← / → keys switch videos. Captured early so the video player doesn't use them to skip within the clip.
  window.addEventListener("keydown", function (e) {
    if (!box.open || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault(); e.stopPropagation();
      openLightbox(current + (e.key === "ArrowRight" ? 1 : -1));
    }
  }, true);
  box.addEventListener("click", function (e) { if (e.target === box) closeLightbox(); });
  box.addEventListener("cancel", function (e) { e.preventDefault(); closeLightbox(); });
})();
