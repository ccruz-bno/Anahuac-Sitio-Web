# Página: Home (referencia canónica)

> ⭐ El home es la **referencia canónica**: toda página interna se valida contra esta.
> Documentado desde el Figma Home (`7pUOJfWkK75c7BBlZCHMft`) — ingesta 2026-06-08.

## Meta
- Ruta: `/`
- Estado: `documentado` (referencia canónica)
- Plataforma: HubSpot (`project.json → platform`)

## Secciones (en orden)

| # | Sección | Componentes | Notas |
|---|---|---|---|
| 1 | **Hero** | `header` (menú + logo + nav), hero con tagline + heading + grid de imágenes/videos | Fondo con gráficos SVG decorativos. Menú con borde naranja y borderRadius 20px. Grid de imágenes hero con efecto. |
| 2 | **Prestigio Anáhuac** | Sección de estadísticas con counters animados + imagen | Números destacados (alumnos, ranking, etc.) con counter animation. Título H2. |
| 3 | **Comienza Tu Camino** | Cards de proceso de admisión | Contenedor con contenido informativo + CTA de admisiones. |
| 4 | **Explora Nuestras Licenciaturas** | Grid/cuadrícula de áreas académicas + scroller horizontal | Cards de áreas académicas (8 áreas). Navegación con flechas (Nav). |
| 5 | **Por qué ser un León Anáhuac** | Sección de beneficios/características con imagen | Layout de dos columnas: contenido + imagen. |
| 6 | **Historias Anáhuac** | Grid de testimonios/historias de estudiantes | Bento grid con historias/testimoniales. |
| 7 | **El Siguiente Paso** | Cards de pasos de admisión | Sección de pasos con CTA para iniciar el proceso. |
| 8 | **Nuestros Eventos** | Cards de eventos con filtros + paginación | Contenedor con 3 sub-contenidos: filtros, grid de eventos, paginación. |
| 9 | **Dudas** | CTA de contacto + imagen + degradado decorativo | Sección con fondo degradado de puntos, imagen y contenido de contacto. |
| 10 | **Footer** | Footer global con enlaces, logo, redes sociales, legales | Contenedor con: logo + info, línea divisora, enlaces por categoría, derechos. |

## Layout observado (Desktop)
- Contenedor centrado ~1280px con padding horizontal 80px.
- Secciones con padding vertical generoso (80–120px).
- Fondo base blanco con gráficos SVG decorativos de fondo.
- Menú fijo superior con logo + barra de navegación + búsqueda.

## Tokens y patrones que establece
- Tokens: ver `design/01-tokens.md`.
- Patrones: ver `design/03-patterns.md`.
- Tipografía: Zilla Slab (headings), Roboto (body) — ver `design/assets.md` / `design/01-tokens.md`.
- Motion: scroll reveal, counters animados, hover effects — ver `design/interactions.md`.

## Componentes identificados (para inventariar)
1. `header` — Logo + navegación + búsqueda + CTA (global)
2. `hero` — Tagline + H1 + grid de imágenes/videos
3. `stats-section` — Estadísticas con counters animados
4. `path-card` — Cards de proceso/camino
5. `area-card` — Cards de áreas académicas (8 variantes)
6. `feature-section` — Sección de beneficios con imagen
7. `story-card` — Tarjetas de testimonios/historias (bento grid)
8. `step-card` — Cards de pasos de admisión
9. `event-card` — Tarjetas de eventos con filtros
10. `cta-section` — Sección CTA de contacto/dudas
11. `footer` — Footer global con enlaces (global)
