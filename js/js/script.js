// CHIT CHAT interactions
// - Services: smooth open/close + accordion lock + desktop widen + scroll into view + dim others
// - FAQ accordion
// - Inline contact form submit (AJAX) + friendly success/error + subtle animation

(() => {
  // ===== Services accordion =====
  const grid = document.querySelector(".services-grid");
  const cards = Array.from(document.querySelectorAll(".service-card"));

  const setExpandedClasses = (card) => {
    if (!grid) return;
    grid.classList.add("has-expanded");
    cards.forEach(c => {
      c.classList.toggle("expanded", c === card);
      c.classList.toggle("align-right", false);
    });

    // On 3-column desktop grids, make 3rd column expand left (align-right)
    const idx = cards.indexOf(card);
    if (idx >= 0) {
      const col = (idx % 3) + 1; // 1..3
      if (col === 3) card.classList.add("align-right");
    }
  };

  const clearExpandedClasses = () => {
    if (grid) grid.classList.remove("has-expanded");
    cards.forEach(c => {
      c.classList.remove("expanded", "align-right");
    });
  };

  const closeCard = (card) => {
    const btn = card.querySelector(".service-toggle");
    const more = card.querySelector(".service-more");
    const text = card.querySelector(".toggle-text");
    if (!btn || !more) return;

    btn.setAttribute("aria-expanded", "false");
    card.dataset.open = "false";
    more.style.height = "0px";
    more.style.opacity = "0";
    if (text) text.textContent = "Más información";
  };

  const openCard = (card) => {
    const btn = card.querySelector(".service-toggle");
    const more = card.querySelector(".service-more");
    const text = card.querySelector(".toggle-text");
    if (!btn || !more) return;

    btn.setAttribute("aria-expanded", "true");
    card.dataset.open = "true";
    more.style.height = more.scrollHeight + "px";
    more.style.opacity = "1";
    if (text) text.textContent = "Menos información";

    setExpandedClasses(card);

    // Auto-scroll into view so the expanded content is fully visible
    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  cards.forEach((card) => {
    const btn = card.querySelector(".service-toggle");
    const more = card.querySelector(".service-more");
    if (!btn || !more) return;

    // Make measurable for height animation (we control visibility with height/opacity)
    more.hidden = false;
    more.style.height = "0px";
    more.style.opacity = "0";
    card.dataset.open = "false";

    btn.addEventListener("click", () => {
      const isOpen = card.dataset.open === "true";

      // close others (accordion lock)
      cards.forEach((c) => {
        if (c !== card && c.dataset.open === "true") closeCard(c);
      });

      if (!isOpen) {
        // Ensure we measure the target height after any previous close
        requestAnimationFrame(() => openCard(card));
      } else {
        // Smooth close
        more.style.height = more.scrollHeight + "px";
        requestAnimationFrame(() => {
          closeCard(card);
          clearExpandedClasses();
        });
      }
    });

    // Keep height correct when resizing while open
    window.addEventListener("resize", () => {
      if (card.dataset.open === "true") {
        more.style.height = more.scrollHeight + "px";
      }
    });
  });

  // If nothing is open, ensure grid isn't dimming
  clearExpandedClasses();

  // ===== FAQ accordion =====
  document.querySelectorAll("[data-accordion] .acc-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const expanded = btn.getAttribute("aria-expanded") === "true";

      // close others
      document.querySelectorAll("[data-accordion] .acc-btn").forEach((b) => {
        if (b !== btn) {
          b.setAttribute("aria-expanded", "false");
          const p = b.nextElementSibling;
          if (p) p.hidden = true;
          const i = b.querySelector(".acc-icon");
          if (i) i.textContent = "+";
        }
      });

      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) panel.hidden = expanded;
      const icon = btn.querySelector(".acc-icon");
      if (icon) icon.textContent = expanded ? "+" : "×";
    });
  });

  // ===== Contact form (AJAX submit) =====
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");

  if (form && statusEl) {
    const submitBtn = form.querySelector('button[type="submit"]');

    const showStatus = (msg, type) => {
      statusEl.hidden = false;
      statusEl.className = "form-status " + type + " animate-in";

      const icon =
        type === "success" ? "✓" :
        type === "error" ? "!" : "…";

      statusEl.innerHTML = `<span class="status-icon" aria-hidden="true">${icon}</span>${msg}`;

      if (type === "error") statusEl.classList.add("animate-error");
    };

    const clearStatus = () => {
      statusEl.hidden = true;
      statusEl.className = "form-status";
      statusEl.textContent = "";
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearStatus();

      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const message = form.querySelector("#message");

      if (!name?.value.trim() || !email?.value.trim() || !message?.value.trim()) {
        showStatus("Por favor, completa nombre, email y mensaje.", "error");
        return;
      }

      if (submitBtn) {
        submitBtn.setAttribute("aria-busy", "true");
        submitBtn.disabled = true;
      }
      showStatus("Enviando…", "loading");

      try {
        const formData = new FormData(form);
        const res = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { "Accept": "text/plain" }
        });

        const text = (await res.text()).trim();

        if (res.ok && (text.toLowerCase().includes("ok") || text.toLowerCase().includes("success"))) {
          showStatus("¡Mensaje enviado! Te responderé lo antes posible.", "success");
          form.reset();
        } else if (res.ok) {
          // If PHP returns a friendly message, show it.
          showStatus(text || "¡Mensaje enviado! Te responderé lo antes posible.", "success");
          form.reset();
        } else {
          showStatus(text || "No se pudo enviar el mensaje. Inténtalo más tarde.", "error");
        }
      } catch (err) {
        showStatus("Error de conexión. Revisa tu internet y vuelve a intentarlo.", "error");
      } finally {
        if (submitBtn) {
          submitBtn.removeAttribute("aria-busy");
          submitBtn.disabled = false;
        }
      }
    });
  }
})();