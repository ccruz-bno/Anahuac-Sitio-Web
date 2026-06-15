# Tokens

Dos capas. Los componentes y adapters usan **solo la capa semántica**; nunca primitivos crudos ni valores sueltos.

> Poblado desde el Figma UI Kit (`Xn92P26S9mq9xYsHyoPUjz`) — ingesta 2026-06-08.

## Capa 1 — Primitivos (el valor crudo)

### Colores primarios (institucionales)

| Token | Valor | Nombre Figma |
|---|---|---|
| `--orange` | `#FF5900` | Naranja Anáhuac |
| `--brown` | `#6B3F23` | Café Anáhuac |
| `--black` | `#000000` | Negro |
| `--white` | `#FFFFFF` | Blanco |

### Colores secundarios — Morada monocromática

| Token | Valor | Nombre Figma |
|---|---|---|
| `--purple-1` | `#432F64` | Secundaria - Morada/Jacarta |
| `--purple-2` | `#5D428C` | Secundaria - Morada/Butterfly Bush |
| `--purple-3` | `#9267DC` | Secundaria - Morada/Medium Purple |
| `--lilac-1` | `#B99EE8` | Secundaria - Morada/Biloba Flower |
| `--lilac-2` | `#CDB9EF` | Secundaria - Morada/Biloba Flower 1 |

### Colores de acento

| Token | Valor | Nombre Figma |
|---|---|---|
| `--accent-red` | `#EA2828` | Acentos/Cinnabar |
| `--accent-yellow` | `#FFDA00` | Acentos/School bus Yellow |
| `--accent-blue` | `#0F66AB` | Acentos/Denim |
| `--accent-grape` | `#3A164C` | Acentos/Grape |
| `--accent-korma` | `#85390E` | Acentos/Korma |
| `--accent-tuatara` | `#282726` | Acentos/Tuatara |

### Otros colores del sistema

| Token | Valor | Nombre Figma |
|---|---|---|
| `--black-web` | `#0C1115` | Black Web |
| `--text-gray` | `#788592` | Texto |

### Tipografía (obligatoria — una sola familia por rol)

| Token | Valor | Uso |
|---|---|---|
| `--font-heading` | `"Zilla Slab", serif` | **Todos** los encabezados (h1–h6), botones, frases destacadas. |
| `--font-body` | `"Roboto", sans-serif` | Texto de cuerpo, párrafos, UI labels. |

> Nota: la tipografía principal original del brand es **Sharp Slab** (comercial, requiere licencia).
> La alternativa de código abierto oficial es **Zilla Slab** — esta es la que se usa en la implementación digital.

### Escala tipográfica (headings — Zilla Slab)

| Token | Font | Weight | Size | Line-height | Letter-spacing | Notas |
|---|---|---|---|---|---|---|
| `--heading-1` | Zilla Slab | 600 (SemiBold) | 75px | 100% | — | H1 |
| `--heading-2` | Zilla Slab | 600 (SemiBold) | 48px | 110% | — | H2 |
| `--heading-3` | Zilla Slab | 600 (SemiBold) | 40px | 110% | — | H3 |
| `--heading-4` | Zilla Slab | 500 (Medium) | 24px | 120% | 0.83% | H4 |
| `--heading-5` | Zilla Slab | 500 (Medium) | 20px | 120% | 1% | H5 |
| `--heading-6` | Zilla Slab | 500 (Medium) | 18px | 140% | 1.11% | H6 |

### Escala tipográfica (cuerpo — Roboto)

| Token | Font | Weight | Size | Line-height | Letter-spacing | Notas |
|---|---|---|---|---|---|---|
| `--paragraph` | Roboto | 400 (Regular) | 16px | 160% | 1.25% | Cuerpo de texto principal |

### Escala tipográfica (especiales)

| Token | Font | Weight | Size | Line-height | Letter-spacing | Notas |
|---|---|---|---|---|---|---|
| `--frase` | Zilla Slab | 500 Italic | 37px | 140% | — | Frases destacadas (italic) |
| `--btn-large` | Zilla Slab | 600 (SemiBold) | 27px | 100% | 0.37% | Texto de botón grande |
| `--btn-medium` | Zilla Slab | 600 (SemiBold) | 21px | 100% | 0.95% | Texto de botón mediano |

### Espaciado

> Escala extraída del UI Kit (paddings/gaps observados en componentes y secciones).

| Token | Valor |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `10px` |
| `--space-4` | `12px` |
| `--space-5` | `15px` |
| `--space-6` | `16px` |
| `--space-7` | `20px` |
| `--space-8` | `24px` |
| `--space-9` | `30px` |
| `--space-10` | `40px` |
| `--space-11` | `60px` |
| `--space-12` | `80px` |
| `--space-13` | `100px` |
| `--space-14` | `120px` |

### Layout — Grid de 12 columnas (Figma)

