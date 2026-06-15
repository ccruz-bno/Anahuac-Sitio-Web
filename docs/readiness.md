# Definition of Ready — gate de arranque (Figma-MCP-first)

> ⛔ **BLOQUEANTE.** Ningún agente puede planear ni construir páginas/componentes hasta cumplir esto.
> Mientras no se cumpla, lo ÚNICO permitido es establecer la conexión a Figma e ingestar el design system.

## Paso 0 (obligatorio, antes que TODO): conexión a Figma vía MCP

El agente que corre el sistema **debe** verificar que tiene **alguna capacidad de Figma** (un MCP o skill que lea
variables, contexto de componentes y screenshots) sobre el archivo del proyecto. Los nombres de herramienta varían por
integración (p. ej. `get_variable_defs`/`get_design_context` en el Dev Mode MCP, o `use_figma`/`figma-use` en otros);
lo que importa es la **capacidad**, no el nombre. Ver equivalencias en `ingestion/figma.md`.

> El título histórico de este gate ("Figma-MCP-first") se refiere a esta capacidad: vale cualquier integración
> de Figma (MCP o skill), no un MCP concreto.

- ✅ **Tienes Figma MCP** → procede con la **ingesta inicial** (`ingestion/figma.md`).
- ❌ **NO tienes Figma MCP** → **DETENTE**. No inventes tokens, no improvises diseño, no construyas.
  Responde al usuario exactamente:
  > "No puedo continuar: el design system no está ingestado y no tengo acceso a Figma.
  > Conéctame **Figma** (MCP o skill) y dame acceso al **UI Kit**, y vuelve a pedírmelo."

Está prohibido sustituir la ingesta de Figma por suposiciones, stock o valores inventados.

## Checklist de "listo para construir"

Build se desbloquea **solo** cuando TODO esto es cierto:

- [ ] `project.json → status.figmaIngested = true` (lo pone el agente SOLO tras ingestar).
- [ ] `design/01-tokens.md` sin `TODO`: capa semántica con valores reales (color, **tipografía**, espaciado, radios).
- [ ] `design/02-foundations.md` con escala de espaciado, breakpoints y `--nav-height` reales.
- [ ] `design/interactions.md` con el motion base (si el diseño define efectos).
- [ ] `specs/home.md` documentado y los componentes que usa con contrato en `design/components/`.

## Enforcement
- **Agentes**: el `builder` se niega a construir si esto no se cumple (ver `docs/agents/builder.md`).
- **CI**: `check:readiness` (`scripts/check-readiness.mjs`) **rompe el build** si hay código en `adapters/`
  con `figmaIngested != true`, tokens en `TODO`, o un `[PLACEHOLDER]` sin resolver.

## Por qué existe
Construir sobre un design system vacío produce deriva (dos tipografías, imágenes irrelevantes, espaciados rotos).
La consistencia del framework **depende** de poblar el DS desde Figma ANTES de construir. Este gate lo garantiza.
