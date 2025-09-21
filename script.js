// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth' });
  });
});

// i18n dictionary
const dict = {
  es: {
    "nav.home":"Inicio","nav.services":"Servicios","nav.about":"Sobre mí","nav.reviews":"Reseñas","nav.faq":"FAQ","nav.contact":"Contacto",
    "hero.title":"Logopedia infantil en Zaragoza",
    "hero.subtitle":"Evaluación y terapia del habla y lenguaje con enfoque familiar.",
    "cta.book":"Pide cita","cta.whatsapp":"WhatsApp",
    "services.title":"Servicios",
    "services.kids.title":"Para niños",
    "services.kids.li1":"Lenguaje, habla, comprensión y vocabulario",
    "services.kids.li2":"Juegos y rutinas familiares",
    "services.kids.li3":"Objetivos claros y medibles",
    "services.neuro.title":"Neurodesarrollo",
    "services.neuro.li1":"TEA, TEL, TDAH, TGD, dispraxia, dislexia",
    "services.neuro.li2":"Enfoque basado en evidencia",
    "services.neuro.li3":"Trabajo en equipo con familia y escuela",
    "services.school.title":"Colegios",
    "services.school.li1":"Coordinación con tutores y orientación",
    "services.school.li2":"Adaptaciones y estrategias en aula",
    "services.school.li3":"Informes claros para el centro",
    "services.groups.title":"Grupos",
    "services.groups.li1":"Habilidades sociales y comunicación",
    "services.groups.li2":"Juego compartido y turnos",
    "services.groups.li3":"Sesiones dinámicas y motivadoras",
    "services.online.title":"Sesiones online",
    "services.online.li1":"Videollamada segura",
    "services.online.li2":"Materiales compartidos",
    "services.online.li3":"Flexibilidad horaria",
    "services.languages.title":"Español e inglés",
    "services.languages.li1":"Atención bilingüe",
    "services.languages.li2":"Recomendaciones para familias bilingües",
    "services.languages.li3":"Experiencia internacional",
    "about.title":"Sobre mí",
    "about.text":"Soy logopeda con formación en la Universidad de Cork (Irlanda) y metodología Hanen. He trabajado en el sistema público de salud irlandés (HSE) y colaboro con familias y colegios. Mi enfoque es cercano, basado en juego, y centrado en objetivos funcionales para el día a día.",
    "reviews.title":"Reseñas",
    "reviews.r1":"“Mi hijo ha mejorado mucho en vocabulario y ahora participa más en clase.”",
    "reviews.r2":"“Sesiones muy amenas. Nos dio pautas claras para casa y el cole.”",
    "reviews.r3":"“Gracias por acompañarnos con sensibilidad y profesionalidad.”",
    "faq.title":"Preguntas frecuentes",
    "faq.q1":"¿Cómo saber si mi hijo/a necesita logopedia?",
    "faq.a1":"Si tiene dificultades para expresarse, comprender instrucciones o interactuar con sus compañeros, una evaluación puede ayudar a identificar objetivos y pautas.",
    "faq.q2":"¿Trabajáis con colegios?",
    "faq.a2":"Sí. Coordinamos con tutores y orientación para dar continuidad a la intervención y facilitar estrategias en el aula.",
    "faq.q3":"¿Ofrecéis sesiones online?",
    "faq.a3":"Sí. Realizamos sesiones por videollamada segura, compartimos materiales y ofrecemos flexibilidad horaria.",
    "contact.title":"Contacto",
    "form.name":"Nombre","form.email":"Email","form.phone":"Teléfono","form.age":"Edad del niño/a","form.message":"Consulta",
    "form.consent":"He leído y acepto la política de privacidad (GDPR).",
    "form.send":"Enviar",
    "contact.address":"Plaza del Pilar, 16 — Oficina 4 · Zaragoza"
  },
  en: {
    "nav.home":"Home","nav.services":"Services","nav.about":"About","nav.reviews":"Reviews","nav.faq":"FAQ","nav.contact":"Contact",
    "hero.title":"Pediatric Speech & Language Therapy in Zaragoza",
    "hero.subtitle":"Assessment and therapy for speech and language with a family-centered approach.",
    "cta.book":"Book an appointment","cta.whatsapp":"WhatsApp",
    "services.title":"Services",
    "services.kids.title":"For children",
    "services.kids.li1":"Language, speech, comprehension and vocabulary",
    "services.kids.li2":"Play-based sessions and family routines",
    "services.kids.li3":"Clear, measurable goals",
    "services.neuro.title":"Neurodevelopment",
    "services.neuro.li1":"Autism, DLD, ADHD, dyspraxia, dyslexia",
    "services.neuro.li2":"Evidence-based approach",
    "services.neuro.li3":"Teamwork with family and school",
    "services.school.title":"Schools",
    "services.school.li1":"Coordination with teachers and SEN staff",
    "services.school.li2":"Classroom strategies and adaptations",
    "services.school.li3":"Clear reports for the school",
    "services.groups.title":"Groups",
    "services.groups.li1":"Social communication skills",
    "services.groups.li2":"Shared play and turn-taking",
    "services.groups.li3":"Engaging, motivating sessions",
    "services.online.title":"Online sessions",
    "services.online.li1":"Secure video calls",
    "services.online.li2":"Shared materials",
    "services.online.li3":"Flexible scheduling",
    "services.languages.title":"Spanish & English",
    "services.languages.li1":"Bilingual service",
    "services.languages.li2":"Guidance for bilingual families",
    "services.languages.li3":"International experience",
    "about.title":"About me",
    "about.text":"I am a speech and language therapist trained at University College Cork (Ireland) with Hanen methodology. I have worked in the Irish public health system (HSE) and collaborate with families and schools. My approach is warm, play-based and focused on practical, everyday goals.",
    "reviews.title":"Reviews",
    "reviews.r1":"“My son has improved his vocabulary a lot and now participates more in class.”",
    "reviews.r2":"“Very engaging sessions. We got clear strategies for home and school.”",
    "reviews.r3":"“Thank you for your sensitivity and professionalism.”",
    "faq.title":"Frequently asked questions",
    "faq.q1":"How do I know if my child needs speech therapy?",
    "faq.a1":"If they struggle to express themselves, follow instructions, or interact with peers, an assessment can help set goals and guidance.",
    "faq.q2":"Do you work with schools?",
    "faq.a2":"Yes. We coordinate with teachers and SEN staff to ensure continuity and classroom strategies.",
    "faq.q3":"Do you offer online sessions?",
    "faq.a3":"Yes. We provide secure video sessions, share materials, and offer flexible scheduling.",
    "contact.title":"Contact",
    "form.name":"Name","form.email":"Email","form.phone":"Phone","form.age":"Child's age","form.message":"Message",
    "form.consent":"I have read and accept the privacy policy (GDPR).",
    "form.send":"Send",
    "contact.address":"Plaza del Pilar, 16 — Office 4 · Zaragoza"
  }
};

