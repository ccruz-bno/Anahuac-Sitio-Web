<!-- Revisión humana obligatoria. No mergear sin marcar la Definition of Done (AGENTS.md §4). -->

## Qué cambia
<!-- Página/componente afectado y por qué -->

## Tipo de cambio (ver docs/change-protocol.md)
- [ ] Aditivo (nuevo componente/variante/efecto/token/patrón)
- [ ] Local (solo una página, no toca contrato compartido)
- [ ] **Potencialmente destructivo** (toca algo compartido) → ¿se pidió permiso y se ofreció variante/componente nuevo?

## Definition of Done
- [ ] Readiness OK: `status.figmaIngested = true`, sin `TODO` en tokens, sin `[PLACEHOLDER]` (pasa `check:readiness`)
- [ ] Solo tokens semánticos (cero hardcode — pasa `check:tokens` y `lint:css`)
- [ ] Tipografía: encabezados con `--font-heading` + escala, cuerpo `--font-body` (una familia por rol)
- [ ] Imágenes apropiadas al dominio, con `alt`; sin stock irrelevante ni placeholders
- [ ] Hero/secciones con safe-area bajo el nav fijo y ritmo vertical uniforme
- [ ] Reutiliza componentes existentes; nuevos solo si justificados
- [ ] Contrato de fields (editable vs bloqueado) materializado en el adapter
- [ ] Consistente con el home / referencia canónica
- [ ] Accesibilidad básica (contraste, foco, jerarquía)
- [ ] Ningún cambio destructivo sin permiso; variantes documentadas en su contrato
- [ ] `design/inventory.md` actualizado (componente ↔ páginas)
- [ ] Instrucciones humanas aceptadas promovidas a documento base + `design/CHANGELOG.md`
- [ ] Reporte del validator sin bloqueantes

## Análisis de impacto (si tocó algo compartido)
<!-- Páginas/componentes afectados (de design/inventory.md) y cómo se re-validaron -->
