# Adapter: WordPress (Block Theme / FSE)

Para proyectos con `platform = "wordpress"`. Convenciones: `docs/platforms/wordpress.md`.

## Estructura esperada
```
wordpress/theme/
├── theme.json          # settings = tokens primitivos
├── css/tokens.css      # tokens semánticos
├── templates/ · parts/ # plantillas FSE + header/footer
└── blocks/
    └── <x>/            # block.json + render.php + style.css + edit.js + view.js
```

## Setup
- [ ] WordPress 6.x (FSE) con theme custom.
- [ ] `@wordpress/create-block` + `@wordpress/scripts` (`npm run build`).

## Estado
Se activa cuando `project.json → platform = "wordpress"`.
