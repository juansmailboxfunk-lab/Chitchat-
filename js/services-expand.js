// services-expand.js — Global overlay (no reflow) with button state update
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("serviceOverlay");
  const overlayClose = overlay?.querySelector(".service-overlay-close");
  const overlayContent = document.getElementById("serviceOverlayContent");

  if (!overlay || !overlayClose || !overlayContent) return;

  let activeCard = null;
  let activeBtn = null;

  function setBtnOpenState(btn, isOpen) {
    if (!btn) return;

    btn.setAttribute("aria-expanded", String(isOpen));

    const icon = btn.querySelector(".toggle-icon");
    const text = btn.querySelector(".toggle-text");

    if (icon) icon.textContent = isOpen ? "×" : "+";
    if (text) text.textContent = isOpen ? "Menos información" : "Más información";
  }

  function openOverlay(card) {
    const title = card.querySelector("h3")?.textContent?.trim() || "";
    const more = card.querySelector(".service-more");
    const moreHtml = more && more.innerHTML.trim()
      ? more.innerHTML
      : "<p>No hay más información disponible.</p>";

    // Track active
    activeCard = card;
    activeBtn = card.querySelector(".service-toggle");

    // Update button UI (close others first)
    document.querySelectorAll(".service-card .service-toggle[aria-expanded='true']").forEach((btn) => {
      setBtnOpenState(btn, false);
    });
    setBtnOpenState(activeBtn, true);

    overlayContent.innerHTML = `
      <h3>${title}</h3>
      ${moreHtml}
    `;

    overlay.hidden = false;
    document.body.style.overflow = "hidden";

    // Focus close button for accessibility
    overlayClose.focus();
  }

  function closeOverlay() {
    overlay.hidden = true;
    overlayContent.innerHTML = "";
    document.body.style.overflow = "";

    // Reset active button
    setBtnOpenState(activeBtn, false);

    // Restore focus to the button that opened it
    if (activeBtn) activeBtn.focus();

    activeCard = null;
    activeBtn = null;
  }

  // Bind buttons
  document.querySelectorAll(".service-card").forEach((card) => {
    const btn = card.querySelector(".service-toggle");
    if (!btn) return;

    // Ensure baseline state
    btn.setAttribute("aria-expanded", "false");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // If clicking the same card while open, close
      const isOpen = !overlay.hidden && activeCard === card;
      if (isOpen) closeOverlay();
      else openOverlay(card);
    });
  });

  // Close handlers
  overlayClose.addEventListener("click", (e) => {
    e.preventDefault();
    closeOverlay();
  });

  overlay.addEventListener("click", (e) => {
    // click outside the card closes
    if (e.target === overlay) closeOverlay();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.hidden && e.key === "Escape") closeOverlay();
  });
});


