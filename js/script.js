
const toggles = document.querySelectorAll('.toggle');
const panels = document.querySelectorAll('.more');

toggles.forEach((btn) => {
  btn.addEventListener('click', () => {
    const panelId = btn.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    const isOpen = !panel.hidden;
    panels.forEach((item) => { item.hidden = true; });
    toggles.forEach((item) => {
      item.textContent = '+ mas informacion';
      item.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      panel.hidden = false;
      btn.textContent = '- menos';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      formStatus.textContent = 'Revisa los campos obligatorios antes de enviar.';
      return;
    }

    const formData = new FormData(contactForm);
    const body = [
      `Nombre: ${formData.get('nombre') || ''}`,
      `Email: ${formData.get('email') || ''}`,
      `Telefono: ${formData.get('telefono') || ''}`,
      `Edad del nino/a: ${formData.get('edad') || ''}`,
      `Motivo: ${formData.get('motivo') || ''}`,
      `Modalidad: ${formData.get('modalidad') || ''}`,
      `Horario preferido: ${formData.get('horario') || ''}`
    ].join('\n');
    const subject = encodeURIComponent('Nueva solicitud - evaluacion inicial');
    const mailBody = encodeURIComponent(body);

    window.location.href = `mailto:hola@tusitio.com?subject=${subject}&body=${mailBody}`;
    formStatus.textContent = 'Se abrio tu cliente de correo con los datos precargados.';
  });
}
