
// Chit Chat bilingual toggling + Formspree submit
const content = {
  es: {
    hero_title: "Chit Chat — Logopedia para niños y familias",
    hero_sub: "Sesiones cercanas, lúdicas y basadas en evidencia. Atención en persona y online.",
    cta_btn: "Reserva una cita",
    badges: ["Logopeda titulada", "Evaluación inicial", "Atención a niños", "Apoyo a familias"],
    services_title: "Servicios",
    services_lead: "Seis áreas clave para apoyar a tu peque:",
    services: [
      { title: "Lenguaje temprano", desc: "Estimulación del lenguaje desde 0–3 años." },
      { title: "Articulación", desc: "Sonidos claros y pronunciación precisa." },
      { title: "Fluidez", desc: "Estrategias para la tartamudez y el ritmo." },
      { title: "Lectoescritura", desc: "Conciencia fonológica, lectura y escritura." },
      { title: "Alimentación oral", desc: "Rutinas y ejercicios orofaciales seguros." },
      { title: "Orientación a familias", desc: "Planes y juegos sencillos para casa." }
    ],
    about_title: "Sobre Chit Chat",
    about_text: "Acompañamos a niños y familias con una logopedia cercana, práctica y con resultados. Combinamos juego, objetivos claros y comunicación continua con la familia.",
    approach_title: "Enfoque",
    approach_points: [
      "Evaluación clara con objetivos medibles.",
      "Sesiones lúdicas adaptadas a la edad.",
      "Tareas sencillas para casa con seguimiento.",
      "Trabajo en equipo con el cole y especialistas."
    ],
    testimonials_title: "Testimonios",
    testimonials: [
      { q: "Nuestra hija ahora disfruta hablando y se le entiende mucho mejor.", by: "— Marta, mamá de A." },
      { q: "Método claro, juegos divertidos y comunicación constante.", by: "— Luis, papá de N." },
      { q: "Profesionalidad y cariño a partes iguales.", by: "— Carla" }
    ],
    faq_title: "Preguntas frecuentes",
    faqs: [
      { q: "¿A partir de qué edad atendéis?", a: "Desde bebés (0–3) con orientación familiar, hasta adolescentes." },
      { q: "¿Hacéis sesiones online?", a: "Sí, según el caso. También ofrecemos material para casa." },
      { q: "¿Cómo empiezo?", a: "Reserva una evaluación inicial y te diseñamos un plan." }
    ],
    contact_title: "Contacto",
    contact_lead: "Cuéntanos un poco y te respondemos pronto.",
    form_name: "Tu nombre",
    form_email: "Tu email",
    form_phone: "Teléfono (opcional)",
    form_msg: "Mensaje",
    form_submit: "Enviar",
    form_hint: "Usamos Formspree para enviar los mensajes de forma segura.",
    whatsapp_label: "Escríbenos por WhatsApp",
    footer_rights: "© Chit Chat. Todos los derechos reservados.",
    legal_priv: "Privacidad",
    legal_legal: "Aviso legal"
  },
  en: {
    hero_title: "Chit Chat — Speech & Language Therapy",
    hero_sub: "Playful, evidence-based sessions. In-person and online.",
    cta_btn: "Book an appointment",
    badges: ["Licensed SLP", "Initial assessment", "Children-focused", "Family support"],
    services_title: "Services",
    services_lead: "Six focus areas to support your child:",
    services: [
      { title: "Early language", desc: "Language stimulation for ages 0–3." },
      { title: "Articulation", desc: "Clear sounds and accurate pronunciation." },
      { title: "Fluency", desc: "Strategies for stuttering and rhythm." },
      { title: "Literacy", desc: "Phonological awareness, reading & writing." },
      { title: "Feeding/Oral motor", desc: "Safe orofacial routines and exercises." },
      { title: "Family coaching", desc: "Simple at-home plans and games." }
    ],
    about_title: "About Chit Chat",
    about_text: "We support children and families with practical, caring therapy that gets results. We blend play with clear goals and ongoing family communication.",
    approach_title: "Approach",
    approach_points: [
      "Clear evaluation with measurable goals.",
      "Play-based sessions tailored to age.",
      "Simple home tasks with follow-up.",
      "Teamwork with school and specialists."
    ],
    testimonials_title: "Testimonials",
    testimonials: [
      { q: "Our daughter now enjoys talking and is much clearer.", by: "— Marta, A.'s mom" },
      { q: "Clear method, fun games, constant communication.", by: "— Luis, N.'s dad" },
      { q: "Professional and warm in equal measure.", by: "— Carla" }
    ],
    faq_title: "FAQ",
    faqs: [
      { q: "What ages do you work with?", a: "From babies (0–3) with family coaching up to teens." },
      { q: "Do you offer online sessions?", a: "Yes where appropriate. We also provide at-home materials." },
      { q: "How do I start?", a: "Book an initial assessment and we’ll design a plan." }
    ],
    contact_title: "Contact",
    contact_lead: "Tell us a bit and we’ll get back to you.",
    form_name: "Your name",
    form_email: "Your email",
    form_phone: "Phone (optional)",
    form_msg: "Message",
    form_submit: "Send",
    form_hint: "We use Formspree to securely deliver messages.",
    whatsapp_label: "Message us on WhatsApp",
    footer_rights: "© Chit Chat. All rights reserved.",
    legal_priv: "Privacy",
    legal_legal: "Legal"
  }
};

