# Principios de diseño e interacción

El "por qué" detrás de los tokens y componentes. Cuando algo no esté especificado, decide según estos principios.

## Visuales
- **Consistencia sobre creatividad puntual.** Una página interna nunca introduce un estilo nuevo; reutiliza el del home.
- **Jerarquía clara.** Un solo `h1` por página; tamaños y pesos vienen de la escala tipográfica, no a ojo.
- **Color con intención.** Naranja = acción/marca; morados = superficies destacadas; el resto, neutros.
- **Aire generoso.** Espaciado desde la escala; densidad uniforme entre secciones.

## Interacción
- **Movimiento con propósito.** El motion se define en `design/interactions.md`; no añadir animaciones ad-hoc.
- **Estados siempre presentes.** Todo elemento interactivo define hover y focus visibles.
- **Accesible por defecto.** Contraste AA, foco visible, semántica correcta. No es opcional.

## Contenido (autoadministrable)
- **Editable ≠ rompible.** El equipo de contenido edita textos/imágenes/enlaces; no puede alterar color, spacing ni layout.
- **El copy manda la longitud.** Los componentes toleran textos variables sin romperse.

## Para agentes
- Ante la duda, **reutiliza** un componente existente antes de crear uno.
- Ante la duda visual, **mira el home** (`specs/home.md`): es la referencia canónica.
