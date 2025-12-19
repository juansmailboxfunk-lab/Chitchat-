/* ==================================================
   Desktop Services Modal
   ================================================== */

(function () {
  const isDesktop = () =>
    window.matchMedia("(min-width: 900px)").matches;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".service-toggle");
    if (!btn || !isDesktop()) return;

    e.preventDefault();

    const card = btn.closest(".service-card");
    const content = card.querySelector(".service-more");
    const title = card.querySelector("h3");

    if (!content || !title) return;

    openModal(title.innerText, content.innerHTML);
  });

  function openModal(title, html) {
    closeModal();

    const backdrop = document.createElement("div");
    backdrop.className = "services-modal-backdrop";

    const modal = document.createElement("div");
    modal.className = "services-modal";

    modal.innerHTML = `
      <button class="services-modal-close" aria-label="Cerrar">×</button>
      <h3>${title}</h3>
      ${html}
    `;

    document.body.append(backdrop, modal);

    backdrop.addEventListener("click", closeModal);
    modal.querySelector(".services-modal-close")
      .addEventListener("click", closeModal);

    document.addEventListener("keydown", escClose);
  }

  function closeModal() {
    document
      .querySelectorAll(".services-modal, .services-modal-backdrop")
      .forEach(el => el.remove());

    document.removeEventListener("keydown", escClose);
  }

  function escClose(e) {
    if (e.key === "Escape") closeModal();
  }
})();