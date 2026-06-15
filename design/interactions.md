# Interacciones y efectos (documento base)

Hogar de los efectos, animaciones e interacciones del sitio. Es base: todo efecto vive aquí antes de usarse,
para que sea reutilizable y consistente. Los efectos que aporte la revisión humana se promueven a este archivo.

> Poblado desde el Home existente (`index.html` / `script.js`) — ingesta 2026-06-08.

## Catálogo de efectos

| Efecto | Token / clase | Descripción | Uso |
|---|---|---|---|
| Scroll reveal | `.reveal` / `.is-visible` | Elementos aparecen con fade-in + translate-y al entrar al viewport vía IntersectionObserver | Secciones, tarjetas, textos |
| Counter animado | `data-count-to` | Números que cuentan desde 0 hasta el valor objetivo | Estadísticas/prestigio |
| Hover tarjeta | `:hover` en `.card` | Elevación y cambio de sombra al pasar el cursor | Tarjetas de áreas, eventos |
| Hover botón | `:hover` en `.btn-*` | Cambio de color/opacidad al pasar el cursor | Todos los botones |
| Hamburger menú | `.menu-open` en `body` | Transición del menú mobile con slide y overlay | Navegación mobile |
| Scroller horizontal | `.scroller` | Scroll horizontal con controles de flecha y dots | Carrusel de programas |

## Tokens de motion

| Token | Valor | Uso |
|---|---|---|
| `--motion-duration` | `0.4s` | Duración estándar de transiciones |
| `--motion-duration-fast` | `0.2s` | Transiciones rápidas (hover, focus) |
| `--motion-duration-slow` | `0.6s` | Transiciones lentas (reveal, entrada) |
| `--motion-ease` | `ease-out` | Easing estándar para animaciones |
| `--motion-ease-reveal` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Easing para scroll reveal |

## Reglas
- Un efecto nuevo se agrega **aquí primero**, con token, y luego se usa; no se aplica suelto en una página.
- Movimiento con propósito: nada decorativo que distraiga (ver `design/00-principles.md`).
- Respeta `prefers-reduced-motion`: todo efecto debe degradar a sin-animación.

## Efectos añadidos por revisión humana
> Se van listando aquí conforme se aprueban (con fecha y página/origen). Ver `docs/human-review.md` y `design/CHANGELOG.md`.
