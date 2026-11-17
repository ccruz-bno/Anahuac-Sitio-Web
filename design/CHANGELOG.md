# CHANGELOG del design system

Registro de cambios al sistema (componentes, tokens, variantes, efectos, patrones).
Toda promoción a documento base (ver `docs/change-protocol.md`) se anota aquí. Lo más reciente arriba.

---

## 2026-11-13 — El scroll no se reiniciaba al cambiar de pantalla

Encontrado probando en el Chrome de la usuaria, no en la vista previa del editor: la
ventana real es más baja —1470×703 con el cromo del navegador— y ahí «Comenzar el test»
queda bajo el pliegue.

El alumno baja para alcanzar el botón, lo pulsa, y entra a la primera pregunta **con el
enunciado y la primera opción detrás del encabezado fijo**. Veía tres de cuatro opciones
y ninguna pregunta.

`mostrar()` sólo conmutaba `hidden`; nunca tocaba el scroll. Y las pantallas nuevas casi
siempre son más cortas que la anterior —del inicio, con Leonel de cuerpo entero, a una
pregunta— así que la posición heredada dejaba el encabezado de la pantalla nueva arriba
del área visible. Todos los `focus()` del módulo llevan `preventScroll: true` para no dar
tirones, así que no quedaba nada que recolocara la vista.

Medido antes del arreglo, con 202 px de scroll heredados: **las cinco pantallas tapadas**.
Pregunta 1 a 57 px, desempate a 17, transición a 30, fase 2 a 54, resultado a 49, todas
contra un encabezado que termina en 131. El alumno nunca volvía a ver un título.

`acomodarScroll()` en `mostrar()`: si la sección empieza por encima de la ventana, se
reencuadra. **Sólo cuando hace falta** —entre preguntas la altura no cambia y no se mueve
nada— y **sin animar**, desactivando el `scroll-behavior: smooth` del tema durante el
salto: es un reencuadre, no un desplazamiento con intención, y este flujo está quieto a
propósito.

Después: **cero pantallas tapadas**, encabezados entre 218 y 259 px. Verificado también
arrancando con 400 px de scroll. Sin errores de consola y las 30 peticiones de red en 200.

## 2026-11-13 — Las licenciaturas vuelven a ser tarjetas (con la jerarquía en su sitio)

La fila a ancho completo no convenció y con razón: 1280 px con el nombre a la izquierda y
el enlace a la derecha dejan ~700 de blanco en medio, el ojo tiene que cruzarlos, y el
conjunto lee como tabla de ajustes, no como resultado.

Se probaron tres caminos en el navegador —lista angosta, tarjetas, y una destacada con el
resto en lista— y se eligió **tarjetas**. El argumento: el encargo pedía que el alumno
«sienta curiosidad por explorar cada licenciatura», y eso lo da la imagen, no la
tipografía. La lista angosta dejaba de estorbar pero no movía esa aguja.

**La destacada se descartó por honestidad**, no por estética: «la que más se acerca»
promete un ganador único y en el grupo de arriba los empates son la norma —dos reactivos
por carrera, puntaje de 0 a 8—. La que quedara arriba lo estaría por el orden de la tabla
en HubDB. Es el mismo motivo por el que no hay medidores ni numeración.

- La imagen encabeza la tarjeta en **16/10**, ya no es miniatura al lado.
- El nombre baja de 40 a **30**: sigue siendo el elemento de mayor masa de la página
  —se repite tres veces— y conserva su distancia con el área (30 vs 30 del encabezado,
  pero el encabezado aparece una vez y estas tres, con foto).
- El enlace va **al pie de la tarjeta** (`margin-top: auto`), para que los de un mismo
  renglón queden alineados aunque un nombre ocupe dos líneas y otro una.
- **`auto-fill`, no `auto-fit`**: con una sola ganadora, `auto-fit` estiraría la tarjeta a
  todo el ancho y saldría una foto de 800 de alto. Con `auto-fill` la tarjeta mide siempre
  lo mismo y las columnas que sobran quedan vacías, que es lo honesto.
