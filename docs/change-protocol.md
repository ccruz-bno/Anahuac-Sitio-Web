# Protocolo de cambios no destructivos

Gobierna cómo se incorporan ajustes (sobre todo los de la **revisión humana**) sin romper el sitio.
Es de cumplimiento obligatorio para cualquier agente. Regla rectora: **aditivo por defecto, destructivo solo con permiso explícito.**

## 1. Clasifica todo cambio antes de aplicarlo

| Tipo | Definición | Acción |
|---|---|---|
| **Aditivo** | Agrega algo nuevo sin alterar lo existente: nueva variante, nuevo componente, nuevo efecto/interacción, nueva sección, nuevo token semántico | ✅ Aplica y **promuévelo a los documentos base** (ver §3) |
| **Local** | Cambia solo una instancia y no afecta el contrato compartido (p. ej. el copy de una página) | ✅ Aplica en el spec de esa página |
| **Potencialmente destructivo** | Modifica un componente/token/patrón **compartido** que otras páginas usan (cambiar el estilo/comportamiento de `card`, alterar un token, cambiar un patrón global) | ⛔ **DETENTE y pregunta** (ver §2) |

Si dudas entre Local y Destructivo, trátalo como **Destructivo**.

## 2. Cuando un cambio es potencialmente destructivo

NO lo apliques en silencio. Haz **análisis de impacto** y pregunta al usuario, ofreciendo opciones seguras primero:

1. **Guardar como variante** del componente existente (recomendado por defecto).
   - Ej.: "Editaste el estilo de la card. ¿La guardo como `card` variante `<nombre>` en vez de cambiar la card base?"
2. **Guardar como componente nuevo** (si difiere lo suficiente para no ser variante).
3. **Cambio global del contrato base** (solo si el usuario lo confirma):
   - Lista las páginas/usos afectados (análisis de impacto).
   - Aplica, **actualiza el contrato base** y **re-valida todas las páginas afectadas**.

Pregunta concreta a usar:
> "Este cambio afecta `<componente>` que usan N páginas (`…`). Puedo: (a) guardarlo como variante, (b) como componente nuevo, o (c) cambiar la base y re-validar las N páginas. ¿Cuál prefieres?"

## 3. Promoción a documentos base (cierre del ciclo)

Cuando un cambio aditivo se acepta, **propágalo** para que el sistema crezca consistente:

| Cambio aceptado | Documento base a actualizar |
|---|---|
| Nueva variante / estado | `design/components/<x>.md` |
| Nuevo componente | `design/components/<nuevo>.md` (+ binding en adapter) |
| Nuevo efecto / interacción / motion | `design/interactions.md` |
| Nuevo token | `design/01-tokens.md` (semántico, por rol) |
| Nuevo patrón de composición | `design/03-patterns.md` |
| Cualquiera de los anteriores | registrar en `design/CHANGELOG.md` |

Una instrucción humana solo se considera "incorporada" cuando vive en un documento base, no solo en una página.

## 4. Qué NUNCA hacer
- Sobrescribir un componente compartido sin preguntar.
- Hardcodear un valor para "lograr" el ajuste pedido (usa/crea un token).
- Aplicar un efecto global tocando solo una página (promuévelo a `design/interactions.md`).
- Dejar una variante sin documentar en su contrato.
