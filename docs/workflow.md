# Workflow — protocolo de colaboración multiagente

Aplica a agentes de cualquier modelo y a personas. Garantiza consistencia cuando varios trabajan en paralelo.

## Ciclo por página / componente

```
GATE Figma-MCP-first → docs/readiness.md   # ⛔ sin Figma ingestado, NO se avanza
ingestor → (design/ + specs/)        # ingesta inicial; pone status.figmaIngested = true
director → specs/<pagina>.md          # plan: qué reutilizar, qué falta
builder  → adapters/<platform>/…      # implementación con tokens + componentes
validator→ reporte                    # auditoría de consistencia + a11y + fields
   └─ ¿bloqueantes? → builder corrige → re-valida
revisión humana → docs/human-review.md   # pule diseño/interacción; añade efectos/instrucciones
   └─ instrucciones → docs/change-protocol.md (aditivo → base; destructivo → preguntar)
PR → review → merge
```

> El arranque de un proyecto nuevo es previo a este ciclo: ver `START-HERE.md` / `docs/onboarding.md`.

## Git

- Rama por unidad de trabajo: `feat/<pagina-o-componente>`, `fix/…`, `chore/…`.
- Un PR = una página o un componente. Pequeño y revisable.
- **Ningún PR mergea sin reporte del validator sin bloqueantes** (ver Definition of Done en `AGENTS.md`).
- Commits en español, imperativos, con alcance: `feat(card): variante featured`.

## Coordinación entre agentes/herramientas

- La fuente de instrucciones es **siempre `AGENTS.md`**; cada herramienta solo tiene su adaptador.
- El estado compartido vive en archivos versionados (`MEMORY.md`, `design/`, `specs/`), no en el chat de ninguna herramienta. `MEMORY.md` es la continuidad entre agentes/sesiones/modelos: léelo al empezar, actualízalo al decidir.
- Para evitar choques: un componente/página = una rama = un responsable a la vez.
- Cambios al **núcleo** (`design/`, `docs/`, `AGENTS.md`) requieren PR propio y revisión: afectan a todos los proyectos que usan el template.

## Cuándo corre cada rol

| Disparador | Rol |
|---|---|
| Entra material nuevo de Figma/Relume | ingestor |
| Se solicita una página/sección nueva | director |
| Hay un spec aprobado | builder |
| Hay código nuevo o modificado | validator |
| Validación sin bloqueantes | revisión humana (persona) |
| El humano dejó instrucciones/efectos | el agente las incorpora vía `docs/change-protocol.md` |
