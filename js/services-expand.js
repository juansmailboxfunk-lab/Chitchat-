// services-expand.js — Global overlay with image FIRST, text AFTER (all services)
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("serviceOverlay");
  const overlayClose = overlay?.querySelector(".service-overlay-close");
  const overlayContent = document.getElementById("serviceOverlayContent");

  if (!overlay || !overlayClose || !overlayContent) return;

  let activeBtn = null;

  // Map service → image
  const serviceImages = {
    estimulacion: "images/service-estimulacion-info.png",
    comunicacion: "images/service-comunicacion-info.png",
    articulacion: "images/service-articulacion-info.png",
    alimentacion: "images/service-alimentacion-info.png",
    neurodiversidad: "images/service-neurodiversidad-info.png",
    familias: "images/service-familias-info.png",
  };

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
    const serviceKey = card.dataset.service;

    const moreHtml = more && more.innerHTML.trim()
      ? more.innerHTML
      : "<p>No hay más información disponible.</p>";

    const imgSrc = serviceImages[serviceKey];

    // Reset other buttons
    document.querySelectorAll(".service-toggle[aria-expanded='true']").forEach(btn => {
      setBtnOpenState(btn, false);
    });

    activeBtn = card.querySelector(".service-toggle");
    setBtnOpenState(activeBtn, true);

    overlayContent.innerHTML = `
      <h3>${title}</h3>

      ${imgSrc ? `
        <figure class="service-overlay-figure">
          <img
            src="${imgSrc}"
            alt="${title}"
            loading="lazy"
          />
        </figure>
      ` : ""}

      <div class="service-overlay-text">
        ${moreHtml}
      </div>
    `;

    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    overlayClose.focus();
  }

  function closeOverlay() {
    overlay.hidden = true;
    overlayContent.innerHTML = "";
    document.body.style.overflow = "";
    setBtnOpenState(activeBtn, false);
    if (activeBtn) activeBtn.focus();
    activeBtn = null;
  }

  document.querySelectorAll(".service-card").forEach(card => {
    const btn = card.querySelector(".service-toggle");
    if (!btn) return;

    btn.setAttribute("aria-expanded", "false");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openOverlay(card);
    });
  });

  overlayClose.addEventListener("click", closeOverlay);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });
  document.addEventListener("keydown", (e) => {
    if (!overlay.hidden && e.key === "Escape") closeOverlay();
  });
});





