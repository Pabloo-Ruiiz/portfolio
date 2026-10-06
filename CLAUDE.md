# Contexto del portfolio de Pablo Ruiz

Este archivo es la memoria operativa del proyecto para Claude y otros agentes de mantenimiento. Léelo antes de modificar código.

## Objetivo del proyecto

Portfolio personal estático de Pablo Ruiz, estudiante de DAW y desarrollador frontend junior. El sitio debe ser claro, accesible, responsive, ligero y orientado a presentar proyectos y facilitar el contacto profesional.

## Stack y estructura

- HTML5, CSS3 y JavaScript vanilla; no hay framework ni bundler.
- Página principal: `index.html`.
- Hoja de estilos activa: `css/styles.css` (es la que enlaza `index.html`).
- Hoja `styles.css` en la raíz: copia/versión antigua; no cambiarla salvo que se decida sincronizarla explícitamente.
- Lógica de interacción: `js/script.js`.
- Traducciones: `js/i18n.js`.
- Recursos: `img/`.
- Documentación y posibles recursos descargables: `docs/`.
- Validación HTML: `.htmlvalidate.json`.

## Funcionalidad existente

- Navegación responsive con menú móvil.
- Selector de idioma: español (`es`), valenciano (`va`) e inglés (`en`).
- Traducciones aplicadas desde `js/i18n.js` mediante atributos `data-i18n-*`.
- Selector de tema claro/oscuro persistido en `localStorage` con la clave `portfolio-theme`.
- Idioma persistido en `localStorage` con la clave `portfolio-language`.
- Formulario de contacto preparado para Formspree, con validación de campos y honeypot.
- SEO básico, metadatos Open Graph, JSON-LD, skip link y etiquetas ARIA.

## Decisiones y conocimiento acumulado

### Tema y contraste

- El tema se controla con `:root[data-theme="light"]`; el estado por defecto es oscuro.
- Las variables principales son `--bg`, `--bg-elevated`, `--surface`, `--surface-strong`, `--text`, `--muted`, `--border`, `--accent` y `--accent-strong`.
- Los botones del selector de idioma usan `.language-switcher__button`.
- En modo oscuro, `.language-switcher` debe usar `background: var(--surface-strong)`. No usar un fondo blanco semitransparente en el tema oscuro porque reduce el contraste del texto inactivo.
- El botón activo, hover y focus del selector usa `background: var(--accent)` y `color: #082033`.
- Mantener siempre un estado `:focus-visible` perceptible y comprobar el contraste en ambos temas.

### Contenido e internacionalización

- Cuando se añada o cambie texto visible, actualizar las tres traducciones en `js/i18n.js` siempre que exista una clave equivalente.
- Preferir atributos `data-i18n`, `data-i18n-aria`, `data-i18n-alt` y `data-i18n-placeholder` frente a texto duplicado en JavaScript.
- No romper la equivalencia entre los idiomas ni eliminar claves existentes sin revisar todos sus usos.

### Estilo de implementación

- Mantener JavaScript vanilla y CSS existente; no introducir dependencias para cambios pequeños.
- Usar nombres de clases BEM ya presentes, por ejemplo `.language-switcher__button`.
- Preferir variables CSS del tema sobre colores fijos.
- Hacer cambios quirúrgicos y no modificar la hoja raíz `styles.css` si la página no la utiliza.
- No introducir secretos, endpoints reales, credenciales ni datos personales no proporcionados.

## Flujo recomendado para cambios

1. Leer `README.md`, `index.html` y los archivos concretos afectados.
2. Comprobar qué hoja o script está realmente enlazado desde `index.html`.
3. Buscar usos de las clases o claves antes de renombrarlas.
4. Aplicar el cambio mínimo que resuelva el problema.
5. Ejecutar `git diff --check`.
6. Si es un cambio visual, abrir `index.html` con un servidor local o navegador y comprobar modo oscuro, modo claro, responsive, hover y focus.
7. Revisar que no se hayan tocado cambios ajenos.

## Comandos útiles

```bash
python3 -m http.server 8000
```

En Windows también se puede usar:

```powershell
py -m http.server 8000
```

No hay actualmente un pipeline de build. Para cambios HTML/CSS/JS, la validación principal es `git diff --check`, `.htmlvalidate.json` cuando proceda y una comprobación visual/funcional en navegador.

## Pendientes conocidos

- Sustituir la URL de ejemplo del sitio cuando exista dominio real.
- Añadir el PDF real en `docs/cv-pablo-ruiz.pdf`.
- Configurar el endpoint real de Formspree.
- Completar los textos TODO de proyectos, enlaces Demo/Código y perfiles profesionales.
- Publicar el sitio y actualizar los metadatos de despliegue.
