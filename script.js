const container = document.querySelector("#scene-container");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (container) {
  import("https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js").then((THREE) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 5.5;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  container.classList.add("three-ready");

  const group = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(1.08, 32, 20),
    new THREE.MeshBasicMaterial({ color: 0x274c70, wireframe: true, transparent: true, opacity: 0.9 })
  );
  group.add(core);
  const inner = new THREE.Mesh(
    new THREE.SphereGeometry(0.92, 32, 20),
    new THREE.MeshBasicMaterial({ color: 0x162238, transparent: true, opacity: 0.92 })
  );
  group.add(inner);
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.22, 32, 20),
    new THREE.MeshBasicMaterial({ color: 0x63f5d0, transparent: true, opacity: 0.12, side: THREE.BackSide })
  );
  group.add(atmosphere);

  for (let i = 0; i < 3; i += 1) {
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(1.62 + i * 0.22, 0.012, 6, 100),
      new THREE.MeshBasicMaterial({ color: i === 1 ? 0x63f5d0 : 0x8992a4, transparent: true, opacity: 0.65 })
    );
    orbit.rotation.set(i * 0.75, i * 0.9, i * 0.35);
    orbit.userData.speed = (i + 1) * 0.00022;
    group.add(orbit);
  }
  group.visible = true;

  const character = new THREE.Group();
  character.position.set(0.35, -0.35, 0);
  const skin = new THREE.MeshBasicMaterial({ color: 0x6c91b5 });
  const shadowSkin = new THREE.MeshBasicMaterial({ color: 0x263c62 });
  const hairMaterial = new THREE.MeshBasicMaterial({ color: 0x123965 });
  const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xd8ffff });

  const shoulders = new THREE.Mesh(new THREE.SphereGeometry(1.05, 24, 16), shadowSkin);
  shoulders.scale.set(1.35, 0.62, 0.65);
  shoulders.position.y = -1.12;
  character.add(shoulders);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.38, 0.55, 16), skin);
  neck.position.y = -0.68;
  character.add(neck);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.72, 32, 20), skin);
  head.scale.set(0.88, 1.12, 0.85);
  head.position.y = 0.05;
  character.add(head);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.79, 24, 16), hairMaterial);
  hair.scale.set(0.98, 0.8, 0.94);
  hair.position.set(0, 0.38, -0.02);
  character.add(hair);
  for (let i = 0; i < 11; i += 1) {
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.72, 5), hairMaterial);
    const angle = (i / 11) * Math.PI * 2;
    spike.position.set(Math.cos(angle) * 0.56, 0.52 + Math.sin(angle) * 0.2, Math.sin(angle) * 0.5);
    spike.rotation.z = Math.cos(angle) * 0.5;
    spike.rotation.x = Math.sin(angle) * 0.5;
    character.add(spike);
  }
  [-0.25, 0.25].forEach((x) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 12), glowMaterial);
    eye.scale.set(0.7, 1.8, 0.55);
    eye.position.set(x, 0.03, 0.66);
    character.add(eye);
  });
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.025, 0.02), shadowSkin);
  mouth.position.set(0, -0.35, 0.66);
  character.add(mouth);
  character.visible = false;

  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xcfffff })
  );
  orb.position.set(-1.75, 0.9, 0.3);
  orb.visible = false;

  const trailGeometry = new THREE.BufferGeometry();
  const trailPositions = new Float32Array(130 * 3);
  for (let i = 0; i < 130; i += 1) {
    const progress = i / 130;
    trailPositions[i * 3] = -1.62 + progress * 1.15 + (Math.random() - 0.5) * 0.35;
    trailPositions[i * 3 + 1] = 0.88 - progress * 0.42 + (Math.random() - 0.5) * 0.3;
    trailPositions[i * 3 + 2] = 0.2 + (Math.random() - 0.5) * 0.25;
  }
  trailGeometry.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
  const trail = new THREE.Points(trailGeometry, new THREE.PointsMaterial({
    color: 0x63f5d0, size: 0.035, transparent: true, opacity: 0.75
  }));
  trail.visible = false;

  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(280 * 3);
  for (let i = 0; i < particlePositions.length; i += 1) {
    particlePositions[i] = (Math.random() - 0.5) * 5.8;
  }
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({ color: 0x63f5d0, size: 0.018, transparent: true, opacity: 0.7 })
  );
  scene.add(particles);
  scene.add(group);

  const mouse = { x: 0, y: 0 };
  window.addEventListener("pointermove", (event) => {
    mouse.x = (event.clientX / window.innerWidth - 0.5) * 0.5;
    mouse.y = (event.clientY / window.innerHeight - 0.5) * 0.5;
  });
  const resize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", resize);
  const animate = (time) => {
    core.rotation.x += 0.0012;
    core.rotation.y += 0.0018;
    inner.rotation.y -= 0.001;
    group.rotation.x += (mouse.y - group.rotation.x) * 0.025;
    group.rotation.z += (mouse.x - group.rotation.z) * 0.025;
    group.children.slice(3).forEach((orbit) => { orbit.rotation.z += orbit.userData.speed; });
    atmosphere.scale.setScalar(1 + Math.sin(time * 0.002) * 0.035);
    particles.rotation.y = time * 0.00004;
    character.rotation.y = Math.sin(time * 0.00055) * 0.08;
    character.position.y = -0.35 + Math.sin(time * 0.0012) * 0.035;
    orb.position.x = -1.75 + Math.sin(time * 0.001) * 0.08;
    orb.scale.setScalar(1 + Math.sin(time * 0.004) * 0.18);
    trail.rotation.z = Math.sin(time * 0.0008) * 0.04;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
  }).catch((error) => {
    console.error("No se pudo cargar la animación 3D:", error);
  });
}

