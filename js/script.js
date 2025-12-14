// CHIT CHAT interactions
// - Services: smooth open/close with label swap + accordion behaviour
// - FAQ accordion

// Services accordion
document.querySelectorAll(".service-card").forEach((card) => {
  const btn = card.querySelector(".service-toggle");
  const more = card.querySelector(".service-more");
  const text = card.querySelector(".toggle-text");

  if (!btn || !more) return;

  // Make measurable for height animation
  more.hidden = false;

  const closeCard = (c) => {
    const b = c.querySelector(".service-toggle");
    const m = c.querySelector(".service-more");
    const t = c.querySelector(".toggle-text");
    if (!b || !m) return;
    b.setAttribute("aria-expanded", "false");
    c.dataset.open = "false";
    m.style.height = "0px";
    m.style.opacity = "0";
    if (t) t.textContent = "Más información";
  };

  const openCard = (c) => {
    const b = c.querySelector(".service-toggle");
    const m = c.querySelector(".service-more");
    const t = c.querySelector(".toggle-text");
    if (!b || !m) return;
    b.setAttribute("aria-expanded", "true");
    c.dataset.open = "true";
    m.style.opacity = "1";
    m.style.height = m.scrollHeight + "px";
    if (t) t.textContent = "Menos información";
  };

  // Init closed
  closeCard(card);

  btn.addEventListener("click", () => {
    const opening = btn.getAttribute("aria-expanded") !== "true";

    // Close others
    document.querySelectorAll(".service-card").forEach((other) => {
      if (other !== card) closeCard(other);
    });

    if (opening) {
      more.style.height = "0px";
      more.style.opacity = "1";
      requestAnimationFrame(() => openCard(card));
    } else {
      more.style.height = more.scrollHeight + "px";
      requestAnimationFrame(() => closeCard(card));
    }
  });

  window.addEventListener("resize", () => {
    if (card.dataset.open === "true") {
      more.style.height = more.scrollHeight + "px";
    }
  });
});

// FAQ accordion
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

    btn.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
    const icon = btn.querySelector(".acc-icon");
    if (icon) icon.textContent = expanded ? "+" : "–";
  });
});

// Inline contact form submit (AJAX)
(() => {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");
  if (!form || !statusEl) return;

  const btn = form.querySelector('button[type="submit"]');
const showStatus = (msg, type) => {
  statusEl.hidden = false;

  // reset classes to retrigger animation
  statusEl.className = `form-status ${type}`;
  statusEl.classList.remove("animate-in", "animate-error");

  const icon =
    type === "success" ? "✓" :
    type === "error"   ? "!" :
    "…";

  statusEl.innerHTML = `<span class="status-icon" aria-hidden="true">${icon}</span>${msg}`;

  // trigger animation
  void statusEl.offsetWidth; // reflow hack
  statusEl.classList.add(type === "error" ? "animate-error" : "animate-in");
};


  const clearStatus = () => {
    statusEl.hidden = true;
    statusEl.className = "form-status";
    statusEl.textContent = "";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatus();

    // Basic client-side validation
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      showStatus("Por favor, completa nombre, email y mensaje.", "error");
      return;
    }

    // Loading state
    if (btn) {
      btn.setAttribute("aria-busy", "true");
      btn.disabled = true;
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

      if (res.ok) {
        showStatus(text || "Gracias. Tu mensaje se ha enviado correctamente.", "success");
        form.reset();
      } else {
        showStatus(text || "No se pudo enviar el mensaje. Inténtalo más tarde.", "error");
      }
    } catch (err) {
      showStatus("Error de conexión. Revisa tu internet y vuelve a intentarlo.", "error");
    } finally {
      if (btn) {
        btn.removeAttribute("aria-busy");
        btn.disabled = false;
      }
    }
  });
})();

/* =========================
   CONTACT FORM — HARD FIX
   (paste at very bottom)
   ========================= */

.contact-form{
  display:block;
}

.contact-form-head{
  margin-bottom: 10px;
}

.contact-form-grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
@media (max-width: 720px){
  .contact-form-grid{ grid-template-columns: 1fr; }
}

.contact-form .form-field{
  display:flex;
  flex-direction:column;
  gap: 8px;
  min-width: 0;
}

.contact-form .form-field label{
  font-weight: 800;
  font-size: .95rem;
  line-height: 1.1;
  margin: 0;
}

.contact-form .form-field input,
.contact-form .form-field textarea{
  width: 100%;
  max-width: 100%;
  display:block;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,.92);
}

.contact-form .form-field textarea{
  min-height: 170px;
  resize: vertical;
}

/* Status banner should not be flexed weirdly */
.contact-form .form-status{
  display:block;
  width: 100%;
  margin: 12px 0 6px;
}

/* Fix the bottom row layout (button + privacy line) */
.contact-form-actions{
  display:flex;
  align-items:center;
  gap: 14px;
  margin-top: 14px;
  justify-content: flex-start;  /* IMPORTANT: stops pushing text to far right */
  flex-wrap: wrap;             /* allows wrapping nicely */
}

.contact-form-actions .btn{
  flex: 0 0 auto;
}

.contact-form-actions p{
  margin: 0;
  flex: 1 1 420px;
  min-width: 240px;
}

/* On small screens, stack neatly */
@media (max-width: 720px){
  .contact-form-actions{
    flex-direction: column;
    align-items: stretch;
  }
  .contact-form-actions .btn{
    width: 100%;
    justify-content:center;
  }
  .contact-form-actions p{
    min-width: 0;
  }
}
