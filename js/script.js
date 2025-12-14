
// v6: keeps v5 features + SEO helpers, analytics consent, form UX
const sections = ["services","about","testimonials","faq","contact"];

const servicesData = {
  es: [
    { title:"Lenguaje temprano", summary:"Estimulación del lenguaje desde 0–3 años.", lines:[
      "Fomentamos la comunicación con canciones, rutinas y juego compartido.",
      "Acompañamos a las familias con ideas sencillas para hablar más y mejor cada día."
    ]},
    { title:"Articulación", summary:"Sonidos claros y pronunciación precisa.", lines:[
      "Usamos juegos de soplo, ritmo y escucha activa para mejorar la producción.",
      "Cada logro se celebra con motivación y refuerzo positivo."
    ]},
    { title:"Fluidez", summary:"Estrategias para la tartamudez y el ritmo.", lines:[
      "Trabajamos técnicas de respiración y ritmo dentro de contextos naturales.",
      "Ayudamos al niño a ganar confianza y disfrutar comunicándose."
    ]},
    { title:"Lectoescritura", summary:"Conciencia fonológica, lectura y escritura.", lines:[
      "Usamos materiales multisensoriales y juegos de palabras adaptados.",
      "El objetivo es leer y escribir con sentido, comprensión y placer."
    ]},
    { title:"Alimentación oral", summary:"Rutinas y ejercicios orofaciales seguros.", lines:[
      "Apoyamos la transición a sólidos y hábitos saludables de alimentación.",
      "Todo se hace de forma lúdica, respetando los ritmos de cada niño."
    ]},
    { title:"Orientación a familias", summary:"Planes y juegos sencillos para casa.", lines:[
      "Asesoramos a madres, padres y cuidadores con estrategias prácticas.",
      "La familia se convierte en el mejor apoyo del desarrollo comunicativo."
    ]}
  ],
  en: [
    { title:"Early language", summary:"Language stimulation for ages 0–3.", lines:[
      "We encourage communication through songs, routines, and shared play.",
      "Families get simple, everyday ideas to support talking at home."
    ]},
    { title:"Articulation", summary:"Clear sounds and accurate pronunciation.", lines:[
      "We use blowing, rhythm, and listening games to improve production.",
      "Every success is celebrated with motivation and positive feedback."
    ]},
    { title:"Fluency", summary:"Strategies for stuttering and rhythm.", lines:[
      "We practice breathing and rhythm in natural conversation.",
      "Children gain confidence and joy in expressing themselves."
    ]},
    { title:"Literacy", summary:"Phonological awareness, reading & writing.", lines:[
      "We use multisensory materials and playful word games.",
      "The goal is meaningful reading and writing with understanding and enjoyment."
    ]},
    { title:"Feeding/Oral motor", summary:"Safe orofacial routines and exercises.", lines:[
      "We support transitions to solid foods and healthy mealtime habits.",
      "Everything is playful and respectful of each child’s rhythm."
    ]},
    { title:"Family coaching", summary:"Simple at-home plans and games.", lines:[
      "We guide parents and caregivers with practical strategies.",
      "Families become their child’s best communication partners."
    ]}
  ]
};