const translations = {
  es: {
    "nav.home": "Inicio", "nav.about": "Sobre mí", "nav.projects": "Proyectos", "nav.education": "Formación", "nav.contact": "Contacto",
    "hero.label": "Portfolio personal · 2026", "hero.title": "Ideas que se<br><em>convierten</em> en web.", "hero.intro": "Soy Pablo Ruiz Gandia, desarrollador de aplicaciones web en formación. Me gusta construir experiencias digitales claras, funcionales y con personalidad.", "hero.projects": "Ver mis proyectos", "hero.talk": "Hablemos", "hero.available": "Disponible para oportunidades", "ticker": "HTML · CSS · JAVASCRIPT · JAVA · PYTHON · ANGULAR · PHP · HTML · CSS · JAVASCRIPT · JAVA · PYTHON · ANGULAR · PHP ·",
    "about.label": "01 / Sobre mí", "about.title": "Curiosidad por<br><em>crear mejor.</em>", "about.lead": "Estoy estudiando Desarrollo de Aplicaciones Web y disfruto entendiendo cómo funcionan las cosas para después transformarlas en soluciones sencillas.", "about.text": "Mi camino combina una base sólida en tecnologías web con ganas de seguir aprendiendo cada día. Me interesa especialmente el desarrollo frontend, la experiencia de usuario y el código que se siente tan bien como se ve.",
    "projects.label": "02 / Proyectos", "projects.title": "Lo que estoy<br><em>construyendo.</em>", "projects.note": "Una selección de trabajos y aprendizajes que reflejan mi evolución como desarrollador.", "project.one.title": "Portfolio personal", "project.one.text": "Diseño y desarrollo de mi espacio profesional en la web.", "project.two.title": "Aplicaciones web", "project.two.text": "Proyectos académicos centrados en funcionalidad y lógica.", "project.three.title": "Próximamente", "project.three.text": "Nuevas ideas en proceso de convertirse en realidad.",
    "education.label": "03 / Formación", "education.title": "Aprender para<br><em>avanzar.</em>", "education.now": "actualidad", "education.degree": "Desarrollo de Aplicaciones Web", "education.text": "Formación profesional · Desarrollo web, bases de datos y programación.", "education.always": "Siempre", "education.continuous": "Aprendizaje continuo", "education.continuousText": "Explorando nuevas herramientas, lenguajes y formas de crear productos digitales.",
    "contact.label": "04 / Contacto", "contact.title": "¿Hacemos algo<br><em>interesante?</em>", "contact.linkedin": "Conectemos en LinkedIn", "footer.text": "Diseñado y desarrollado con intención.", "footer.top": "Volver arriba ↑"
  },
  va: {
    "nav.home": "Inici", "nav.about": "Sobre mi", "nav.projects": "Projectes", "nav.education": "Formació", "nav.contact": "Contacte",
    "hero.label": "Portfolio personal · 2026", "hero.title": "Idees que es<br><em>converteixen</em> en web.", "hero.intro": "Soc Pablo Ruiz Gandia, desenvolupador d'aplicacions web en formació. M'agrada construir experiències digitals clares, funcionals i amb personalitat.", "hero.projects": "Veure els meus projectes", "hero.talk": "Parlem", "hero.available": "Disponible per a oportunitats", "ticker": "HTML · CSS · JAVASCRIPT · JAVA · PYTHON · ANGULAR · PHP · HTML · CSS · JAVASCRIPT · JAVA · PYTHON · ANGULAR · PHP ·",
    "about.label": "01 / Sobre mi", "about.title": "Curiositat per<br><em>crear millor.</em>", "about.lead": "Estic estudiant Desenvolupament d'Aplicacions Web i gaudisc entenent com funcionen les coses per a transformar-les en solucions senzilles.", "about.text": "El meu camí combina una base sòlida en tecnologies web amb ganes de continuar aprenent cada dia. M'interessen especialment el desenvolupament frontend, l'experiència d'usuari i el codi que es sent tan bé com es veu.",
    "projects.label": "02 / Projectes", "projects.title": "El que estic<br><em>construint.</em>", "projects.note": "Una selecció de treballs i aprenentatges que reflecteixen la meua evolució com a desenvolupador.", "project.one.title": "Portfolio personal", "project.one.text": "Disseny i desenvolupament del meu espai professional a la web.", "project.two.title": "Aplicacions web", "project.two.text": "Projectes acadèmics centrats en funcionalitat i lògica.", "project.three.title": "Pròximament", "project.three.text": "Noves idees en procés de convertir-se en realitat.",
    "education.label": "03 / Formació", "education.title": "Aprendre per<br><em>avançar.</em>", "education.now": "actualitat", "education.degree": "Desenvolupament d'Aplicacions Web", "education.text": "Formació professional · Desenvolupament web, bases de dades i programació.", "education.always": "Sempre", "education.continuous": "Aprenentatge continu", "education.continuousText": "Explorant noves eines, llenguatges i maneres de crear productes digitals.",
    "contact.label": "04 / Contacte", "contact.title": "Fem alguna cosa<br><em>interessant?</em>", "contact.linkedin": "Connectem a LinkedIn", "footer.text": "Dissenyat i desenvolupat amb intenció.", "footer.top": "Tornar amunt ↑"
  },
  en: {
    "nav.home": "Home", "nav.about": "About me", "nav.projects": "Projects", "nav.education": "Education", "nav.contact": "Contact",
    "hero.label": "Personal portfolio · 2026", "hero.title": "Ideas that<br><em>become</em> web.", "hero.intro": "I’m Pablo Ruiz Gandia, a web application developer in training. I enjoy building clear, functional digital experiences with personality.", "hero.projects": "View my projects", "hero.talk": "Let's talk", "hero.available": "Available for opportunities", "ticker": "HTML · CSS · JAVASCRIPT · JAVA · PYTHON · ANGULAR · PHP · HTML · CSS · JAVASCRIPT · JAVA · PYTHON · ANGULAR · PHP ·",
    "about.label": "01 / About me", "about.title": "Curiosity to<br><em>create better.</em>", "about.lead": "I’m studying Web Application Development and enjoy understanding how things work before turning them into simple solutions.", "about.text": "My path combines a solid foundation in web technologies with a desire to keep learning every day. I’m especially interested in frontend development, user experience and code that feels as good as it looks.",
    "projects.label": "02 / Projects", "projects.title": "What I’m<br><em>building.</em>", "projects.note": "A selection of work and learning experiences that reflect my growth as a developer.", "project.one.title": "Personal portfolio", "project.one.text": "Design and development of my professional space on the web.", "project.two.title": "Web applications", "project.two.text": "Academic projects focused on functionality and logic.", "project.three.title": "Coming soon", "project.three.text": "New ideas currently becoming reality.",
    "education.label": "03 / Education", "education.title": "Learn to<br><em>move forward.</em>", "education.now": "present", "education.degree": "Web Application Development", "education.text": "Vocational training · Web development, databases and programming.", "education.always": "Always", "education.continuous": "Continuous learning", "education.continuousText": "Exploring new tools, languages and ways to create digital products.",
    "contact.label": "04 / Contact", "contact.title": "Shall we make<br><em>something?</em>", "contact.linkedin": "Connect on LinkedIn", "footer.text": "Designed and developed with intention.", "footer.top": "Back to top ↑"
  }
};

const setLanguage = (language) => {
  document.documentElement.lang = language === "va" ? "ca" : language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translation = translations[language]?.[element.dataset.i18n];
    if (translation) element.innerHTML = translation;
  });
  document.querySelectorAll(".language-button").forEach((button) => button.classList.toggle("active", button.dataset.language === language));
  localStorage.setItem("portfolio-language", language);
};
document.querySelectorAll(".language-button").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));
setLanguage(localStorage.getItem("portfolio-language") || "es");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
}), { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => observer.observe(section));
