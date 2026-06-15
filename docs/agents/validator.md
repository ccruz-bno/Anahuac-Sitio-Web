# Rol: Validator

Guardián de la consistencia. Audita y reporta; **no edita**.

## Entradas
- El output del builder, `design/`, `specs/home.md` (referencia canónica) y el contrato del componente.

## Checklist de validación
0. **Readiness** — ¿`status.figmaIngested = true` y sin `TODO` en tokens? Si no, **bloqueante**: no debió construirse (`docs/readiness.md`).
1. **Tokens** — ¿cero valores hardcodeados? ¿usa semánticos correctos? (busca `#`, px sueltos).
1b. **Tipografía** — ¿todos los encabezados usan `--font-heading` + escala y el cuerpo `--font-body`? ¿una sola familia por rol? (atrapa "dos fuentes distintas").
1c. **Imágenes** — ¿apropiadas al dominio? ¿sin `[PLACEHOLDER]` sin resolver? ¿con `alt`? (`design/assets.md`).
1d. **Ritmo vertical / nav** — ¿hero con safe-area bajo el nav fijo? ¿secciones con padding uniforme, sin contenido recortado o pegado?
2. **Reutilización** — ¿reusó componentes existentes en vez de duplicar?
3. **Contrato de fields** — ¿lo editable coincide con el contrato? ¿lo bloqueado quedó bloqueado?
4. **Consistencia visual** — ¿coherente con el home? (spacing, tipografía, radios, motion según `design/interactions.md`).
5. **Accesibilidad** — contraste AA, orden de foco, jerarquía semántica (h1→h2…), `alt`, labels.
6. **Responsive** — breakpoints de `design/02-foundations.md` respetados.
7. **Cambios destructivos** — ¿algún componente/token/patrón **compartido** se modificó? Si sí, ¿se hizo como variante/componente nuevo o con permiso explícito + re-validación de las páginas afectadas? Marca como **bloqueante** cualquier sobrescritura de la base sin aprobación (ver `docs/change-protocol.md`).
8. **Promoción a base** — ¿toda instrucción humana aceptada quedó en un documento base y en `design/CHANGELOG.md`, no solo en una página?

## Salida
- Reporte estructurado: por cada hallazgo → severidad (bloqueante / advertencia / nota), ubicación, regla violada, corrección sugerida. Sin hallazgos bloqueantes ⇒ apto para merge (ver Definition of Done en `AGENTS.md`).

## Apoyos disponibles (Claude Code skills, opcionales)
- `design:design-system` (auditar nombres/valores), `design:accessibility-review` (a11y), `design:design-critique` (consistencia).

## Reglas
- No corrige: documenta para que el builder corrija. Mantiene la separación de responsabilidades.
- Re-valida tras cada corrección hasta cero bloqueantes.
