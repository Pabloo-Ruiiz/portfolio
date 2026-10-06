const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".nav-link");
const languageButtons = document.querySelectorAll(".language-switcher__button");
const themeToggle = document.querySelector(".theme-toggle");
const form = document.querySelector(".contact-form");
const statusMessage = document.querySelector(".form-status");
const currentYear = document.querySelector("#current-year");

const translations = window.i18n || {};

const getText = (key, fallback = "") => {
  const language = document.documentElement.dataset.lang || localStorage.getItem("portfolio-language") || "es";
  const dictionary = translations[language] ?? translations.es ?? {};
  return dictionary[key] ?? fallback;
};

const setLanguage = (language) => {
  const dictionary = translations[language] ?? translations.es ?? {};

  document.documentElement.lang = language === "va" ? "ca" : language;
  document.documentElement.dataset.lang = language;

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

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const translation = dictionary[key];

    if (translation) {
      element.placeholder = translation;
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    const translation = dictionary[key];

    if (translation) {
      element.setAttribute("alt", translation);
    }
  });

  const pageTitle = document.querySelector("title");
  if (pageTitle) {
    pageTitle.textContent = dictionary["meta.title"] || "Pablo Ruiz | Portfolio web";
  }

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", dictionary["meta.description"] || "Portfolio personal de Pablo Ruiz.");
  }

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

const updateActiveNav = (id) => {
  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href");
    const isActive = targetId === `#${id}`;
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "page" : "false");
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visibleEntries = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleEntries.length > 0) {
      updateActiveNav(visibleEntries[0].target.id);
    }
  },
  { rootMargin: "-20% 0px -55% 0px", threshold: [0.2, 0.4, 0.6] }
);

sections.forEach((section) => observer.observe(section));

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);

  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    themeToggle.title = isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro";
    themeToggle.querySelector(".theme-toggle__icon").textContent = isDark ? "🌙" : "☀️";
  }
};

const preferredTheme = localStorage.getItem("portfolio-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(preferredTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

setLanguage(localStorage.getItem("portfolio-language") || "es");

if (form && statusMessage) {
  const submitButton = form.querySelector('button[type="submit"]');
  const honeypot = form.querySelector('input[name="website"]');
  const formEndpoint = form.dataset.formspreeEndpoint || "https://formspree.io/f/tu-form-id";

  const getFormMessage = (key, fallback = "") => getText(key, fallback);

  const setFieldError = (field, message) => {
    const fieldWrapper = field.closest(".field");
    const errorElement = fieldWrapper?.querySelector(".field-error");

    if (errorElement) {
      errorElement.textContent = message;
    }

    field.setAttribute("aria-invalid", String(Boolean(message)));
    fieldWrapper?.classList.toggle("has-error", Boolean(message));
  };

  const clearFieldErrors = () => {
    [form.elements.name, form.elements.email, form.elements.message].forEach((field) => {
      setFieldError(field, "");
    });
  };

  const validateField = (field) => {
    const value = field.value.trim();
    const fieldName = field.name;

    if (fieldName === "name" && value.length < 2) {
      setFieldError(field, getFormMessage("form.errors.name", "Escribe tu nombre completo."));
      return false;
    }

    if (fieldName === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setFieldError(field, getFormMessage("form.errors.email", "Introduce un email válido."));
        return false;
      }
    }

    if (fieldName === "message" && value.length < 10) {
      setFieldError(field, getFormMessage("form.errors.message", "Escribe al menos 10 caracteres."));
      return false;
    }

    setFieldError(field, "");
    return true;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (honeypot && honeypot.value.trim() !== "") {
      statusMessage.textContent = getFormMessage("form.status.honeypot", "Mensaje no enviado.");
      statusMessage.classList.add("is-error");
      return;
    }

    clearFieldErrors();
    statusMessage.textContent = "";
    statusMessage.classList.remove("is-error", "is-success");

    const nameField = form.elements.name;
    const emailField = form.elements.email;
    const messageField = form.elements.message;
    const isValid = [
      validateField(nameField),
      validateField(emailField),
      validateField(messageField)
    ].every(Boolean);

    if (!isValid) {
      statusMessage.textContent = getFormMessage("form.status.invalid", "Revisa los campos marcados y corrige los errores.");
      statusMessage.classList.add("is-error");
      return;
    }

    if (formEndpoint.includes("tu-form-id")) {
      statusMessage.textContent = getFormMessage("form.status.endpoint", "Configura tu endpoint real de Formspree para activar el envío.");
      statusMessage.classList.add("is-error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = getFormMessage("form.status.sending", "Enviando...");
    statusMessage.textContent = getFormMessage("form.status.sending", "Enviando tu mensaje...");
    statusMessage.classList.remove("is-error", "is-success");

    try {
      const formData = new FormData(form);
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("La solicitud falló");
      }

      form.reset();
      clearFieldErrors();
      statusMessage.textContent = getFormMessage("form.status.success", "Mensaje enviado correctamente. Te responderé pronto.");
      statusMessage.classList.add("is-success");
    } catch (error) {
      statusMessage.textContent = getFormMessage("form.status.failure", "No se pudo enviar el mensaje. Inténtalo de nuevo o usa email directo.");
      statusMessage.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = getText("contact.send", "Enviar");
    }
  });
}