- Mínimo de columna en **34ch**: con 26ch salían cuatro columnas de 292 y el nombre se
  partía en todas. Da 3 en escritorio, 2 en tablet.
- **En teléfono la tarjeta sigue siendo tarjeta**, foto arriba y texto abajo. Se probó
  pasarla a renglón para ahorrar scroll —tres tarjetas apiladas miden 1126 px— y se
  descartó: a ancho de pantalla la foto es justo lo que da ganas de abrir la licenciatura,
  que es lo que la pantalla tiene que conseguir. Cada tarjeta mide 348 px, así que caben
  dos y pico por pantalla, que es un ritmo de lectura razonable. Decisión de la usuaria.

El enlace vive **dentro** de `.tv-carrera-texto` en la tarjeta y **fuera** en la fila
compacta; el JS lo coloca según la variante.

Verificado a 1440, 900 y 390: **cero fallos de contraste** en las 27 piezas de texto,
flechas a 3.1 y 5.1 (umbral 3), sin desbordamiento.

Aprobado por la usuaria el 2026-11-13.

## 2026-11-13 — Resultado: pase de dirección de arte

Segunda vuelta sobre la pantalla de resultado, esta vez de acabado, no de jerarquía
(esa se corrigió en la entrada de más abajo). Encargo: que se sienta premium,
institucional, editorial y contemporáneo, sin perder la personalidad de la propuesta.

**Hero.** La columna de texto flotaba contra una foto tres veces más alta. La foto baja
de 3/2 a **16/10** y su radio baja de `--radius-section` al de las filas: al doble leía
como burbuja, no como pieza editorial. Apilada —tablet— pasa a banda **21/9**, porque a
ancho completo se comía la pantalla entera; en teléfono vuelve a 3/2.

**La segunda área deja de ser una línea de texto.** Le costó al alumno una decisión
explícita en el desempate y aterrizaba como media frase. Ahora es una **ficha con
destino** bajo una regla y un rótulo: que vea que tiene otra puerta abierta es uno de los
objetivos de la pantalla. De paso le da masa a la columna y cierra el hueco del hero.

**Fila de licenciatura.** La foto va **a hueso del borde izquierdo y de alto completo**:
el filo recto contra la curva de la tarjeta es lo que la hace leer como pieza editorial.
El área sube a **rótulo de categoría** en versalitas sobre el nombre; antes iba debajo y
en gris, y las dos líneas se leían como una sola cosa partida en dos.

**Indicador de que se puede hacer clic.** `.tv-flecha`, la misma flecha del sitio
(`.long-arrow`) más corta, en el enlace de cada fila y en la ficha del área. Crece en
hover. No se inventó iconografía: es el signo que el sitio ya usa.

**El duotono deja de ser morado oscuro.** 23 de las 47 licenciaturas no tienen foto
propia y heredan la de su área. El velo cerrado hacía que la pieza siguiera leyéndose
como foto —una foto turbia— y dos carreras hermanas salían como dos rectángulos negros
iguales. En **tono lila claro** deja de competir con las fotos reales y lee como lo que
es: el color de su área. Que dos del mismo área se parezcan entonces informa.

**Cierre.** Leonel pesaba poco contra un bloque de 1160 de ancho y quedaban casi 200 de
hueco muerto. Columna de texto más corta (1fr / 0.7fr) y personaje más grande (26ch),
parado sobre el piso del bloque. **Apilado se iba a 993 de alto** para un CTA de tres
líneas, así que el cierre ya no se apila en tablet: aguanta dos columnas hasta el
teléfono. Ahí sí se apila, con Leonel a 20ch.

Clases nuevas: `.tv-flecha`, `.tv-otra-area-rotulo`, `.tv-otra-area-ficha`.

**Lo que no se pudo hacer:** el encargo pedía que **cada** licenciatura tuviera imagen
propia. Hay 24 de 47 en el repo, ninguna ruta rota y ningún archivo huérfano; las otras
23 no existen y no se inventan. La lista está en `specs/test-vocacional.md`.

Verificado el flujo completo a 1440, 900 y 390: **cero fallos de contraste** en las 27
piezas de texto, flechas a 3.1 y 5.1 (umbral 3), sin desbordamiento horizontal.

