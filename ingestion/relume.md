# Ingesta: Relume

Relume es la fuente del **contenido y la arquitectura de información**: sitemap + copy por página. Alimenta `specs/`.

## Realidad de acceso

**No existe conector/MCP de Relume** (verificado en el registro). El framework NO depende de Relume
directamente: depende de un **formato intermedio normalizado** (`specs/sitemap.md` + `specs/<pagina>.md`).

## Método principal: export de Relume → Figma

El contenido y el sitemap de Relume se **exportan a Figma** y llegan como un archivo de Figma
(`project.json → figma.relumeExport`). Por tanto la ingesta usa tu **capacidad de Figma**, igual que el design system:
da acceso a ese archivo y léelo con las tools que tengas (ver equivalencias en `ingestion/figma.md`).

Fallbacks si no hay export a Figma:
- Export de Relume → markdown/CSV subido al repo.
- Solo link público (frágil): leer con navegador automatizado; requiere proyecto visible públicamente.

Sea cual sea el método, el resultado **siempre se normaliza** a `specs/sitemap.md` + specs por página.

## Formato normalizado de salida

`specs/sitemap.md` — jerarquía de páginas (ver plantilla en ese archivo).
`specs/<pagina>.md` — por página: secciones en orden + copy + tipo de componente sugerido, usando `specs/_page-spec-template.md`.

## Reglas

- El sitemap normalizado es la **única interfaz** con Relume. Ningún otro archivo conoce Relume.
- Mapea cada sección de Relume a un **componente existente** de `design/components/` cuando sea posible; si no existe, márcalo como "componente nuevo" para el director.
- Conserva el copy literal de Relume como contenido inicial; el diseño no lo reinterpreta.
