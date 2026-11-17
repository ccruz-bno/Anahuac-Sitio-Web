# Módulo · Test vocacional

Test de dos fases con ramificación. La Fase 1 ubica al alumno en áreas académicas;
la Fase 2 sólo le pregunta por las licenciaturas de esas áreas.

## Diseño: registro por zona

Implementado según `specs/test-vocacional.md`. El flujo mezcla dos registros y se
tratan distinto:

| Zona | Pantallas | Tratamiento |
|---|---|---|
| **Brand** | inicio, desempate, transición, resultado | Color (glow del hero, morado `--surface-accent`), Leonel, tipografía grande |
| **Product** | las 22 a 44 preguntas | Sin tarjeta, sin glow, alineado a la izquierda, quieto |

Decisiones que NO hay que deshacer sin volver al spec:

- **La pregunta no va en tarjeta.** Una pregunta suelta no es una colección de
  unidades comparables. El contenedor con borde se reserva para las licenciaturas
  del resultado, que desde el 2026-11-13 son **filas** y no tarjetas: el nombre es
  lo más grande de la página y una tarjeta lo estrangulaba.
- **El nombre de la licenciatura manda.** Es la respuesta que el alumno fue a buscar.
  El área lo enmarca y el cierre comercial no le compite: los tres estaban al mismo
  cuerpo o peor. No volver a subir el área ni el cierre sin bajar la carrera.
- **Las licenciaturas se agrupan por puntaje, nunca se numeran.** Dos reactivos por
  carrera, puntaje de 0 a 8: los empates son la norma y un 01–05 inventaría orden.
- **La licenciatura es TARJETA con la foto arriba, no fila con miniatura.** La fila a
  ancho completo deja un océano de blanco entre el nombre y el enlace y lee como tabla.
  **También en teléfono**: se probó pasarla a renglón ahí para ahorrar scroll y se
  descartó, porque a ancho de pantalla la foto es lo que invita a abrirla.
- **`auto-fill`, nunca `auto-fit`.** Con una sola ganadora, `auto-fit` estira la tarjeta a
  todo el ancho y sale una foto de ochocientos de alto.
- **No se destaca una sobre las otras.** En el grupo de arriba los empates son la norma:
  destacar la primera sería coronar el orden de HubDB.
- **El duotono de categoría es lila CLARO, no morado cerrado.** Cerrado, la pieza seguía
  leyéndose como foto turbia. Claro, lee como el color del área — que es lo que es.
- **El cierre no se apila hasta el teléfono.** Leonel es alto y angosto: apilado en tablet
  empujaba el bloque a casi mil de alto para un CTA de tres líneas.
- **Un solo momento con movimiento**: la revelación del resultado (`.tv-revelar`).
  El resto del flujo está quieto a propósito.
- **`mostrar()` reencuadra el scroll y tiene que seguir haciéndolo.** Las pantallas no
  miden lo mismo: sin eso, quien baja para alcanzar «Comenzar el test» entra a la pregunta
  con el enunciado detrás del encabezado fijo. Pasaba en las cinco. El reencuadre es
  condicional (sólo si la sección quedó arriba de la ventana) e instantáneo.
- **El glow se apaga en la zona Product** (clase `tv--marca`, que el motor conmuta).
- **Sin medidores de afinidad.** Un área se mide con un reactivo de cuatro valores;
  una barra aparentaba una precisión que el instrumento no tiene, y no era legible
  con lector de pantalla.
- **El gris de apoyo ya se puede leer.** `--color-text-secondary` apunta desde el
  2026-11-13 a `--text-gray-ink` (5.3:1 sobre blanco). Antes daba 3.77:1 y el módulo
  lo esquivaba bajando la opacidad del negro; ese apaño se fue.
- **El tiempo se expresa en minutos, no en «pregunta 17 de 24».** Mientras no se
  conoce la rama, se proyecta su largo típico.

### Variante del encabezado

La página usa `encabezado.module` con el field **Variante → Sólo logo**: durante un
test de 10 minutos el menú completo es una rampa de salida. La variante es aditiva
(el default sigue siendo «completo»), así que ninguna página existente cambia.

## Estado

**Demo funcional con datos provisionales.** Corre de punta a punta, pero tres cosas
están pendientes de la autora del instrumento y una del catálogo del sitio:

| Pendiente | De quién | Dónde se resuelve |
|---|---|---|
| Mapa definitivo de área a licenciatura (6 decisiones) | Autora | `tv_licenciaturas.area_test` |
| Reglas de puntaje y desempate | Autora | Grupo «Reglas» de `fields.json` |
| Los 55 textos de resultado (8 de área, 47 de carrera) | Universidad | HubDB |
| URL de cada licenciatura (hoy sólo existe Psicología) | Sitio | `tv_licenciaturas.url` |

### Revisión pendiente

El validator del proyecto dejó abiertos cuatro bloqueantes que **no** son de este módulo
sino decisiones de design system, y conviene resolverlos como tales:

- ~~`--color-text-secondary` a 3.77:1 y los enlaces naranjas a 3.14:1.~~ Resueltos en
  tokens los días 2026-11-12 y 13 (`--color-text-brand`, `--text-gray-ink`).
