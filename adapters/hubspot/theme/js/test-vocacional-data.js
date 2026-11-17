/* ============================================================
   TEST VOCACIONAL — datos semilla (contrato de datos)
   Fuente: cuadernillos y reactivos de la Dra. de Psicología (nov 2026).

   ESTE ARCHIVO ES PROVISIONAL. En producción estas tres colecciones
   viven en HubDB (tablas: tv_areas, tv_licenciaturas, tv_reactivos) y
   el módulo las emite como <script type="application/json" id="tv-data">.
   El motor prefiere ese JSON y sólo usa este archivo como respaldo.

   Pendientes marcados con estado "por-confirmar": los decide la autora.
   Ver la minuta de revisión y alcance.
   ============================================================ */
window.TEST_VOCACIONAL_DATA = {
  version: "0.1.0-borrador",

  /* Áreas académicas del SITIO (destino de los enlaces de resultado). */
  areasSitio: [
    { id: "ciencias-de-la-salud", nombre: "Ciencias de la Salud", imagen: "oferta-academica/areas/ciencias-de-la-salud.jpg", url: "oferta-academica.html#areas" },
    { id: "ingenierias-y-ciencias", nombre: "Ingenierías y Ciencias", imagen: "oferta-academica/areas/ingenierias-y-ciencias.png", url: "oferta-academica.html#areas" },
    { id: "negocios-y-economia", nombre: "Negocios y Economía", imagen: "oferta-academica/areas/negocios-y-economia.png", url: "oferta-academica.html#areas" },
    { id: "comunicacion-arquitectura-y-diseno", nombre: "Comunicación, Arquitectura y Diseño", imagen: "oferta-academica/areas/comunicacion-arquitectura-y-diseno.png", url: "oferta-academica.html#areas" },
    { id: "ciencias-sociales-y-derecho", nombre: "Ciencias Sociales y Derecho", imagen: "oferta-academica/areas/ciencias-sociales-y-derecho.png", url: "oferta-academica.html#areas" },
    { id: "turismo-gastronomia-y-hospitalidad", nombre: "Turismo, Gastronomía y Hospitalidad", imagen: "oferta-academica/areas/turismo-gastronomia-y-hospitalidad.png", url: "oferta-academica.html#areas" }
  ],

  fase1: {
    titulo: "Exploración de áreas vocacionales",
    escala: [
      { valor: 4, etiqueta: "Me interesa mucho" },
      { valor: 3, etiqueta: "Me interesa" },
      { valor: 2, etiqueta: "Me interesa poco" },
      { valor: 1, etiqueta: "No me interesa" }
    ],
    areas: [
      { id: "a1", nombre: "Ingeniería y Tecnología", imagen: "area-ingenierias.jpg", areaSitio: "ingenierias-y-ciencias",
        reactivo: "Me interesa resolver problemas mediante la tecnología, la innovación, las matemáticas y el diseño de soluciones para mejorar la vida de las personas." },
      { id: "a2", nombre: "Ciencias de la Salud", imagen: "area-salud.jpg", areaSitio: "ciencias-de-la-salud",
        reactivo: "Disfrutaría contribuir al bienestar de las personas mediante el cuidado de su salud, la prevención de enfermedades o el desarrollo de soluciones científicas." },
      { id: "a3", nombre: "Negocios, Economía y Finanzas", imagen: "area-negocios.jpg", areaSitio: "negocios-y-economia",
        reactivo: "Me llama la atención crear, administrar o hacer crecer organizaciones, tomando decisiones relacionadas con los negocios, el dinero y el emprendimiento." },
      { id: "a4", nombre: "Derecho, Gobierno y Estudios Internacionales", imagen: "area-derecho.jpg", areaSitio: "ciencias-sociales-y-derecho",
        reactivo: "Me interesa participar en la solución de problemas sociales mediante las leyes, las políticas públicas o la colaboración entre diferentes países." },
      { id: "a5", nombre: "Educación, Humanidades y Desarrollo Humano", imagen: "area-educacion.jpg", areaSitio: "ciencias-sociales-y-derecho",
        reactivo: "Disfrutaría enseñar, orientar o favorecer el desarrollo personal, educativo y cultural de las personas." },
      { id: "a6", nombre: "Arquitectura, Diseño y Artes", imagen: "area-artes.jpg", areaSitio: "comunicacion-arquitectura-y-diseno",
        reactivo: "Me sentiría motivado(a) al crear espacios, productos, imágenes o expresiones artísticas utilizando mi creatividad." },
      { id: "a7", nombre: "Comunicación, Entretenimiento y Medios", imagen: "area-comunicacion.jpg", areaSitio: "comunicacion-arquitectura-y-diseno",
        reactivo: "Me interesa comunicar ideas, crear contenidos o desarrollar experiencias que informen, inspiren o entretengan a otras personas." },
      { id: "a8", nombre: "Turismo, Gastronomía y Hospitalidad", imagen: "oferta-academica/areas/turismo-gastronomia-y-hospitalidad.png", areaSitio: "turismo-gastronomia-y-hospitalidad",
        reactivo: "Disfrutaría ofrecer experiencias de servicio relacionadas con los viajes, la alimentación, el hospedaje o la atención a las personas." }
    ]
  },

  fase2: {
    titulo: "Exploración de licenciaturas",
    escala: [
      { valor: 3, etiqueta: "Sí me interesa" },
      { valor: 2, etiqueta: "No estoy seguro si me interesa" },
      { valor: 1, etiqueta: "No me interesa" }
    ],
    licenciaturas: [
      { id: "psicologia", nombre: "Psicología", imagen: "", areaTest: null, areaSitio: "ciencias-sociales-y-derecho", estado: "por-confirmar", url: "psicologia.html", reactivos: [
        { n: 71, texto: "Me interesa comprender cómo las personas piensan, sienten y actúan para identificar los factores que influyen en su comportamiento." },
        { n: 80, texto: "Me gustaría participar en procesos de evaluación e intervención que favorezcan el bienestar emocional y el desarrollo personal de las personas." } ] },
      { id: "medico-cirujano", nombre: "Médico Cirujano", imagen: "oferta-academica/elige-tu-camino/medico-cirujano.png", areaTest: "a2", areaSitio: "ciencias-de-la-salud", estado: "confirmada", url: "", reactivos: [
        { n: 56, texto: "Me interesa estudiar el funcionamiento del cuerpo humano para identificar enfermedades y comprender sus causas." },
        { n: 75, texto: "Me gustaría tomar decisiones clínicas para diagnosticar, tratar y dar seguimiento a problemas relacionados con la salud." } ] },
      { id: "medico-cirujano-dentista", nombre: "Médico Cirujano Dentista", imagen: "oferta-academica/elige-tu-camino/medico-cirujano-dentista.png", areaTest: "a2", areaSitio: "ciencias-de-la-salud", estado: "confirmada", url: "", reactivos: [
        { n: 54, texto: "Me interesa prevenir, diagnosticar y tratar problemas que afectan la salud de la boca, los dientes y las encías." },
        { n: 29, texto: "Me gustaría realizar procedimientos clínicos que permitan recuperar la función y la salud bucal de los pacientes." } ] },
      { id: "nutricion", nombre: "Nutrición", imagen: "oferta-academica/elige-tu-camino/nutricion.png", areaTest: "a2", areaSitio: "ciencias-de-la-salud", estado: "confirmada", url: "", reactivos: [
        { n: 27, texto: "Me interesa comprender cómo la alimentación influye en la prevención de enfermedades y en el bienestar de las personas." },
        { n: 64, texto: "Me gustaría diseñar planes de alimentación adaptados a las características, objetivos y necesidades de cada persona.", nota: "El documento de la autora lo numera 70 (duplicado con Turismo Internacional); el cuadernillo lo numera 64. Pendiente de confirmar." } ] },
      { id: "terapia-fisica-y-rehabilitacion", nombre: "Terapia Física y Rehabilitación", imagen: "oferta-academica/elige-tu-camino/terapia-fisica-y-rehabilitacion.png", areaTest: "a2", areaSitio: "ciencias-de-la-salud", estado: "confirmada", url: "", reactivos: [
        { n: 12, texto: "Me interesa favorecer la recuperación del movimiento y la funcionalidad física mediante programas de rehabilitación." },
        { n: 33, texto: "Me gustaría aplicar técnicas terapéuticas para ayudar a las personas a recuperar su movilidad después de una lesión o enfermedad." } ] },
      { id: "biotecnologia", nombre: "Biotecnología", imagen: "", areaTest: "a2", areaSitio: "ingenierias-y-ciencias", estado: "por-confirmar", url: "", reactivos: [
        { n: 51, texto: "Me interesa investigar organismos vivos y procesos biológicos para desarrollar soluciones aplicables a la salud, la industria o el medio ambiente." },
        { n: 57, texto: "Me gustaría participar en proyectos científicos que utilicen organismos o células para desarrollar nuevos productos o tecnologías." } ] },
      { id: "administracion-de-negocios", nombre: "Administración de Negocios", imagen: "", areaTest: "a3", areaSitio: "negocios-y-economia", estado: "propuesta", url: "", reactivos: [
        { n: 90, texto: "Me interesa identificar oportunidades para crear, desarrollar y hacer crecer negocios que respondan a las necesidades del mercado." },
        { n: 93, texto: "Me gustaría coordinar personas, recursos y estrategias para lograr que una empresa alcance sus objetivos de manera eficiente." } ] },
      { id: "administracion-y-direccion-de-empresas", nombre: "Administración y Dirección de Empresas", imagen: "", areaTest: "a3", areaSitio: "negocios-y-economia", estado: "propuesta", url: "", reactivos: [
        { n: 58, texto: "Me interesa analizar el funcionamiento de una organización para mejorar su desempeño y facilitar la toma de decisiones." },
        { n: 78, texto: "Me gustaría dirigir diferentes áreas de una empresa, integrando estrategias relacionadas con operaciones, talento, comercialización y crecimiento organizacional." } ] },
      { id: "direccion-financiera", nombre: "Dirección Financiera", imagen: "oferta-academica/elige-tu-camino/direccion-financiera.png", areaTest: "a3", areaSitio: "negocios-y-economia", estado: "confirmada", url: "", reactivos: [
        { n: 60, texto: "Me interesa analizar alternativas de inversión y financiamiento para favorecer el crecimiento y la estabilidad de una organización." },
        { n: 50, texto: "Me gustaría tomar decisiones estratégicas relacionadas con la administración del capital, los riesgos y la rentabilidad financiera." } ] },
      { id: "finanzas-y-contaduria-publica", nombre: "Finanzas y Contaduría Pública", imagen: "oferta-academica/elige-tu-camino/finanzas-y-contaduria-publica.png", areaTest: "a3", areaSitio: "negocios-y-economia", estado: "confirmada", url: "", reactivos: [
        { n: 43, texto: "Me interesa registrar, interpretar y evaluar la información financiera para conocer la situación económica de una organización." },
        { n: 72, texto: "Me gustaría elaborar estados financieros y asegurar el cumplimiento de las obligaciones contables y fiscales." } ] },
      { id: "economia", nombre: "Economía", imagen: "oferta-academica/elige-tu-camino/economia.png", areaTest: "a3", areaSitio: "negocios-y-economia", estado: "confirmada", url: "", reactivos: [
        { n: 4, texto: "Me interesa comprender cómo las decisiones de las personas, las empresas y los gobiernos influyen en el comportamiento de la economía." },
        { n: 15, texto: "Me gustaría analizar fenómenos económicos para explicar cambios en el empleo, la inflación, el crecimiento y el bienestar social." } ] },
      { id: "mercadotecnia-estrategica", nombre: "Mercadotecnia Estratégica", imagen: "", areaTest: "a3", areaSitio: "negocios-y-economia", estado: "propuesta", url: "", reactivos: [
        { n: 19, texto: "Me interesa comprender cómo las necesidades y preferencias de las personas influyen en sus decisiones de compra." },
        { n: 41, texto: "Me gustaría diseñar estrategias para posicionar marcas, productos o servicios mediante diferentes medios y canales de comunicación." } ] },
      { id: "negocios-internacionales", nombre: "Negocios Internacionales", imagen: "oferta-academica/elige-tu-camino/negocios-internacionales.png", areaTest: "a3", areaSitio: "negocios-y-economia", estado: "confirmada", url: "", reactivos: [
        { n: 84, texto: "Me interesa participar en proyectos comerciales que involucren empresas, clientes o proveedores de diferentes países." },
        { n: 87, texto: "Me gustaría analizar oportunidades de intercambio comercial y negociación en mercados internacionales." } ] },
      { id: "engineering-management", nombre: "Engineering Management", imagen: "", areaTest: "a3", areaSitio: "negocios-y-economia", estado: "por-confirmar", url: "", reactivos: [
        { n: 7, texto: "Me interesa coordinar proyectos donde se integren conocimientos de ingeniería, tecnología y administración para resolver problemas organizacionales." },
        { n: 76, texto: "Me gustaría dirigir equipos multidisciplinarios encargados de desarrollar proyectos tecnológicos con enfoque empresarial." } ] },
      { id: "global-management", nombre: "Global Management", imagen: "", areaTest: "a3", areaSitio: "negocios-y-economia", estado: "propuesta", url: "", reactivos: [
        { n: 83, texto: "Me interesa estudiar una licenciatura impartida completamente en inglés para prepararme en la gestión de organizaciones con enfoque internacional." },
        { n: 89, texto: "Me gustaría colaborar con equipos multiculturales y desarrollar estrategias empresariales en un entorno global utilizando el inglés como idioma de trabajo." } ] },
      { id: "ingenieria-industrial-para-la-direccion", nombre: "Ingeniería Industrial para la Dirección", imagen: "", areaTest: "a1", areaSitio: "ingenierias-y-ciencias", estado: "propuesta", url: "", reactivos: [
        { n: 25, texto: "Me interesa analizar y mejorar procesos de trabajo para aumentar la eficiencia, la productividad y la calidad dentro de una organización." },
        { n: 34, texto: "Me gustaría coordinar proyectos orientados a optimizar la producción, reducir costos y mejorar el funcionamiento de una empresa." } ] },
      { id: "ingenieria-civil", nombre: "Ingeniería Civil", imagen: "oferta-academica/elige-tu-camino/ingenieria-civil.png", areaTest: "a1", areaSitio: "ingenierias-y-ciencias", estado: "confirmada", url: "", reactivos: [
        { n: 28, texto: "Me interesa planear y desarrollar proyectos de infraestructura como edificios, puentes, carreteras o sistemas urbanos." },
        { n: 18, texto: "Me gustaría supervisar la construcción de obras considerando aspectos técnicos, de seguridad y de sostenibilidad." } ] },
      { id: "ingenieria-ambiental", nombre: "Ingeniería Ambiental", imagen: "oferta-academica/elige-tu-camino/ingenieria-ambiental.png", areaTest: "a1", areaSitio: "ingenierias-y-ciencias", estado: "confirmada", url: "", reactivos: [
        { n: 1, texto: "Me interesa desarrollar soluciones que contribuyan a proteger los recursos naturales y disminuir el impacto ambiental de las actividades humanas." },
        { n: 8, texto: "Me gustaría participar en proyectos relacionados con el manejo sostenible del agua, el aire, el suelo y los residuos." } ] },
      { id: "ingenieria-biomedica", nombre: "Ingeniería Biomédica", imagen: "oferta-academica/elige-tu-camino/ingenieria-biomedica.png", areaTest: "a1", areaSitio: "ingenierias-y-ciencias", estado: "confirmada", url: "", reactivos: [
        { n: 69, texto: "Me interesa diseñar equipos, dispositivos o sistemas tecnológicos que contribuyan al diagnóstico, tratamiento o rehabilitación de pacientes." },
        { n: 37, texto: "Me gustaría integrar conocimientos de ingeniería y ciencias de la salud para desarrollar soluciones tecnológicas aplicadas al ámbito médico." } ] },
      { id: "ingenieria-mecatronica", nombre: "Ingeniería Mecatrónica", imagen: "", areaTest: "a1", areaSitio: "ingenierias-y-ciencias", estado: "propuesta", url: "", reactivos: [
        { n: 86, texto: "Me interesa diseñar sistemas automatizados que integren mecánica, electrónica, programación y control." },
        { n: 22, texto: "Me gustaría desarrollar robots o equipos inteligentes que automaticen procesos industriales o de servicios." } ] },
      { id: "ingenieria-quimica", nombre: "Ingeniería Química", imagen: "", areaTest: "a1", areaSitio: "ingenierias-y-ciencias", estado: "propuesta", url: "", reactivos: [
        { n: 32, texto: "Me interesa diseñar procesos industriales para transformar materias primas en productos de manera eficiente y segura." },
        { n: 73, texto: "Me gustaría desarrollar tecnologías que mejoren la producción de materiales, alimentos, energía o productos químicos." } ] },
      { id: "ingenieria-en-sistemas-y-ti", nombre: "Ingeniería en Sistemas y Tecnologías de la Información", imagen: "oferta-academica/elige-tu-camino/ingenieria-en-sistemas-y-tecnologia-de-informacion.png", areaTest: "a1", areaSitio: "ingenierias-y-ciencias", estado: "confirmada", url: "", reactivos: [
        { n: 53, texto: "Me interesa desarrollar programas, aplicaciones o plataformas tecnológicas que permitan resolver problemas mediante herramientas informáticas." },
        { n: 77, texto: "Me gustaría diseñar y administrar sistemas de información, redes o soluciones digitales que faciliten el funcionamiento de las organizaciones." } ] },
      { id: "ciencia-de-datos", nombre: "Ciencia de Datos", imagen: "", areaTest: "a1", areaSitio: "ingenierias-y-ciencias", estado: "propuesta", url: "", reactivos: [
        { n: 26, texto: "Me interesa analizar grandes volúmenes de información para identificar patrones que apoyen la toma de decisiones." },
        { n: 6, texto: "Me gustaría utilizar programación, inteligencia artificial y modelos estadísticos para obtener conocimiento a partir de los datos." } ] },
      { id: "actuaria", nombre: "Actuaría", imagen: "", areaTest: "a1", areaSitio: "ingenierias-y-ciencias", estado: "por-confirmar", url: "", reactivos: [
        { n: 42, texto: "Me interesa utilizar modelos matemáticos y estadísticos para estimar riesgos y anticipar diferentes escenarios." },
        { n: 3, texto: "Me gustaría evaluar la probabilidad de que ocurran determinados eventos para apoyar decisiones financieras, aseguradoras o demográficas." } ] },
      { id: "arquitectura", nombre: "Arquitectura", imagen: "oferta-academica/elige-tu-camino/arquitectura.png", areaTest: "a6", areaSitio: "comunicacion-arquitectura-y-diseno", estado: "confirmada", url: "", reactivos: [
        { n: 44, texto: "Me interesa diseñar edificios y espacios que integren funcionalidad, seguridad, sostenibilidad y las necesidades de las personas." },
        { n: 5, texto: "Me gustaría desarrollar proyectos arquitectónicos considerando el entorno, la planificación urbana y el impacto social de las construcciones." } ] },
      { id: "arquitectura-de-interiores", nombre: "Arquitectura de Interiores", imagen: "oferta-academica/elige-tu-camino/arquitectura-de-interiores.png", areaTest: "a6", areaSitio: "comunicacion-arquitectura-y-diseno", estado: "confirmada", url: "", reactivos: [
        { n: 30, texto: "Me interesa transformar espacios interiores mediante la distribución, iluminación, materiales y mobiliario para mejorar la experiencia de quienes los utilizan." },
        { n: 46, texto: "Me gustaría diseñar ambientes interiores que combinen funcionalidad, confort, estética y bienestar para distintos tipos de usuarios." } ] },
      { id: "diseno-industrial", nombre: "Diseño Industrial", imagen: "oferta-academica/elige-tu-camino/diseno-industrial.png", areaTest: "a6", areaSitio: "comunicacion-arquitectura-y-diseno", estado: "confirmada", url: "", reactivos: [
        { n: 21, texto: "Me interesa diseñar productos que sean funcionales, seguros y fáciles de utilizar, considerando las necesidades de las personas." },
        { n: 36, texto: "Me gustaría desarrollar objetos o productos innovadores que puedan fabricarse de manera eficiente y sostenible." } ] },
      { id: "diseno-grafico", nombre: "Diseño Gráfico", imagen: "oferta-academica/elige-tu-camino/diseno-grafico.png", areaTest: "a6", areaSitio: "comunicacion-arquitectura-y-diseno", estado: "confirmada", url: "", reactivos: [
        { n: 65, texto: "Me interesa comunicar ideas mediante imágenes, tipografía, ilustraciones y recursos visuales que faciliten la comprensión de un mensaje." },
        { n: 62, texto: "Me gustaría crear identidades visuales, materiales gráficos y contenidos que fortalezcan la comunicación de personas u organizaciones." } ] },
      { id: "diseno-multimedia", nombre: "Diseño Multimedia", imagen: "oferta-academica/elige-tu-camino/diseno-multimedia.png", areaTest: "a6", areaSitio: "comunicacion-arquitectura-y-diseno", estado: "confirmada", url: "", reactivos: [
        { n: 52, texto: "Me interesa desarrollar experiencias digitales que integren imagen, audio, video, animación e interactividad." },
        { n: 66, texto: "Me gustaría diseñar contenidos para plataformas digitales, videojuegos, aplicaciones o medios interactivos utilizando herramientas tecnológicas." } ] },
      { id: "diseno-de-moda-e-innovacion", nombre: "Diseño de Moda e Innovación", imagen: "oferta-academica/elige-tu-camino/diseno-de-moda-e-innovacion.png", areaTest: "a6", areaSitio: "comunicacion-arquitectura-y-diseno", estado: "confirmada", url: "", reactivos: [
        { n: 81, texto: "Me interesa diseñar prendas, accesorios o colecciones que integren creatividad, funcionalidad y tendencias del mercado." },
        { n: 88, texto: "Me gustaría desarrollar propuestas de moda innovadoras considerando materiales, procesos de producción y preferencias de los consumidores." } ] },
      { id: "artes-visuales", nombre: "Artes Visuales", imagen: "", areaTest: "a6", areaSitio: "comunicacion-arquitectura-y-diseno", estado: "propuesta", url: "", reactivos: [
        { n: 31, texto: "Me interesa expresar ideas, emociones o reflexiones mediante diferentes disciplinas artísticas como pintura, fotografía, dibujo o escultura." },
        { n: 2, texto: "Me gustaría desarrollar proyectos artísticos originales que contribuyan al desarrollo cultural y promuevan nuevas formas de expresión." } ] },
      { id: "comunicacion", nombre: "Comunicación", imagen: "oferta-academica/elige-tu-camino/comunicacion.png", areaTest: "a7", areaSitio: "comunicacion-arquitectura-y-diseno", estado: "confirmada", url: "", reactivos: [
        { n: 74, texto: "Me interesa crear contenidos informativos o audiovisuales que permitan comunicar ideas de manera clara a diferentes públicos." },
        { n: 85, texto: "Me gustaría diseñar estrategias de comunicación utilizando medios digitales, audiovisuales o tradicionales para generar impacto social u organizacional." } ] },
      { id: "direccion-de-empresas-de-entretenimiento", nombre: "Dirección de Empresas de Entretenimiento", imagen: "oferta-academica/elige-tu-camino/direccion-de-empresas-de-entretenimiento.png", areaTest: "a7", areaSitio: "comunicacion-arquitectura-y-diseno", estado: "confirmada", url: "", reactivos: [
        { n: 68, texto: "Me interesa planear y coordinar proyectos relacionados con la música, el cine, los espectáculos, los videojuegos u otras industrias creativas." },
        { n: 20, texto: "Me gustaría dirigir empresas o eventos del sector entretenimiento administrando recursos, talento y estrategias para su desarrollo." } ] },
      { id: "teatro-y-actuacion", nombre: "Teatro y Actuación", imagen: "", areaTest: "a7", areaSitio: "comunicacion-arquitectura-y-diseno", estado: "propuesta", url: "", reactivos: [
        { n: 79, texto: "Me interesa interpretar personajes mediante la expresión corporal, la voz y las emociones para transmitir historias al público." },
        { n: 39, texto: "Me gustaría participar en producciones teatrales, cinematográficas o audiovisuales desarrollando habilidades escénicas y actorales." } ] },
      { id: "musica-contemporanea", nombre: "Música Contemporánea", imagen: "", areaTest: "a7", areaSitio: "comunicacion-arquitectura-y-diseno", estado: "propuesta", url: "", reactivos: [
        { n: 94, texto: "Me interesa interpretar, componer o producir música utilizando instrumentos, la voz o recursos tecnológicos." },
        { n: 92, texto: "Me gustaría participar en proyectos musicales creando arreglos, grabaciones o presentaciones para distintos públicos." } ] },
      { id: "gastronomia", nombre: "Gastronomía", imagen: "oferta-academica/elige-tu-camino/gastronomia.png", areaTest: "a8", areaSitio: "turismo-gastronomia-y-hospitalidad", estado: "confirmada", url: "", reactivos: [
        { n: 49, texto: "Me interesa crear platillos utilizando técnicas culinarias, ingredientes y procesos de preparación que integren creatividad y calidad." },
        { n: 59, texto: "Me gustaría experimentar con nuevas propuestas gastronómicas para ofrecer experiencias culinarias innovadoras." } ] },
      { id: "direccion-de-restaurantes", nombre: "Dirección de Restaurantes", imagen: "oferta-academica/elige-tu-camino/direccion-de-restaurantes.png", areaTest: "a8", areaSitio: "turismo-gastronomia-y-hospitalidad", estado: "confirmada", url: "", reactivos: [
        { n: 63, texto: "Me interesa coordinar la operación de restaurantes asegurando la calidad del servicio, la administración de recursos y la satisfacción de los clientes." },
        { n: 16, texto: "Me gustaría dirigir establecimientos de alimentos y bebidas tomando decisiones relacionadas con el personal, las finanzas y la experiencia del comensal." } ] },
      { id: "direccion-del-deporte", nombre: "Dirección del Deporte", imagen: "", areaTest: null, areaSitio: "negocios-y-economia", estado: "por-confirmar", url: "", reactivos: [
        { n: 24, texto: "Me interesa planear y dirigir proyectos, instituciones o empresas relacionadas con el deporte, la actividad física y la recreación." },
        { n: 48, texto: "Me gustaría desarrollar programas deportivos que promuevan la participación, el bienestar y la gestión eficiente de organizaciones deportivas." } ] },
      { id: "derecho", nombre: "Derecho", imagen: "oferta-academica/elige-tu-camino/derecho.png", areaTest: "a4", areaSitio: "ciencias-sociales-y-derecho", estado: "confirmada", url: "", reactivos: [
        { n: 55, texto: "Me interesa analizar las leyes para comprender cómo se aplican en la resolución de conflictos entre personas, organizaciones o instituciones." },
        { n: 40, texto: "Me gustaría representar y asesorar a personas u organizaciones mediante argumentos jurídicos, actuando con responsabilidad y apego al marco legal." } ] },
      { id: "global-development", nombre: "Global Development", imagen: "", areaTest: "a4", areaSitio: "ciencias-sociales-y-derecho", estado: "propuesta", url: "", reactivos: [
        { n: 47, texto: "Me interesa analizar, tanto en español como en inglés, las problemáticas sociales y económicas que afectan el desarrollo de las comunidades." },
        { n: 61, texto: "Me gustaría diseñar y presentar en inglés y en español, soluciones sostenibles para mejorar la calidad de vida y generar un impacto positivo en la sociedad." } ] },
      { id: "relaciones-internacionales", nombre: "Relaciones Internacionales", imagen: "", areaTest: "a4", areaSitio: "ciencias-sociales-y-derecho", estado: "propuesta", url: "", reactivos: [
        { n: 38, texto: "Me interesa comprender cómo las decisiones políticas, económicas y sociales influyen en las relaciones entre distintos países." },
        { n: 13, texto: "Me gustaría participar en proyectos de cooperación o negociación internacional para atender problemas que trascienden las fronteras nacionales." } ] },
      { id: "historia", nombre: "Historia", imagen: "", areaTest: "a5", areaSitio: "ciencias-sociales-y-derecho", estado: "por-confirmar", url: "", reactivos: [
        { n: 11, texto: "Me interesa investigar documentos, testimonios y otras fuentes para comprender cómo ocurrieron los acontecimientos del pasado." },
        { n: 14, texto: "Me gustaría preservar y difundir el patrimonio histórico y cultural mediante la investigación y la divulgación del conocimiento." } ] },
      { id: "ciencias-religiosas", nombre: "Ciencias Religiosas", imagen: "", areaTest: "a5", areaSitio: "ciencias-sociales-y-derecho", estado: "por-confirmar", url: "", reactivos: [
        { n: 10, texto: "Me interesa estudiar las tradiciones, los textos y el pensamiento religioso para comprender su influencia en las personas y la sociedad." },
        { n: 23, texto: "Me gustaría participar en proyectos de formación, acompañamiento o servicio inspirados en principios éticos y religiosos." } ] },
      { id: "educacion", nombre: "Educación", imagen: "", areaTest: "a5", areaSitio: "ciencias-sociales-y-derecho", estado: "por-confirmar", url: "", reactivos: [
        { n: 9, texto: "Me interesa diseñar experiencias de aprendizaje que favorezcan el desarrollo académico y personal de estudiantes de diferentes edades." },
        { n: 35, texto: "Me gustaría planear y evaluar actividades educativas utilizando estrategias didácticas que mejoren los procesos de enseñanza." } ] },
      { id: "pedagogia-organizacional-y-educativa", nombre: "Pedagogía Organizacional y Educativa", imagen: "", areaTest: "a5", areaSitio: "ciencias-sociales-y-derecho", estado: "por-confirmar", url: "", reactivos: [
        { n: 91, texto: "Me interesa identificar necesidades de formación para diseñar programas de capacitación dentro de instituciones u organizaciones." },
        { n: 67, texto: "Me gustaría desarrollar proyectos de aprendizaje dirigidos al fortalecimiento profesional y al desarrollo del talento humano." } ] },
      { id: "turismo-internacional", nombre: "Turismo Internacional", imagen: "oferta-academica/elige-tu-camino/administracion-turistica.png", areaTest: "a8", areaSitio: "turismo-gastronomia-y-hospitalidad", estado: "confirmada", url: "", nota: "El sitio la publica como «Administración Turística». Unificar nombre antes de enlazar.", reactivos: [
        { n: 70, texto: "Me interesa diseñar experiencias de viaje que integren aspectos culturales, recreativos y de servicio para personas de diferentes lugares." },
        { n: 82, texto: "Me gustaría planear y coordinar proyectos turísticos que impulsen el desarrollo económico y promuevan el patrimonio de una región." } ] },
      { id: "direccion-hotelera", nombre: "Dirección Hotelera", imagen: "", areaTest: "a8", areaSitio: "turismo-gastronomia-y-hospitalidad", estado: "propuesta", url: "", reactivos: [
        { n: 45, texto: "Me interesa coordinar la operación de hoteles asegurando altos estándares de servicio, hospitalidad y satisfacción de los huéspedes." },
        { n: 17, texto: "Me gustaría dirigir establecimientos de hospedaje administrando personal, recursos y estrategias para ofrecer experiencias de calidad." } ] }
    ]
  }
};
