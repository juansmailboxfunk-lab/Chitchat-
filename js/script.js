
const toggles = document.querySelectorAll('.toggle');
toggles.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const panel = btn.previousElementSibling;
    const isOpen = panel.style.display === 'block';
    document.querySelectorAll('.more').forEach(m=>m.style.display='none');
    panel.style.display = isOpen ? 'none' : 'block';
    toggles.forEach(t=>t.textContent = '+ más información');
    btn.textContent = isOpen ? '+ más información' : '– menos';
  });
});