function setLang(lang){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[lang] && dict[lang][key]) el.textContent = dict[lang][key];
  });
  document.getElementById('lang-es').classList.toggle('active', lang==='es');
  document.getElementById('lang-en').classList.toggle('active', lang==='en');
}

document.getElementById('lang-es').addEventListener('click', ()=>setLang('es'));
document.getElementById('lang-en').addEventListener('click', ()=>setLang('en'));
setLang('es'); // default

// Formspree AJAX
const fsForm = document.getElementById('fs-form');
const fsStatus = document.getElementById('fs-status');
if (fsForm && fsStatus) {
  fsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(fsForm);
    try {
      const res = await fetch(fsForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        fsStatus.textContent = (document.documentElement.lang==='es') ? "Gracias, te contactaremos pronto." : "Thanks! We'll reply soon.";
        fsStatus.style.display = 'block';
        fsForm.reset();
      } else {
        fsStatus.textContent = (document.documentElement.lang==='es') ? "No se pudo enviar. Escríbenos por WhatsApp." : "Couldn’t send. Please use WhatsApp.";
        fsStatus.style.display = 'block';
      }
    } catch (err) {
      fsStatus.textContent = (document.documentElement.lang==='es') ? "Error de red. Inténtalo de nuevo o usa WhatsApp." : "Network error. Please try again or use WhatsApp.";
      fsStatus.style.display = 'block';
    }
  });
}
