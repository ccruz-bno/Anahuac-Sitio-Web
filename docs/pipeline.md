# Pipeline — de las fuentes al deploy

El mismo pipeline para todos los proyectos; solo cambia el adapter final.

> ⛔ GATE: sin acceso a Figma + ingesta inicial (`status.figmaIngested = true`), el pipeline NO avanza (`docs/readiness.md`).

```
┌─────────────┐     ┌─────────────┐
│   FIGMA     │     │   RELUME    │
│ UI Kit+Home │     │ sitemap+copy│
└──────┬──────┘     └──────┬──────┘
       │ ingestor          │ ingestor
       ▼                   ▼
  design/01-tokens.md   specs/sitemap.md
  design/components/*   specs/<pagina>.md
       │                   │
       └─────────┬─────────┘
                 ▼  director (combina diseño + contenido)
           specs/<pagina>.md  (plan accionable)
                 ▼  builder
        adapters/<platform>/…  (módulo / bloque / componente)
                 ▼  validator (gate)
                 ▼  PR → merge
                 ▼  deploy
   HubSpot (hs CLI)  ·  WordPress (block theme)  ·  Astro (build)
```

## Separación de responsabilidades de las fuentes

- **Figma = cómo se ve** → alimenta `design/` (tokens + contratos de componente).
- **Relume = qué dice y qué páginas hay** → alimenta `specs/` (sitemap + contenido).
- El **director** es quien las cruza: pone el contenido de Relume dentro de los componentes de Figma.

## Lo que es igual vs lo que cambia

| Etapa | Igual en todos | Cambia por proyecto |
|---|---|---|
| Ingesta | proceso y formato normalizado | URLs de Figma/Relume (`project.json`) |
| Diseño | estructura de tokens y contratos | valores |
| Specs | plantilla y workflow | contenido del sitio |
| Build | roles y reglas | adapter (`docs/platforms/<platform>.md`) |
| Deploy | gate de validación | comando/host de cada plataforma |
