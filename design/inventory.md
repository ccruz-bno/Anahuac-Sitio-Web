# Inventario de componentes

Base del análisis de impacto: componente ↔ páginas. **Mantener al día en cada cambio.**

> Poblado desde el UI Kit de Figma y el Home — ingesta 2026-06-08.

## Componentes globales (aparecen en todas las páginas)

| Componente | Spec | Estado | Páginas |
|---|---|---|---|
| `header` | `design/components/header.md` | pendiente | todas |
| `footer` | `design/components/footer.md` | pendiente | todas |

## Componentes de sección

| Componente | Spec | Estado | Páginas |
|---|---|---|---|
| `hero` | `design/components/hero.md` | pendiente | Home |
| `stats-section` | `design/components/stats-section.md` | pendiente | Home, Descubre Anáhuac |
| `path-card` | `design/components/path-card.md` | pendiente | Home |
| `area-card` | `design/components/area-card.md` | pendiente | Home, Oferta Académica |
| `feature-section` | `design/components/feature-section.md` | pendiente | Home, Descubre Anáhuac |
| `story-card` | `design/components/story-card.md` | pendiente | Home |
| `step-card` | `design/components/step-card.md` | pendiente | Home, Admisiones |
| `event-card` | `design/components/event-card.md` | pendiente | Home |
| `cta-section` | `design/components/cta-section.md` | pendiente | Home |

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
> Los botones grandes tienen padding `15px 40px`, los medianos `12px 40px`.

## Leyenda de estado
- `pendiente` — identificado, falta documentar el contrato de fields.
- `documentado` — contrato listo en `design/components/*.md`.
- `construido` — materializado en el adapter (HubSpot).
- `validado` — pasó reporte del validator sin bloqueantes.
