const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".nav-link");
const languageButtons = document.querySelectorAll(".language-switcher__button");
const form = document.querySelector(".contact-form");
const statusMessage = document.querySelector(".form-status");
const currentYear = document.querySelector("#current-year");

const translations = {
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "nav.contact": "Contacto",
    "hero.eyebrow": "Desarrollador frontend",
    "hero.subtitle": "Estudiante de DAW / Desarrollador web",
    "hero.description": "Soy Pablo Ruiz Gandia, desarrollador de aplicaciones web en formación. Me gusta construir experiencias digitales claras, funcionales y con personalidad.",
    "hero.primaryCta": "Ver proyectos",
    "hero.secondaryCta": "Contactar",
    "hero.meta.name": "Pablo Ruiz",
    "hero.meta.location": "Alzira, Valencia",
    "hero.meta.status": "Disponible para oportunidades",
    "hero.caption": "Frontend Developer · Pablo Ruiz",
    "about.eyebrow": "Acerca de",
    "about.title": "Sobre mí",
    "about.body": "Estoy estudiando Desarrollo de Aplicaciones Web y disfruto entendiendo cómo funcionan las cosas para después transformarlas en soluciones sencillas. Mi camino combina una base sólida en tecnologías web con ganas de seguir aprendiendo cada día. Me interesa especialmente el desarrollo frontend, la experiencia de usuario y el código que se siente tan bien como se ve.",
    "projects.eyebrow": "Proyectos",
    "projects.title": "Proyectos",
    "projects.intro": "Tres ejemplos editables para mostrar tus trabajos. Cambia título, texto, enlaces e imágenes cuando quieras.",
    "projects.one.title": "Portfolio personal",
    "projects.one.body": "Web de presentación personal con navegación por secciones, diseño responsive y formulario de contacto validado.",
    "projects.one.tech": "HTML · CSS · JavaScript",
    "projects.two.title": "Task Manager",
    "projects.two.body": "Aplicación para organizar tareas con filtros, estado local y una interfaz sencilla para uso diario.",
    "projects.two.tech": "JavaScript · LocalStorage · CSS Grid",
    "projects.three.title": "Landing de producto",
    "projects.three.body": "Landing page enfocada en conversión, con secciones de venta, testimonios y llamada a la acción.",
    "projects.three.tech": "HTML5 · CSS3 · Responsive Design",
    "projects.demo": "Demo",
    "projects.code": "Código",
    "skills.eyebrow": "Habilidades y herramientas",
    "skills.title": "Habilidades y herramientas",
    "skills.cloudLabel": "Lista de habilidades y herramientas",
    "contact.eyebrow": "Contacto",
    "contact.title": "Contáctame",
    "contact.intro": "¿Quieres dejar un mensaje? Rellena el formulario y verás una confirmación al enviar.",
    "contact.nameLabel": "Nombre",
    "contact.emailLabel": "Email",
    "contact.messageLabel": "Mensaje",
    "contact.send": "Enviar",
    "contact.quickTitle": "Datos rápidos",
    "contact.role": "Desarrollador frontend",
    "contact.name": "Pablo Ruiz",
    "contact.location": "Alzira, Valencia",
    "contact.note": "Portfolio personal",
    "footer.role": "Desarrollador frontend",
    "footer.socialLabel": "Redes sociales",
    "footer.github": "GitHub",
    "footer.linkedin": "LinkedIn",
    "footer.copy": "© {year} Pablo Ruiz"
  },
  va: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "hero.eyebrow": "Frontend Developer",
    "hero.subtitle": "Estudiant de DAW / Desenvolupador web",
    "hero.description": "Soc Pablo Ruiz Gandia, desenvolupador d'aplicacions web en formació. M'agrada construir experiències digitals clares, funcionals i amb personalitat.",
    "hero.primaryCta": "Veure projectes",
    "hero.secondaryCta": "Contactar",
    "hero.meta.name": "Pablo Ruiz",
    "hero.meta.location": "Alzira, València",
    "hero.meta.status": "Disponible per a oportunitats",
    "hero.caption": "Frontend Developer · Pablo Ruiz",
    "about.eyebrow": "About",
    "about.title": "Sobre mi",
    "about.body": "Estic estudiant Desenvolupament d'Aplicacions Web i gaudisc entenent com funcionen les coses per després transformar-les en solucions senzilles. El meu camí combina una base sòlida en tecnologies web amb ganes de continuar aprenent cada dia. M'interessa especialment el desenvolupament frontend, l'experiència d'usuari i el codi que es sent tan bé com es veu.",
    "projects.eyebrow": "Projects",
    "projects.title": "Projects",
    "projects.intro": "Tres exemples editables per a mostrar els teus treballs. Canvia títol, text, enllaços i imatges quan vulgues.",
    "projects.one.title": "Portfolio personal",
    "projects.one.body": "Web de presentació personal amb navegació per seccions, disseny responsive i formulari de contacte validat.",
    "projects.one.tech": "HTML · CSS · JavaScript",
    "projects.two.title": "Task Manager",
    "projects.two.body": "Aplicació per organitzar tasques amb filtres, estat local i una interfície senzilla per a l'ús diari.",
    "projects.two.tech": "JavaScript · LocalStorage · CSS Grid",
    "projects.three.title": "Landing de producte",
    "projects.three.body": "Landing page enfocada en conversió, amb seccions de venda, testimonis i crida a l'acció.",
    "projects.three.tech": "HTML5 · CSS3 · Responsive Design",
    "projects.demo": "Demo",
    "projects.code": "Code",
    "skills.eyebrow": "Skills & Tools",
    "skills.title": "Skills & Tools",
    "skills.cloudLabel": "Llista d'habilitats i ferramentes",
    "contact.eyebrow": "Contact",
    "contact.title": "Contact Me",
    "contact.intro": "Vols deixar un missatge? Ompli el formulari i veuràs una confirmació en enviar-lo.",
    "contact.nameLabel": "Nom",
    "contact.emailLabel": "Email",
    "contact.messageLabel": "Missatge",
    "contact.send": "Send",
    "contact.quickTitle": "Dades ràpides",
    "contact.role": "Frontend Developer",
    "contact.name": "Pablo Ruiz",
    "contact.location": "Alzira, València",
    "contact.note": "Portfolio personal",
    "footer.role": "Frontend Developer",
    "footer.socialLabel": "Xarxes socials",
    "footer.github": "GitHub",
    "footer.linkedin": "LinkedIn",
    "footer.copy": "© {year} Pablo Ruiz"
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "hero.eyebrow": "Frontend Developer",
    "hero.subtitle": "DAW student / Web developer",
    "hero.description": "I’m Pablo Ruiz Gandia, a web application developer in training. I enjoy building clear, functional digital experiences with personality.",
    "hero.primaryCta": "View projects",
    "hero.secondaryCta": "Contact",
    "hero.meta.name": "Pablo Ruiz",
    "hero.meta.location": "Alzira, Valencia",
    "hero.meta.status": "Available for opportunities",
    "hero.caption": "Frontend Developer · Pablo Ruiz",
    "about.eyebrow": "About",
    "about.title": "About me",
    "about.body": "I’m studying Web Application Development and enjoy understanding how things work before turning them into simple solutions. My path combines a solid foundation in web technologies with a desire to keep learning every day. I’m especially interested in frontend development, user experience and code that feels as good as it looks.",
    "projects.eyebrow": "Projects",
    "projects.title": "Projects",
    "projects.intro": "Three editable examples to showcase your work. Change the title, text, links and images whenever you want.",
    "projects.one.title": "Personal portfolio",
    "projects.one.body": "Personal presentation website with section navigation, responsive design and a validated contact form.",
    "projects.one.tech": "HTML · CSS · JavaScript",
    "projects.two.title": "Task Manager",
    "projects.two.body": "A task organizer with filters, local state and a simple interface for everyday use.",
    "projects.two.tech": "JavaScript · LocalStorage · CSS Grid",
    "projects.three.title": "Product landing page",
    "projects.three.body": "Conversion-focused landing page with sales sections, testimonials and a call to action.",
    "projects.three.tech": "HTML5 · CSS3 · Responsive Design",
    "projects.demo": "Demo",
    "projects.code": "Code",
    "skills.eyebrow": "Skills & Tools",
    "skills.title": "Skills & Tools",
    "skills.cloudLabel": "List of skills and tools",
    "contact.eyebrow": "Contact",
    "contact.title": "Contact Me",
    "contact.intro": "Want to leave a message? Fill out the form and you’ll see a confirmation when it’s sent.",
    "contact.nameLabel": "Name",
    "contact.emailLabel": "Email",
    "contact.messageLabel": "Message",
    "contact.send": "Send",
    "contact.quickTitle": "Quick info",
    "contact.role": "Frontend Developer",
    "contact.name": "Pablo Ruiz",
    "contact.location": "Alzira, Valencia",
    "contact.note": "Personal portfolio",
    "footer.role": "Frontend Developer",
    "footer.socialLabel": "Social links",
    "footer.github": "GitHub",
    "footer.linkedin": "LinkedIn",
    "footer.copy": "© {year} Pablo Ruiz"
  }
};

