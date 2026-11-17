# Página: Test Vocacional

> Spec accionable. Escrito **después** de un demo funcional, que es el orden equivocado:
> casi todos los hallazgos de la auditoría del 2026-11-11 salieron de no haber tenido
> este documento antes. Lo que sigue corrige esa deuda y manda sobre el código actual.

## Meta
- Ruta / slug: `/test-vocacional`
- Lugar en el sitemap: hija de **Oferta Académica**. La puerta ya existe: tarjeta
  «Hacer test vocacional» en `oferta-academica.html → #descubre`, hoy con `href="#"`.
- Objetivo de la página (1 frase): que un alumno de preparatoria descubra sus áreas y
  licenciaturas afines y **termine hablando con un asesor**.
- Plantilla del adapter a usar: `templates/pagina-interna.html`
- Estado: `construido` — diseño implementado el 2026-11-11; pendiente de revisión humana.

## Hallazgo que corrige una decisión anterior

La minuta de revisión decía que las 8 áreas del test chocaban con las 6 del sitio, y
recomendaba que el test adoptara las 6. **Eso estaba mal informado.**

`specs/sitemap.md` (poblado desde Relume, la fuente de contenido) dice en sus notas:
*«Las áreas académicas son 8: Salud, Ingenierías, Negocios, Derecho, Comunicación, Artes,
Educación + una más por confirmar»*. Las 6 de `oferta-academica.html` son el build parcial
actual, que fusionó Comunicación con Artes y omitió Educación.

| Área del test | ¿En el plan del sitemap? | ¿En la página construida? |
|---|---|---|
| Ingeniería y Tecnología | sí (Ingenierías) | sí |
| Ciencias de la Salud | sí | sí |
| Negocios, Economía y Finanzas | sí | sí |
| Derecho, Gobierno y Est. Internacionales | sí (Derecho) | sí (fusionada con Sociales) |
| Educación, Humanidades y Desarrollo Humano | sí (Educación) | **no** |
| Arquitectura, Diseño y Artes | sí (Artes) | sí (fusionada con Comunicación) |
| Comunicación, Entretenimiento y Medios | sí (Comunicación) | sí (fusionada con Artes) |
| Turismo, Gastronomía y Hospitalidad | probablemente «la que falta» | sí |

**La taxonomía del test ya coincide con la del plan.** La reconciliación pendiente es
entre la página construida y su propio sitemap, no entre el test y el sitio.

→ Decisión propuesta: **el test conserva sus 8 áreas** y la página de Oferta Académica
se alinea al plan cuando se complete. Hay que confirmarlo con quien manda el catálogo.
→ Esto reduce las decisiones de la autora: las cuatro de Educación y Humanidades
(Historia, Ciencias Religiosas, Educación, Pedagogía) dejan de ser un problema.

## Registro por zona

El flujo mezcla dos registros y el demo actual los aplanó a uno solo. Se asigna por zona:

| Pantalla | Verbo dominante | Registro |
|---|---|---|
| Inicio | persuade, invita | **Brand** |
| Pregunta (×22–44) | consulta, captura | **Product** |
| Desempate | pide una decisión | **Product sobre superficie Brand** ¹ |
| Transición entre fases | anuncia avance | **Brand** |
| Resultado | anuncia, convierte | **Brand** |

Regla: Product no recibe expresión de marca — es una superficie de uso repetido y la
decoración ahí cansa. Brand enmarca a Product, nunca al revés.

¹ **Corregido el 2026-11-12.** El desempate estaba clasificado como Brand y se construyó
con el titular a escala de héroe. Es un error de registro: el desempate no es un momento,
es una **tarea** — el alumno tiene que elegir. Se queda sobre la superficie morada, porque
sigue siendo una pausa del sistema entre fases, pero la tipografía baja a escala de
pregunta. El color dice «esto es un alto»; la tipografía dice «esto es trabajo tuyo».

## Secciones (en orden)

