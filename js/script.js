// ==============================
// Services toggle (compat mode)
// Supports BOTH:
//  A) old:  .toggle button + previous sibling .more (display none/block)
//  B) new:  .service-card .service-toggle + .service-more (smooth height)
// ==============================

// ---- B) NEW (smooth) ----
document.querySelectorAll(".service-card").forEach((card) => {
  const btn = card.querySelector(".service-toggle");
  const more = card.querySelector(".service-more");
  const text = card.querySelector(".toggle-text");

  if (!btn || !more) return;

  // Make measurable
  more.hidden = false;

  const close = () => {
    btn.setAttribute("aria-expanded", "false");
    card.dataset.open = "false";
    more.style.height = "0px";
    more.style.opacity = "0";
    if (text) text.textContent = "Más información";
  };

  const open = () => {
    btn.setAttribute("aria-expanded", "true");
    card.dataset.open = "true";
    more.style.opacity = "1";
    more.style.height = more.scrollHeight + "px";
    if (text) text.textContent = "Menos información";
  };

  // Init closed unless already expanded
  const isOpen = btn.getAttribute("aria-expanded") === "true";
  if (isOpen) open(); else close();

  btn.addEventListener("click", () => {
    const opening = btn.getAttribute("aria-expanded") !== "true";
    if (opening) {
      more.style.height = "0px";
      more.style.opacity = "1";
      requestAnimationFrame(open);
    } else {
      more.style.height = more.scrollHeight + "px";
      requestAnimationFrame(() => close());
    }
  });

  window.addEventListener("resize", () => {
    if (card.dataset.open === "true") {
      more.style.height = more.scrollHeight + "px";
    }
  });
});

// ---- A) OLD (your current system, but safer) ----
const toggles = document.querySelectorAll(".toggle");

toggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.previousElementSibling; // assumes .more is right before button
    if (!panel) return;

    const isOpen = getComputedStyle(panel).display === "block";

    // close all
    document.querySelectorAll(".more").forEach((m) => (m.style.display = "none"));
    toggles.forEach((t) => (t.textContent = "+ más información"));

    // toggle current
    panel.style.display = isOpen ? "none" : "block";
    btn.textContent = isOpen ? "+ más información" : "– menos";
  });
});

// ==============================
// FAQ accordion (if present)
// ==============================
document.querySelectorAll("[data-accordion] .acc-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
    const icon = btn.querySelector(".acc-icon");
    if (icon) icon.textContent = expanded ? "+" : "–";
  });
});

