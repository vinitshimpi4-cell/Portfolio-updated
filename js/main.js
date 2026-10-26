(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  $("#themeToggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- Mobile menu ---------- */
  var burger = $("#burger"), menu = $("#menu");
  function closeMenu() { menu.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", closeMenu); });

  /* ---------- Links from config ---------- */
  var ICONS = {
    linkedin: '<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>',
    github: '<svg viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 8l8-5.5V7H4v.5z M4 9.5V17h16V9.5l-8 5.5z"/></svg>'
  };
  function social(label, href, icon, external) {
    var a = document.createElement("a");
    a.className = "social"; a.href = href; a.setAttribute("aria-label", label);
    if (external) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    a.innerHTML = icon + "<span>" + label + "</span>";
    return a;
  }
  $$("[data-social-list]").forEach(function (box) {
    if (cfg.linkedin) box.appendChild(social("LinkedIn", cfg.linkedin, ICONS.linkedin, true));
    if (cfg.github) box.appendChild(social("GitHub", cfg.github, ICONS.github, true));
    if (cfg.email) box.appendChild(social("Email", "mailto:" + cfg.email, ICONS.mail, false));
  });
  var em = $("[data-email]"); if (em && cfg.email) { em.href = "mailto:" + cfg.email; em.textContent = cfg.email; }
  var ph = $("[data-phone]"); if (ph && cfg.phone) { ph.href = "tel:" + cfg.phone.replace(/\s+/g, ""); ph.textContent = cfg.phone; }
  var badge = $("[data-aws-badge]"); if (badge && cfg.awsBadge) { badge.href = cfg.awsBadge; badge.hidden = false; }
  var s3 = $('[data-project="s3"]'); if (s3 && cfg.projectLinks && cfg.projectLinks.s3) { s3.href = cfg.projectLinks.s3; s3.hidden = false; }
  if (cfg.github) {
    var more = $("[data-github-more]"); more.hidden = false; $("[data-github]", more).href = cfg.github;
  }

  /* ---------- Typing effect ---------- */
  var phrases = ["AWS DevOps Support Engineer", "Cloud Computing", "Linux · Docker · CI/CD", "Secure, scalable AWS architectures"];
  var typed = $("#typed"), pi = 0, ci = 0, del = false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { typed.textContent = phrases[0]; }
  else (function tick() {
    var p = phrases[pi];
    typed.textContent = p.slice(0, ci);
    if (!del && ci === p.length) { del = true; return setTimeout(tick, 1600); }
    if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    ci += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();

  /* ---------- Scroll: progress, nav, to-top, active link ---------- */
  var nav = $("#nav"), prog = $("#progress"), toTop = $("#toTop");
  var links = $$(".menu a"), sections = links.map(function (a) { return $(a.getAttribute("href")); });
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    nav.classList.toggle("scrolled", y > 20);
    toTop.classList.toggle("show", y > 600);
    var cur = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop - 140 <= y) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle("active", i === cur); });
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- Reveal + counters ---------- */
  function count(el) {
    var target = +el.dataset.count, suf = el.dataset.suffix || "", t0 = null;
    (function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        $$("[data-count]", e.target).forEach(count);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    $$("[data-count]").forEach(count);
  }

  /* ---------- Skill filters ---------- */
  var filters = $$(".filter"), cards = $$(".skill");
  filters.forEach(function (b) {
    b.addEventListener("click", function () {
      filters.forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      var f = b.dataset.filter;
      cards.forEach(function (c) {
        c.classList.toggle("hide", f !== "all" && c.dataset.cat.split(" ").indexOf(f) === -1);
      });
    });
  });

  /* ---------- Contact form (opens email client) ---------- */
  $("#contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var n = $("#cName").value.trim(), m = $("#cEmail").value.trim(), msg = $("#cMsg").value.trim(), err = $("#formError");
    if (!n || !m || !msg) { err.textContent = "Please fill in all fields."; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) { err.textContent = "Please enter a valid email address."; return; }
    err.textContent = "";
    var body = msg + "\n\n— " + n + " (" + m + ")";
    window.location.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent("Portfolio enquiry from " + n) + "&body=" + encodeURIComponent(body);
  });

  $("#year").textContent = new Date().getFullYear();
})();
