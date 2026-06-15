# Adapter: WordPress (Block Theme / FSE)

Plataforma cuando `project.json → platform = "wordpress"`. Autoadministrable vía bloques nativos de Gutenberg.

## Mapeo del núcleo a WordPress

| Núcleo neutral | WordPress (FSE) |
|---|---|
| Tokens primitivos | `theme.json` → `settings` (palette, fontSizes, spacing) |
| Tokens semánticos | CSS custom properties (WP genera `--wp--preset--…`; añadimos las semánticas) |
| Componente reutilizable | **bloque** (`blocks/<x>/`) |
| Contrato de fields (editable) | `block.json` → `attributes` + `supports` |
| Plantilla de página | `templates/*.html` (block markup) + `parts/` |

> `block.json` es el análogo directo de `fields.json` de HubSpot: ambos declaran qué edita el equipo de contenido. Esto mantiene el framework simétrico entre plataformas.

## Estructura

```
adapters/wordpress/theme/
├── theme.json            # settings = tokens primitivos
├── css/tokens.css        # tokens semánticos
├── templates/            # plantillas FSE (block markup)
├── parts/                # header, footer (navegación reutilizable)
└── blocks/
    └── <componente>/
        ├── block.json    # attributes (editable) + supports
        ├── render.php    # render dinámico server-side, pinta con clases del DS
        ├── style.css     # estilos del bloque, solo tokens semánticos
        ├── edit.js       # UI de edición en Gutenberg
        └── view.js       # JS de front si aplica (p. ej. animaciones)
```

## Reglas del adapter

- `block.json → attributes` se **deriva** de la sección de fields neutral de `design/components/<x>.md`.
- Listas (grid de cards) → bloque contenedor con `InnerBlocks` o un attribute `array` (repeater).
- Bloquea diseño con `supports` (desactiva color/spacing custom donde el contrato lo prohíbe) para que el editor no rompa el estilo.
- Estilos solo con tokens semánticos; no `wp-block` overrides sueltos.

## Tooling / deploy

- Scaffolding: `@wordpress/create-block`. Build con `@wordpress/scripts` (`npm run build`).
- Versionar el theme completo en GitHub; deploy al WP destino (rsync/CI o plugin de deploy).
- Requiere WordPress 6.x (FSE). Pre-deploy: prototipo en repo, igual que HubSpot.
