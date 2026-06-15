# Adapter: HubSpot (CMS Hub)

Plataforma del proyecto cuando `project.json → platform = "hubspot"`. Autoadministrable vía módulos + theme.

## Mapeo del núcleo a HubSpot

| Núcleo neutral | HubSpot |
|---|---|
| Tokens primitivos | `theme.json` → *style fields* (editables a nivel global por admin) |
| Tokens semánticos | variables CSS en `theme/css/tokens.css`, referenciando theme settings |
| Componente reutilizable | **módulo** (`theme/modules/<x>.module/`) |
| Contrato de fields (editable) | `fields.json` |
| Plantilla de página | `theme/templates/*.html` (HubL) |

## Estructura

```
adapters/hubspot/theme/
├── theme.json            # style fields = tokens primitivos
├── css/tokens.css        # tokens semánticos (var() sobre theme settings)
├── templates/
│   ├── home.html
│   └── pagina-interna.html
└── modules/
    └── <componente>.module/
        ├── module.html   # HubL: itera fields, pinta con clases del design system
        ├── fields.json   # campos editables (derivados del contrato neutral)
        ├── module.css    # estilos del componente, solo tokens semánticos
        └── meta.json
```

## Reglas del adapter

- `fields.json` se **deriva** de la sección de fields neutral de `design/components/<x>.md`. Editable = lo que el contrato marca editable; nada más.
- Grids/listas (p. ej. grid de cards) → `field type: "group"` con `occurrence` (repeater).
- Nunca pongas color/spacing en `fields.json` como editable si el diseño lo bloquea: viven en tokens.
- CSS del módulo usa solo variables semánticas de `tokens.css`.

## Tooling / deploy

- CLI: `npm i -g @hubspot/cli` → `hs init` → `hs auth`.
- Requiere **CMS Hub** y un **sandbox / developer test account**.
- Dev local: `hs watch adapters/hubspot/theme <dest>`. Versionar todo en GitHub.

## Referencias HubL útiles

- Campos: `{{ module.<field> }}`; richtext, image (`{{ module.img.src }}`), link, choice, group/repeater (`{% for item in module.items %}`).
