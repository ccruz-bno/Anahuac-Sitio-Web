# MEMORY.md — Memoria del proyecto

Estado y decisiones acumuladas del sitio que se construye. Es la **continuidad entre agentes, sesiones y modelos**:
ningún agente comparte memoria de chat, así que aquí vive el contexto persistente que **cualquiera** (Claude, Codex,
Antigravity…) lee al empezar y actualiza al avanzar. Versionado en git = memoria compartida y auditable.

---

## Estado actual
> Vivo (se sobrescribe). Qué está hecho, en progreso y lo siguiente.

- **Proyecto:** Sitio web institucional Universidad Anáhuac México — rediseño 2026.
- **Plataforma:** HubSpot (CMS Hub).
- **Fuentes configuradas:** Figma UI Kit, Figma Home, Figma Relume export.
- **Ingesta de Figma:** En progreso (tokens y foundations poblados; componentes pendientes).
- **Tokens:** Colores, tipografía, espaciado y radios poblados en `design/01-tokens.md`.
- **Foundations:** Contenedor, breakpoints, nav-height y escala de espaciado en `design/02-foundations.md`.
- **Interactions:** Efectos base del Home documentados en `design/interactions.md`.
- **Componentes:** Pendiente — inventariar los componentes del UI Kit y Home.
- **Specs:** Home pendiente de documentar secciones; sitemap pendiente de Relume.

### Siguiente paso
1. Completar ingesta de componentes del UI Kit → `design/components/*.md`.
2. Documentar secciones del Home → `specs/home.md`.
3. Poblar sitemap desde Relume → `specs/sitemap.md`.
4. Marcar `figmaIngested = true` cuando todo esté sin `TODO`.
5. Proponer primer componente a construir en HubSpot.

## Preferencias del proyecto
> Reglas/gustos específicos de este sitio que emergen y deben respetarse siempre.

- **Tipografía alternativa:** Sharp Slab es la tipografía oficial del brand (comercial); Zilla Slab es la alternativa de código abierto para uso digital. Usar siempre Zilla Slab en la implementación.
- **Font headings:** Zilla Slab (SemiBold 600 / Medium 500). Font body: Roboto (Regular 400).
- **Paleta principal:** Naranja Anáhuac (#FF5900) como brand primary; moradas como secundarias; negro/blanco como neutros.
- **Radio estándar:** 20px para tarjetas y elementos medianos; 10px para botones; 40px para secciones grandes.

## Decisiones

### 2026-06-08 — Plataforma HubSpot (onboarding)
- Elegida por el usuario durante el onboarding interactivo.
- Impacto: adapter activo → `adapters/hubspot/`. Se usará `hs CLI` para deploy.

### 2026-06-08 — Zilla Slab como heading font (ingesta Figma)
- El UI Kit define Sharp Slab como tipografía original (comercial) y Zilla Slab como alternativa de código abierto.
- Decisión: usar Zilla Slab en toda la implementación digital para evitar costos de licencia.
- Referencia: `design/01-tokens.md → --font-heading`.

### 2026-06-08 — Framework de design system instanciado (onboarding)
- Se clonó el template `averasteguibno/BnO-website-design-system` en el workspace del proyecto.
- Se configuró `project.json` con los 3 links de Figma y plataforma HubSpot.

### 2026-11-11 — Test vocacional: módulo construido con datos provisionales
- Se construyó `test-vocacional.module` (motor de dos fases con ramificación) más las
  cuatro colecciones de datos en `adapters/hubspot/hubdb/*.csv` y la semilla
  `theme/js/test-vocacional-data.js`.
- **Es proyecto aparte del sitio**, todavía sin cotizar ni autorizar. Se adelantó sólo
  lo que no depende de terceros, para poder enseñarlo al presentar la cotización.
- Excepción documentada a la convención del theme: este módulo sí trae `module.js`
  propio (~350 líneas que sólo sirven en una página). El CSS sí vive en `main.css`.
- Pendientes que bloquean el cierre: 6 decisiones de la autora sobre el mapa de áreas,
  las reglas de puntaje, los 55 textos de resultado y el plan de HubSpot contratado
  (HubDB y workflows piden Professional o superior).
- Corrección aplicada a los reactivos: el 2º de Nutrición es el **64**, no el 70
  (el 70 ya es de Turismo Internacional y el 64 no aparecía). Marcado y por confirmar.
- Detalle completo en `adapters/hubspot/theme/modules/test-vocacional.module/README.md`.

## Aprendizajes / gotchas
> Qué se intentó, qué falló, qué evitar.

- El repositorio del design system es privado en GitHub; `read_url_content` no puede leer raw URLs. Usar `git clone` o el GitHub MCP para acceder al contenido.

## Preguntas abiertas
> Decisiones pendientes que bloquean o condicionan trabajo futuro.

- ¿Hay páginas internas ya diseñadas en Figma además del Home? (el usuario indicó que sí, pendiente links concretos).
- ¿Se tiene cuenta sandbox de HubSpot para deploy?
