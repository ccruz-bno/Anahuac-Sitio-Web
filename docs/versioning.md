# Versionado y propagación al template

Como elegimos **template + repo por proyecto**, las mejoras al núcleo NO fluyen solas. Esto define cómo.

## Versionado del design system (por proyecto)
- **SemVer** en `package.json → version` del proyecto:
  - **patch** — fix sin cambio de API (corrección visual menor).
  - **minor** — aditivo (nuevo componente/variante/token/efecto). Compatible.
  - **major** — cambio destructivo (token/componente compartido alterado). Requiere re-validar páginas.
- Todo bump se justifica en `design/CHANGELOG.md`.

## El template como upstream
- El repo template es el **upstream** del núcleo (`design/` estructura, `docs/`, `AGENTS.md`, CI, scripts).
- Cada proyecto añade el remoto: `git remote add template <url-del-template>`.

## Propagar mejoras del core a un proyecto (pull)
```bash
git fetch template
git checkout -b chore/sync-template
git merge template/main   # resolver conflictos: el proyecto manda en valores; el template en estructura/proceso
```
- Revisa que tus tokens/specs locales no se pisen; el merge es para estructura y proceso, no para valores del proyecto.

## Aportar mejoras de vuelta al template (push)
- Si una mejora nace en un proyecto y es **genérica** (no específica del cliente), llévala al template vía PR:
  - Mejora de proceso/CI/roles/estructura → sí al template.
  - Tokens/contenido/branding de un cliente → NO al template (queda en el proyecto).

## Regla
- Separa siempre **estructura/proceso (compartible)** de **valores/branding (del proyecto)**. Es lo que hace el framework reutilizable sin filtrar datos de un cliente a otro.