| # | Sección | Componente(s) a reutilizar | ¿Nuevo? | Contenido |
|---|---|---|---|---|
| 1 | Encabezado | `encabezado.module` (global) | variante | Ver «Componentes nuevos» |
| 2 | Test | `test-vocacional.module` | sí (construido) | 5 pantallas, una visible a la vez |
| 3 | Pie de página | `pie-de-pagina.module` (global) | no | Sin cambios |

La página es el módulo. Es deliberado: un test de 10 minutos no compite con otras
secciones. No se agregan bloques de relleno.

## Dirección de diseño

**Color.** Estrategia **comprometida**, no contenida. La Anáhuac tiene un naranja que la
gente ya asocia y un sistema morado completo; el demo los usó como hilo delgado sobre
blanco puro. Las zonas Brand toman color de verdad: `--glow-orange-strong` o `--hero-glow`
en el inicio, `--surface-accent` (morado) con texto invertido en desempate y transición.
Product se queda en `--surface`.

**Alineación.** El TEXTO siempre a la izquierda: centrar el contenido aplana la
jerarquía, y el demo tenía 10 reglas de centrado que dejaron las cinco pantallas iguales.

**Enmienda 2026-11-11.** El BLOQUE de la pregunta sí se centra en la columna, con su
texto alineado a la izquierda dentro. Pegado al borde izquierdo dejaba 872 px vacíos a
la derecha a 1440 —el 60% de la pantalla— y leía como inacabado, no como enfocado. Es
el patrón estándar de los formularios de tarea única. Sigue valiendo que el contenido
no se centra: el desempate y la transición son las únicas pantallas con texto centrado,
por ser de una sola decisión.

**La pregunta no va en tarjeta.** Una pregunta suelta no es una colección de unidades
comparables; la caja no aporta. La pregunta vive sobre el fondo, a `--heading-3-size` en
escritorio. Las tarjetas se reservan para las licenciaturas del resultado, que sí son
una colección comparable.

**Enmienda 2026-11-11.** Las opciones suben a `--heading-6-size` (18 px). A 16 px contra
un enunciado de 40 px, lo único accionable de la pantalla era lo más callado, y eso cansa
en 32 pantallas seguidas. La fila pasa a 71 px de alto.

**Radio con jerarquía.** El demo usó `--radius-pill` en 8 de 12 casos. Píldora sólo para
chips y medidores; `--radius-button` para opciones y botones; `--radius` para las
tarjetas de licenciatura.

**Imagen.** Leonel y el banco fotográfico del sitio. Leonel aparece en el inicio (como ya
hace en `oferta-form.module`) y en el resultado. Las preguntas van sin imagen.

**Movimiento: un solo momento memorable.** Toda la animación se gasta en la revelación
del resultado. Las 22–44 pantallas de pregunta quedan quietas; el avance entre preguntas
es un cambio de contenido, no una transición.

**Corrección 2026-11-11.** Se dijo que bajo `prefers-reduced-motion` la revelación se
conservaría «en otra forma». **No es lo que hace.** La regla global del theme
(`main.css` §prefers-reduced-motion) anula toda animación con `!important`, así que el
resultado aparece de golpe. Es seguro —el contenido se ve— pero no cumple lo prometido.
Queda abierto: o se acepta así y se corrige esta línea, o se añade una variante de
aparición sin desplazamiento que sobreviva a la regla global.

**Sin versalitas ni puntos medios.** «PARTE 1 · ÁREAS» cae en dos tells de la lista
anti-genérico y ninguno tiene razón de ser. Se sustituye por texto normal.

## Una pregunta = una pantalla

**Enmienda 2026-11-11.** El requisito es que **el alumno nunca tenga que hacer scroll
para contestar**. Con una sola columna la última opción caía en 1016 con una ventana de
900: había scroll en las 32 preguntas, en un escritorio común. Medido, no estimado.

La estructura que lo resuelve:

