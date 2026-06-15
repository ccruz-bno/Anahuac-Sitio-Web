# Preview — ver la página durante la revisión humana

La capa de revisión humana (`docs/human-review.md`) necesita algo que mirar. Cada adapter tiene su forma de preview.

## HubSpot
- Dev local: `hs watch adapters/hubspot/theme <dest>` sincroniza con el portal; preview en el editor de páginas de HubSpot (sandbox/dev account).
- Para revisión: compartir la URL de preview del template/página en el portal.

## WordPress (block theme / FSE)
- Local: `wp-env` (`@wordpress/env`) o Local by Flywheel; activa el theme de `adapters/wordpress/theme`.
- Preview en el editor de bloques + vista del front.

## Astro
- `npm run dev` en `adapters/astro/` → `localhost`.
- Para compartir: `npm run build` y deploy de preview (Cloudflare Pages, etc.).

## Recomendado para la revisión
- Adjunta al PR un **screenshot o URL de preview** del estado a revisar.
- Si hay regresión visual configurada (`docs/quality.md`), incluir el diff.

## Estado
- [ ] Configurar el preview del adapter activo (`project.json → platform`).
