(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      // Placeholder hook: replace with form submission logic when backend is ready.
      console.log('Contact form submitted');
    });
  }

  // Placeholder hook for future nav/menu interactions.
  console.log('main.js loaded');
})();