| Token | Valor | Descripción |
|---|---|---|
| `--grid-columns` | `12` | Número de columnas |
| `--grid-column-width` | `85px` | Ancho de cada columna |
| `--grid-gutter` | `20px` | Separación entre columnas (gutter) |
| `--grid-margin` | `20px` | Margen interior a cada costado del contenedor |
| `--container` | `1280px` | Ancho total: (12 × 85) + (11 × 20) + (2 × 20) |
| `--section-pad-y` | `100px` | Padding vertical de cada sección |
| `--section-pad-x` | `80px` | Padding horizontal de cada sección |

### Radios

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | `10px` | Botones, chips, tarjetas internas |
| `--radius-md` | `20px` | Tarjetas, swatches, contenedores medianos |
| `--radius-lg` | `40px` | Secciones mayores, contenedores principales |

## Capa 2 — Semánticos (el rol; esto es lo que se usa)

Nombrar por **rol**, no por valor (ver `docs/naming.md`).

| Token semántico | → Primitivo | Uso |
|---|---|---|
| `--color-brand-primary` | `var(--orange)` | Acentos de marca, CTAs principales, hover |
| `--color-brand-secondary` | `var(--brown)` | Café institucional, acentos secundarios |
| `--surface` | `var(--white)` | Fondo base de superficies |
| `--surface-dark` | `var(--black)` | Fondo oscuro (hero, secciones destacadas) |
| `--surface-accent` | `var(--purple-1)` | Fondo de sección destacada (púrpura) |
| `--surface-accent-light` | `var(--lilac-2)` | Fondo de sección con acento ligero |
| `--color-text` | `var(--black)` | Texto principal |
| `--color-text-secondary` | `var(--text-gray)` | Texto secundario/descriptivo |
| `--color-text-invert` | `var(--white)` | Texto sobre fondo oscuro/marca |
| `--cta-bg` | `var(--color-brand-primary)` | Fondo de botón primario |
| `--cta-text` | `var(--color-text-invert)` | Texto de botón primario |
| `--cta-bg-dark` | `var(--black)` | Fondo de botón dark |
| `--cta-bg-purple` | `var(--purple-2)` | Fondo de botón morado |
| `--radius` | `var(--radius-md)` | Radio estándar (20px) |
| `--radius-button` | `var(--radius-sm)` | Radio de botones (10px) |
| `--radius-section` | `var(--radius-lg)` | Radio de secciones grandes (40px) |

## Mapeo a plataformas

| Capa | HubSpot | WordPress (FSE) | Astro |
|---|---|---|---|
| Primitivos | `theme.json` style fields | `theme.json` settings (palette/spacing) | `tokens.css` / tailwind config |
| Semánticos | `css/tokens.css` (var() sobre theme settings) | `css/tokens.css` | `src/styles/tokens.css` |

## Referencia CSS (estructura de las dos capas)

```css
:root {
  /* === PRIMITIVOS (valores reales desde Figma UI Kit) === */

  /* Primarios (institucionales) */
  --orange: #FF5900;
  --brown: #6B3F23;
  --black: #000000;
  --white: #FFFFFF;

  /* Secundarios — morada monocromática */
  --purple-1: #432F64;
  --purple-2: #5D428C;
  --purple-3: #9267DC;
  --lilac-1: #B99EE8;
  --lilac-2: #CDB9EF;

  /* Acentos */
  --accent-red: #EA2828;
  --accent-yellow: #FFDA00;
  --accent-blue: #0F66AB;
  --accent-grape: #3A164C;
  --accent-korma: #85390E;
  --accent-tuatara: #282726;

  /* Otros */
  --black-web: #0C1115;
  --text-gray: #788592;

  /* Tipografía */
  --font-heading: "Zilla Slab", serif;
  --font-body: "Roboto", sans-serif;

  /* Espaciado */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 10px;
  --space-4: 12px;
  --space-5: 15px;
  --space-6: 16px;
  --space-7: 20px;
  --space-8: 24px;
  --space-9: 30px;
  --space-10: 40px;
  --space-11: 60px;
  --space-12: 80px;
  --space-13: 100px;
  --space-14: 120px;

  /* Radios */
  --radius-sm: 10px;
  --radius-md: 20px;
  --radius-lg: 40px;

  /* Layout — Grid de 12 columnas (Figma) */
  --grid-columns: 12;
  --grid-column-width: 85px;
  --grid-gutter: 20px;
  --grid-margin: 20px;
  /* container = (12 × 85) + (11 × 20) + (2 × 20) = 1280px */
  --container: 1280px;
  --section-pad-y: 100px;
  --section-pad-x: 80px;

  /* === SEMÁNTICOS (rol → primitivo) === */
  --color-brand-primary: var(--orange);
  --color-brand-secondary: var(--brown);
  --surface: var(--white);
  --surface-dark: var(--black);
  --surface-accent: var(--purple-1);
  --surface-accent-light: var(--lilac-2);
  --color-text: var(--black);
  --color-text-secondary: var(--text-gray);
  --color-text-invert: var(--white);
  --cta-bg: var(--color-brand-primary);
  --cta-text: var(--color-text-invert);
  --cta-bg-dark: var(--black);
  --cta-bg-purple: var(--purple-2);
  --radius: var(--radius-md);
  --radius-button: var(--radius-sm);
  --radius-section: var(--radius-lg);
}
```
