# Design System Framework (multiagente, multiplataforma)

Plantilla reutilizable para diseñar y construir sitios web con **consistencia de diseño garantizada**, colaboración entre **agentes de IA de cualquier modelo** (Claude, Codex, Cursor…) y **deployment a distintas plataformas** (HubSpot, WordPress, Astro…).

## Idea central

Las **bases son siempre las mismas**; solo cambia la plataforma de implementación.

```
Figma (design system + home)  ┐
                              ├─► NÚCLEO neutral ─► GitHub (multiagente) ─► ADAPTER ─► Deploy
Relume (sitemap + contenidos) ┘                                            │
                                                          HubSpot · WordPress · Astro …
```

- **Núcleo neutral** (`design/`, `specs/`, `docs/`): tokens, contratos de componente, roles de agentes, workflow. Idéntico en todos los proyectos.
- **Adapter** (`adapters/<plataforma>/`): cómo un contrato neutral se vuelve código nativo de la plataforma. Lo único que varía.

## Cómo se instancia un proyecto nuevo

1. Clona/"Use this template" en GitHub y abre el repo con tu agente de IA.
2. Pídele: **"Lee `START-HERE.md` y arranca el onboarding."** El agente te pedirá los links de Figma (UI Kit, home, páginas internas, export de Relume) y la plataforma (`hubspot`/`wordpress`), y escribirá `project.json`.
3. El agente ejecuta la ingesta (rol `ingestor`) → puebla `design/` y `specs/`.
4. Trabaja el flujo continuo: `ingestor → director → builder → validator → revisión humana → merge` (ver `docs/workflow.md`).

## Mapa del repo

| Carpeta | Qué es | ¿Cambia por proyecto? |
|---|---|---|
| `START-HERE.md` | Documento de arranque para proyectos nuevos (onboarding guiado) | No (núcleo) |
| `MEMORY.md` | Memoria del proyecto: decisiones, estado, preferencias y aprendizajes (continuidad entre agentes/modelos) | Contenido sí, estructura no |
| `AGENTS.md` | Instrucciones maestras entre agentes (lo leen Antigravity, Codex, Cursor, Claude Code…) | No (núcleo) |
| `CLAUDE.md` · `GEMINI.md` | Adaptadores delgados (Claude Code / Antigravity) que delegan a `AGENTS.md` | No (núcleo) |
| `docs/` | Roles, workflow, pipeline, plataformas, onboarding, revisión humana, protocolo de cambios | No (núcleo) |
| `ingestion/` | Cómo leer Figma y Relume | No (núcleo) |
| `design/` | Tokens + contratos de componente (neutral) | Valores sí, estructura no |
| `specs/` | Sitemap + spec por página | Sí (contenido del proyecto) |
| `adapters/` | Código nativo de cada plataforma | Solo se activa el de tu plataforma |
| `project.json` | Configuración de la instancia | Sí |

## Estado actual

- [x] Esqueleto del framework
- [ ] Tokens reales desde Figma UI Kit (da acceso al archivo a tu integración de Figma)
- [ ] Documentar el home como referencia canónica
- [ ] Primer componente end-to-end (contrato → adapter de la plataforma elegida)