const setLanguage = (language) => {
  const dictionary = translations[language] ?? translations.es;

  document.documentElement.lang = language === "va" ? "ca" : language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translation = dictionary[key];

    if (!translation) {
      return;
    }

    element.textContent = translation.replace("{year}", new Date().getFullYear());
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    const translation = dictionary[key];

    if (translation) {
      element.setAttribute("aria-label", translation);
    }
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.language === language);
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });

  localStorage.setItem("portfolio-language", language);
};

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
  });
});

const closeNavigation = () => {
  if (!menuButton || !navigation) {
    return;
  }

  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
};

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeNavigation();
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });
}

const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const targetId = link.getAttribute("href");
        const isActive = targetId === `#${entry.target.id}`;
        link.classList.toggle("is-active", isActive);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

setLanguage(localStorage.getItem("portfolio-language") || "es");

if (form && statusMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameField = form.elements.name;
    const emailField = form.elements.email;
    const messageField = form.elements.message;

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const markInvalid = (field, isInvalid) => {
      field.setAttribute("aria-invalid", String(isInvalid));
    };

    statusMessage.textContent = "";
    statusMessage.classList.remove("is-error", "is-success");

    const invalidFields = [!name, !emailPattern.test(email), !message];
    markInvalid(nameField, invalidFields[0]);
    markInvalid(emailField, invalidFields[1]);
    markInvalid(messageField, invalidFields[2]);

    if (invalidFields.some(Boolean)) {
      statusMessage.textContent = "Revisa los campos obligatorios y usa un email válido.";
      statusMessage.classList.add("is-error");
      return;
    }

    form.reset();
    markInvalid(nameField, false);
    markInvalid(emailField, false);
    markInvalid(messageField, false);
    statusMessage.textContent = "Mensaje enviado correctamente. Me pondré en contacto contigo pronto.";
    statusMessage.classList.add("is-success");
  });
}