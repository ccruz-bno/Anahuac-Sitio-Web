# START HERE — arranque de un proyecto nuevo

> ¿Acabas de clonar este template? Este es el **documento de instrucciones clave**.
> Pide a tu agente de IA: **"Lee `START-HERE.md` y arranca el onboarding."**

El agente debe:

0. **⛔ GATE FIGMA-FIRST (bloqueante).** Antes que nada, verifica que tienes **alguna capacidad de Figma** (un MCP o
   skill que lea variables/componentes/screenshots — nombres como `get_variable_defs`/`get_design_context` o
   `use_figma`/`figma-use`; lo que importa es la capacidad). **Si NO la tienes, DETENTE** y pide al usuario conectar
   Figma y dar acceso al UI Kit. **No inventes tokens, no improvises diseño, no construyas nada.** Ver `docs/readiness.md`.
1. **Leer `AGENTS.md`** (las reglas maestras del proyecto).
2. **Ejecutar el onboarding** siguiendo `docs/onboarding.md`: te preguntará de forma interactiva los datos para iniciar.
3. Con tus respuestas, **escribir `project.json`** (la configuración de esta instancia).
4. **Ejecutar la ingesta** (rol `ingestor`) para poblar `design/` y `specs/` desde Figma.
5. Resumir el estado y proponer el primer componente/página a construir.

## Lo que el agente te va a pedir (ténlo a la mano)

- 🎨 **Figma — Design System visual (UI Kit):** link.
- 🏠 **Figma — Home:** link.
- 📄 **Figma — Páginas internas ya creadas** (si hay): uno o varios links.
- 🗺️ **Figma — Export de Relume (sitemap + contenido):** link al archivo donde Relume exportó el sitemap y el copy.
- 🚀 **Plataforma de deployment:** `hubspot` o `wordpress` (por ahora solo estas dos).

> Según tu integración de Figma, puede requerir el archivo **abierto en desktop** (pestaña activa) o accesible por **URL**.
> Ten el archivo de Figma accesible para tu MCP/skill.

## Después del arranque

El flujo de trabajo continuo está en `docs/workflow.md`:
`ingestor → director → builder → validator → revisión humana → merge`.
La **capa de revisión humana** (`docs/human-review.md`) y el **protocolo de cambios no destructivos**
(`docs/change-protocol.md`) gobiernan cómo se incorporan tus ajustes sin romper el sitio.
