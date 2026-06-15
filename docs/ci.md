# CI — gates automáticos

Hace que la consistencia se verifique sola, sin importar qué agente/modelo escribió el código.

## Workflow `.github/workflows/validate.yml`
Corre en cada PR y push a `main`:
1. **check:tokens** (`scripts/check-tokens.mjs`) — falla si hay hex o px crudos en `adapters/` (los archivos `tokens.css` están exentos: ahí se definen los primitivos).
2. **lint:css** (Stylelint, `.stylelintrc.json`) — prohíbe color hex/rgb/hsl directo en propiedades de color.
3. (opcional) **a11y** — pa11y/axe contra la preview (ver `docs/quality.md`).

## Protección de rama (configurar en GitHub)
Para que el gate sea real, en *Settings → Branches → Branch protection rule* de `main`:
- [x] Require status checks to pass → `consistency`.
- [x] Require a pull request before merging.
- [x] Require review from Code Owners (ver `.github/CODEOWNERS`) → impone la **revisión humana**.
- [x] Require conversation resolution.

## Local
```bash
npm install
npm run validate     # check:tokens + lint:css
```

## Relación con los roles
- El **validator** (agente) y el CI son complementarios: el CI atrapa hardcodes/objetivos mecánicos; el validator juzga consistencia visual, contrato de fields y cambios destructivos (`docs/change-protocol.md`).
