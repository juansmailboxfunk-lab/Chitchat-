document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("serviceOverlay");
  const overlayCard = overlay?.querySelector(".service-overlay-card");
  const overlayClose = overlay?.querySelector(".service-overlay-close");
  const overlayContent = document.getElementById("serviceOverlayContent");

  if (!overlay || !overlayClose || !overlayContent) return;

  function openOverlay(card){
    const title = card.querySelector("h3")?.textContent?.trim() || "";
    const more = card.querySelector(".service-more");

    // If .service-more doesn't exist or is empty, fail gracefully
    const moreHtml = more ? more.innerHTML : "<p>No hay más información disponible.</p>";

    overlayContent.innerHTML = `
      <h3>${title}</h3>
      ${moreHtml}
    `;

    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeOverlay(){
    overlay.hidden = true;
    overlayContent.innerHTML = "";
    document.body.style.overflow = "";
  }

  // Bind buttons
  document.querySelectorAll(".service-card").forEach(card => {
    const btn = card.querySelector(".service-toggle");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openOverlay(card);
    });
  });

  // Close handlers
  overlayClose.addEventListener("click", closeOverlay);

  overlay.addEventListener("click", (e) => {
    // click outside the card closes
    if (e.target === overlay) closeOverlay();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.hidden && e.key === "Escape") closeOverlay();
  });
});

