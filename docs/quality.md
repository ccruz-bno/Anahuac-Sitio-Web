# Calidad: accesibilidad y regresión visual

Herramientas reales para que la a11y y la consistencia del validator sean verificables, no solo declarativas.

## Accesibilidad (WCAG AA)
- **pa11y-ci** o **axe-core** contra la preview del adapter (URL de `docs/preview.md`).
- **Lighthouse CI** para a11y + performance + SEO.
- Mínimos: contraste AA, foco visible, jerarquía (un `h1`), `alt`, labels, `prefers-reduced-motion`.
- Integración: descomentar el paso `a11y` en `.github/workflows/validate.yml` apuntando a la preview.

## Regresión visual
- **Playwright** screenshots por componente/página; compara contra baseline para atrapar deriva entre páginas.
- Útil sobre todo tras cambios al design system (un cambio de token no debe romper páginas existentes).
- Baselines versionadas; un diff inesperado bloquea el PR hasta revisión humana.

## Performance / SEO (sitio real)
- Presupuesto: Lighthouse ≥ objetivo acordado. Imágenes optimizadas (ver `design/assets.md`).
- SEO: cada página declara metadata en su spec (ver sección SEO de `specs/_page-spec-template.md`).

## Estado
- [ ] Elegir e instalar pa11y/axe + Playwright (no instalados aún en el template).
- [ ] Conectar a la preview de la plataforma activa.
