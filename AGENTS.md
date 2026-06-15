# AGENTS.md — Instrucciones maestras entre agentes

> Este archivo es la fuente de instrucciones para **cualquier agente de IA** (Claude, Codex, Cursor, Copilot…)
> que trabaje en este repositorio. Es model-agnostic: ninguna herramienta queda casada con el proyecto.
> Cada herramienta tiene solo un adaptador delgado (`CLAUDE.md`, `.cursor/`, `.github/`) que apunta aquí.

## 0. Antes de tocar nada

0. **⛔ GATE FIGMA-FIRST.** Si el design system no está ingestado (`project.json → status.figmaIngested != true` o `design/01-tokens.md` con `TODO`): lo ÚNICO permitido es ingestar Figma. Requiere **alguna capacidad de Figma** (MCP o skill que lea variables/componentes/screenshots; el nombre de la tool varía por integración). **Si no la tienes, DETENTE** y pide al usuario darte acceso al UI Kit. Prohibido inventar tokens, improvisar diseño o construir. Ver `docs/readiness.md`.
0b. **¿Proyecto sin configurar?** (no existe `project.json` poblado) → sigue **`START-HERE.md`** y ejecuta el onboarding (`docs/onboarding.md`) antes de cualquier otra cosa.
1. Lee `project.json` → conoce la `platform` de este proyecto y sus fuentes (`figma`). Lee `MEMORY.md` → estado y decisiones acumuladas del proyecto.
2. Lee el rol que te corresponde en `docs/agents/` (ingestor · director · builder · validator).
3. Lee `docs/workflow.md` (cómo colaboramos), `docs/platforms/<platform>.md` (cómo construir), `docs/change-protocol.md` (cómo cambiar sin romper), `docs/human-review.md` (la capa de revisión humana) y `docs/naming.md` (taxonomía).
4. Antes de tocar un componente, consulta `design/inventory.md` (qué existe y qué páginas lo usan) y los globales en `design/globals.md`.

## 1. Jerarquía de verdad (NO la rompas)

```
Figma UI Kit  →  design/01-tokens.md  →  adapters/<platform>/<theme tokens>
                 design/components/*.md  →  adapters/<platform>/<componente>
Relume        →  specs/sitemap.md  →  specs/<pagina>.md
```

Un valor o componente "más arriba" manda sobre uno "más abajo". Si hay conflicto, gana la fuente superior y se corrige hacia abajo — nunca al revés.

## 2. Reglas no negociables

- **No se construye sin design system poblado.** Respeta el gate de `docs/readiness.md` (Figma ingestado, sin `TODO`, sin `[PLACEHOLDER]`). El CI lo verifica con `check:readiness`.
- **Nunca hardcodees** color, espaciado, radio, **tipografía** o sombra. Usa **tokens semánticos** (`design/01-tokens.md`). Todo encabezado usa `--font-heading` + un nivel de la escala; el cuerpo `--font-body`. El CI lo verifica (`check:tokens` + Stylelint, ver `docs/ci.md`): un hardcode **rompe el build**.
- **Imágenes con criterio.** Apropiadas al dominio del proyecto; nada de stock irrelevante. Todo placeholder se marca `[PLACEHOLDER]` y **nunca se mergea** (ver `design/assets.md`).
- **Mantén `design/inventory.md` al día** (componente ↔ páginas) en cada cambio: es la base del análisis de impacto.
- **Registra en `MEMORY.md`** las decisiones, preferencias del proyecto y aprendizajes conforme avanzas (con fecha + origen). No dupliques: cambios del design system van a `design/CHANGELOG.md`, contenido a `specs/`.
- **Antes de crear un componente, busca si ya existe** en `design/components/`. Reutiliza; no dupliques.
- **Un componente = una fuente única.** En cada plataforma se materializa una sola vez (módulo / bloque / componente) y todas las páginas lo reutilizan.
- **Separa editable de bloqueado.** Cada componente declara qué puede tocar el equipo de contenido (fields) y qué está bloqueado por diseño (tokens, layout). Ver `design/components/_template.md`.
- **El home es la referencia canónica.** Toda página interna se valida contra él, no contra el gusto del momento.
- **Cambios no destructivos por defecto.** Nunca sobrescribas un componente/token/patrón **compartido** en silencio. Si un ajuste podría romper algo que otras páginas usan, **DETENTE y pregunta**, ofreciendo guardarlo como **variante** o **componente nuevo** antes que cambiar la base. Detalle completo en `docs/change-protocol.md`.
- **Toda página pasa por revisión humana** antes del merge (`docs/human-review.md`). Las instrucciones humanas aceptadas se promueven a documentos base.
- **Ningún cambio se da por hecho sin pasar el validator** (ver Definición de Hecho).

## 3. Roles (resumen — detalle en `docs/agents/`)

| Rol | Hace | NO hace |
|---|---|---|
| **ingestor** | Extrae de Figma (tokens/componentes) y Relume (sitemap/contenido) → `design/` + `specs/` | No implementa código de plataforma |
| **director** | Convierte una necesidad en `specs/<pagina>.md`; decide qué reutilizar y qué falta | No escribe código de producción |
| **builder** | Implementa en `adapters/<platform>/` usando solo tokens + componentes existentes | No inventa colores ni componentes sin aprobación del director |
| **validator** | Audita consistencia vs `design/` + home, contrato de fields y accesibilidad. Reporta. | No edita: solo reporta |

## 4. Definición de Hecho (Definition of Done)

Un componente o página se puede mergear solo si:

- [ ] Usa exclusivamente tokens semánticos (cero valores hardcodeados).
- [ ] Reutiliza componentes existentes donde aplica.
- [ ] Declara su contrato de fields (editable vs bloqueado) y este se materializó en el adapter.
- [ ] Es visualmente consistente con el home / referencia canónica.
- [ ] Pasa accesibilidad básica (contraste, foco, jerarquía semántica).
- [ ] Ningún cambio destructivo se aplicó sin permiso explícito; las variantes nuevas quedaron documentadas.
- [ ] Las instrucciones de revisión humana aceptadas se promovieron a documentos base y se registraron en `design/CHANGELOG.md`.
- [ ] El validator emitió reporte sin hallazgos bloqueantes.
- [ ] Pasó la revisión humana (`docs/human-review.md`).

## 5. Convenciones model-agnostic

- Documentación y roles en **markdown neutral**, sin marca de modelo en el contenido.
- El único archivo con nombre de herramienta es su adaptador (`CLAUDE.md`, etc.), de una línea.
- Commits/PRs siguen `docs/workflow.md`. Mensajes en español, imperativos, con el alcance: `feat(card): …`.
