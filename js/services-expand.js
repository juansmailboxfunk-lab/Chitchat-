
// ============================
// Services horizontal expand helper
// ============================
document.querySelectorAll('.service-card .toggle').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const card = btn.closest('.service-card');
    const grid = card.parentElement;

    grid.querySelectorAll('.service-card').forEach(c=>{
      if(c !== card){
        c.classList.remove('expanded','align-right');
      }
    });

    card.classList.toggle('expanded');

    const index = [...grid.children].indexOf(card);
    if(index > 0){
      card.classList.add('align-right');
    }
  });
});
