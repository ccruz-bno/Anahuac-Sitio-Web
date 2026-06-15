# Patrones

Cómo se combinan los componentes en composiciones recurrentes. Reutilizar patrones = consistencia entre páginas.

> Poblado desde el Home de Figma — ingesta 2026-06-08.

## Inventario de patrones

| Patrón | Composición | Clases / notas |
|---|---|---|
| Sección estándar | Contenedor centrado (max 1280px) + padding vertical uniforme (80px) + contenido | `.section` — ritmo vertical consistente entre secciones |
| Sección con fondo | Sección estándar + fondo de color (surface-dark, surface-accent) | `.section--dark`, `.section--accent` |
| Grid de tarjetas | Contenedor + grid 3–4 columnas desktop, 2 tablet, 1 mobile + gap 20–30px | `.card-grid` — responsive con breakpoints del DS |
| Sección dos columnas | Contenedor + 2 columnas (contenido + imagen/visual) | `.section--split` — usado en "Por qué ser León", "Dudas" |
| Sección con scroller | Contenedor + strip horizontal scrolleable + navegación (flechas + dots) | `.scroller` — usado en "Explora Nuestras Licenciaturas" |
| Sección con filtros | Contenedor + barra de filtros (tags) + grid de resultados + paginación | `.filterable` — usado en "Nuestros Eventos" |
| Hero principal | Menú fijo + tagline + H1 + grid de imágenes/videos a pantalla completa | `.hero` — solo en Home |
| Bento grid | Contenedor + grid asimétrico de tarjetas de diferentes tamaños | `.bento-grid` — usado en "Historias Anáhuac" |
| CTA section | Contenedor + fondo decorativo (degradado/puntos) + imagen + contenido + botón CTA | `.cta-section` — usado en "Dudas" |

## Reglas
- Una página interna se arma **combinando patrones existentes**, no inventando layouts.
- Si una composición se repite, promuévela a patrón aquí y registra en `design/CHANGELOG.md`.
