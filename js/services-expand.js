/* =========================================
   Chit Chat — Services UX Upgrade
   Requirements implemented:
   1) icons auto-linked to /images/*-s.png
   2) accordion fixes for last card
   3) when open, services section scrolls to middle of viewport
   4) click outside closes
   5) Esc closes (keyboard accessibility)
   6) subtle icon animation + dim + highlight
   + per-service gradient (via data-service)
   + deep-linkable URLs (#servicios-<slug>)
   ========================================= */

(() => {
  const ICONS = {
    estimulacion: "images/estimulacion-s.png",
    comunicacion: "images/comunicacion-s.png",
    articulacion: "images/articulacion-s.png",
    alimentacion: "images/alimentacion-s.png",
    neurodiversidad: "images/neurodiversidad-s.png",
    familias: "images/familias-s.png",
  };

  const SLUGS = [
    "estimulacion",
    "comunicacion",
    "articulacion",
    "alimentacion",
    "neurodiversidad",
    "familias",
  ];

  const desktop = () => window.matchMedia("(min-width: 920px)").matches;

  const cards = Array.from(document.querySelectorAll(".service-card"));
  if (!cards.length) return;

  // Find the services section/container for centering
  const servicesSection =
    document.getElementById("servicios") ||
    document.querySelector("section#servicios") ||
    document.querySelector("section.services") ||
    document.querySelector(".services") ||
    cards[0].closest("section") ||
    document.body;

  const grids = new Set(cards.map(c => c.closest(".services-grid")).filter(Boolean));

  const getToggle = (card) =>
    card.querySelector(".service-toggle") || card.querySelector(".toggle");

  const getPanel = (card) =>
    card.querySelector(".service-more") || card.querySelector(".more");

  const inferSlug = (card) => {
    // Prefer data-service if present
    const ds = card.getAttribute("data-service");
    if (ds && ICONS[ds]) return ds;

    const h = (card.querySelector("h3")?.textContent || "").toLowerCase();
    if (h.includes("estimulación") || h.includes("estimulacion")) return "estimulacion";
    if (h.includes("comunicación") || h.includes("comunicacion")) return "comunicacion";
    if (h.includes("articulación") || h.includes("articulacion") || h.includes("fonema") || h.includes("habla")) return "articulacion";
    if (h.includes("alimentación") || h.includes("alimentacion")) return "alimentacion";
    if (h.includes("neurodiversidad")) return "neurodiversidad";
    if (h.includes("familia")) return "familias";

    // fallback: first unused
    for (const s of SLUGS) {
      if (!cards.some(c => c !== card && c.getAttribute("data-service") === s)) return s;
    }
    return "comunicacion";
  };

  const ensureIcon = (card, slug) => {
    // find/create icon container
    let iconWrap =
      card.querySelector(".service-icon") ||
      card.querySelector(".service-top .service-icon") ||
      card.querySelector(".service-top") ||
      card.querySelector(".service-header") ||
      card;

    // If we picked a container that's not actually the icon holder, try to create one
    if (!card.querySelector(".service-icon")) {
      const wrap = document.createElement("div");
      wrap.className = "service-icon";
      // Place before heading if possible
      const h3 = card.querySelector("h3");
      if (h3 && h3.parentElement) {
        h3.parentElement.insertBefore(wrap, h3);
      } else {
        card.insertBefore(wrap, card.firstChild);
      }
      iconWrap = wrap;
    } else {
      iconWrap = card.querySelector(".service-icon");
    }

    // ensure image element
    let img = iconWrap.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      img.alt = card.querySelector("h3")?.textContent?.trim() || "Icono del servicio";
      iconWrap.appendChild(img);
    }
    img.src = ICONS[slug] || "";
    img.loading = "lazy";
    img.decoding = "async";
  };

  const setHash = (slugOrNull) => {
    const target = slugOrNull ? `#servicios-${slugOrNull}` : "#servicios";
    // pushState gives back-button support
    if (location.hash !== target) history.pushState(null, "", target);
  };

  const centerServicesInViewport = () => {
    // Center the SERVICES section vertically in the viewport
    const rect = servicesSection.getBoundingClientRect();
    const current = window.scrollY;
    const targetTop = current + rect.top;
    const desired = targetTop - (window.innerHeight / 2 - rect.height / 2);
    window.scrollTo({ top: Math.max(0, desired), behavior: "smooth" });
  };

  const closeCard = (card, { updateHash = true } = {}) => {
    card.classList.remove("is-open", "expanded", "align-right");
    card.dataset.open = "false";

    const btn = getToggle(card);
    if (btn) btn.setAttribute("aria-expanded", "false");

    const panel = getPanel(card);
    if (panel) {
      panel.hidden = true;
      panel.style.height = "0px";
      panel.style.opacity = "0";
    }

    // remove dim state if no open card remains in its grid
    const grid = card.closest(".services-grid");
    if (grid && !grid.querySelector(".service-card.is-open")) grid.classList.remove("has-open");

    if (updateHash && location.hash.startsWith("#servicios-")) setHash(null);
  };

  const closeAll = ({ updateHash = true } = {}) => {
    cards.forEach(c => closeCard(c, { updateHash: false }));
    grids.forEach(g => g.classList.remove("has-open"));
    if (updateHash && location.hash.startsWith("#servicios-")) setHash(null);
  };

  const openCard = (card, { fromHash = false } = {}) => {
    // accordion lock
    cards.forEach(c => { if (c !== card) closeCard(c, { updateHash: false }); });

    const slug = inferSlug(card);
    card.setAttribute("data-service", slug);

    // ensure icons always appear
    ensureIcon(card, slug);

    // open panel
    const panel = getPanel(card);
    if (panel) {
      panel.hidden = false;
      panel.style.opacity = "1";
      panel.style.height = "0px";
      requestAnimationFrame(() => {
        panel.style.height = panel.scrollHeight + "px";
      });
    }

    const btn = getToggle(card);
    if (btn) btn.setAttribute("aria-expanded", "true");

    // desktop horizontal expand + alignment
    if (desktop()) {
      card.classList.add("is-open");

      const grid = card.closest(".services-grid");
      if (grid) {
        grid.classList.add("has-open");
        const idx = Array.from(grid.children).indexOf(card);
        // In a 3-col layout: col 2/3 should expand to the right
        if ((idx % 3) !== 0) card.classList.add("align-right");
        else card.classList.remove("align-right");
      }
    } else {
      // still mark open for styling/logic
      card.classList.add("is-open");
      const grid = card.closest(".services-grid");
      if (grid) grid.classList.add("has-open");
    }

    // deep link
    if (!fromHash) setHash(slug);

    // center services section in viewport (fixes "last card" weirdness)
    setTimeout(() => centerServicesInViewport(), 150);
  };

  // ----- Setup: panels hidden by default + icons injected -----
  cards.forEach(card => {
    const slug = inferSlug(card);
    card.setAttribute("data-service", slug);
    ensureIcon(card, slug);

    const panel = getPanel(card);
    if (panel) {
      // Ensure hidden by default unless already open via HTML
      panel.hidden = true;
      panel.style.height = "0px";
      panel.style.opacity = "0";
      panel.style.overflow = "hidden";
      panel.style.transition = "height 280ms ease, opacity 220ms ease";
    }

    const btn = getToggle(card);
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
      // Make the toggle focusable for keyboard
      btn.setAttribute("type", btn.tagName.toLowerCase() === "button" ? "button" : btn.getAttribute("type") || "button");
    }
  });

  // ----- Event: click on toggle opens/closes -----
  cards.forEach(card => {
    const btn = getToggle(card);
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = card.classList.contains("is-open");
      if (isOpen) {
        closeCard(card);
      } else {
        openCard(card);
      }
    });
  });

  // ----- Click outside closes -----
  document.addEventListener("click", (e) => {
    if (!document.querySelector(".service-card.is-open")) return;
    if (e.target.closest(".service-card")) return;
    closeAll();
  });

  // ----- ESC closes (keyboard accessibility) -----
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });

  // ----- Hash deep linking (load + hashchange + back/forward) -----
  const openFromHash = () => {
    const h = (location.hash || "").toLowerCase();
    const match = h.match(/^#servicios-([a-z0-9\-]+)$/);
    if (!match) return;

    const slug = match[1];
    const card = cards.find(c => (c.getAttribute("data-service") || "") === slug) ||
                 cards.find(c => inferSlug(c) === slug);
    if (card) openCard(card, { fromHash: true });
  };

  window.addEventListener("hashchange", () => {
    if (location.hash.startsWith("#servicios-")) openFromHash();
    else closeAll({ updateHash: false });
  });

  window.addEventListener("popstate", () => {
    if (location.hash.startsWith("#servicios-")) openFromHash();
    else closeAll({ updateHash: false });
  });

  // On first load, honor hash
  if (location.hash.startsWith("#servicios-")) {
    setTimeout(openFromHash, 100);
  }

  // ----- Optional: remove "Ver servicios" & "Desliza" buttons in hero without touching content -----
  // (safe no-op if they don't exist)
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.querySelectorAll("a,button").forEach(el => {
      const t = (el.textContent || "").trim().toLowerCase();
      if (t === "ver servicios" || t === "desliza") el.remove();
    });
  }

})();