## 2026-11-13 — El aro del control sin marcar, en todas partes

Cierra el pendiente que quedó abierto esta mañana. El indicador redondo de las opciones
de pregunta y el radio del desplegable de filtros usaban `--border-hairline-radio`
(rgba negro al 20 %), que sobre blanco da **1.61:1**: el aro del estado «sin elegir» era
prácticamente invisible, y WCAG 1.4.11 pide 3:1 a un componente de interfaz.

Los dos pasan a `--color-control-ring`, el token que nació ayer para la marca del
desempate: **6.3:1 sobre blanco**. Es el mismo control en las tres pantallas y ahora usa
el mismo aro.

**El filo de la tarjeta de opción no sube.** Lo que identifica la opción y su estado es el
punto, y es al punto al que le toca el 3:1. Contornear las cuatro tarjetas a 6:1 pondría
cuatro recuadros apilados compitiendo con el texto.

**El nombre del token era la trampa.** `--border-hairline-radio` acabó puesto en los
indicadores redondos justamente porque se llamaba «radio», cuando su trabajo era ser el
filo de la tarjeta. Renombrado a `--border-hairline-card`, mismo valor. El aro de un
control va en `--color-control-ring`.

Medido sobre el fondo compuesto real: punto de opción **6.29:1**, radio de filtros
**6.29:1**, filo de tarjeta 1.61:1 (sin requisito).

Aprobado por la usuaria el 2026-11-13.

## 2026-11-13 — Resultado del test: se invierte la jerarquía

La pantalla de resultado tenía la jerarquía al revés. El área salía a 64px y las
licenciaturas —la respuesta que el alumno fue a buscar— a 20: el marco pesaba más del
triple que el contenido. El titulito que las presentaba pesaba 40, el doble que las cosas
que anunciaba. Y el cierre comercial salía también a 64, así que la respuesta del test y
el botón de ventas gritaban al mismo volumen.

**Escala nueva** (escritorio → teléfono):

| Elemento | Antes | Ahora |
|---|---|---|
| Nombre de licenciatura | 20 | **40 → 28** |
| Área (encabezado del resultado) | 64 | 30 → 22 |
| Cierre «¿Lo platicamos?» | 64 | 30 → 22 |
| Etiqueta del bloque | 40 | 20 |

El nombre de la licenciatura pasa a ser el elemento más grande de la página y, como se
repite, también el de mayor masa. El área y el cierre quedan al mismo cuerpo: son los
extremos que abren y cierran, no el contenido.

**Dos grupos en vez de una rejilla plana.** El motor ya calculaba un orden y la página lo
tiraba: pintaba cinco tarjetas idénticas. Ahora se agrupan por puntaje — las del puntaje
más alto arriba, el resto en una lista compacta. **Sin numerarlas**: el instrumento da dos
reactivos por carrera, el puntaje va de cero a ocho y los empates son la norma, así que un
01–05 inventaría un orden que no sostiene. Tampoco hay barras ni cifras, por la misma
razón por la que se quitaron los medidores de afinidad.

**La tarjeta pasa a fila.** La miniatura es cuadrada, del tamaño de la del desempate, en
vez del banner 4:3. La mitad de las licenciaturas (24 de 47) tiene foto propia y la otra
mitad hereda la de su área en duotono: a tamaño de banner esa mezcla leía como un error de
carga. El duotono **se conserva** — sigue marcando imagen de categoría — pero a tamaño de
miniatura lee como lo que es.

**La fila sólo se comporta como enlace cuando lo es.** Hoy sólo Psicología tiene URL; el
hover encendía las cinco y prometía algo que no se cumplía. Donde sí hay destino, el área
clicable es la fila entera, no las tres palabras del enlace.

Clases nuevas: `.tv-carrera-foto`, `.tv-carrera-texto`, `.tv-carrera--mini`,
`.tv-carrera--enlazada`, `.tv-carreras--resto`. Sustituyen a `.tv-carrera-imagen`.
Field nuevo `resultado.carreras_resto`; `carreras_heading` pasa de «Las que más van
contigo» a «Las que más se acercan».

