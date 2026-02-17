document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloseSelectors = '[data-modal-close]';
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');
  let activeModal = null;
  let activeTrigger = null;
  let closeTimerId = null;

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  const getFocusableElements = (modal) =>
    Array.from(modal.querySelectorAll(focusableSelector)).filter((element) => !element.hasAttribute('hidden'));

  const closeModal = () => {
    if (!activeModal) return;

    const modalToClose = activeModal;
    modalToClose.classList.remove('is-open');

    const finalizeClose = () => {
      modalToClose.hidden = true;
      document.body.classList.remove('modal-open');
      if (activeTrigger) activeTrigger.focus();
      activeModal = null;
      activeTrigger = null;
      closeTimerId = null;
    };

    if (prefersReducedMotion) {
      finalizeClose();
      return;
    }

    closeTimerId = window.setTimeout(finalizeClose, 250);
  };

  const openModal = (modalId, triggerButton) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (closeTimerId) {
      window.clearTimeout(closeTimerId);
      closeTimerId = null;
    }

    if (activeModal && activeModal !== modal) {
      activeModal.hidden = true;
      activeModal.classList.remove('is-open');
    }

    activeModal = modal;
    activeTrigger = triggerButton;
    modal.hidden = false;
    document.body.classList.add('modal-open');

    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      const firstFocusable = getFocusableElements(modal)[0];
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        const panel = modal.querySelector('.modal__panel');
        if (panel) panel.focus();
      }
    });
  };

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      if (!modalId) return;
      openModal(modalId, trigger);
    });
  });

  document.addEventListener('click', (event) => {
    if (!activeModal) return;
    if (!(event.target instanceof Element)) return;
    if (event.target.closest(modalCloseSelectors)) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!activeModal) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key === 'Tab') {
      const focusable = getFocusableElements(activeModal);
      if (!focusable.length) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });
});