const content = {
  es: {
    hero_title:"Chit Chat — Logopedia para niños y familias",
    hero_sub:"Sesiones cercanas, lúdicas y basadas en evidencia. Atención en persona y online.",
    cta_btn:"Reserva una cita",
    badges:["Logopeda titulada","Evaluación inicial","Atención a niños","Apoyo a familias"],
    services_title:"Servicios", services_lead:"Seis áreas clave para apoyar a tu peque:",
    about_title:"Sobre Chit Chat",
    about_text:"Acompañamos a niños y familias con una logopedia cercana, práctica y con resultados. Combinamos juego, objetivos claros y comunicación continua con la familia.",
    approach_title:"Enfoque",
    approach_points:["Evaluación clara con objetivos medibles.","Sesiones lúdicas adaptadas a la edad.","Tareas sencillas para casa con seguimiento.","Trabajo en equipo con el cole y especialistas."],
    testimonials_title:"Testimonios",
    testimonials:[{q:"Nuestra hija ahora disfruta hablando y se le entiende mucho mejor.",by:"— Marta, mamá de A."},{q:"Método claro, juegos divertidos y comunicación constante.",by:"— Luis, papá de N."},{q:"Profesionalidad y cariño a partes iguales.",by:"— Carla"}],
    faq_title:"Preguntas frecuentes",
    faqs:[{q:"¿A partir de qué edad atendéis?",a:"Desde bebés (0–3) con orientación familiar, hasta adolescentes."},{q:"¿Hacéis sesiones online?",a:"Sí, según el caso. También ofrecemos material para casa."},{q:"¿Cómo empiezo?",a:"Reserva una evaluación inicial y te diseñamos un plan."}],
    contact_title:"Contacto",
    contact_lead:"Cuéntanos un poco y te respondemos pronto.",
    form_name:"Tu nombre", form_email:"Tu email", form_phone:"Teléfono (opcional)", form_msg:"Mensaje", form_submit:"Enviar",
    form_hint:"Usamos Formspree para enviar los mensajes de forma segura.", whatsapp_label:"Escríbenos por WhatsApp",
    rights:"© Chit Chat. Todos los derechos reservados.", legal_priv:"Privacidad", legal_legal:"Aviso legal",
    more:"+ más", less:"– menos",
    anchors:[["services","#services","Servicios"],["about","#about","Sobre"],["testimonials","#testimonials","Opiniones"],["faq","#faq","FAQ"],["contact","#contact","Contacto"]],
    consent_text:"Usamos analíticas ligeras (sin cookies) para mejorar la web. ¿Aceptas?",
    accept:"Aceptar", decline:"Rechazar",
    gdpr_label:"He leído y acepto la política de privacidad."
  },
  en: {
    hero_title:"Chit Chat — Speech & Language Therapy",
    hero_sub:"Playful, evidence-based sessions. In-person and online.",
    cta_btn:"Book an appointment",
    badges:["Licensed SLP","Initial assessment","Children-focused","Family support"],
    services_title:"Services", services_lead:"Six focus areas to support your child:",
    about_title:"About Chit Chat",
    about_text:"We support children and families with caring, practical therapy that gets results. We blend play with clear goals and ongoing family communication.",
    approach_title:"Approach",
    approach_points:["Clear evaluation with measurable goals.","Play-based sessions tailored to age.","Simple home tasks with follow-up.","Teamwork with school and specialists."],
    testimonials_title:"Testimonials",
    testimonials:[{q:"Our daughter now enjoys talking and is much clearer.",by:"— Marta, A.'s mom"},{q:"Clear method, fun games, constant communication.",by:"— Luis, N.'s dad"},{q:"Professional and warm in equal measure.",by:"— Carla"}],
    faq_title:"FAQ",
    faqs:[{q:"What ages do you work with?",a:"From babies (0–3) with family coaching up to teens."},{q:"Do you offer online sessions?",a:"Yes where appropriate. We also provide home materials."},{q:"How do I start?",a:"Book an initial assessment and we’ll design a plan."}],
    contact_title:"Contact",
    contact_lead:"Tell us a bit and we’ll get back to you.",
    form_name:"Your name", form_email:"Your email", form_phone:"Phone (optional)", form_msg:"Message", form_submit:"Send",
    form_hint:"We use Formspree to securely deliver messages.", whatsapp_label:"Message us on WhatsApp",
    rights:"© Chit Chat. All rights reserved.", legal_priv:"Privacy", legal_legal:"Legal",
    more:"+ more", less:"– less",
    anchors:[["services","#services","Services"],["about","#about","About"],["testimonials","#testimonials","Testimonials"],["faq","#faq","FAQ"],["contact","#contact","Contact"]],
    consent_text:"We use lightweight analytics (no cookies) to improve the site. Do you accept?",
    accept:"Accept", decline:"Decline",
    gdpr_label:"I have read and accept the privacy policy."
  }
};

