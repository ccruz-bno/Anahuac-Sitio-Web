# Receta de página

Guía de cómo se ensambla una página a partir de componentes del inventario y patrones base.

> Poblado desde el Home y el sitemap — ingesta 2026-06-08.

## Plantilla general

Toda página se compone de esta estructura:

```
┌─────────────────────────────────────────┐
│ Header (global)                         │
│   Logo + Nav + Búsqueda + CTA           │
├─────────────────────────────────────────┤
│ Hero / Encabezado de página             │
│   (varía por tipo de página)            │
├─────────────────────────────────────────┤
│ Sección 1                               │
│   (patrón: estándar / split / grid)     │
├─────────────────────────────────────────┤
│ Sección 2                               │
│   (patrón: estándar / scroller / bento) │
├─────────────────────────────────────────┤
│ …                                       │
├─────────────────────────────────────────┤
│ CTA Section                             │
│   (opcional: contacto / solicita info)  │
├─────────────────────────────────────────┤
│ Footer (global)                         │
│   Logo + Enlaces + Legal                │
└─────────────────────────────────────────┘
```

## Tipos de Hero por nivel

| Nivel | Hero | Páginas ejemplo |
|---|---|---|
| Home (L0) | Hero completo (tagline + H1 + grid de imágenes) | Home |
| Sección principal (L1) | Hero con fondo + H1 + descripción | Oferta Académica, Admisiones |
| Sub-página (L2) | Hero compacto (H1 + breadcrumb) | Área Académica, Admisión General |
| Detalle (L3) | Header de contenido (H1 + metadata) | Programa de Licenciatura |

## Secciones reutilizables (del inventario)
Combinaciones comunes usadas en múltiples páginas. El `director` las asigna al crear un spec de página.

1. **Estadísticas** → `stats-section` (counters)
2. **Grid de tarjetas** → `card-grid` + `area-card` / `event-card` / `step-card`
3. **Dos columnas** → `feature-section` (contenido + imagen)
4. **Testimonios** → `story-card` en bento grid
5. **CTA de contacto** → `cta-section` + degradado
6. **Scroller horizontal** → `scroller` + `area-card`

## Reglas de composición
- Nunca más de 2 secciones seguidas con el mismo fondo (alternar superficie clara/oscura/acento).
- CTA al final de página (antes del footer) si la página tiene objetivo de conversión.
- El Hero siempre lleva safe-area (`padding-top ≥ --nav-height`) para el menú fijo.
- El ritmo vertical entre secciones es uniforme (`--space-12` = 80px).