- **Dos columnas en escritorio** (≥64em): enunciado a la izquierda, opciones a la
  derecha. Resuelve dos cosas a la vez — quita el scroll y usa el ancho que sobraba.
  El enunciado baja a `--size-30`, que en media columna se parte menos.
- **El bloque ocupa el ancho del contenedor**, con los mismos bordes que el encabezado.
  Un `max-width: 76ch` se resolvía a 683 px sobre 1240 disponibles —`ch` depende de la
  fuente del elemento, no del tamaño que uno supone— y desperdiciaba 557 px. La columna
  de opciones se dimensiona exacta (`46ch`) en vez de topar su contenido dentro de una
  columna más ancha: así el borde derecho coincide y no quedan huecos sueltos.
- **La zona Product ocupa la ventana** y centra la pregunta en el alto disponible, de
  modo que cada pregunta es una lámina estable. El avance se queda arriba y **no se
  mueve** entre preguntas: si bailara, distraería 32 veces.
- **Una columna por debajo de 64em**, con el enunciado a `--heading-4-size`.
- **Pantallas bajas** (`max-height: 44em`, tipo iPhone SE): se recorta el gasto vertical
  —se ocultan los nombres de los hitos, el enunciado baja a `--size-22` y las filas a
  61 px— porque el problema ahí es el alto, no el ancho. Los objetivos táctiles siguen
  muy por encima de 44 px.

Verificado con el reactivo **más largo de los 102** (161 caracteres):

| Ventana | Última opción termina en | ¿Cabe? |
|---|---|---|
| 1440 × 900 | 685 | sí |
| 375 × 812 | 789 | sí |
| 375 × 667 | 647 | sí |

### El encabezado no es fijo en esta página

**Enmienda 2026-11-11.** La variante «sólo logo» usa `position: static`.

El encabezado fijo tapaba las tarjetas al hacer scroll en el resultado, y obligaba a
reservar 151 px muertos encima de **cada una** de las 32 preguntas. Se evaluó ocultarlo
al hacer scroll, pero en esta página **no hay navegación**: su trabajo es marcar la marca
al entrar, no seguir al alumno. Seguirlo sólo servía para taparle el contenido.

Dejar de ser fijo lo resuelve sin JavaScript y sin movimiento, y es coherente con la
regla de gastar el movimiento en un solo momento. En las páginas con navegación el
encabezado sigue fijo: esto es de la variante, no de la base.

Ojo con el presupuesto vertical: al entrar en flujo, el alto del encabezado **se suma**
al padding en vez de solaparse. La zona Product usa `--space-7` arriba (y `--space-4` en
pantallas bajas); la de marca puede respirar más.

## Pantallas de marca: imagen, no chips

**Enmienda 2026-11-11.** La transición y el desempate eran texto centrado con chips
grises que repetían lo que el párrafo ya decía. Se rehicieron:

- **Dos columnas**: el mensaje a la izquierda, las áreas a la derecha como filas con su
  **fotografía**. El párrafo ya NO nombra las áreas — las filas lo hacen.
- Con más de tres áreas empatadas el bloque se apila y la lista va en rejilla: a una
  columna crecía a 1177 px contra una ventana de 900.
- Las miniaturas de área **no llevan `loading="lazy"`**: están en pantalla desde que
  aparece el bloque y salían como huecos lilas.

### Las ocho áreas del test tienen foto propia

El theme ya traía `area-salud.jpg`, `area-educacion.jpg`, `area-ingenierias.jpg` y
cuatro más: **siete imágenes que corresponden a la taxonomía del TEST (8 áreas), no a
las 6 de la página construida.** Es otra confirmación del hallazgo de taxonomía.

Antes el hero usaba la foto del área del SITIO, así que «Educación, Humanidades y
Desarrollo Humano» salía ilustrada con una imagen de derecho. Ahora usa la del área que
nombra.

### Ninguna tarjeta queda sin imagen

