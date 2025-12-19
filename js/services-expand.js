// services-expand.js — Global overlay (with inline image injection)
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("serviceOverlay");
  const overlayClose = overlay?.querySelector(".service-overlay-close");
  const overlayContent = document.getElementById("serviceOverlayContent");

  if (!overlay || !overlayClose || !overlayContent) return;

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

    let html = more && more.innerHTML.trim()
      ? more.innerHTML
      : "<p>No hay más información disponible.</p>";

    // 🔽 INSERT IMAGE AFTER “comunicación en el día a día”
    if (
      title.toLowerCase().includes("estimulación") &&
      html.includes("comunicación en el día a día")
    ) {
      html = html.replace(
        /(comunicación en el día a día\.?<\/p>)/i,
        `$1
        <figure class="service-overlay-figure">
          <img
            src="images/estimulacion-temprana-info.png"
            alt="Estimulación temprana: atención conjunta, primeros gestos, comprensión del lenguaje y juego en familia"
            loading="lazy"
          />
        </figure>`
      );
    }

    // Reset other buttons
    document.querySelectorAll(".service-toggle[aria-expanded='true']").forEach(btn => {
      setBtnOpenState(btn, false);
    });

    activeBtn = card.querySelector(".service-toggle");
    setBtnOpenState(activeBtn, true);

    overlayContent.innerHTML = `
      <h3>${title}</h3>
      ${html}
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

  // Bind buttons
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



