# Adapter: HubSpot

Adapter para proyectos con `project.json → platform = "hubspot"`. Convenciones: `docs/platforms/hubspot.md`.

## Estructura esperada
```
hubspot/theme/
├── theme.json          # style fields = tokens primitivos
├── css/tokens.css      # tokens semánticos
├── templates/          # plantillas de página (HubL)
└── modules/
    └── <x>.module/     # module.html + fields.json + module.css + meta.json
```

## Setup
- [ ] Cuenta **CMS Hub** + **sandbox / developer test account**.
- [ ] `npm i -g @hubspot/cli` → `hs init` → `hs auth`.
- [ ] `hs watch hubspot/theme <dest>` para dev local.

## Estado
Vacío. Se llena al construir el primer módulo a partir de su contrato en `design/components/<x>.md`.