Los recuadros lilas con una inicial parecían un error. Toda licenciatura lleva foto: la
propia (24 de 47) o, si no la tiene, la de su área **en duotono morado**, que la marca
como imagen de categoría. Sin el duotono, dos carreras del mismo área salían con la foto
idéntica una junto a otra y parecía un fallo.

### El encabezado se retira al hacer scroll

En vez de dejarlo estático, la variante «sólo logo» sigue fija pero se esconde al bajar
y vuelve al subir (`is-oculto`, conmutado en `main.js` con `requestAnimationFrame` y un
umbral de 8 px para ignorar el temblor del trackpad). No se esconde en los primeros
160 px. Sólo aplica a esa variante.

## Móvil: tres correcciones de la revisión

**2026-11-11.**

1. **El botón de continuar va después de la lista.** Apilado, caía entre el texto y las
   áreas: había que bajar a elegir y volver a subir. Se reordena con `display: contents`
   sobre el bloque de texto y `order` en el contenedor.
2. **Jerarquía invertida.** «Las que más van contigo» (40 px) salía más grande que el
   nombre del área (30 px), que es el premio de diez minutos. El subtítulo de sección
   baja en los dos breakpoints.
3. **El encabezado se quedaba escondido arriba del todo.** Con un salto grande al tope,
   la diferencia contra el último scroll no superaba el umbral y la clase `is-oculto`
   se conservaba. Ahora, por debajo del despegue, siempre se muestra.

Verificado con el reactivo más largo: 375×812 termina en 777 y 375×667 en 639; ambos
caben sin scroll. Sin desbordamiento horizontal en ninguna pantalla del flujo.

## El cierre del resultado

**Enmienda 2026-11-12.** El bloque de conversión medía ~790 px de alto para ~250 px de
contenido: la mascota, sin tope de altura, estiraba la caja y quedaba flotando en medio.

- **Leonel se apoya en el borde inferior** del bloque (`align-items: end`, sin padding
  abajo y `overflow: hidden`), que es como se para una mascota. El bloque bajó a 512 px.
- **La nota de cierre y «Volver a empezar» se agrupan** con una regla superior: la nota
  a la izquierda, la acción a la derecha. Colgaban sueltas debajo y leían como restos.
- **En móvil la mascota ya no se oculta.** Con el bloque apilado cabe debajo del texto,
  y el cierre es el momento emocional: en teléfono es donde más alumnos lo verán.

## El desempate

**Enmienda 2026-11-12.** Con cinco u ocho áreas empatadas el bloque medía 771 px en una
ventana de 900 y pedía 431 px de scroll. El reparto estaba invertido: el titular gastaba
211 px en tres renglones —más que las ocho opciones juntas, que ocupaban 210— y el botón
iba **antes** de la lista, así que se leía la instrucción, se chocaba con un botón apagado
y sólo después aparecía lo que había que decidir.

Rehecho con el mismo contrato que las pantallas de pregunta: **una decisión, una
pantalla, sin scroll.**

| | Antes | Ahora |
|---|---|---|
| Bloque (1440×900, 8 empatadas) | 771 px | **539 px** |
| Titular | 64 px, 3 renglones (211 px) | 40 px, 1 renglón (44 px) |
| Fila de área | 99 px | 68 px |
| Scroll para decidir | 431 px | **0** |

- **Orden de lectura: enunciado → opciones → acción.** El pie agrupa el contador y el
  botón bajo una regla, igual que el pie del resultado.
- **Contador visible.** «0 de 2 áreas elegidas» ya existía sólo como anuncio para
  lectores de pantalla. Ahora se ve, y sale de `fields.json` (`eleccion.counter`), no del
  JS.
- **Encabezado en dos columnas** que se parte solo con `flex-wrap` cuando el enunciado y
  la instrucción dejan de caber. Sin breakpoint inventado.
