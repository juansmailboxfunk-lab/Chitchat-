// Chit Chat — JS (services UX + contact inline + mobile nav)
(() => {
  const qs = (s, el=document) => el.querySelector(s);
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

  // Mobile nav
  const toggle = qs('.nav-toggle');
  const nav = qs('.nav');
  if (toggle && nav){
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.style.display = open ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
      nav.style.position = 'absolute';
      nav.style.right = '24px';
      nav.style.top = '64px';
      nav.style.padding = '14px';
      nav.style.background = 'rgba(255,255,255,.92)';
      nav.style.border = '1px solid rgba(17,24,39,.10)';
      nav.style.borderRadius = '16px';
      nav.style.boxShadow = '0 18px 50px rgba(17,24,39,.12)';
      nav.style.backdropFilter = 'blur(10px)';
    });
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target) && toggle.getAttribute('aria-expanded') === 'true'){
        toggle.setAttribute('aria-expanded','false');
        nav.style.display = 'none';
      }
    });
  }

  // ===== SERVICES (expand, dim, highlight, deep links, click outside, ESC, center scroll)
  const servicesSection = qs('#servicios');
  const grid = qs('#servicesGrid');
  const cards = qsa('.service-card', grid || document);

  const closeCard = (card) => {
    const btn = qs('.service-toggle', card);
    const panel = qs('.service-more', card);
    card.classList.remove('expanded','align-right');
    card.dataset.open = 'false';
    if (btn) btn.setAttribute('aria-expanded','false');
    if (btn) qs('.toggle-text', btn).textContent = 'Más información';
    if (panel){
      // animate close
      const h = panel.scrollHeight || 0;
      panel.hidden = false;
      panel.style.height = h + 'px';
      panel.style.opacity = '1';
      requestAnimationFrame(() => {
        panel.style.height = '0px';
        panel.style.opacity = '0';
      });
      const done = () => {
        panel.hidden = true;
        panel.removeEventListener('transitionend', done);
      };
      panel.addEventListener('transitionend', done);
    }
  };

  const openCard = (card) => {
    const btn = qs('.service-toggle', card);
    const panel = qs('.service-more', card);
    card.dataset.open = 'true';
    if (btn){
      btn.setAttribute('aria-expanded','true');
      qs('.toggle-text', btn).textContent = 'Menos información';
    }
    if (panel){
      panel.hidden = false;
      panel.style.opacity = '1';
      panel.style.height = '0px';
      requestAnimationFrame(() => {
        panel.style.height = panel.scrollHeight + 'px';
      });
    }

    // desktop horizontal expand
    const desktop = window.matchMedia('(min-width: 920px)').matches;
    if (desktop){
      card.classList.add('expanded');
      if (grid){
        grid.classList.add('has-expanded');
        const idx = Array.from(grid.children).indexOf(card);
        if ((idx % 3) !== 0) card.classList.add('align-right');
        else card.classList.remove('align-right');
      }
    } else {
      if (grid) grid.classList.remove('has-expanded');
    }

    // Deep link
    if (card.id){
      history.replaceState(null, '', '#' + card.id);
    }

    // Center services section in viewport
    if (servicesSection){
      const rect = servicesSection.getBoundingClientRect();
      const target = window.scrollY + rect.top - (window.innerHeight/2 - rect.height/2);
      window.scrollTo({ top: Math.max(target, 0), behavior: 'smooth' });
    }
  };

  const closeAll = (opts={updateHash:true}) => {
    cards.forEach(c => closeCard(c));
    if (grid) grid.classList.remove('has-expanded');
    if (opts.updateHash){
      // if we are on a services hash, keep #servicios; otherwise clear
      if (location.hash.startsWith('#servicios-')) {
        history.replaceState(null, '', '#servicios');
      }
    }
  };

  const openExclusive = (card) => {
    cards.forEach(c => { if (c !== card) closeCard(c); });
    openCard(card);
    if (grid) grid.classList.add('has-expanded');
  };

  cards.forEach(card => {
    const btn = qs('.service-toggle', card);
    const panel = qs('.service-more', card);
    // init closed
    card.dataset.open = 'false';
    if (panel){
      panel.hidden = true;
      panel.style.height = '0px';
      panel.style.opacity = '0';
    }
    if (btn){
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = card.dataset.open === 'true';
        if (isOpen){
          closeCard(card);
          if (grid) grid.classList.remove('has-expanded');
          history.replaceState(null, '', '#servicios');
        } else {
          openExclusive(card);
        }
      });
    }
  });

  // Click outside closes
  document.addEventListener('click', (e) => {
    if (!grid) return;
    if (!e.target.closest('.service-card') && grid.classList.contains('has-expanded')){
      closeAll({updateHash:true});
    }
  });

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      if (grid && grid.classList.contains('has-expanded')){
        closeAll({updateHash:true});
      }
    }
  });

  // Open from deep link on load
  const openFromHash = () => {
    const h = location.hash || '';
    if (h.startsWith('#servicios-')){
      const target = qs(h);
      if (target) openExclusive(target);
    }
  };
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  // Keep open panel height correct on resize
  window.addEventListener('resize', () => {
    const open = cards.find(c => c.dataset.open === 'true');
    if (!open) return;
    const panel = qs('.service-more', open);
    if (panel && !panel.hidden){
      panel.style.height = panel.scrollHeight + 'px';
    }
  });

  // ===== CONTACT (inline submit if contact.php returns JSON)
  const form = qs('#contactForm');
  const status = qs('#formStatus');
  if (form && status){
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      status.hidden = true;
      status.classList.remove('is-success','is-error');
      status.textContent = '';

      const btn = qs('button[type="submit"]', form);
      btn?.classList.remove('is-success');

      const data = new FormData(form);
      if ((data.get('company') || '').toString().trim()){
        status.hidden = false;
        status.classList.add('is-success');
        status.textContent = '¡Gracias! Mensaje enviado.';
        btn?.classList.add('is-success');
        form.reset();
        return;
      }

      try{
        const res = await fetch(form.action, { method:'POST', body: data, headers: { 'Accept': 'application/json' } });
        const ct = res.headers.get('content-type') || '';
        let payload = null;

        if (ct.includes('application/json')){
          payload = await res.json();
        } else {
          const txt = await res.text();
          payload = { ok: res.ok, message: txt && txt.length < 200 ? txt : null };
        }

        if (res.ok && (payload.ok !== false)){
          status.hidden = false;
          status.classList.add('is-success');
          status.textContent = payload.message || '¡Gracias! Te responderé lo antes posible.';
          btn?.classList.add('is-success');
          form.reset();
        } else {
          status.hidden = false;
          status.classList.add('is-error');
          status.textContent = payload.error || payload.message || 'No se pudo enviar. Inténtalo de nuevo en unos minutos.';
        }
      }catch(err){
        status.hidden = false;
        status.classList.add('is-error');
        status.textContent = 'Error de conexión. Inténtalo de nuevo.';
      }
    });
  }
})();
