# Ingesta: Figma

Figma es la fuente de la **verdad visual**: tokens y componentes. Alimenta `design/`.

## Requisito de acceso (por CAPACIDAD, no por nombre de tool)

Necesitas un **MCP/skill de Figma** que te permita, sobre el archivo del proyecto:
1. leer **variables/tokens** (color, tipografía, spacing, radios),
2. leer **estructura/contexto de componentes** (anatomía, variantes),
3. leer **screenshots** de referencia.

Usa **las herramientas que tengas**; los nombres varían por integración. Equivalencias conocidas:

| Capacidad | Figma Dev Mode MCP | Otros MCP/skills de Figma |
|---|---|---|
| Leer variables/tokens | `get_variable_defs` | `use_figma` / skill `figma-use` |
| Estructura/overview | `get_metadata` | `use_figma` |
| Contexto de componente | `get_design_context` | `use_figma` / `figma-use` |
| Screenshot | `get_screenshot` | `use_figma` |

> Algunos MCP leen desde la **app de escritorio** con el archivo como **pestaña activa**; otros desde la URL.
> Antes de ingestar, ten accesible el archivo (`project.json → figma.uiKit` / `figma.home`) según tu integración.
> Si **no** tienes ninguna capacidad de Figma, **detente** (ver `docs/readiness.md`).

## Proceso (independiente de la tool)

1. **Tokens (UI Kit):** lee las variables → escribe primitivos en `design/01-tokens.md`. Define la capa semántica encima (rol → primitivo), incluida la **tipografía** (`--font-heading`/`--font-body` + escala).
2. **Componentes (UI Kit):** por cada componente del kit, lee su contexto → completa su contrato en `design/components/<x>.md` (anatomía, variantes, estados, fields).
3. **Home:** lee la página home → insumos para `specs/home.md`.
4. **Foundations:** captura grid, breakpoints, `--container` y `--nav-height` en `design/02-foundations.md`.

## Re-sync (cuando Figma cambia después de la primera ingesta)

NO regeneres los archivos desde cero: **reconciliar sin pisar la capa semántica** hecha a mano.
1. Re-extrae **primitivos** y compáralos con los actuales (`design/01-tokens.md`).
2. Para cada diferencia: actualiza el primitivo; **conserva** el mapeo semántico (rol → primitivo) salvo que el diseño lo cambie a propósito.
3. Un cambio de valor de token afecta **todas** las páginas → trátalo como **cambio destructivo** (`docs/change-protocol.md`): consulta `design/inventory.md`, avisa el impacto, re-valida.
4. Registra el re-sync en `design/CHANGELOG.md`.

## Reglas

- Extrae **valores reales**; lo que no puedas leer va como `TODO: confirmar en Figma`.
- Reconciliar con el home en vivo si hay diferencias: **el UI Kit manda** (es la fuente de diseño).
- No inventes tokens semánticos que el diseño no respalde; nómbralos por **rol**, no por valor (ver `docs/naming.md`).
