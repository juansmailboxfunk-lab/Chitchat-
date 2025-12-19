
document.querySelectorAll('.service-card .toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.service-card');
    card.classList.toggle('expanded');
  });
});


// ===== SERVICES (center popout modal, deep links, click outside, ESC, focus trap)
  const servicesSection = document.querySelector('#servicios');
  const grid = document.querySelector('#servicesGrid');
  const cards = Array.from(document.querySelectorAll('.service-card'));

  // Create modal once
  const backdrop = document.createElement('div');
  backdrop.className = 'service-modal-backdrop';
  backdrop.id = 'serviceModalBackdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-hidden', 'true');

  backdrop.innerHTML = `
    <div class="service-modal" id="serviceModal" tabindex="-1">
      <button class="service-modal-close" type="button" aria-label="Cerrar">✕</button>
      <div class="service-modal-inner">
        <div class="service-modal-head">
          <div class="service-icon" id="serviceModalIcon"></div>
          <div>
            <h3 class="service-modal-title" id="serviceModalTitle"></h3>
            <p class="service-modal-lead" id="serviceModalLead"></p>
          </div>
        </div>
        <div class="service-modal-body" id="serviceModalBody"></div>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const modal = backdrop.querySelector('#serviceModal');
  const modalClose = backdrop.querySelector('.service-modal-close');
  const modalIcon = backdrop.querySelector('#serviceModalIcon');
  const modalTitle = backdrop.querySelector('#serviceModalTitle');
  const modalLead = backdrop.querySelector('#serviceModalLead');
  const modalBody = backdrop.querySelector('#serviceModalBody');

  let activeCard = null;
  let lastFocus = null;

  // Different glow per service
  const serviceGlows = {
    estimulacion: 'radial-gradient(circle at 20% 20%, rgba(250,204,21,.26), transparent 62%), radial-gradient(circle at 80% 30%, rgba(147,197,253,.18), transparent 62%)',
    comunicacion: 'radial-gradient(circle at 25% 20%, rgba(34,211,238,.20), transparent 62%), radial-gradient(circle at 80% 35%, rgba(251,113,133,.16), transparent 62%)',
    articulacion: 'radial-gradient(circle at 25% 20%, rgba(251,113,133,.20), transparent 62%), radial-gradient(circle at 80% 35%, rgba(250,204,21,.18), transparent 62%)',
    alimentacion: 'radial-gradient(circle at 25% 20%, rgba(74,222,128,.18), transparent 62%), radial-gradient(circle at 80% 35%, rgba(147,197,253,.16), transparent 62%)',
    neurodiversidad: 'radial-gradient(circle at 25% 20%, rgba(167,139,250,.18), transparent 62%), radial-gradient(circle at 80% 35%, rgba(34,211,238,.16), transparent 62%)',
    familias: 'radial-gradient(circle at 25% 20%, rgba(250,204,21,.20), transparent 62%), radial-gradient(circle at 80% 35%, rgba(251,113,133,.16), transparent 62%)'
  };

  const setHash = (id) => { if (id) history.replaceState(null, '', '#' + id); };
  const clearHashToServices = () => {
    if (location.hash && location.hash.startsWith('#servicios-')) {
      history.replaceState(null, '', '#servicios');
    }
  };

  const openModalFor = (card, {scrollToServices=true} = {}) => {
    if (!card) return;

    // Click again on active = close
    if (activeCard === card && backdrop.classList.contains('is-open')) {
      closeModal();
      return;
    }

    lastFocus = document.activeElement;
    activeCard = card;

    cards.forEach(c => c.classList.remove('is-active'));
    card.classList.add('is-active');

    // Set glow
    const key = card.getAttribute('data-service') || '';
    modal.style.setProperty('--modal-glow', serviceGlows[key] || serviceGlows.estimulacion);

    // Fill content from card
    const icon = card.querySelector('.service-icon');
    const title = card.querySelector('h3');
    const lead = card.querySelector('.service-preview');
    const more = card.querySelector('.service-more');

    modalIcon.innerHTML = icon ? icon.innerHTML : '';
    modalTitle.textContent = title ? title.textContent : '';
    modalLead.textContent = lead ? lead.textContent : '';
    modalBody.innerHTML = more ? more.innerHTML : '';

    // Open modal
    backdrop.classList.add('is-open');
    document.body.classList.add('modal-open');
    backdrop.setAttribute('aria-hidden', 'false');

    // Update toggle button state
    const btn = card.querySelector('.service-toggle');
    if (btn) {
      btn.setAttribute('aria-expanded', 'true');
      const t = btn.querySelector('.toggle-text');
      const i = btn.querySelector('.toggle-icon');
      if (t) t.textContent = 'Menos información';
      if (i) i.textContent = '×';
    }

    // Deep link
    if (card.id) setHash(card.id);

    // Keep SERVICES in the middle of the screen (context), without layout reflow
    if (scrollToServices && servicesSection) {
      const rect = servicesSection.getBoundingClientRect();
      const target = window.scrollY + rect.top - (window.innerHeight/2 - Math.min(rect.height, 420)/2);
      window.scrollTo({ top: Math.max(target, 0), behavior: 'smooth' });
    }

    // Focus close button
    setTimeout(() => modalClose.focus(), 0);
  };

  const closeModal = () => {
    if (!backdrop.classList.contains('is-open')) return;

    backdrop.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    backdrop.setAttribute('aria-hidden', 'true');

    if (activeCard) {
      const btn = activeCard.querySelector('.service-toggle');
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
        const t = btn.querySelector('.toggle-text');
        const i = btn.querySelector('.toggle-icon');
        if (t) t.textContent = 'Más información';
        if (i) i.textContent = '+';
      }
      activeCard.classList.remove('is-active');
    }

    activeCard = null;
    clearHashToServices();

    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  // Attach click handlers
  cards.forEach(card => {
    const btn = card.querySelector('.service-toggle');
    if (!btn) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModalFor(card);
    });

    // Clicking the open card background closes (as requested)
    card.addEventListener('click', (e) => {
      if (!backdrop.classList.contains('is-open')) return;
      if (activeCard === card) {
        // avoid closing when clicking the button itself (already handled)
        if (e.target.closest('.service-toggle')) return;
        closeModal();
      }
    });
  });

  // Click outside modal closes
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
  modalClose.addEventListener('click', closeModal);

  // ESC closes + focus trap
  document.addEventListener('keydown', (e) => {
    if (!backdrop.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = Array.from(modal.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Deep-link open on load/hash change
  const openFromHash = () => {
    const h = location.hash || '';
    if (h.startsWith('#servicios-')) {
      const target = document.querySelector(h);
      if (target) openModalFor(target, {scrollToServices:false});
    }
    if (h === '#servicios' && backdrop.classList.contains('is-open')) closeModal();
  };
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