Verificado en el flujo completo a 1440×900 y a 390×844: **cero fallos de contraste** en
las 23 piezas de texto del resultado y sin desbordamiento horizontal.

Aprobado por la usuaria el 2026-11-13.

## 2026-11-13 — El gris de apoyo baja a tinta (`--text-gray-ink`)

El gris del UI Kit (`--text-gray`, #788592, «Texto» en Figma) da **3.77:1 sobre blanco
y 3.37:1 sobre la superficie gris**. AA pide 4.5:1 para texto de lectura, así que el
color que el UI Kit nombra «Texto» era justamente el que no se podía usar para texto.

- Primitivo nuevo `--text-gray-ink`, derivado con `color-mix` del gris del UI Kit, con
  `#626D78` de respaldo. Mide **5.3:1 sobre blanco y 4.7:1 sobre la superficie gris**.
- `--color-text-secondary` pasa a apuntar a la tinta. El primitivo `--text-gray` **no se
  toca**: queda como registro de la ingesta de Figma.
- Los 4 usos que llamaban a `var(--text-gray)` directo —saltándose la capa semántica—
  ahora usan el semántico: `.search-icon`, `.search-clear`, `.filter-label`, `.search-count`.

Los seis usos de lectura pasaban de 3.77 a **5.3:1**: `.area-desc`, `.descubre-card p`,
`.oferta-form-check`, `.filter-label`, `.search-count`, `.search-clear`. Los tres usos
que no son texto (icono de búsqueda y dos bordes) sólo mejoran.

De paso se fue un apaño: `.tv-hito-nombre` bajaba la opacidad del negro para esquivar el
gris. Daba 4.74:1, pero era frágil —el negro es editable desde el theme, y al componerlo
contra el fondo el contraste se iba con él—. Ahora usa el semántico: 5.3:1.

### Token nuevo: `--color-control-ring`

Hallado al medir: el anillo de la marca de selección del desempate estaba en el gris de
apoyo, dado por bueno con su 3.77:1 **sobre blanco**. Pero no vive sobre blanco, sino
sobre una tarjeta de blanco al 70 % encima del morado. Medido ahí daba **2.1:1**, por
debajo del 3:1 que WCAG 1.4.11 pide a un componente de interfaz; oscurecer el gris sólo
lo subía a 3.0, justo en la raya.

`--color-control-ring` se deriva del morado de acento —el mismo color de la etiqueta de
la tarjeta, para que el aro pertenezca a la familia— aclarado hasta no competir con ella:
**3.6:1 sobre la tarjeta**, contra los 6.5:1 de la etiqueta.

Sigue abierto, y es el mismo problema: `--border-hairline-radio` (1.61:1) en el indicador
de las opciones de pregunta. Ese aro quiere este token. **Cerrado el mismo día**; ver la
entrada «El aro del control sin marcar, en todas partes».

Aprobado por la usuaria el 2026-11-13.

## 2026-11-12 — `.btn`: peso 700 y cuerpo mínimo en móvil

El blanco sobre el naranja de marca da 3.14:1. AA lo acepta como «texto grande» —umbral
3:1— a partir de catorce puntos **en negrita**, y el umbral de negrita de WCAG es 700
exacto. `.btn` estaba en 600, así que pedía 4.5:1 y no llegaba.

- `font-weight` de `--weight-semibold` a `--weight-bold`. Aplica a **todos** los botones,
  no sólo a los naranjas: el peso vive en `.btn` y partirlo por variante dejaría botones
  vecinos con tipografías distintas.
- En `@media (max-width: 40em)` el botón bajaba a `--small-size`, por debajo del umbral,
  donde la negrita deja de contar y el naranja volvía a fallar. Sube a `--heading-5-size`.
  De paso el área táctil pasa a 46–48px.
- Guarda nueva: `.btn-orange` combinado con `.small`, `.btn-sm` o dentro de `.button-row`
  usa `--color-text-brand` de fondo. Esas variantes quedan por debajo del umbral aun en
  negrita. Hoy ninguna se usa en naranja; la regla evita que falle en silencio.

Verificado recorriendo el DOM y midiendo cada texto contra su fondo compuesto, en las
cinco pantallas del test, a 1440×900 y a 375×812: **cero fallos**. Sin desbordamiento
horizontal; el botón más largo mide 232 de 375px.

Aprobado por la usuaria el 2026-11-12.

## 2026-11-12 — Token nuevo: `--color-text-brand` (naranja tinta)

El naranja de marca da **3.14:1 sobre blanco**. Alcanza para títulos —AA pide 3:1 a
partir de 24px, o 18.66px en negrita— pero no para texto de lectura, que pide 4.5:1.
Estaba usándose como color de enlace y de antetítulo en todo el sitio.

Primitivo `--orange-ink` y semántico `--color-text-brand`. El primitivo se **deriva** del
naranja de marca con `color-mix`, así que sigue al theme field si el cliente lo edita;
queda el hex `#c34400` como respaldo para navegadores sin soporte. Medido: **5.1:1 sobre
blanco, 4.6:1 sobre el gris de superficie**.

Regla nueva, anotada en `design/01-tokens.md`: el naranja de marca se queda para display
(24px+); por debajo de eso, tinta.

Aplicado en 8 lugares, todos texto chico: `.next-card a`, `.area-hook`,
`.program-mode span:hover`, `.page-btn:hover` (borde y texto), `.descubre-cta`,
`.tv-atras:hover`, `.tv-otra-area a`, `.tv-carrera-enlace`.

**No** se tocó el naranja de marca en títulos (24–40px), ni en bordes y flechas, que son
componentes de interfaz y pasan con 3:1.

**Resuelto el mismo día** para los botones; ver la entrada de arriba.

## 2026-11-12 — Test vocacional: el desempate baja a registro Product

Corrección de registro, no de estilo. El desempate estaba clasificado como Brand en
`specs/test-vocacional.md` y se construyó con titular a escala de héroe: 211 px en tres
renglones, más alto que las ocho opciones juntas, y el bloque pedía 431 px de scroll para
tomar una decisión. El desempate no es un momento, es una **tarea**.

Se queda sobre la superficie morada —sigue siendo una pausa del sistema entre fases— pero
la tipografía baja a escala de pregunta. Variante nueva `.tv-corte--eleccion`; la
transición conserva `.tv-corte` tal cual, **sin cambios**.

Clases nuevas: `.tv-corte--eleccion` (sustituye a `.tv-corte--muchas`), `.tv-corte-pie`,
`.tv-corte-contador`, `.tv-area-marca`. Field nuevo `eleccion.counter`.

Bloque de 771 → 539 px a 1440×900. Cero scroll para decidir, también a 1024×768.

## 2026-11-11 — `encabezado`: variante «sólo logo»

Field `variante` en `encabezado.module`, con opciones `completo` (default) y
`solo-logo`. La segunda quita navegación, CTA y menú móvil; deja logo y marco.

Para páginas de tarea única, donde el menú completo es una rampa de salida. Primera
usuaria: la página del test vocacional (`specs/test-vocacional.md`). Es **aditiva**:
ninguna página existente cambia, porque el default es el comportamiento de siempre.
Aprobada por la usuaria el 2026-11-11.

Clase nueva: `.site-header--solo-logo`.

## 2026-11-11 — Test vocacional: patrones nuevos (pendientes de documentar)

El módulo `test-vocacional.module` introdujo cinco patrones que **todavía no están**
en `03-patterns.md` ni en `interactions.md`, y que hay que promover antes de reutilizarlos
en otra página:

- **Barra de progreso** de proceso multipaso (`.tv-progress`).
- **Chip** de etiqueta no interactiva (`.tv-chip`) y chip seleccionable (`.tv-eleccion-opcion`).
- **Medidor** de afinidad (`.tv-medidor`) — pendiente además de equivalente textual (a11y).
- **Opción tipo radio** en tarjeta grande (`.tv-option`).
- **Wizard multipantalla** dentro de una sola sección.

Abierto también: `--color-text-secondary` no pasa AA a 13px y el módulo concentra 10 de
sus 14 usos en el theme. Es decisión de tokens, no parche del módulo.

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
