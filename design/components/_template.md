# Componente: <Nombre>

> Plantilla del **contrato neutral** de un componente. Es independiente de plataforma.
> El builder deriva de aquí el schema nativo: `fields.json` (HubSpot) · `block.json` (WordPress) · props (Astro).

## Propósito
Una frase: qué resuelve y dónde se usa.

## Anatomía
Lista ordenada de partes (de fuera hacia dentro). Ej.: contenedor → icono → título → texto → CTA.

## Variantes
| Variante | Cuándo usarla | Diferencia |
|---|---|---|
| default | … | … |
| … | … | … |

## Estados
hover · focus · activo · vacío · cargando · error (los que apliquen). Describir cada uno.

## Contrato de fields  ⭐ (lo que define lo autoadministrable)

### Editable (lo toca el equipo de contenido)
| Field | Tipo | Requerido | Default | Notas |
|---|---|---|---|---|
| titulo | text | sí | — | |
| texto | richtext | no | — | |
| enlace | link | no | — | texto + url |
| icono | choice | no | — | set de iconos del DS |
| items | repeater | no | — | para listas/grids; sub-fields de cada item |

> Tipos neutrales → HubSpot: `text/richtext/link/choice/group`. → WordPress `block.json attributes`: `string/array` + bloque/InnerBlocks. → Astro: props tipadas.

### Bloqueado por diseño (NO editable)
- color, espaciado, radio, tipografía, layout, motion → vienen de tokens. El editor no puede cambiarlos.

## Tokens que usa
Lista de tokens **semánticos** (de `01-tokens.md`). Ej.: `--surface`, `--radius`, `--color-text`, `--cta-bg`.

## Do / Don't
- ✅ …
- ❌ …

## Markup de referencia (HTML + clases del DS)
```html
<!-- estructura canónica con las clases reales del design system -->
```

## Bindings por plataforma (se llenan al construir)
- HubSpot: `adapters/hubspot/theme/modules/<x>.module/`
- WordPress: `adapters/wordpress/theme/blocks/<x>/`
- Astro: `adapters/astro/src/components/<X>.astro`
