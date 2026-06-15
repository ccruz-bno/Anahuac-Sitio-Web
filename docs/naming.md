# Taxonomía de nombres

Convención estricta para que agentes de **cualquier modelo** (Claude, Codex…) nombren igual y no haya deriva.

## Componentes
- Nombre en **kebab-case**, sustantivo singular: `card`, `navigation`, `hero`, `event-carousel`.
- Variantes como sufijo de modificador: `card--featured` (clase), variante `featured` (contrato).
- Un componente = un archivo `design/components/<nombre>.md`.

## Clases CSS — BEM (como el home)
- Bloque: `.card`; Elemento: `.card__title`; Modificador: `.card--featured`.
- Si una fuente (Figma/home importado) trae clases no-BEM, normalízalas a esta convención y regístralo en `design/CHANGELOG.md`.

## Tokens
- Primitivos: por valor → `--<familia>-<n>`: `--purple-2`, `--orange`.
- Semánticos: por **rol** → `--<categoría>-<rol>`: `--color-brand-primary`, `--surface-accent`, `--cta-bg`, `--motion-duration`.
- Nunca un componente usa un primitivo directo; solo semánticos.

## Archivos y carpetas
- Docs en kebab-case `.md`. Specs de página: `specs/<slug>.md`.
- Módulos HubSpot: `<nombre>.module/`. Bloques WP: `blocks/<nombre>/`. Componentes Astro: `<PascalCase>.astro`.

## Git
- Ramas: `feat/<componente-o-pagina>`, `fix/…`, `chore/…`, `design/<cambio-de-sistema>`.
- Commits: español, imperativo, con alcance → `feat(card): variante featured`.

## Idioma
- Contenido/documentación: español. Identificadores de código (clases, tokens, archivos): inglés kebab/Pascal según tabla. Consistencia > preferencia.