- **Marca de selección.** El borde naranja solo no decía «elegida»: ahora cada fila lleva
  un círculo que se llena con una palomita. Anillo vacío en `--color-control-ring`
  (3.6:1 sobre la tarjeta). Primero se puso en `--color-text-secondary`, dando por
  bueno su 3.77:1 **sobre blanco**; medido contra la tarjeta real —blanco al 70 %
  sobre el morado— daba 2.1:1 y no llegaba al 3:1 que WCAG pide a un componente.
  Corregido el 2026-11-13 con token propio.
- **Cubierto el cupo, las demás se apagan** (`aria-disabled`, opacidad 0.6). Antes el clic
  en una tercera no hacía nada y no se entendía por qué. Siguen enfocables.
- **Botón apagado con contorno**, no naranja al 45 %: sobre el morado daba un café sucio
  que parecía un error de render.
- **Columnas según cuántas empataron**: 2 con dos o cuatro áreas, 3 con tres o cinco o
  más. El módulo lo fija en la **caja** (no en la lista) porque un estilo inline le gana a
  cualquier media query, y en anchos medios el CSS tiene que poder bajarlo a dos.

Verificado a 1440×900 (539 px, cabe), 1024×768 (579 px, cabe) y 375×812 (1093 px, sin
desbordamiento horizontal, filas de 68–86 px). La transición comparte `.tv-corte` y
conserva su registro Brand: no se tocó.

## Ritmo del cuestionario

- Progreso **por fase con hitos**, no una barra continua de 44 pasos.
- El contador se expresa en tiempo, no en unidades: «te faltan unos 4 minutos» en vez de
  «Pregunta 17 de 24». La estimación sale de la longitud real de la rama.
- La Fase 2 debe **verse distinta** de la Fase 1: cambia de escala (de 4 opciones a 3) y
  de propósito, y hoy son idénticas.
- El avance automático de 260 ms se revisa: quita agencia y castiga el toque accidental.
  Decisión pendiente de prueba con usuarios reales.

## El resultado

Es el premio de 10 minutos de trabajo y hoy es una lista. Se rehace como hero:

1. Titular grande con **el nombre del área**, no «Esto es lo que encontramos».
   **Corregido el 2026-11-13:** el titular grande no era el área. Ver «La jerarquía»
   más abajo.
2. Las licenciaturas como tarjetas con imagen, no filas con barra.
   **Corregido el 2026-11-13:** son filas, no tarjetas. Ver abajo.
3. **CTA primario: «Habla con un asesor»** — es la conversión de admisiones y ya existe
   como tarjeta hermana en Oferta Académica. El resultado del test es el mejor pretexto
   para esa conversación.
4. CTA secundario: descargar el PDF.
5. Enlaces a cada licenciatura y a su área.

Nota: los medidores de afinidad **se eliminan o se reemplazan por la etiqueta de la
escala**. Un área se mide con un solo reactivo de cuatro valores; una barra al 75% junto a
otra al 100% aparenta una precisión que el instrumento no tiene, y además hoy no es legible
con lector de pantalla.

### La jerarquía del resultado

El punto 1 de arriba estaba mal y se construyó tal cual: el área salía a 64px y la
licenciatura a 20. El alumno no hizo el test para enterarse de su área; la hizo para saber
qué estudiar. El marco pesaba más del triple que el contenido, y el cierre comercial
—también a 64— gritaba igual de fuerte que la respuesta.

Desde el 2026-11-13 el **nombre de la licenciatura es el elemento más grande de la
página** (40px, 28 en teléfono). El área y el cierre bajan a 30 (22 en teléfono): son los
extremos que abren y cierran. La etiqueta del bloque baja de 40 a 20.

**Se agrupan por puntaje, no se numeran.** El motor ya calculaba un orden y la rejilla lo
tiraba pintando cinco tarjetas iguales. Ahora las del puntaje más alto van arriba, en fila
grande, y el resto en una lista compacta bajo «También se acercan». Numerarlas 01–05 sería
inventar precisión: con dos reactivos por carrera el puntaje va de 0 a 8 y los empates son
la norma. Es la misma razón por la que no hay medidores.

