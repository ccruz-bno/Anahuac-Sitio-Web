# Inventario de componentes

Base del análisis de impacto: componente ↔ páginas. **Mantener al día en cada cambio.**

> Poblado desde el UI Kit de Figma y el Home — ingesta 2026-06-08.

> **Build HubSpot (2026-07-03):** Home materializado en `adapters/hubspot/theme/` — 1 módulo por sección, todo editable, tokens semánticos (cero hardcode). El contrato de fields de cada componente vive en el `fields.json` de su módulo (aún no volcado a `design/components/*.md`).

## Componentes globales (aparecen en todas las páginas)

| Componente | HubSpot module | Estado | Páginas |
|---|---|---|---|
| `header` | `header.module` (global) | construido | todas |
| `footer` | `footer.module` (global) | construido | todas |

## Componentes de sección

| Componente | HubSpot module | Estado | Páginas |
|---|---|---|---|
| `hero` | `hero.module` | construido | Home |
| `stats-section` | `prestige.module` | construido | Home, Descubre Anáhuac |
| `path-card` | `path.module` | construido | Home |
| `area-card` | `programs.module` | construido | Home, Oferta Académica |
| `feature-section` | `experience.module` | construido | Home, Descubre Anáhuac |
| `story-card` | `stories.module` | construido | Home |
| `step-card` | `next-step.module` | construido | Home, Admisiones |
| `event-card` | `events.module` | construido | Home |
| `cta-section` | `questions.module` | construido | Home |
| `test-vocacional` | `test-vocacional.module` | construido | Test Vocacional (`specs/test-vocacional.md`) — datos provisionales; desempate rehecho 2026-11-12 (registro Product); jerarquía del resultado invertida 2026-11-13; validator con bloqueantes abiertos |

## Componentes atómicos (UI Kit)

| Componente | Spec | Estado | Usado por |
|---|---|---|---|
| `btn-lg` | `design/components/btn.md` | pendiente | header, hero, cta-section, step-card, path-card |
| `btn-md` | `design/components/btn.md` | pendiente | event-card, area-card |
| `btn-sm` | `design/components/btn.md` | pendiente | tags, filtros |
| `enlace` | `design/components/enlace.md` | pendiente | footer, nav |
| `slider-arrow` | `design/components/slider-arrow.md` | pendiente | area-card scroller |
| `checkbox` | `design/components/checkbox.md` | pendiente | formularios |

## Variantes de botón (del UI Kit)

| Variante | Fill | Text | Border | Notas |
|---|---|---|---|---|
| Primary (dark) | Negro | Blanco | — | Botón principal estándar |
| Primary (orange) | Naranja Anáhuac | Blanco | — | CTA destacado |
| Outline (dark) | Transparente | Negro | Negro 2px | Botón secundario |
| Outline (white) | Transparente | Blanco | Blanco 2px | Sobre fondo oscuro |
| Ghost | Transparente | Negro | — | Botón texto |
| Icon only | Negro/Transparente | — | — | Solo icono |
| With icon | Negro | Blanco | — | Texto + icono (left o right) |
| Dropdown | Negro | Blanco | — | Texto + chevron |

> Todas las variantes usan `borderRadius: 10px` (`--radius-button`).
> Peso **700** desde 2026-11-12 (antes 600): con 600 el blanco sobre naranja no alcanzaba
> AA. En móvil el cuerpo mínimo es `--heading-5-size` por la misma razón. Ver CHANGELOG.
> Los botones grandes tienen padding `15px 40px`, los medianos `12px 40px`.

## Leyenda de estado
- `pendiente` — identificado, falta documentar el contrato de fields.
- `documentado` — contrato listo en `design/components/*.md`.
- `construido` — materializado en el adapter (HubSpot).
- `validado` — pasó reporte del validator sin bloqueantes.
