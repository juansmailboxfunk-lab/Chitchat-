document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'chitchat-language';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const i18n = {
    es: {
      nav_home: 'Inicio',
      nav_services: 'Servicios',
      nav_about: 'Sobre',
      nav_faq: 'FAQ',
      nav_contact: 'Contacto',
      cta_book: 'Reserva una cita',
      heading_services: '¿Qué ofrecemos?',
      heading_about: 'Sobre Chit Chat',
      heading_contact: 'Contacto',
      heading_faq: 'Preguntas frecuentes',
      services_more: 'Más',
      modal_close: 'Cerrar'
    },
    en: {
      nav_home: 'Home',
      nav_services: 'Services',
      nav_about: 'About',
      nav_faq: 'FAQ',
      nav_contact: 'Contact',
      cta_book: 'Book an appointment',
      heading_services: 'What we offer',
      heading_about: 'About Chit Chat',
      heading_contact: 'Contact',
      heading_faq: 'Frequently Asked Questions',
      services_more: 'More',
      modal_close: 'Close'
    }
  };

  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const languageButtons = document.querySelectorAll('.lang-btn[data-lang]');
  const languageToggle = document.querySelector('.lang-toggle');
  const header = document.querySelector('.site-header');
  const spySections = document.querySelectorAll('section[data-spy-section][id]');
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
  let currentActiveId = '';

  const persistLanguage = (lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (_error) {
      // Ignore storage failures.
    }
  };

  const getInitialLanguage = () => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && Object.prototype.hasOwnProperty.call(i18n, saved)) return saved;
    } catch (_error) {
      // Ignore storage failures.
    }
    return 'es';
  };

  const applyLanguage = (lang) => {
    const nextLanguage = Object.prototype.hasOwnProperty.call(i18n, lang) ? lang : 'es';
    const dict = i18n[nextLanguage];

    document.documentElement.lang = nextLanguage;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      if (!key) return;
      const value = dict[key];
      if (value) element.textContent = value;
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
      const key = element.getAttribute('data-i18n-aria-label');
      if (!key) return;
      const value = dict[key];
      if (value) element.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-lang-content]').forEach((element) => {
      const contentLang = element.getAttribute('data-lang-content');
      element.hidden = contentLang !== nextLanguage;
    });

    document.querySelectorAll('.modal[data-modal-label-es][data-modal-label-en]').forEach((modal) => {
      const labelId =
        nextLanguage === 'en'
          ? modal.getAttribute('data-modal-label-en')
          : modal.getAttribute('data-modal-label-es');
      if (labelId) modal.setAttribute('aria-labelledby', labelId);
    });

    languageButtons.forEach((button) => {
      const isActive = button.getAttribute('data-lang') === nextLanguage;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    if (languageToggle) {
      languageToggle.setAttribute('data-lang', nextLanguage);
    }

    persistLanguage(nextLanguage);
  };

  const setActiveNavLink = (sectionId) => {
    if (!sectionId || sectionId === currentActiveId) return;
    currentActiveId = sectionId;

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const isActive = href === `#${sectionId}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const updateHeaderScrolledState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      setActiveNavLink(targetId.replace('#', ''));
      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  const initScrollSpy = () => {
    if (!spySections.length) return;

    const activateFromViewport = () => {
      const headerOffset = header ? header.offsetHeight + 24 : 98;
      let activeId = '';
      let bestTop = Number.POSITIVE_INFINITY;

      spySections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isInRange = rect.top <= headerOffset && rect.bottom > headerOffset;
        if (isInRange) {
          const proximity = Math.abs(rect.top - headerOffset);
          if (proximity < bestTop) {
            bestTop = proximity;
            activeId = section.id;
          }
        }
      });

      if (!activeId) {
        const firstVisible = Array.from(spySections).find((section) => section.getBoundingClientRect().top > 0);
        activeId = firstVisible ? firstVisible.id : spySections[spySections.length - 1].id;
      }

      setActiveNavLink(activeId);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visibleEntries.length) {
            setActiveNavLink(visibleEntries[0].target.id);
          } else {
            activateFromViewport();
          }
        },
        {
          root: null,
          rootMargin: '-35% 0px -55% 0px',
          threshold: [0.05, 0.2, 0.4, 0.6]
        }
      );

      spySections.forEach((section) => observer.observe(section));
    } else {
      let rafId = 0;
      const throttledSpy = () => {
        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
          activateFromViewport();
          rafId = 0;
        });
      };

      window.addEventListener('scroll', throttledSpy, { passive: true });
      window.addEventListener('resize', throttledSpy);
      activateFromViewport();
    }
  };

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

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextLanguage = button.getAttribute('data-lang');
      if (!nextLanguage) return;
      applyLanguage(nextLanguage);
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

  updateHeaderScrolledState();
  window.addEventListener('scroll', updateHeaderScrolledState, { passive: true });
  initScrollSpy();
  applyLanguage(getInitialLanguage());
});
