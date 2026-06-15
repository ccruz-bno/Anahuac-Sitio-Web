# Capa de revisión humana

Paso obligatorio entre la construcción y el merge. Una persona revisa detalles de diseño e interacción
que un agente no juzga bien, y puede **añadir efectos, interacciones e instrucciones** al sitio.

## Dónde encaja

```
director → builder → validator → ◆ REVISIÓN HUMANA ◆ → merge
```

El validator garantiza consistencia técnica; la revisión humana cuida la **intención de diseño** y enriquece el sitio.

## Qué hace el humano
- Pule detalles visuales y de interacción (espaciados finos, timing de animaciones, microcopy, jerarquía).
- Agrega efectos/interacciones nuevos o instrucciones de comportamiento.
- Aprueba o rechaza para merge.

## Cómo el humano deja instrucciones
- **Por página:** en la sección *"Notas de revisión humana"* de `specs/<pagina>.md`.
- **Global (efectos/interacciones):** descríbelo y el agente lo lleva a `design/interactions.md`.
- En lenguaje natural; el agente las traduce a cambios siguiendo el protocolo.

## Cómo el agente incorpora esas instrucciones
Aplica **siempre** `docs/change-protocol.md`:
1. Clasifica: ¿aditivo, local o potencialmente destructivo?
2. Aditivo/local → aplica y promuévelo a documentos base.
3. Destructivo (toca algo compartido) → **pregunta primero**, ofreciendo variante / componente nuevo / cambio global con re-validación.
4. Registra lo aceptado en `design/CHANGELOG.md`.

## Ejemplos
- *"Haz la card más redondeada y con sombra."* → afecta `card` compartida ⇒ el agente pregunta: ¿variante `card-soft`, componente nuevo, o cambio base? No la sobrescribe en silencio.
- *"Quiero que las secciones aparezcan con un fade más lento."* → efecto global ⇒ se ajusta el token de motion y se documenta en `design/interactions.md`.
- *"En esta página, este texto debe decir X."* → local ⇒ se edita el spec de esa página.

## Definición de "revisión aprobada"
- [ ] Sin cambios destructivos aplicados sin permiso.
- [ ] Toda instrucción aceptada quedó en un documento base (no solo en una página).
- [ ] La **decisión y su razón** quedaron en `MEMORY.md` (Decisiones/Preferencias); el *cambio* de diseño en `design/CHANGELOG.md`.
- [ ] Variantes nuevas documentadas en su contrato.
- [ ] Registrado en `design/CHANGELOG.md`.
- [ ] El validator volvió a pasar tras los ajustes.
