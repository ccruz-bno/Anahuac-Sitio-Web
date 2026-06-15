# Assets — iconos, imágenes, fuentes

Dónde viven los recursos y cómo se administran (incluido el auto-admin en la plataforma).

## Iconos
- Set canónico en `assets/icons/` (SVG, kebab-case: `arrow-right.svg`).
- En componentes se referencian por nombre (campo `choice`), nunca pegando SVG suelto.
- El UI Kit incluye el set completo de Ant Design icons (700+ iconos). Para el sitio se usan principalmente:
  - `arrow-right`, `arrow-left`, `arrow-down`
  - `menu-fold`, `menu-unfold` (hamburger)
  - `close`, `plus`, `minus`
  - `check`, `play-circle`

## Imágenes
- Originales optimizados; formatos modernos (WebP/AVIF) donde se pueda.
- Editables por contenido vía el field `image` del componente (no incrustadas en CSS).
- Plataforma: HubSpot File Manager administra las subidas del equipo.

### Política de imágenes (obligatoria)
- **Apropiadas al dominio del proyecto** — universidad, campus, estudiantes, actividades. Nada de stock genérico.
- **Placeholders explícitos:** si aún no hay imagen final, usa un marcador `[PLACEHOLDER]`.
- **`alt` obligatorio** y descriptivo (accesibilidad).
- La pertinencia de la imagen se revisa en la **capa de revisión humana** (`docs/human-review.md`).

## Fuentes
- **Zilla Slab** (Google Fonts) — headings: weights 500 (Medium), 600 (SemiBold), 700 (Bold).
- **Roboto** (Google Fonts) — body: weights 400 (Regular), 500 (Medium), 600 (SemiBold).
- Cargar una sola vez a nivel theme (no por página). Definir como tokens de tipografía en `design/01-tokens.md`.
- Precargar vía `<link rel="preconnect" href="https://fonts.googleapis.com">`.

## Reglas
- Ningún asset hardcodeado en una página: imágenes vía field, iconos vía set, fuentes vía theme.
- Naming consistente (`docs/naming.md`).
