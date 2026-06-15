# Rol: Ingestor

Extrae la verdad desde las fuentes externas y la normaliza al repo. No implementa código de plataforma.

## Entradas
- **Figma UI Kit** → tokens (color, tipografía, espaciado, radios, sombras, motion) y componentes.
- **Figma Home** → composición de la página de referencia.
- **Relume** → sitemap (IA del sitio) y contenido/copy por página.

## Salidas
| Fuente | Produce |
|---|---|
| Figma UI Kit | `design/01-tokens.md` (2 capas), inventario en `design/components/*.md` |
| Figma Home | insumos para `specs/home.md` |
| Relume | `specs/sitemap.md` + un `specs/<pagina>.md` por página |

## ⛔ Requisito: acceso a Figma
La ingesta visual **exige** alguna capacidad de Figma (MCP o skill; el nombre de la tool varía por integración —
ver equivalencias en `ingestion/figma.md`). La hace el agente que corre el sistema. Si no la tienes,
DETENTE y pide acceso (ver `docs/readiness.md`). Prohibido sustituir Figma por suposiciones o stock.
Al terminar la ingesta inicial (sin `TODO`), pon `project.json → status.figmaIngested = true`.

## Cómo
- Figma: ver `ingestion/figma.md`. Extrae valores reales, no inventes; marca lo que no se pueda leer como `TODO`.
- Relume: ver `ingestion/relume.md`. Sin conector: normaliza a `specs/sitemap.md` (formato propio) sea cual sea el método de export.

## Reglas
- Separa **primitivos** (valor crudo) de **semánticos** (rol) al escribir tokens.
- Nunca normalices "a ojo": si un valor no está en la fuente, márcalo `TODO: confirmar en Figma`.
- El sitemap normalizado es la única interfaz con Relume; el resto del framework no conoce Relume.
