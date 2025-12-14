// CHIT CHAT interactions
// - Services: smooth open/close with label swap + accordion behaviour
// - FAQ accordion

// Services accordion
document.querySelectorAll(".service-card").forEach((card) => {
  const btn = card.querySelector(".service-toggle");
  const more = card.querySelector(".service-more");
  const text = card.querySelector(".toggle-text");

  if (!btn || !more) return;

  // Make measurable for height animation
  more.hidden = false;

  const closeCard = (c) => {
    const b = c.querySelector(".service-toggle");
    const m = c.querySelector(".service-more");
    const t = c.querySelector(".toggle-text");
    if (!b || !m) return;
    b.setAttribute("aria-expanded", "false");
    c.dataset.open = "false";
    m.style.height = "0px";
    m.style.opacity = "0";
    if (t) t.textContent = "Más información";
  };

  const openCard = (c) => {
    const b = c.querySelector(".service-toggle");
    const m = c.querySelector(".service-more");
    const t = c.querySelector(".toggle-text");
    if (!b || !m) return;
    b.setAttribute("aria-expanded", "true");
    c.dataset.open = "true";
    m.style.opacity = "1";
    m.style.height = m.scrollHeight + "px";
    if (t) t.textContent = "Menos información";
  };

  // Init closed
  closeCard(card);

  btn.addEventListener("click", () => {
    const opening = btn.getAttribute("aria-expanded") !== "true";

    // Close others
    document.querySelectorAll(".service-card").forEach((other) => {
      if (other !== card) closeCard(other);
    });

    if (opening) {
      more.style.height = "0px";
      more.style.opacity = "1";
      requestAnimationFrame(() => openCard(card));
    } else {
      more.style.height = more.scrollHeight + "px";
      requestAnimationFrame(() => closeCard(card));
    }
  });

  window.addEventListener("resize", () => {
    if (card.dataset.open === "true") {
      more.style.height = more.scrollHeight + "px";
    }
  });
});

// FAQ accordion
document.querySelectorAll("[data-accordion] .acc-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    const expanded = btn.getAttribute("aria-expanded") === "true";

    // close others
    document.querySelectorAll("[data-accordion] .acc-btn").forEach((b) => {
      if (b !== btn) {
        b.setAttribute("aria-expanded", "false");
        const p = b.nextElementSibling;
        if (p) p.hidden = true;
        const i = b.querySelector(".acc-icon");
        if (i) i.textContent = "+";
      }
    });

    btn.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
    const icon = btn.querySelector(".acc-icon");
    if (icon) icon.textContent = expanded ? "+" : "–";
  });
});
