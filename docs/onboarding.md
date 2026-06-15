# Onboarding — guion de arranque (lo ejecuta el agente)

Objetivo: configurar una instancia nueva del framework de forma interactiva. Lo dispara `START-HERE.md`.

## Paso 0 — ⛔ Gate Figma-MCP-first (bloqueante)

Antes del intake, **verifica que tienes alguna capacidad de Figma** (MCP/skill que lea variables, componentes y
screenshots — el nombre de la tool varía: `get_variable_defs`/`get_design_context`, `use_figma`/`figma-use`, etc.).
- ❌ Si **no** la tienes: **DETENTE**. No sigas con el intake ni con nada más. Pide al usuario:
  > "Conecta **Figma** (MCP o skill) y dame acceso al **UI Kit**; sin eso no puedo poblar el design system ni construir."
- ✅ Si lo tienes: continúa. La ingesta de Figma la hace **este** agente (el que corre el sistema), no se delega ni se inventa.

## Paso 1 — Intake interactivo

Pregunta al usuario (usa preguntas estructuradas si tu herramienta lo permite) y recoge:

| Dato | Clave en `project.json` | Notas |
|---|---|---|
| Nombre del proyecto | `name` | kebab-case |
| Figma UI Kit (design system visual) | `figma.uiKit` | requerido |
| Figma Home | `figma.home` | requerido |
| Figma páginas internas ya creadas | `figma.internalPages[]` | 0..n links |
| Figma export de Relume (sitemap + contenido) | `figma.relumeExport` | link al archivo de Figma con el export |
| Plataforma de deployment | `platform` | `hubspot` \| `wordpress` |

Reglas del intake:
- Si falta un dato **requerido**, vuelve a preguntar; no inventes links.
- `internalPages` puede quedar vacío (proyecto solo con home).
- Confirma la plataforma: hoy solo `hubspot` o `wordpress`.

## Paso 2 — Escribir `project.json`

Genera/actualiza `project.json` con lo recogido. Ejemplo:
```json
{
  "name": "mi-proyecto",
  "platform": "hubspot",
  "figma": {
    "uiKit": "https://figma.com/design/…",
    "home": "https://figma.com/design/…",
    "internalPages": ["https://figma.com/design/…"],
    "relumeExport": "https://figma.com/design/…"
  },
  "canonicalReference": "specs/home.md"
}
```

## Paso 3 — Activar el adapter

- Deja activo solo `adapters/<platform>/`. Marca los demás como inactivos (no se borran: el template los conserva).
- Lee `docs/platforms/<platform>.md`.

## Paso 4 — Ingesta (rol ingestor)

Asegura el acceso al archivo de Figma (desktop o URL, según tu integración). Luego, siguiendo `ingestion/figma.md` y `ingestion/relume.md`:
1. UI Kit → `design/01-tokens.md` (2 capas) + inventario en `design/components/*.md`.
2. Home + páginas internas → `specs/home.md` + `specs/<pagina>.md`.
3. Export de Relume (en Figma) → `specs/sitemap.md` + specs por página (contenido/copy).
4. **Solo cuando tokens/foundations/componentes del home quedaron poblados (sin `TODO`)**: pon `project.json → status.figmaIngested = true`. Esto **desbloquea** la construcción (`docs/readiness.md`). No lo marques antes.

## Paso 5 — Inicializar la memoria del proyecto

- Llena `MEMORY.md → Estado actual` con: nombre/objetivo del proyecto, plataforma, qué se pobló y qué quedó pendiente.
- Registra en `MEMORY.md → Decisiones` las decisiones tomadas en el onboarding (plataforma, fuentes, etc.).

## Paso 6 — Resumen y siguiente paso

- Reporta qué se pobló y qué quedó como `TODO` (lo no legible en Figma).
- Propón el primer componente a construir (normalmente uno presente en el home).
- Recuerda al usuario el flujo: `director → builder → validator → revisión humana`.
