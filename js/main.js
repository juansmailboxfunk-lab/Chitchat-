(function () {
  const yearEl = document.getElementById('year');
  const yearEnEl = document.getElementById('year-en');
  const currentYear = String(new Date().getFullYear());
  if (yearEl) yearEl.textContent = currentYear;
  if (yearEnEl) yearEnEl.textContent = currentYear;

  const langButtons = document.querySelectorAll('.lang-btn');
  const langNodes = document.querySelectorAll('[data-lang-content]');

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    langNodes.forEach((node) => {
      node.hidden = node.getAttribute('data-lang-content') !== lang;
    });
    langButtons.forEach((button) => {
      const isActive = button.getAttribute('data-lang') === lang;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  langButtons.forEach((button) => {
    button.addEventListener('click', function () {
      setLanguage(button.getAttribute('data-lang') || 'es');
    });
  });

  setLanguage('es');

  const modalTriggers = document.querySelectorAll('.service-more');
  const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
  let activeModal = null;
  let lastTrigger = null;

  function closeModal() {
    if (!activeModal) return;
    activeModal.hidden = true;
    activeModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastTrigger) lastTrigger.focus();
    activeModal = null;
    lastTrigger = null;
  }

  function openModal(modal, trigger) {
    activeModal = modal;
    lastTrigger = trigger;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const panel = modal.querySelector('.modal__panel');
    if (panel) panel.focus();
  }

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', function () {
      const modalId = trigger.getAttribute('data-modal');
      if (!modalId) return;
      const modal = document.getElementById(modalId);
      if (!modal) return;
      openModal(modal, trigger);
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
  });

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('[data-spy-section]');
  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const isMatch = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('is-active', isMatch);
        });
      });
    }, { rootMargin: '-35% 0px -45% 0px', threshold: 0.01 });

    sections.forEach((section) => observer.observe(section));
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
    });
  }
})();
