# Fundaciones de layout

Reglas de grid, contenedor y breakpoints. Poblado desde el Figma UI Kit en el onboarding (2026-06-08).

## Contenedor
- `--container: 1280px` (ancho máximo de contenido centrado, observado 1240–1280px en Figma).

## Escala de espaciado (obligatoria)
- Ver `design/01-tokens.md` — escala completa: `--space-1` (4px) … `--space-14` (120px).
- Todo padding/margin sale de la escala; nada de px sueltos.

## Espaciado de sección y ritmo vertical
- `--section-pad-y: var(--space-12)` → `80px` (padding vertical uniforme entre secciones).
- Regla: ninguna sección pega su contenido contra otra; el ritmo vertical es consistente.
- El UI Kit muestra padding de sección principal entre 80px y 120px; se normaliza a 80px como mínimo.

## Navegación fija — safe area (evita el hero recortado)
- `--nav-height: 80px` (alto estimado del header fijo, basado en la composición del home).
- Regla dura: el **hero** (y cualquier contenido bajo un nav fijo) compensa con `padding-top` ≥ `--nav-height`.
  **Nunca** texto/encabezado pegado o tapado por el nav.

## Breakpoints

| Nombre | Ancho | Notas |
|---|---|---|
| desktop | ≥ `1180px` | Layout completo, grid multi-columna |
| tablet | `641px – 1179px` | Adaptación intermedia, grid reducido |
| mobile | ≤ `640px` | Layout vertical, una columna |

## Grid
- Desktop: contenedor centrado 1280px max, padding horizontal 80px.
- Tarjetas: grid de 3–4 columnas en desktop, 2 en tablet, 1 en mobile.
- Gap entre tarjetas: `--space-7` (20px) a `--space-9` (30px).

## Motion
- El motion del sitio se define en `design/interactions.md` (con tokens de duración/easing). No incrustar valores sueltos.
