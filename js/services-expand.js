// services-expand.js — Global overlay + inject image after “comunicación en el día a día”
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

  function injectImageAfterPhrase(containerEl) {
    const phrase = "comunicación en el día a día";
    const paragraphs = containerEl.querySelectorAll("p");

    for (const p of paragraphs) {
      const t = (p.textContent || "").toLowerCase();
      if (t.includes(phrase)) {
        const figure = document.createElement("figure");
        figure.className = "service-overlay-figure";

        const img = document.createElement("img");
        img.src = "images/estimulacion-temprana-info.png"; // must exist
        img.alt = "Estimulación temprana: atención conjunta, primeros gestos, comprensión del lenguaje y juego en familia";
        img.loading = "lazy";

        figure.appendChild(img);
        p.insertAdjacentElement("afterend", figure);
        break;
      }
    }
  }

  function openOverlay(card) {
    const title = card.querySelector("h3")?.textContent?.trim() || "";
    const more = card.querySelector(".service-more");
    const moreHtml = more && more.innerHTML.trim()
      ? more.innerHTML
      : "<p>No hay más información disponible.</p>";

    // Reset other buttons
    document.querySelectorAll(".service-toggle[aria-expanded='true']").forEach(btn => {
      setBtnOpenState(btn, false);
    });

    activeBtn = card.querySelector(".service-toggle");
    setBtnOpenState(activeBtn, true);

    overlayContent.innerHTML = `<h3>${title}</h3>${moreHtml}`;

    // Inject image ONLY for Estimulación temprana card
    if (card.dataset.service === "estimulacion") {
      injectImageAfterPhrase(overlayContent);
    }

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
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeOverlay(); });
  document.addEventListener("keydown", (e) => { if (!overlay.hidden && e.key === "Escape") closeOverlay(); });
});




