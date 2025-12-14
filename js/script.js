
document.querySelectorAll('.service-card .toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.service-card');
    card.classList.toggle('expanded');
  });
});