**Son tarjetas, no filas.** Se probaron las dos y la fila a ancho completo dejaba ~700 px
de blanco entre el nombre y el enlace: leía como tabla. La tarjeta pone la imagen al frente,
que es lo que da ganas de abrir una licenciatura. **También en teléfono**: pasarla a renglón
ahí ahorraba scroll (1126 px el bloque de tres) pero perdía justo lo que la hace funcionar.

**No hay una destacada.** Se maquetó y se descartó: «la que más se acerca» promete un
ganador único, y en el grupo de arriba los empates son la norma. La que quedara al frente
lo estaría por el orden de la tabla en HubDB, no por el test.

**La tarjeta sólo se enciende si lleva a algún lado.** Hoy sólo Psicología tiene URL. Donde
sí la hay, el área clicable es la tarjeta completa.

Lo que sigue pendiente aquí: el **porqué** de cada licenciatura. Hoy la fila dice nombre y
área; el hueco para una línea de razón está, pero el texto es de los 47 que faltan de la
Universidad.

### Deuda de imágenes: 23 licenciaturas sin foto propia

Revisado el 2026-11-13: **24 de las 47** tienen foto en el repo
(`theme/images/oferta-academica/elige-tu-camino/`), ninguna ruta está rota y no sobra
ningún archivo. Las otras 23 heredan la foto de su área en tono de categoría, que es lo
correcto mientras no exista la propia, pero no la sustituye.

Faltan: Psicología · Biotecnología · Administración de Negocios · Administración y
Dirección de Empresas · Mercadotecnia Estratégica · Engineering Management · Global
Management · Ingeniería Industrial para la Dirección · Ingeniería Mecatrónica ·
Ingeniería Química · Ciencia de Datos · Actuaría · Artes Visuales · Teatro y Actuación ·
Música Contemporánea · Dirección del Deporte · Global Development · Relaciones
Internacionales · Historia · Ciencias Religiosas · Educación · Pedagogía Organizacional
y Educativa · Dirección Hotelera.

Es encargo de banco de imágenes, no de código.

## Componentes nuevos requeridos

1. **`test-vocacional.module`** — construido. Contrato de fields en su `fields.json`,
   documentación en su `README.md`.
2. **Variante de `encabezado.module`: `sin-navegacion`** — durante un test de 10 minutos
   la navegación completa es una rampa de salida. Se propone una variante con logo y
   salida, sin menú.
   ⚠️ `encabezado` es **global**: por `docs/change-protocol.md` esto va como **variante**,
   nunca como modificación de la base, y necesita aprobación antes de construirse.
3. **Patrones a promover a `design/03-patterns.md`** antes de reutilizarlos: barra de
   progreso multipaso, chip seleccionable, opción tipo radio en bloque, wizard
   multipantalla. Registrados como pendientes en `design/CHANGELOG.md` (2026-11-11).

## Estados y casos borde

| Caso | Comportamiento | Estado |
|---|---|---|
| Sin datos del test | Botón deshabilitado + mensaje + `console.error` | implementado |
| Sin JavaScript | `<noscript>` con alternativa | implementado |
| Empate de áreas en el corte | Pantalla de desempate: elige el alumno | implementado |
| Ninguna licenciatura llega al mínimo | Muestra las 3 mejores; nadie se queda sin resultado | implementado |
| Vuelve días después | **Debe preguntar «continuar o empezar de nuevo»**; hoy retoma a la fuerza | pendiente |
| Cambian los reactivos | El progreso guardado se descarta por versión | implementado |
| Doble toque | No salta pregunta; el segundo toque cambia la respuesta | implementado |
| Responsive | Una columna desde `40em`; sin overflow a 320px | verificado a 375px |

## SEO / metadata

