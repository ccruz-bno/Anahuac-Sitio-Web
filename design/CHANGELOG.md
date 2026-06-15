# CHANGELOG del design system

Registro de cambios al sistema (componentes, tokens, variantes, efectos, patrones).
Toda promoción a documento base (ver `docs/change-protocol.md`) se anota aquí. Lo más reciente arriba.

---

## 2026-06-08 — token: ingesta inicial de Figma UI Kit

- **Tokens poblados** desde el Figma UI Kit (`Xn92P26S9mq9xYsHyoPUjz`):
  - Colores primarios: Naranja Anáhuac (#FF5900), Café Anáhuac (#6B3F23), Negro, Blanco.
  - Colores secundarios: escala morada monocromática (5 tonos: Jacarta → Biloba Flower).
  - Colores de acento: Cinnabar, School bus Yellow, Denim, Grape, Korma, Tuatara.
  - Colores de sistema: Black Web (#0C1115), Texto (#788592).
  - Tipografía heading: Zilla Slab (alternativa open-source de Sharp Slab).
  - Tipografía body: Roboto.
  - Escala tipográfica: H1 (75px) → H6 (18px) + Párrafo (16px) + Frase (37px italic) + Botones.
  - Radios: 10px (botones), 20px (estándar), 40px (secciones).
  - Escala de espaciado: 14 niveles (4px → 120px).
- **Foundations** pobladas: container 1280px, nav-height 80px, breakpoints desktop/tablet/mobile.
- **Interactions** documentadas: scroll reveal, counter animado, hover effects, motion tokens.
- Documentos actualizados: `design/01-tokens.md`, `design/02-foundations.md`, `design/interactions.md`, `design/assets.md`.
- Origen: ingesta Figma (onboarding).

## 0.3.0 — memoria del proyecto
- `MEMORY.md`: continuidad entre agentes/sesiones/modelos (decisiones, estado, preferencias, aprendizajes, preguntas abiertas).
- Da a modelos no-Claude la memoria persistente que Claude tiene nativa, pero compartida en git.
- Alcance delimitado para no duplicar CHANGELOG/inventory/specs; con disciplina de curación y tope de tamaño.
- Integrado en AGENTS.md (lectura + regla), workflow, onboarding (Paso 5) y human-review.

## 0.2.1 — adaptador Antigravity
- `GEMINI.md` (adaptador delgado → `AGENTS.md`) para Google Antigravity, que prioriza `GEMINI.md` sobre `AGENTS.md`.
- Verificado: Antigravity lee `AGENTS.md` nativo (v1.20.3+, límite 12k chars; el nuestro = 5.9k) y soporta Figma vía MCP → el gate por capacidad aplica sin cambios.

## 0.2.0 — gate Figma-MCP-first + reglas de calidad
- Gate de readiness (`docs/readiness.md` + `scripts/check-readiness.mjs`): no se construye sin Figma ingestado (`status.figmaIngested`), sin `TODO` en tokens ni `[PLACEHOLDER]`.
- Figma obligatorio: el agente que corre el sistema hace la ingesta; sin acceso, se detiene.
- Gate **por capacidad, no por tool**: vale cualquier integración de Figma (Dev Mode MCP `get_*`, o `use_figma`/`figma-use`, etc.). Descubierto al validar en Codex, que usa un MCP de Figma distinto al Dev Mode.
- Tipografía: tokens `--font-heading`/`--font-body` + escala obligatoria; lint contra font literal.
- Imágenes: política de pertinencia + placeholders que rompen CI.
- Ritmo vertical + `--nav-height` (safe-area del hero) para evitar recortes.

## 0.1.0 — framework template
- Estructura inicial del framework (núcleo neutral + adapters + roles + onboarding + enforcement).
- Sin tokens ni componentes de proyecto: estado de clean install. Se pueblan en el onboarding (ver `START-HERE.md`).