- Los medidores de afinidad son sólo visuales: sin `role="meter"` ni equivalente textual,
  el resultado del test no se puede leer con lector de pantalla.
- ~~El contraste del indicador de opción (1.61:1) no llega al 3:1 de WCAG 1.4.11.~~
  Resuelto el 2026-11-13: el aro usa `--color-control-ring` (6.3:1).
- Falta llevar a `fields.json` el copy que todavía está en el código, y promover a
  `design/03-patterns.md` los cinco patrones nuevos (progreso, chip, medidor, opción tipo
  radio, wizard) con su entrada en `design/CHANGELOG.md`.

Mientras tanto el módulo marca lo provisional en pantalla. El campo
**Reglas → Mostrar avisos de «dato provisional»** apaga esas marcas para presentar.

## Archivos

| Archivo | Qué es |
|---|---|
| `module.html` | Shell. La pantalla de inicio se renderiza en servidor (visible sin JS) |
| `module.js` | El motor: ramificación, puntajes, pantallas, persistencia |
| `fields.json` | Contrato de fields — todo lo editable |
| `../../css/main.css` | Bloque `test-vocacional`, al final del archivo |
| `../../js/test-vocacional-data.js` | Datos semilla mientras no haya HubDB |
| `../../../hubdb/*.csv` | Las mismas tres colecciones, listas para importar |

### Por qué este módulo sí trae `module.js`

El resto del theme concentra su JS en `js/main.js`. Aquí el motor son ~700 líneas que
sólo sirven en una página, y HubSpot carga `module.js` únicamente cuando el módulo está
presente. El CSS sí sigue la convención del theme y vive en `main.css`.

Es el único `module.js` del theme y la excepción está revisada: no la "corrijas"
moviéndolo a `main.js`.

## Contrato de fields

**Editable por contenido:** todos los textos de las cuatro pantallas (inicio, pregunta,
transición y resultado), más las cuatro reglas de cálculo.

**Bloqueado por diseño:** tokens, layout, escalas de respuesta y la lógica de
ramificación. Los reactivos y el mapeo no son fields: son datos (HubDB).

## Datos

Tres colecciones. `adapters/hubspot/hubdb/` tiene el CSV de cada una.

| Tabla | Filas | Columnas |
|---|---|---|
| `tv_areas` | 8 | `id`, `nombre`, `reactivo`, `area_sitio` |
| `tv_licenciaturas` | 47 | `id`, `nombre`, `area_test`, `area_sitio`, `estado`, `url`, `nota` |
| `tv_reactivos` | 94 | `numero`, `texto`, `licenciatura_id`, `nota` |
| `tv_areas_sitio` | 6 | `id`, `nombre`, `url` |

`estado` vale `confirmada` (sale del sitio), `propuesta` (deducida del documento de la
autora) o `por-confirmar` (necesita su criterio).

### Corrección aplicada a los reactivos

El documento *Reactivos Fase 2* numera **70** el segundo reactivo de Nutrición, pero el
70 ya es de Turismo Internacional y el **64** no aparece. Contra el cuadernillo, el de
Nutrición es el 64 y así quedó cargado. Está marcado en `nota` y pendiente de confirmar.

## Reglas de cálculo (provisionales)

- **Fase 1** — un reactivo por área, escala 1 a 4. Pasan las *n* áreas con mayor puntaje
  (`areas_que_pasan`, por defecto 2). Con un solo reactivo por área en una escala de
  cuatro puntos **los empates son lo normal**, así que cuando las empatadas no caben en
  el cupo se le devuelve la decisión al alumno en una pantalla aparte. Antes se tomaban
  las primeras de la lista, lo que hacía que el orden en que la autora escribió las áreas
  decidiera el resultado: dos alumnos con respuestas opuestas acababan en las mismas tres.
- **Fase 2** — cada licenciatura suma sus dos reactivos (2 a 6). Aparecen las que llegan
  a `puntaje_minimo` (por defecto 5), hasta `max_carreras` (por defecto 5). Si ninguna
  llega, muestra las tres mejores: nadie se queda sin resultado.

Con 2 áreas la Fase 2 va de **14 a 36 reactivos**, mediana 24, según cuáles salgan (el
área más chica tiene 3 licenciaturas y la más grande 9). Con 3 áreas la mediana sube a 34
y el techo a 50: por eso la recomendación de quedarse en 2.

### El orden de los reactivos no se toca

La autora barajó los 94 a propósito: su numeración intercala licenciaturas para que el
alumno no sepa qué se le está midiendo. El motor **ordena por ese número** y nunca
muestra el nombre de la licenciatura sobre el enunciado.

Al filtrar por área se toma un subconjunto de su secuencia, así que quedan entre 0 y 3
pares consecutivos de la misma carrera por recorrido (contra los 10 a 18 que habría si
se agruparan). Eliminarlos del todo exigiría rebarajar, y desviarse de su numeración es
decisión de ella.

## Probarlo

```
npx serve .
```

Y abrir `/adapters/hubspot/preview/test-vocacional.html`. Esa preview resuelve el HubL
a mano con los valores por defecto; no es un entregable del sitio.

El avance se guarda en `localStorage` bajo `anahuac:tv:v1`, así que para empezar de cero
hay que usar «Volver a empezar» o limpiar el almacenamiento.
