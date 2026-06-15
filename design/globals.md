# Globales

Elementos que aparecen en **todas** las páginas (header/footer). Cambiarlos impacta todo el sitio.

> Poblado desde el Home de Figma — ingesta 2026-06-08.

## Header (`header`)

### Estructura
- **Logo:** Logo Anáhuac México (SVG) — esquina superior izquierda.
- **Barra de navegación:** Links principales (Descubre Anáhuac, Oferta Académica, Admisiones, Costos y Becas, Vida Universitaria).
- **Búsqueda:** Icono de búsqueda (search).
- **CTA:** Botón "Solicita Información" (btn-sm, primary orange).
- **Mobile:** Logo + icono hamburger (menu-fold/unfold).

### Tokens aplicados
- Fondo: transparente con blur (glassmorphism) + borde naranja (`--color-brand-primary`).
- Border radius: `--radius-md` (20px).
- Stroke: `Naranja Anáhuac` 2px.
- Tipografía nav links: `--font-body` (Roboto), weight 400/500.
- Posición: fija, z-index alto. Safe area: `--nav-height: 80px`.

### Versiones
- **Desktop:** logo + nav links + búsqueda + CTA.
- **Mobile:** logo + hamburger icon → menú slide.

## Footer (`footer`)

### Estructura
- **Contenido 1:** Logo + información institucional.
- **Line 1:** Línea divisoria horizontal.
- **Enlaces:** Agrupados por categoría:
  - Programas (Oferta académica, Áreas, etc.)
  - Admisiones
  - Contacto
  - Legal
  - Redes sociales
- **Derechos:** Texto legal de copyright.

### Tokens aplicados
- Fondo: `--surface-dark` (negro).
- Texto: `--color-text-invert` (blanco).
- Links: `--color-text-invert` con hover → `--color-brand-primary`.
- Tipografía: `--font-body` (Roboto).

## Reglas
- Cualquier cambio a un global es **potencialmente destructivo** (impacta todas las páginas).
- Antes de modificar, análisis de impacto obligatorio (ver `docs/change-protocol.md`).
