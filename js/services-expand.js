// services-expand.js — simple inline expand/collapse (no modal, no overlay)
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");

  cards.forEach((card) => {
    const btn = card.querySelector(".service-toggle");
    const more = card.querySelector(".service-more");
    const icon = card.querySelector(".toggle-icon");
    const text = card.querySelector(".toggle-text");

    if (!btn || !more) return;

    // Ensure initial state
    more.hidden = true;
    btn.setAttribute("aria-expanded", "false");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // Close all others (optional but nice)
      cards.forEach((other) => {
        if (other === card) return;
        const ob = other.querySelector(".service-toggle");
        const om = other.querySelector(".service-more");
        const oi = other.querySelector(".toggle-icon");
        const ot = other.querySelector(".toggle-text");
        if (!ob || !om) return;

        ob.setAttribute("aria-expanded", "false");
        om.hidden = true;
        other.classList.remove("is-open");
        if (oi) oi.textContent = "+";
        if (ot) ot.textContent = "Más información";
      });

      // Toggle this one
      btn.setAttribute("aria-expanded", String(!isOpen));
      more.hidden = isOpen;
      card.classList.toggle("is-open", !isOpen);

      if (icon) icon.textContent = isOpen ? "+" : "×";
      if (text) text.textContent = isOpen ? "Más información" : "Menos información";
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const cards = [...document.querySelectorAll(".service-card")];

  function closeCard(card){
    const btn = card.querySelector(".service-toggle");
    const more = card.querySelector(".service-more");
    const icon = card.querySelector(".toggle-icon");
    const text = card.querySelector(".toggle-text");
    if (!btn || !more) return;

    btn.setAttribute("aria-expanded", "false");
    more.hidden = true;
    card.classList.remove("is-open");
    if (icon) icon.textContent = "+";
    if (text) text.textContent = "Más información";
  }

  function openCard(card){
    const btn = card.querySelector(".service-toggle");
    const more = card.querySelector(".service-more");
    const icon = card.querySelector(".toggle-icon");
    const text = card.querySelector(".toggle-text");
    if (!btn || !more) return;

    // close others
    cards.forEach(c => { if (c !== card) closeCard(c); });

    btn.setAttribute("aria-expanded", "true");
    more.hidden = false;
    card.classList.add("is-open");
    if (icon) icon.textContent = "×";
    if (text) text.textContent = "Menos información";
  }

  cards.forEach(card => {
    const btn = card.querySelector(".service-toggle");
    const more = card.querySelector(".service-more");
    if (!btn || !more) return;

    // init
    more.hidden = true;
    btn.setAttribute("aria-expanded", "false");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = btn.getAttribute("aria-expanded") === "true";
      if (isOpen) closeCard(card);
      else openCard(card);
    });

    // prevent clicks inside overlay from closing
    more.addEventListener("click", (e) => e.stopPropagation());
  });

  // click outside closes any open
  docume
