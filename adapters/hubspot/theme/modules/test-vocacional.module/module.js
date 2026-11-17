/* ============================================================
   TEST VOCACIONAL — motor
   Spec: specs/test-vocacional.md

   Dos fases: la 1 ubica al alumno en áreas, la 2 sólo pregunta por las
   licenciaturas de esas áreas.

   REGISTRO POR ZONA. Inicio, desempate, transición y resultado son Brand;
   las 22 a 44 pantallas de pregunta son Product y van sin adorno. Todo el
   movimiento se gasta en un solo momento: la revelación del resultado.

   REGLAS DE CÁLCULO PROVISIONALES, en `reglasPorDefecto` y sobreescribibles
   desde los fields. Pendientes de validar con la autora del instrumento.
   ============================================================ */
(function () {
  "use strict";

  var ALMACEN = "anahuac:tv:v1";
  var SEGUNDOS_POR_REACTIVO = 8; // la autora estima 8–12 min para los 94

  var reglasPorDefecto = {
    areasQuePasan: 2,
    maxCarreras: 5,
    puntajeMinimo: 5,
    topeEmpate: 1
  };

  function texto(el, valor) { el.textContent = valor == null ? "" : String(valor); return el; }

  function crear(etiqueta, clase, contenido) {
    var el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (contenido != null) texto(el, contenido);
    return el;
  }

  function plantilla(cadena, datos) {
    return String(cadena || "").replace(/\{(\w+)\}/g, function (coincidencia, clave) {
      return Object.prototype.hasOwnProperty.call(datos, clave) ? datos[clave] : coincidencia;
    });
  }

  function listaLegible(nombres) {
    if (nombres.length <= 1) return nombres[0] || "";
    return nombres.slice(0, -1).join(", ") + " y " + nombres[nombres.length - 1];
  }

  function animacionReducida() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // El contador se expresa en tiempo, no en unidades: «Pregunta 17 de 24» es un
  // muro; «te faltan unos 4 minutos» es la unidad en la que piensa el alumno.
  function tiempoRestante(preguntas, config) {
    var minutos = Math.round((preguntas * SEGUNDOS_POR_REACTIVO) / 60);
    if (preguntas <= 0) return "";
    if (minutos <= 1) return config.tiempoCorto;
    return plantilla(config.tiempo, { n: minutos });
  }

  /* ---------- persistencia (best effort: nunca debe romper el test) ---------- */

  function guardar(estado) {
    try { window.localStorage.setItem(ALMACEN, JSON.stringify(estado)); } catch (e) { /* modo privado */ }
  }

  function recuperar() {
    try {
      var crudo = window.localStorage.getItem(ALMACEN);
      return crudo ? JSON.parse(crudo) : null;
    } catch (e) { return null; }
  }

  function olvidar() {
    try { window.localStorage.removeItem(ALMACEN); } catch (e) { /* no pasa nada */ }
  }

  /* ---------- datos ---------- */

  function leerDatos(raiz) {
    var embebido = raiz.querySelector('script[type="application/json"].tv-data');
    if (embebido) {
      try { return JSON.parse(embebido.textContent); } catch (e) { /* cae a la semilla */ }
    }
    return window.TEST_VOCACIONAL_DATA || null;
  }

  function leerConfig(raiz) {
    var nodo = raiz.querySelector("script.tv-config");
    if (!nodo) return {};
    try { return JSON.parse(nodo.textContent); } catch (e) { return {}; }
  }

  function leerReglas(raiz) {
    var leerNumero = function (nombre, porDefecto) {
      var valor = parseInt(raiz.getAttribute(nombre), 10);
      return isNaN(valor) ? porDefecto : valor;
    };
    return {
      areasQuePasan: leerNumero("data-areas-que-pasan", reglasPorDefecto.areasQuePasan),
      maxCarreras: leerNumero("data-max-carreras", reglasPorDefecto.maxCarreras),
      puntajeMinimo: leerNumero("data-puntaje-minimo", reglasPorDefecto.puntajeMinimo),
      topeEmpate: reglasPorDefecto.topeEmpate,
      // El atributo se emite SÓLO cuando el field está encendido ({% if %} en la
      // plantilla). Volcar el booleano crudo y compararlo contra "false" no servía:
      // HubL escribe "False" con mayúscula y los avisos nunca se apagaban.
      marcarProvisional: raiz.hasAttribute("data-marcar-provisional"),
      baseImagenes: raiz.getAttribute("data-img-base") || ""
    };
  }

  /* ---------- cálculo ---------- */

  // Fase 1: un reactivo por área (1 a 4). Con una sola pregunta por área en una
  // escala de cuatro puntos los empates son lo normal, no la excepción. Antes se
  // tomaban las primeras de la lista, así que el orden en que la autora escribió
  // las áreas decidía el resultado: dos alumnos con respuestas opuestas acababan
  // en las mismas tres. Ahora las empatadas en el corte las elige el alumno.
  function clasificarAreas(areas, respuestas, reglas) {
    var puntuadas = areas.map(function (area) {
      return { area: area, puntaje: respuestas[area.id] || 0 };
    }).sort(function (a, b) { return b.puntaje - a.puntaje; });

    var cupo = Math.min(reglas.areasQuePasan, puntuadas.length);
    var corte = puntuadas[cupo - 1];
    if (!corte) return { ganadoras: puntuadas, empatadas: [], faltan: 0 };

    var seguras = puntuadas.filter(function (f) { return f.puntaje > corte.puntaje; });
    var empatadas = puntuadas.filter(function (f) { return f.puntaje === corte.puntaje; });

    if (seguras.length + empatadas.length <= cupo) {
      return { ganadoras: seguras.concat(empatadas), empatadas: [], faltan: 0 };
    }
    return { ganadoras: seguras, empatadas: empatadas, faltan: cupo - seguras.length };
  }

  // Fase 2: cada licenciatura suma sus dos reactivos (2 a 6).
  function carrerasGanadoras(licenciaturas, respuestas, reglas) {
    var puntuadas = licenciaturas.map(function (lic) {
      var puntaje = lic.reactivos.reduce(function (suma, r) {
        return suma + (respuestas["r" + r.n] || 0);
      }, 0);
      return { lic: lic, puntaje: puntaje };
    }).sort(function (a, b) { return b.puntaje - a.puntaje; });

    var pasan = puntuadas.filter(function (f) { return f.puntaje >= reglas.puntajeMinimo; });
    // Red de seguridad: nadie se queda sin resultado.
    if (!pasan.length) pasan = puntuadas.slice(0, 3);
    return pasan.slice(0, reglas.maxCarreras);
  }

  /* ---------- motor ---------- */

  function iniciar(raiz) {
    var datos = leerDatos(raiz);
    if (!datos) {
      // En HubSpot no está garantizado que module.js corra después del <script>
      // de datos. Se reintenta al terminar de cargar y, si tampoco están, se dice
      // en voz alta en vez de dejar la página muerta.
      if (raiz.getAttribute("data-tv-reintento") !== "1") {
        raiz.setAttribute("data-tv-reintento", "1");
        window.addEventListener("load", function () { iniciar(raiz); });
        return;
      }
      if (window.console) {
        window.console.error("[test-vocacional] no se encontraron los datos del test " +
          "(ni el JSON embebido .tv-data ni window.TEST_VOCACIONAL_DATA).");
      }
      var botonMuerto = raiz.querySelector("[data-tv-start]");
      if (botonMuerto) botonMuerto.disabled = true;
      var intro = raiz.querySelector('[data-tv-screen="intro"]');
      if (intro) intro.appendChild(crear("p", "tv-nota",
        "El test no está disponible en este momento. Vuelve a intentarlo más tarde."));
      return;
    }

    var config = leerConfig(raiz);
    var reglas = leerReglas(raiz);

    var pantallas = {};
    ["intro", "pregunta", "eleccion", "transicion", "resultado"].forEach(function (nombre) {
      pantallas[nombre] = raiz.querySelector('[data-tv-screen="' + nombre + '"]');
    });

    var avance = raiz.querySelector("[data-tv-avance]");
    var hitos = raiz.querySelectorAll("[data-tv-hito]");
    var reloj = raiz.querySelector("[data-tv-tiempo]");
    var vivo = raiz.querySelector("[data-tv-live]");

    var estado = {
      pantalla: "intro",
      fase: 1,
      indice: 0,
      respuestasAreas: {},
      respuestasCarreras: {},
      areas: [],
      empatadas: [],
      faltan: 0,
      licenciaturas: [],
      // Sella el progreso con la versión de los datos: cuando lleguen los
      // reactivos definitivos, un test a medias ya no corresponde y se descarta.
      version: datos.version
    };

    var preguntasFase2 = [];
    var avanceEnCurso = null;
    // Mientras no se sabe la rama, se proyecta su largo típico: licenciaturas
    // por área × las áreas que pasan × 2 reactivos. Sin esto la primera pantalla
    // prometía «menos de un minuto» para un test de diez.
    var proyeccionFase2 = Math.round(
      (datos.fase2.licenciaturas.length / datos.fase1.areas.length) * reglas.areasQuePasan) * 2;

    function imagen(ruta) { return ruta ? reglas.baseImagenes + ruta : ""; }

    // Fila de área con su foto. La usan el desempate (como botón elegible) y
    // la transición (como lista). Antes eran chips grises que parecían botones
    // apagados y repetían lo que el párrafo ya decía.
    function filaArea(area, comoBoton) {
      var fila = crear(comoBoton ? "button" : "li", "tv-area-fila");
      if (comoBoton) fila.type = "button";
      var foto = crear("span", "tv-area-foto");
      if (area.imagen) {
        var img = document.createElement("img");
        img.src = imagen(area.imagen);
        img.alt = "";
        foto.appendChild(img);
      }
      fila.appendChild(foto);
      fila.appendChild(crear("span", null, area.nombre));
      // La marca va sólo en la versión elegible: el borde naranja solo no
      // alcanzaba para decir "ésta ya está elegida".
      if (comoBoton) {
        var marca = crear("span", "tv-area-marca");
        marca.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">'
          + '<path d="M4.5 10.5 8.2 14.2 15.5 6.4" fill="none" stroke="currentColor"'
          + ' stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        fila.appendChild(marca);
      }
      return fila;
    }

    function preguntasFase1() {
      return datos.fase1.areas.map(function (area) {
        return { clave: area.id, texto: area.reactivo, escala: datos.fase1.escala };
      });
    }

    function armarFase2() {
      var ids = {};
      estado.areas.forEach(function (fila) { ids[fila.area.id] = true; });
      var elegidas = datos.fase2.licenciaturas.filter(function (lic) {
        return lic.areaTest && ids[lic.areaTest];
      });
      // Las que todavía no tienen área asignada entran si su área del sitio
      // coincide con alguna ganadora: así el demo corre con el mapa provisional.
      var areasSitio = {};
      estado.areas.forEach(function (fila) { areasSitio[fila.area.areaSitio] = true; });
      datos.fase2.licenciaturas.forEach(function (lic) {
        if (!lic.areaTest && areasSitio[lic.areaSitio] && elegidas.indexOf(lic) === -1) elegidas.push(lic);
      });

      preguntasFase2 = [];
      elegidas.forEach(function (lic) {
        lic.reactivos.forEach(function (r) {
          preguntasFase2.push({ n: r.n, clave: "r" + r.n, texto: r.texto, escala: datos.fase2.escala, lic: lic });
        });
      });
      // La autora barajó los 94 reactivos a propósito: su numeración intercala
      // licenciaturas para que el alumno no sepa qué se le está midiendo. Al
      // filtrar por área hay que CONSERVAR ese orden; agruparlos por carrera
      // invita a contestar por autoimagen.
      preguntasFase2.sort(function (a, b) { return a.n - b.n; });
      estado.licenciaturas = elegidas.map(function (l) { return l.id; });
      return elegidas;
    }

    function preguntasActuales() { return estado.fase === 1 ? preguntasFase1() : preguntasFase2; }
    function respuestasActuales() { return estado.fase === 1 ? estado.respuestasAreas : estado.respuestasCarreras; }

    function mostrar(nombre) {
      Object.keys(pantallas).forEach(function (clave) {
        if (pantallas[clave]) pantallas[clave].hidden = clave !== nombre;
      });
      estado.pantalla = nombre;
      if (avance) avance.hidden = nombre !== "pregunta";
      raiz.classList.toggle("tv--marca", nombre !== "pregunta");
      acomodarScroll();
    }

    /* Al cambiar de pantalla el scroll se queda donde estaba, y la pantalla
       nueva casi siempre es mas corta que la anterior: del inicio —que es
       alto, con Leonel de cuerpo entero— a una pregunta, por ejemplo. El
       alumno que bajo para alcanzar "Comenzar el test" entraba a la pregunta
       con el enunciado y la primera opcion DETRAS del encabezado fijo, y
       pasaba igual en las cinco pantallas: nunca volvia a ver un titulo.
       Todos los focus() del modulo llevan preventScroll para no dar tirones,
       asi que no habia nada que recolocara la vista.

       Se corrige solo cuando hace falta —si la seccion ya empieza dentro de
       la ventana no se toca nada, asi que entre preguntas no se mueve— y sin
       animar: es un reencuadre, no un desplazamiento con intencion, y este
       flujo esta quieto a proposito. */
    function acomodarScroll() {
      var arriba = raiz.getBoundingClientRect().top;
      if (arriba >= 0) return;
      var destino = arriba + (window.pageYOffset || document.documentElement.scrollTop || 0);
      // El tema pone scroll-behavior: smooth en <html>; aqui estorba.
      var doc = document.documentElement;
      var antes = doc.style.scrollBehavior;
      doc.style.scrollBehavior = "auto";
      window.scrollTo(0, destino < 0 ? 0 : destino);
      doc.style.scrollBehavior = antes;
    }

    // Progreso por hitos (una barra por fase), no una barra continua de 44 pasos.
    function actualizarAvance() {
      var totalF1 = datos.fase1.areas.length;
      var totalF2 = preguntasFase2.length;
      var hechasF1 = estado.fase === 1 ? estado.indice : totalF1;
      var hechasF2 = estado.fase === 2 ? estado.indice : 0;

      [[hechasF1, totalF1], [hechasF2, totalF2]].forEach(function (par, i) {
        var hito = hitos[i];
        if (!hito) return;
        var barra = hito.querySelector("i");
        if (barra) barra.style.width = par[1] ? Math.round((par[0] / par[1]) * 100) + "%" : "0%";
        hito.classList.toggle("is-activa", (estado.fase - 1) === i);
      });

      var restanF2 = estado.fase === 1 ? proyeccionFase2 : (totalF2 - hechasF2);
      var faltan = (totalF1 - hechasF1) + restanF2;
      if (reloj) texto(reloj, tiempoRestante(faltan, config));
    }

    function anunciar(mensaje) { if (vivo) texto(vivo, mensaje); }

    /* ----- PRODUCT · la pregunta ----- */

    function pintarPregunta() {
      cancelarAvance();
      var lista = preguntasActuales();
      var pregunta = lista[estado.indice];
      if (!pregunta) return terminarFase();

      var panel = pantallas.pregunta;
      panel.textContent = "";

      var bloque = crear("div", "tv-pregunta");

      // Sin nombre de licenciatura sobre el enunciado: el instrumento en papel
      // nunca lo dice, y nombrarlo invita a contestar según a quién se quiere
      // parecer el alumno en vez de según lo que le interesa.
      var titulo = crear("h2", "tv-enunciado tv-foco", pregunta.texto);
      titulo.setAttribute("tabindex", "-1");
      titulo.id = "tv-pregunta-" + estado.fase + "-" + estado.indice;
      bloque.appendChild(titulo);

      var grupo = crear("div", "tv-opciones");
      grupo.setAttribute("role", "radiogroup");
      grupo.setAttribute("aria-labelledby", titulo.id);

      var respuestas = respuestasActuales();
      var elegido = respuestas[pregunta.clave];

      pregunta.escala.forEach(function (opcion, posicion) {
        var boton = crear("button", "tv-opcion");
        boton.type = "button";
        boton.setAttribute("role", "radio");
        boton.setAttribute("aria-checked", elegido === opcion.valor ? "true" : "false");
        boton.setAttribute("tabindex", elegido === opcion.valor || (!elegido && posicion === 0) ? "0" : "-1");
        boton.dataset.valor = String(opcion.valor);
        boton.appendChild(crear("span", "tv-punto"));
        boton.appendChild(crear("span", null, opcion.etiqueta));
        if (elegido === opcion.valor) boton.classList.add("is-elegida");
        boton.addEventListener("click", function () { responder(pregunta, opcion.valor); });
        grupo.appendChild(boton);
      });

      bloque.addEventListener("keydown", function (evento) {
        var botones = Array.prototype.slice.call(grupo.querySelectorAll(".tv-opcion"));
        var actual = botones.indexOf(document.activeElement);
        var siguiente = -1;
        if (evento.key === "ArrowDown" || evento.key === "ArrowRight") siguiente = (actual + 1) % botones.length;
        else if (evento.key === "ArrowUp" || evento.key === "ArrowLeft") siguiente = (actual - 1 + botones.length) % botones.length;
        else if (evento.key === "Home") siguiente = 0;
        else if (evento.key === "End") siguiente = botones.length - 1;
        if (siguiente >= 0 && botones[siguiente]) {
          evento.preventDefault();
          botones[siguiente].focus();
          // El patrón ARIA de radiogroup espera que las flechas también seleccionen.
          botones[siguiente].click();
        }
      });

      bloque.appendChild(grupo);

      if (estado.indice > 0 || estado.fase === 2) {
        var atras = crear("button", "tv-atras", config.atras || "Anterior");
        atras.type = "button";
        atras.addEventListener("click", retroceder);
        bloque.appendChild(atras);
      }

      panel.appendChild(bloque);
      mostrar("pregunta");
      actualizarAvance();
      titulo.focus({ preventScroll: true });
    }

    function responder(pregunta, valor) {
      respuestasActuales()[pregunta.clave] = valor;
      guardar(estado);
      var botones = pantallas.pregunta.querySelectorAll(".tv-opcion");
      Array.prototype.forEach.call(botones, function (boton) {
        var activo = boton.dataset.valor === String(valor);
        boton.classList.toggle("is-elegida", activo);
        boton.setAttribute("aria-checked", activo ? "true" : "false");
        boton.setAttribute("tabindex", activo ? "0" : "-1");
      });
      // Un segundo clic dentro de la ventana debe CAMBIAR la respuesta, no
      // encolar un segundo avance (eso saltaba una pregunta en silencio).
      cancelarAvance();
      var espera = animacionReducida() ? 0 : 260;
      avanceEnCurso = window.setTimeout(function () {
        avanceEnCurso = null;
        avanzar();
      }, espera);
    }

    function cancelarAvance() {
      if (avanceEnCurso) { window.clearTimeout(avanceEnCurso); avanceEnCurso = null; }
    }

    function avanzar() {
      var lista = preguntasActuales();
      if (estado.indice < lista.length - 1) {
        estado.indice += 1;
        guardar(estado);
        pintarPregunta();
      } else {
        terminarFase();
      }
    }

    function retroceder() {
      cancelarAvance();
      if (estado.indice > 0) {
        estado.indice -= 1;
      } else if (estado.fase === 2) {
        estado.fase = 1;
        estado.indice = datos.fase1.areas.length - 1;
      } else {
        return;
      }
      guardar(estado);
      pintarPregunta();
    }

    function terminarFase() {
      if (estado.fase === 1) {
        var corte = clasificarAreas(datos.fase1.areas, estado.respuestasAreas, reglas);
        estado.areas = corte.ganadoras;
        estado.empatadas = corte.empatadas;
        estado.faltan = corte.faltan;
        if (corte.faltan > 0) { pintarEleccion(); }
        else { armarFase2(); pintarTransicion(); }
      } else {
        pintarResultado();
      }
      guardar(estado);
    }

    function aviso(mensaje) {
      var nodo = crear("p", "tv-aviso", mensaje);
      nodo.setAttribute("role", "note");
      return nodo;
    }

    /* ----- BRAND · desempate ----- */

    function pintarEleccion() {
      var panel = pantallas.eleccion;
      panel.textContent = "";

      var total = estado.faltan;
      var caja = crear("div", "tv-corte tv-corte--eleccion");
      var texto2 = crear("div", "tv-corte-texto");
      var h2 = crear("h2", "tv-foco", config.eleccionTitulo);
      h2.setAttribute("tabindex", "-1");
      texto2.appendChild(h2);
      texto2.appendChild(crear("p", null, plantilla(config.eleccionTexto, { n: total })));
      caja.appendChild(texto2);

      var elegidas = [];
      var botones = [];

      var grupo = crear("div", "tv-areas-lista");
      grupo.setAttribute("role", "group");
      grupo.setAttribute("aria-label", config.eleccionTitulo);
      // Cuántas columnas: con 2 ó 4 empatadas, dos columnas llenan los renglones;
      // con 3 o con 5+ caben tres sin dejar una fila a medias.
      var columnas = (estado.empatadas.length <= 2 || estado.empatadas.length === 4) ? 2 : 3;
      // Va en la CAJA, no en la lista: un estilo inline le gana a cualquier
      // media query, y en anchos medios el CSS tiene que poder bajarlo a dos.
      caja.style.setProperty("--tv-cols", columnas);
      caja.appendChild(grupo);

      var pie = crear("div", "tv-corte-pie");
      var contador = crear("p", "tv-corte-contador");
      var seguir = crear("button", "btn btn-orange", config.eleccionBoton);
      seguir.type = "button";
      pie.appendChild(contador);
      pie.appendChild(seguir);
      caja.appendChild(pie);

      // Un solo lugar decide cómo se ve todo: marcas, cupo, contador y acción.
      function refrescar(anunciando) {
        var lleno = elegidas.length >= total;
        botones.forEach(function (par) {
          var activo = elegidas.indexOf(par.fila) !== -1;
          par.boton.classList.toggle("is-elegida", activo);
          par.boton.setAttribute("aria-pressed", activo ? "true" : "false");
          // Cubierto el cupo, las no elegidas se apagan en vez de ignorar el clic.
          if (!activo && lleno) par.boton.setAttribute("aria-disabled", "true");
          else par.boton.removeAttribute("aria-disabled");
        });
        var leyenda = plantilla(config.eleccionContador, { n: elegidas.length, total: total });
        texto(contador, leyenda);
        seguir.disabled = !lleno;
        if (anunciando) anunciar(leyenda);
      }

      estado.empatadas.forEach(function (fila) {
        var boton = filaArea(fila.area, true);
        botones.push({ boton: boton, fila: fila });
        boton.addEventListener("click", function () {
          var puesto = elegidas.indexOf(fila);
          if (puesto === -1) {
            if (elegidas.length >= total) return;
            elegidas.push(fila);
          } else {
            elegidas.splice(puesto, 1);
          }
          refrescar(true);
        });
        grupo.appendChild(boton);
      });

      refrescar(false);

      seguir.addEventListener("click", function () {
        estado.areas = estado.areas.concat(elegidas);
        estado.empatadas = [];
        estado.faltan = 0;
        armarFase2();
        guardar(estado);
        pintarTransicion();
      });
      panel.appendChild(caja);

      if (reglas.marcarProvisional) panel.appendChild(aviso(plantilla(config.avisoReglas, { n: reglas.areasQuePasan })));

      mostrar("eleccion");
      h2.focus({ preventScroll: true });
    }

    /* ----- BRAND · transición ----- */

    function pintarTransicion() {
      var panel = pantallas.transicion;
      panel.textContent = "";

      var nombres = estado.areas.map(function (fila) { return fila.area.nombre; });
      var caja = crear("div", "tv-corte");
      var texto2 = crear("div", "tv-corte-texto");
      var h2 = crear("h2", "tv-foco", config.transicionTitulo);
      h2.setAttribute("tabindex", "-1");
      texto2.appendChild(h2);

      // El párrafo ya NO nombra las áreas: las filas de al lado las muestran
      // con su foto, y repetirlas hacía el texto larguísimo.
      var cuerpo = plantilla(config.transicionTexto, {
        tiempo: tiempoRestante(preguntasFase2.length, config)
      });
      texto2.appendChild(crear("p", null, cuerpo));

      var seguir = crear("button", "btn btn-orange", config.transicionBoton);
      seguir.type = "button";
      seguir.addEventListener("click", function () {
        estado.fase = 2;
        estado.indice = 0;
        guardar(estado);
        pintarPregunta();
      });
      texto2.appendChild(seguir);
      caja.appendChild(texto2);

      var lista = crear("ul", "tv-areas-lista");
      estado.areas.forEach(function (fila) { lista.appendChild(filaArea(fila.area, false)); });
      caja.appendChild(lista);
      panel.appendChild(caja);

      mostrar("transicion");
      anunciar(listaLegible(nombres) + ". " + cuerpo);
      h2.focus({ preventScroll: true });
    }

    /* ----- BRAND · resultado: el único momento con movimiento ----- */

    function pintarResultado() {
      var panel = pantallas.resultado;
      panel.textContent = "";
      panel.className = "tv-screen tv-resultado tv-revelar";

      var ids = Array.isArray(estado.licenciaturas) ? estado.licenciaturas : [];
      var licenciaturas = datos.fase2.licenciaturas.filter(function (lic) { return ids.indexOf(lic.id) !== -1; });
      var ganadoras = carrerasGanadoras(licenciaturas, estado.respuestasCarreras, reglas);

      var areasPorId = {};
      datos.areasSitio.forEach(function (a) { areasPorId[a.id] = a; });
      var areasTestPorId = {};
      datos.fase1.areas.forEach(function (a) { areasTestPorId[a.id] = a; });

      // Toda tarjeta lleva foto: la propia de la licenciatura o, si no la tiene,
      // la de su área. Los recuadros lilas con una inicial parecían un error.
      // Devuelve { ruta, esDeArea }. Cuando la foto es la del área y no la de
      // la licenciatura, la tarjeta la trata como imagen de CATEGORÍA (duotono),
      // porque si no dos carreras de la misma área salían con la foto idéntica
      // una junto a otra y parecía un error.
      function fotoDe(lic) {
        if (lic.imagen) return { ruta: lic.imagen, esDeArea: false };
        var porTest = lic.areaTest && areasTestPorId[lic.areaTest];
        if (porTest && porTest.imagen) return { ruta: porTest.imagen, esDeArea: true };
        var porSitio = areasPorId[lic.areaSitio];
        return { ruta: (porSitio && porSitio.imagen) || "", esDeArea: true };
      }

      /* hero: el área principal, con su imagen */
      var principal = estado.areas[0];
      var hero = crear("div", "tv-hero");
      var textoHero = crear("div");
      var tag = crear("p", "tagline");
      tag.appendChild(document.createElement("span"));
      tag.appendChild(document.createTextNode(config.resultadoEyebrow));
      textoHero.appendChild(tag);

      var h2 = crear("h2", "tv-foco", principal ? principal.area.nombre : config.resultadoTitulo);
      h2.setAttribute("tabindex", "-1");
      textoHero.appendChild(h2);
      textoHero.appendChild(crear("p", "tv-hero-sub", config.resultadoSub));

      var segunda = estado.areas[1];
      if (segunda) {
        // La segunda area le costo al alumno una decision explicita en el
        // desempate y aterrizaba como media linea de texto corrido. Ahora es
        // una ficha con destino: que vea que tiene otra puerta abierta es uno
        // de los objetivos de la pantalla, no una nota al pie.
        var otra = crear("div", "tv-otra-area");
        otra.appendChild(crear("p", "tv-otra-area-rotulo", config.resultadoSegunda));
        var destinoSeg = areasPorId[segunda.area.areaSitio];
        if (destinoSeg) {
          var fichaSeg = crear("a", "tv-otra-area-ficha", segunda.area.nombre);
          fichaSeg.href = destinoSeg.url;
          fichaSeg.appendChild(crear("span", "tv-flecha"));
          otra.appendChild(fichaSeg);
        } else {
          otra.appendChild(crear("p", "tv-otra-area-ficha", segunda.area.nombre));
        }
        textoHero.appendChild(otra);
      }
      hero.appendChild(textoHero);

      if (principal && principal.area.imagen) {
        var marco = crear("div", "tv-hero-imagen");
        var img = document.createElement("img");
        img.src = imagen(principal.area.imagen);
        img.alt = principal.area.nombre;
        marco.appendChild(img);
        hero.appendChild(marco);
      }
      panel.appendChild(hero);

      /* licenciaturas — lo que el alumno vino a buscar.
         Van en dos grupos y no en una rejilla plana. El instrumento da dos
         reactivos por carrera, asi que el puntaje va de cero a ocho y los
         empates son la norma: numerarlas 01..05 inventaria un orden que no
         sostiene. Agruparlas por puntaje dice lo unico que si sostiene, que
         estas quedaron mas cerca que aquellas. Tampoco hay barras ni cifras,
         por la misma razon por la que se quitaron los medidores de afinidad. */
      var tope = ganadoras.length ? ganadoras[0].puntaje : 0;
      var cerca = ganadoras.filter(function (f) { return f.puntaje === tope; });
      var tambien = ganadoras.filter(function (f) { return f.puntaje !== tope; });

      function filaCarrera(fila, compacta) {
        var item = crear("li", compacta ? "tv-carrera tv-carrera--mini" : "tv-carrera");
        if (!compacta) {
          var foto = fotoDe(fila.lic);
          // Miniatura cuadrada, no el banner de antes. La mitad de las carreras
          // tiene foto propia y la otra mitad hereda la de su area en duotono:
          // a tamano de banner la mezcla leia como un error de carga. Del
          // tamano de la del desempate lee como marca de categoria, que es lo
          // que es, y de paso el bloque reusa el lenguaje de aquella pantalla.
          var marcoC = crear("div", "tv-carrera-foto" + (foto.esDeArea ? " tv-carrera-foto--area" : ""));
          if (foto.ruta) {
            var imgC = document.createElement("img");
            imgC.src = imagen(foto.ruta);
            imgC.alt = "";
            imgC.loading = "lazy";
            marcoC.appendChild(imgC);
          }
          item.appendChild(marcoC);
        }
        var textoC = crear("div", "tv-carrera-texto");
        // El area va ARRIBA, como rotulo de categoria, y el nombre debajo. Es
        // el orden editorial y de un vistazo se distingue que es cada cosa;
        // abajo y en gris las dos se leian como una sola linea de dos renglones.
        var areaLic = areasPorId[fila.lic.areaSitio];
        if (areaLic) textoC.appendChild(crear("p", "tv-carrera-area", areaLic.nombre));
        textoC.appendChild(crear("h4", "tv-carrera-nombre", fila.lic.nombre));
        item.appendChild(textoC);
        if (fila.lic.url) {
          var enlace = crear("a", "tv-carrera-enlace", config.explorar);
          enlace.href = fila.lic.url;
          enlace.appendChild(crear("span", "tv-flecha"));
          // En la tarjeta el enlace va DENTRO del texto, para poder empujarlo
          // al pie y que los de todas las tarjetas queden a la misma altura
          // aunque un nombre ocupe dos renglones y otro uno. En la fila
          // compacta va fuera, a la derecha.
          if (compacta) item.appendChild(enlace);
          else textoC.appendChild(enlace);
          // Solo entonces se comporta como enlace: hoy solo Psicologia tiene
          // URL y encenderlas todas prometeria algo que no se cumple.
          item.className += " tv-carrera--enlazada";
        }
        return item;
      }

      panel.appendChild(crear("h3", "tv-titulo-bloque", config.resultadoCarreras));
      var rejilla = crear("ul", "tv-carreras");
      cerca.forEach(function (f) { rejilla.appendChild(filaCarrera(f, false)); });
      panel.appendChild(rejilla);

      if (tambien.length) {
        panel.appendChild(crear("h3", "tv-titulo-bloque", config.resultadoCarrerasResto));
        var rejillaB = crear("ul", "tv-carreras tv-carreras--resto");
        tambien.forEach(function (f) { rejillaB.appendChild(filaCarrera(f, true)); });
        panel.appendChild(rejillaB);
      }

      /* cierre: la conversión */
      var cierre = crear("div", "tv-cierre");
      var textoCierre = crear("div", "tv-cierre-texto");
      textoCierre.appendChild(crear("h3", null, config.cierreTitulo));
      textoCierre.appendChild(crear("p", null, config.cierreTexto));
      var acciones = crear("div", "tv-cierre-acciones");
      if (config.asesorUrl) {
        var cta = crear("a", "btn btn-orange", config.asesorBoton);
        cta.href = config.asesorUrl;
        acciones.appendChild(cta);
      }
      if (config.pdfUrl) {
        var pdf = crear("a", "tv-secundario", config.pdfBoton);
        pdf.href = config.pdfUrl;
        acciones.appendChild(pdf);
      }
      textoCierre.appendChild(acciones);
      cierre.appendChild(textoCierre);
      if (config.cierreImagen) {
        var marcoL = crear("div", "tv-cierre-imagen");
        var imgL = document.createElement("img");
        imgL.src = config.cierreImagen;
        imgL.alt = "";
        marcoL.appendChild(imgL);
        cierre.appendChild(marcoL);
      }
      panel.appendChild(cierre);

      var pie = crear("div");
      var fila = crear("div", "tv-cierre-pie");
      fila.appendChild(crear("p", "tv-pie", config.resultadoNota));
      var reiniciar = crear("button", "tv-reiniciar", config.reiniciar);
      reiniciar.type = "button";
      reiniciar.addEventListener("click", function () { olvidar(); window.location.reload(); });
      fila.appendChild(reiniciar);
      pie.appendChild(fila);
      if (reglas.marcarProvisional) pie.appendChild(aviso(config.avisoResultado));
      panel.appendChild(pie);

      mostrar("resultado");
      h2.focus({ preventScroll: true });
    }

    /* ----- arranque ----- */

    function empezar() {
      olvidar();
      estado.fase = 1;
      estado.indice = 0;
      estado.respuestasAreas = {};
      estado.respuestasCarreras = {};
      estado.areas = [];
      estado.empatadas = [];
      estado.faltan = 0;
      estado.licenciaturas = [];
      pintarPregunta();
    }

    var botonInicio = raiz.querySelector("[data-tv-start]");
    if (botonInicio) botonInicio.addEventListener("click", empezar);

    function retomar(guardado) {
      estado = guardado;
      if (!Array.isArray(estado.areas)) estado.areas = [];
      if (!Array.isArray(estado.empatadas)) estado.empatadas = [];
      if (!Array.isArray(estado.licenciaturas)) estado.licenciaturas = [];
      // La Fase 2 se rearma salvo en el desempate, donde las áreas aún no están.
      if (estado.pantalla !== "eleccion") armarFase2();
      if (estado.pantalla === "resultado") pintarResultado();
      else if (estado.pantalla === "eleccion") pintarEleccion();
      else if (estado.pantalla === "transicion") pintarTransicion();
      else pintarPregunta();
    }

    var guardado = recuperar();
    if (guardado && guardado.pantalla && guardado.pantalla !== "intro") {
      if (guardado.version !== datos.version) {
        olvidar();
      } else {
        // No se retoma a la fuerza: el que vuelve días después decide.
        var zona = raiz.querySelector("[data-tv-retomar]");
        if (zona) {
          zona.hidden = false;
          var seguir = zona.querySelector("[data-tv-continuar]");
          var nuevo = zona.querySelector("[data-tv-nuevo]");
          if (seguir) seguir.addEventListener("click", function () { retomar(guardado); });
          if (nuevo) nuevo.addEventListener("click", empezar);
        } else {
          retomar(guardado);
        }
      }
    }
  }

  function arrancar() {
    Array.prototype.forEach.call(document.querySelectorAll(".tv"), iniciar);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", arrancar);
  else arrancar();
})();