let currentLang="es";
function $(s){return document.querySelector(s)}
function $all(s){return Array.from(document.querySelectorAll(s))}

/* ---------- Anchors ---------- */
function buildAnchors(lang){
  const nav = $("#anchorLinks");
  nav.innerHTML = "";
  content[lang].anchors.forEach(([key,href,label])=>{
    const a = document.createElement("a");
    a.href = href;
    a.dataset.key = key;
    a.textContent = label;
    nav.appendChild(a);
  });
}
function setActiveAnchor(id){
  $all(".navlinks a").forEach(a=>a.classList.toggle("active", a.dataset.key===id));
}
function observeSections(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ setActiveAnchor(entry.target.id); }
    });
  }, {root:null, threshold:0.5});
  sections.forEach(id=>{ const el=document.getElementById(id); if(el) io.observe(el); });
}

/* ---------- Services (True accordion) ---------- */
function buildServiceCards(lang){
  const grid=$("#servicesGrid"); grid.innerHTML="";
  servicesData[lang].forEach((svc,i)=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <div class="head">
        <img class="icon" src="icons/icon-${i+1}.svg" alt="">
        <div>
          <h3>${svc.title}</h3>
          <p class="summary">${svc.summary}</p>
        </div>
      </div>
      <button class="toggle" aria-expanded="false" aria-controls="svc${i}-details">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/></svg>
        <span>${content[lang].more}</span>
      </button>
      <div class="details" id="svc${i}-details" aria-hidden="true">
        <p>${svc.lines[0]}</p>
        <p>${svc.lines[1]}</p>
      </div>`;
    const btn=card.querySelector(".toggle");
    const details=card.querySelector(".details");
    btn.addEventListener("keydown",(e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); btn.click(); } });
    btn.addEventListener("click",()=>{
      const wasOpen = card.classList.contains("open");
      $all("#servicesGrid .card").forEach(c=>{
        if(c!==card){
          c.classList.remove("open");
          const b=c.querySelector(".toggle"), d=c.querySelector(".details");
          b.setAttribute("aria-expanded","false"); d.setAttribute("aria-hidden","true");
          b.querySelector("span").textContent = content[currentLang].more;
        }
      });
      const open=!wasOpen;
      card.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open?"true":"false");
      details.setAttribute("aria-hidden", open?"false":"true");
      btn.querySelector("span").textContent = open ? content[currentLang].less : content[currentLang].more;
    });
    grid.appendChild(card);
  });
}

/* ---------- Language render + fade ---------- */
function fadeWrapOn(){ const w=$(".fade-wrap"); w.classList.remove("fade-out"); w.classList.add("fade-in"); setTimeout(()=>w.classList.remove("fade-in"),240); }
function fadeWrapOff(){ const w=$(".fade-wrap"); w.classList.remove("fade-in"); w.classList.add("fade-out"); }

function renderLang(lang){
  currentLang=lang;
  fadeWrapOff();
  setTimeout(()=>{
    const t=content[lang];
    // toggles
    $all(".lang-toggle button").forEach(b=>b.classList.remove("active"));
    document.getElementById(lang.toUpperCase()+"Btn").classList.add("active");
    // anchors
    buildAnchors(lang);
    // hero
    $("#heroTitle").textContent=t.hero_title;
    $("#heroSub").textContent=t.hero_sub;
    $("#ctaBtn").textContent=t.cta_btn;
    const badges=$("#badges"); badges.innerHTML="";
    t.badges.forEach(x=>{const s=document.createElement("span"); s.className="badge"; s.textContent=x; badges.appendChild(s)});
    // services
    $("#servicesTitle").textContent=t.services_title;
    $("#servicesLead").textContent=t.services_lead;
    buildServiceCards(lang);
    // about & approach
    $("#aboutTitle").textContent=t.about_title;
    $("#aboutText").textContent=t.about_text;
    $("#approachTitle").textContent=t.approach_title;
    const ap=$("#approachList"); ap.innerHTML="";
    t.approach_points.forEach(p=>{const li=document.createElement("li"); li.textContent=p; ap.appendChild(li)});
    // testimonials
    $("#testimonialsTitle").textContent=t.testimonials_title;
    const tw=$("#testimonialsWrap"); tw.innerHTML="";
    t.testimonials.forEach(v=>{const q=document.createElement("div"); q.className="quote"; q.innerHTML=`<div>“${v.q}”</div><div class="by">${v.by}</div>`; tw.appendChild(q)});
    // faq
    $("#faqTitle").textContent=t.faq_title;
    const fw=$("#faqWrap"); fw.innerHTML="";
    t.faqs.forEach(f=>{const d=document.createElement("details"); d.className="faq-item"; d.innerHTML=`<summary>${f.q}</summary><div style="margin-top:8px;">${f.a}</div>`; fw.appendChild(d)});
    // contact
    $("#contactTitle").textContent=t.contact_title;
    $("#contactLead").textContent=t.contact_lead;
    $("#nameInput").placeholder=t.form_name;
    $("#emailInput").placeholder=t.form_email;
    $("#phoneInput").placeholder=t.form_phone;
    $("#msgInput").placeholder=t.form_msg;
    $("#submitBtn").textContent=t.form_submit;
    $("#formHint").textContent=t.form_hint;
    $("#whatsLabel").textContent=t.whatsapp_label;
    // footer
    $("#rights").textContent=t.rights;
    $("#privLink").textContent=t.legal_priv;
    $("#legalLink").textContent=t.legal_legal;
    document.documentElement.lang=lang;

    // Consent text refresh if banner is visible
    const ctext = document.getElementById("consentText");
    const acceptBtn = document.getElementById("acceptBtn");
    const declineBtn = document.getElementById("declineBtn");
    const gdprLabel = document.getElementById("gdprLabel");
    if(ctext){ ctext.textContent=t.consent_text; }
    if(acceptBtn){ acceptBtn.textContent=t.accept; }
    if(declineBtn){ declineBtn.textContent=t.decline; }
    if(gdprLabel){ gdprLabel.textContent=t.gdpr_label; }

    fadeWrapOn();
  }, 120);
}

/* ---------- Back-to-top ---------- */
function setupBackToTop(){
  const btn = document.getElementById("toTop");
  const threshold = 400;
  window.addEventListener("scroll", ()=>{
    if(window.scrollY > threshold){ btn.classList.add("show"); }
    else{ btn.classList.remove("show"); }
  });
  btn.addEventListener("click", ()=>window.scrollTo({top:0, behavior:"smooth"}));
}

/* ---------- Analytics consent + loader ---------- */
function analyticsAllowed(){
  return localStorage.getItem("analyticsConsent")==="yes";
}
function loadAnalytics(){
  // Choose one: Plausible or Umami; commented examples. Set your domain/ID below.
  const usePlausible = true;
  if(usePlausible){
    // Replace example.com with your domain configured in Plausible
    const s=document.createElement("script");
    s.defer=true;
    s.setAttribute("data-domain","example.com"); // TODO set your domain
    s.src="https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }else{
    // Umami example: replace with your URL and website ID
    const s=document.createElement("script");
    s.defer=true;
    s.src="https://your-umami.example/script.js";
    s.setAttribute("data-website-id","YOUR-UMAMI-ID");
    document.head.appendChild(s);
  }
}
function showConsent(){
  const box = document.getElementById("consentBox");
  if(!box) return;
  box.style.display = "block";
  document.getElementById("acceptBtn").addEventListener("click", ()=>{
    localStorage.setItem("analyticsConsent","yes");
    box.style.display="none";
    loadAnalytics();
  });
  document.getElementById("declineBtn").addEventListener("click", ()=>{
    localStorage.setItem("analyticsConsent","no");
    box.style.display="none";
  });
}

/* ---------- Form UX (inline validation + success overlay) ---------- */
function validateEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function setupForm(){
  const form=document.getElementById("contactForm");
  const nameI=$("#nameInput"), emailI=$("#emailInput"), phoneI=$("#phoneInput"), msgI=$("#msgInput");
  const nameE=$("#nameError"), emailE=$("#emailError"), msgE=$("#msgError"), gdprE=$("#gdprError");
  const gdpr=$("#gdpr");
  function check(){
    let ok=true;
    if(nameI.value.trim().length<2){ nameE.textContent = (document.documentElement.lang==="es")?"Escribe tu nombre.":"Please enter your name."; ok=false; } else nameE.textContent="";
    if(!validateEmail(emailI.value.trim())){ emailE.textContent=(document.documentElement.lang==="es")?"Email no válido.":"Invalid email."; ok=false; } else emailE.textContent="";
    if(msgI.value.trim().length<10){ msgE.textContent=(document.documentElement.lang==="es")?"Cuéntanos un poco más (mín. 10 caracteres).":"Tell us a bit more (min 10 chars)."; ok=false; } else msgE.textContent="";
    if(!gdpr.checked){ gdprE.textContent=(document.documentElement.lang==="es")?"Debes aceptar la privacidad.":"You must accept the privacy policy."; ok=false; } else gdprE.textContent="";
    return ok;
  }
  [nameI,emailI,msgI,gdpr].forEach(el=>el.addEventListener("input", check));
  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    if(!check()) return;
    const endpoint=form.dataset.formspree;
    if(!endpoint){ alert((document.documentElement.lang==="es")?"Configura tu ID de Formspree en el formulario.":"Please set your Formspree ID in the form."); return;}
    const data={
      name:nameI.value.trim(),
      email:emailI.value.trim(),
      phone:phoneI.value.trim(),
      message:msgI.value.trim(),
      _language:document.documentElement.lang
    };
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true; submitBtn.textContent = (document.documentElement.lang==="es")?"Enviando…":"Sending…";
    try{
      const res=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)});
      if(res.ok){
        form.reset();
        openSuccess();
      }else{
        alert(document.documentElement.lang==="es"?"Error al enviar. Revisa la configuración.":"Submit failed. Check configuration.");
      }
    }catch(err){
      alert(document.documentElement.lang==="es"?"Error de red. Inténtalo de nuevo.":"Network error. Please try again.");
    }finally{
      submitBtn.disabled=false; submitBtn.textContent=(document.documentElement.lang==="es")?"Enviar":"Send";
    }
  });
}

function openSuccess(){
  const o = document.getElementById("successOverlay");
  o.style.display="grid";
  setTimeout(()=>o.classList.add("show"), 10);
}
function closeSuccess(){
  const o = document.getElementById("successOverlay");
  o.classList.remove("show");
  setTimeout(()=>o.style.display="none", 180);
}

/* ---------- Init ---------- */
function init(){
  buildAnchors("es");
  document.getElementById("ESBtn").addEventListener("click", ()=>renderLang("es"));
  document.getElementById("ENBtn").addEventListener("click", ()=>renderLang("en"));
  document.getElementById("ctaBtn").addEventListener("click", ()=>{
    const el=document.getElementById("contact");
    if(el) el.scrollIntoView({behavior:"smooth"});
  });
  observeSections();
  setupBackToTop();
  setupForm();
  // Analytics consent flow
  if(analyticsAllowed()){ loadAnalytics(); } else { showConsent(); }
  renderLang("es");
  // Success overlay close
  document.getElementById("successClose").addEventListener("click", closeSuccess);
}
window.addEventListener("DOMContentLoaded", init);
