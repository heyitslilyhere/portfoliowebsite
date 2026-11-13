/* Builds each page from content.js. You shouldn't need to edit this file. */
(function () {
  "use strict";
  var S = window.SITE || {};
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
    if (note.textSize) card.style.setProperty("--fs", note.textSize);
    function fit() { if (img.naturalWidth) card.style.setProperty("--ar", img.naturalWidth / img.naturalHeight); }
    img.complete ? fit() : img.addEventListener("load", fit);
  }

  document.querySelectorAll(".js-name").forEach(function (a) { a.textContent = S.name || "Lily McGann"; });

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
    $(".home__nav").style.top = n.navTop || "73%";
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
        el("img", { src: w.thumb, alt: "", loading: i < 5 ? "eager" : "lazy", decoding: "async" }),
        el("span", { class: "work-tile__label", text: w.title || "" })
      ]);
      btn.addEventListener("click", function () { openLightbox(w); });
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
  var lv = box.querySelector(".lightbox__video"),
      soon = box.querySelector(".lightbox__soon"), cap = box.querySelector(".lightbox__caption");

  function showSoon(w) {
    lv.hidden = true; soon.hidden = false;
    soon.style.backgroundImage = w.thumb ? "url('" + w.thumb + "')" : "none";
  }
  function openLightbox(w) {
    cap.textContent = "";
    if (w.title) cap.appendChild(document.createTextNode(w.title));
    var meta = [w.client, w.role].filter(Boolean).join(" · ");
    if (meta) cap.appendChild(el("span", { text: (w.title ? "  —  " : "") + meta }));
    soon.hidden = true; lv.hidden = false;
    if (w.video) {
      lv.onerror = function () { showSoon(w); };
      lv.poster = w.thumb || "";
      lv.src = w.video;
      play(lv);
    } else { lv.removeAttribute("src"); showSoon(w); }
    if (box.showModal) box.showModal(); else box.setAttribute("open", "");
  }
  function closeLightbox() {
    lv.pause(); lv.removeAttribute("src"); lv.load();
    if (box.close) box.close(); else box.removeAttribute("open");
  }
  box.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  box.addEventListener("click", function (e) { if (e.target === box) closeLightbox(); });
  box.addEventListener("cancel", function (e) { e.preventDefault(); closeLightbox(); });
})();