let currentLang = "es"; // default Spanish

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

function renderLang(lang){
  currentLang = lang;
  const t = content[lang];

  // Toggle buttons
  $all(".lang-toggle button").forEach(b=>b.classList.remove("active"));
  document.getElementById(lang.toUpperCase()+"Btn").classList.add("active");

  // Hero
  document.getElementById("heroTitle").textContent = t.hero_title;
  document.getElementById("heroSub").textContent = t.hero_sub;
  document.getElementById("ctaBtn").textContent = t.cta_btn;
  const badges = document.getElementById("badges");
  badges.innerHTML = "";
  t.badges.forEach(x=>{
    const span = document.createElement("span");
    span.className = "badge";
    span.textContent = x;
    badges.appendChild(span);
  });

  // Services
  document.getElementById("servicesTitle").textContent = t.services_title;
  document.getElementById("servicesLead").textContent = t.services_lead;
  const svc = document.getElementById("servicesGrid");
  svc.innerHTML = "";
  t.services.forEach((s, i)=>{
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img class="icon" src="icons/icon-${i+1}.svg" alt="">
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    `;
    svc.appendChild(div);
  });

  // About + Approach
  document.getElementById("aboutTitle").textContent = t.about_title;
  document.getElementById("aboutText").textContent = t.about_text;
  document.getElementById("approachTitle").textContent = t.approach_title;
  const ap = document.getElementById("approachList");
  ap.innerHTML = "";
  t.approach_points.forEach(p=>{
    const li = document.createElement("li");
    li.textContent = p;
    ap.appendChild(li);
  });

  // Testimonials
  document.getElementById("testimonialsTitle").textContent = t.testimonials_title;
  const tq = document.getElementById("testimonialsWrap");
  tq.innerHTML = "";
  t.testimonials.forEach(tt=>{
    const q = document.createElement("div");
    q.className = "quote";
    q.innerHTML = `<div>“${tt.q}”</div><div class="by">${tt.by}</div>`;
    tq.appendChild(q);
  });

  // FAQ
  document.getElementById("faqTitle").textContent = t.faq_title;
  const fq = document.getElementById("faqWrap");
  fq.innerHTML = "";
  t.faqs.forEach(f=>{
    const item = document.createElement("details");
    item.className = "faq-item";
    item.innerHTML = `<summary>${f.q}</summary><div style="margin-top:8px;">${f.a}</div>`;
    fq.appendChild(item);
  });

  // Contact
  document.getElementById("contactTitle").textContent = t.contact_title;
  document.getElementById("contactLead").textContent = t.contact_lead;
  document.getElementById("nameInput").placeholder = t.form_name;
  document.getElementById("emailInput").placeholder = t.form_email;
  document.getElementById("phoneInput").placeholder = t.form_phone;
  document.getElementById("msgInput").placeholder = t.form_msg;
  document.getElementById("submitBtn").textContent = t.form_submit;
  document.getElementById("formHint").textContent = t.form_hint;
  document.getElementById("whatsLabel").textContent = t.whatsapp_label;

  // Footer
  document.getElementById("rights").textContent = t.footer_rights;
  document.getElementById("privLink").textContent = t.legal_priv;
  document.getElementById("legalLink").textContent = t.legal_legal;

  // HTML lang attribute
  document.documentElement.lang = lang;
}

window.addEventListener("DOMContentLoaded", ()=>{
  // Buttons
  document.getElementById("ESBtn").addEventListener("click", ()=>renderLang("es"));
  document.getElementById("ENBtn").addEventListener("click", ()=>renderLang("en"));

  // Smooth scroll for CTA
  document.getElementById("ctaBtn").addEventListener("click", (e)=>{
    const el = document.getElementById("contact");
    if(el) el.scrollIntoView({ behavior: "smooth" });
  });

  // Formspree submit
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const endpoint = form.dataset.formspree; // e.g. https://formspree.io/f/xxxxxx
    if(!endpoint){
      alert(currentLang === "es"
            ? "Configura tu ID de Formspree en el atributo data-formspree del formulario."
            : "Please set your Formspree ID in the form’s data-formspree attribute.");
      return;
    }
    const data = {
      name: document.getElementById("nameInput").value.trim(),
      email: document.getElementById("emailInput").value.trim(),
      phone: document.getElementById("phoneInput").value.trim(),
      message: document.getElementById("msgInput").value.trim(),
      _language: currentLang
    };
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      });
      if(res.ok){
        alert(currentLang === "es" ? "¡Gracias! Te contactaremos pronto." : "Thanks! We’ll be in touch soon.");
        form.reset();
      }else{
        alert(currentLang === "es" ? "Error al enviar. Revisa la configuración." : "Submit failed. Check configuration.");
      }
    } catch(err){
      alert(currentLang === "es" ? "Error de red. Inténtalo de nuevo." : "Network error. Please try again.");
    }
  });

  // Initial render (Spanish default)
  renderLang("es");
});
