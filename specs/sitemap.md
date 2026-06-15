# Sitemap (formato normalizado)

> Única interfaz con Relume. Poblado desde el export de Relume en Figma (`vPttXphpZ4oROAFtZqv0so`) — ingesta 2026-06-08.
> El resto del framework lee de aquí, no de Relume.

## Árbol de páginas
```
Home  (specs/home.md) — referencia canónica
├── Descubre Anáhuac  (specs/descubre-anahuac.md)
├── Oferta Académica  (specs/oferta-academica.md)
│   ├── Área Académica  (specs/area-academica.md) — plantilla dinámica
│   └── Programa de Licenciatura  (specs/programa-licenciatura.md) — plantilla dinámica
├── Admisiones  (specs/admisiones.md)
│   ├── Admisión General de Licenciatura  (specs/admision-general.md)
│   ├── Admisión Medicina  (specs/admision-medicina.md)
│   ├── Admisión Internacional  (specs/admision-internacional.md)
│   └── Fechas de Examen  (specs/fechas-examen.md)
├── Costos y Becas  (specs/costos-becas.md)
│   ├── Calculadora de Costos  (specs/calculadora-costos.md)
│   ├── Colegiaturas / Costos  (specs/colegiaturas.md)
│   └── Becas y Apoyos Financieros  (specs/becas.md)
├── Vida Universitaria  (specs/vida-universitaria.md)
│   ├── Estudiantes Foráneos  (specs/estudiantes-foraneos.md)
│   └── Competencias Académicas  (specs/competencias-academicas.md)
├── Solicita Información  (specs/solicita-informacion.md)
└── Visita al Campus / Open House  (specs/visita-campus.md)
```

## Tabla de páginas

| Página | Slug | Padre | Spec | Estado |
|---|---|---|---|---|
| Home | `/` | — | `specs/home.md` | documentado |
| Descubre Anáhuac | `/descubre-anahuac` | Home | `specs/descubre-anahuac.md` | pendiente |
| Oferta Académica | `/oferta-academica` | Home | `specs/oferta-academica.md` | pendiente |
| Área Académica | `/oferta-academica/{area}` | Oferta Académica | `specs/area-academica.md` | pendiente |
| Programa de Licenciatura | `/oferta-academica/{area}/{programa}` | Área Académica | `specs/programa-licenciatura.md` | pendiente |
| Admisiones | `/admisiones` | Home | `specs/admisiones.md` | pendiente |
| Admisión General | `/admisiones/general` | Admisiones | `specs/admision-general.md` | pendiente |
| Admisión Medicina | `/admisiones/medicina` | Admisiones | `specs/admision-medicina.md` | pendiente |
| Admisión Internacional | `/admisiones/internacional` | Admisiones | `specs/admision-internacional.md` | pendiente |
| Fechas de Examen | `/admisiones/fechas-examen` | Admisiones | `specs/fechas-examen.md` | pendiente |
| Costos y Becas | `/costos-becas` | Home | `specs/costos-becas.md` | pendiente |
| Calculadora de Costos | `/costos-becas/calculadora` | Costos y Becas | `specs/calculadora-costos.md` | pendiente |
| Colegiaturas / Costos | `/costos-becas/colegiaturas` | Costos y Becas | `specs/colegiaturas.md` | pendiente |
| Becas y Apoyos | `/costos-becas/becas` | Costos y Becas | `specs/becas.md` | pendiente |
| Vida Universitaria | `/vida-universitaria` | Home | `specs/vida-universitaria.md` | pendiente |
| Estudiantes Foráneos | `/vida-universitaria/foraneos` | Vida Universitaria | `specs/estudiantes-foraneos.md` | pendiente |
| Competencias Académicas | `/vida-universitaria/competencias` | Vida Universitaria | `specs/competencias-academicas.md` | pendiente |
| Solicita Información | `/solicita-informacion` | Home | `specs/solicita-informacion.md` | pendiente |
| Visita al Campus | `/visita-campus` | Home | `specs/visita-campus.md` | pendiente |

## Notas
- **Oferta Académica** tiene sub-páginas dinámicas: una por área académica y una por programa de licenciatura.
- Las secciones de cada página están documentadas en el wireframe de Relume con componentes sugeridos.
- Las áreas académicas son 8: Salud, Ingenierías, Negocios, Derecho, Comunicación, Artes, Educación + una más por confirmar.
