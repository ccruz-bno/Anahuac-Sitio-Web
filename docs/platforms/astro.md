# Adapter: Astro (estático / prototipo)

Plataforma cuando `project.json → platform = "astro"`. Útil para sitios estáticos o como capa de prototipo rápido.

> Nota: Astro **no es un CMS**: no da autoadministración por sí solo. Para edición por contenido en Astro
> se requiere CMS headless (p. ej. WP/HubSpot headless por API). Para sitios que necesitan auto-admin
> nativo, preferir los adapters `hubspot` o `wordpress`.

## Mapeo del núcleo a Astro

| Núcleo neutral | Astro |
|---|---|
| Tokens primitivos + semánticos | CSS custom properties en `src/styles/tokens.css` (o `tailwind.config`) |
| Componente reutilizable | `src/components/<X>.astro` |
| Contrato de fields | `props` del componente (TypeScript interface) |
| Plantilla de página | `src/layouts/` + `src/pages/` |

## Estructura

```
adapters/astro/
├── src/
│   ├── styles/tokens.css
│   ├── components/Card.astro
│   ├── layouts/Base.astro
│   └── pages/index.astro
└── astro.config.mjs
```

## Reglas

- Props del componente = sección de fields neutral del contrato.
- Solo tokens semánticos; cero hardcode.
- Deploy: `npm run build` → estático (Cloudflare Pages, etc.).