- Title: `Test vocacional — Universidad Anáhuac México`
- Meta description: `Descubre en 10 minutos qué áreas y licenciaturas van con tus intereses. Test vocacional gratuito de la Universidad Anáhuac México.`
- Slug / URL canónica: `/test-vocacional`
- Open Graph: mismo título y descripción; imagen pendiente de definir con el banco del sitio.
- H1 único: el título del inicio («Test vocacional»). Las pantallas siguientes usan H2.
  ⚠️ Hoy el módulo usa H2 en el inicio porque vive dentro de una página con H1 propio.
  Al ser página dedicada, el inicio debe emitir el H1.
- Datos estructurados: no aplica.

## Privacidad

Los aplicantes son estudiantes de preparatoria y **muchos son menores de edad**:

- El aviso de privacidad y el consentimiento van **antes** de capturar nombre o correo,
  no al final.
- Las respuestas viven en `localStorage` sin caducidad. Debe haber una forma explícita de
  borrarlas y una caducidad razonable.
- Lo valida el área jurídica de la universidad, no nosotros.

## Notas de validación

- Referencia canónica a respetar: `specs/home.md`.
- Riesgos de consistencia a vigilar:
  - ~~**Enlaces naranjas a 3.14:1.**~~ **Resuelto el 2026-11-12** con el token
    `--color-text-brand` (naranja tinta, 5.1:1 sobre blanco). Ver `design/CHANGELOG.md`.
    Afectaba `.tv-carrera-enlace`, `.tv-otra-area a` y `.tv-atras:hover`.
  - ~~**Gris de apoyo a 3.77:1.**~~ **Resuelto el 2026-11-13** como decisión de tokens:
    `--color-text-secondary` pasa a apuntar a `--text-gray-ink` (5.3:1 sobre blanco,
    4.7:1 sobre la superficie gris). El primitivo `--text-gray` queda intacto como
    registro de la ingesta de Figma. De paso se fue el apaño del hito pendiente, que
    bajaba la opacidad del negro para esquivar el gris. Ver `design/CHANGELOG.md`.
  - ~~**Botones naranjas a 3.14:1.**~~ Hallado y **resuelto el 2026-11-12**: `.btn` sube
    a peso 700 y, en móvil, a `--heading-5-size`, que lo mantiene dentro de «texto
    grande» (umbral 3:1). Ver `design/CHANGELOG.md`.
  - ~~**Indicador de opción a 1.61:1.**~~ **Resuelto el 2026-11-13.** El aro del punto
    y el del radio de filtros pasan a `--color-control-ring` (6.3:1 sobre blanco), el
    mismo token que la marca del desempate: es el mismo control. El **filo** de la
    tarjeta de opción se queda en el hairline: lo que identifica la opción y su estado
    es el punto, y contornear las cuatro tarjetas sería ruido. El token se llamaba
    `--border-hairline-radio` y por ese nombre acabó puesto en los aros; ahora es
    `--border-hairline-card`, que es lo que de verdad es.
  - **Navegación fija.** Si el test queda primero bajo el header fijo necesita la
    safe-area de `--nav-height`; `.section-pad` sola no la da (`design/02-foundations.md`).
  - Copy de cara al usuario todavía en el código: debe migrar a `fields.json`.

## Notas de revisión humana
> El humano escribe aquí ajustes de diseño/interacción, efectos o instrucciones.
> El agente las incorpora siguiendo `docs/change-protocol.md`.

- Decidido 2026-11-11: nivel de interacción **un momento memorable**; imagen **Leonel y
  banco del sitio**; conversión del resultado **hablar con un asesor**.
- [x] Aprobada por la usuaria (2026-11-11) la variante del encabezado «sólo logo»,
      construida como field aditivo en `encabezado.module`.
- [ ] Pendiente: confirmar con el responsable del catálogo que el sitio va a 8 áreas.
- [ ] Pendiente de revisión humana general.
