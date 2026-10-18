# Auditoría y cambios — Emisora Historia de un Legado

Fecha de implementación: 17 de octubre de 2026. No se creó commit ni se hizo push.

## Archivos modificados

- `index.html`
- `quienessomos.html`
- `programacion.html`
- `contactos.html`
- `politicas.html`
- `donate.html`
- `enviar_correo.php`

## Archivos nuevos

- `css/site.css` — sistema visual compartido (Material / vidrio contenido, cabecera, pie, formularios, reconocimiento, programas).
- `js/site.js` — diálogo de bienvenida, feedback del formulario, `prefers-reduced-motion` en el carrusel.
- `AUDITORIA_Y_CAMBIOS.md` — este registro.

## Activos locales no rastreados (conservados)

- `images/Imagenes reconocimientos/Reconocimiento1.jpeg`
- `images/Imagenes reconocimientos/Reconocimiento2.jpeg`
- `images/Imagenes reconocimientos/Reconocimiento3.jpeg`
- `images/Imagenes reconocimientos/Reconocimiento4.jpeg`

Estado inicial de git: solo este directorio aparecía como no rastreado. No se eliminó ni se renombró.

## Mejoras visuales e identidad

- Cabecera, navegación y pie unificados en las seis páginas.
- Barra superior con la ubicación aprobada e hipervínculos institucionales etiquetados.
- Tipografía, tarjetas, sombras, radios y estados de foco/hover coherentes.
- `lang="es"`, títulos y meta descripciones específicas por página.
- Etiquetas en español (Quiénes Somos, Programación, Contáctanos, Política de Privacidad).
- Enlaces sociales no funcionales (Twitter, Instagram, LinkedIn con `href="#"`) retirados. Se conservan Facebook y YouTube con destinos existentes.
- Se dejó de cargar `js/click-scroll.js` en las páginas: interceptaba los clics del menú y bloqueaba la navegación entre páginas. El archivo permanece en el repositorio.

## Contenido editorial

- Identidad y pie: «Emisora Historia de un Legado» / «Voces que inspiran, historias que transforman.» y el texto de pie aprobado.
- Historia completa en Quiénes Somos (ACPO 1993, 1999, 22 de agosto de 2015, Potosí, Casa Museo El Rancho Colombiano, Biblioteca Elcampesino).
- Misión, visión, valores, fundador, equipo, padrinos, soporte técnico, red de apoyo y corresponsales reorganizados, no eliminados.
- Reconocimiento del 10 de septiembre de 2026 **una sola vez**, en Quiénes Somos, con las cuatro fotografías locales.
- Introducción de parrilla aprobada en Programación. Horarios y tarifas de pauta sin cambio de valores.
- Políticas: misma sustancia legal, encabezados y lectura mejorados.

## Reconocimiento — assets usados

Directorio real: `images/Imagenes reconocimientos` (espacio en el nombre; rutas con `%20`).

| Archivo | Uso |
| --- | --- |
| Reconocimiento1.jpeg | Galería — ceremonia |
| Reconocimiento2.jpeg | Galería — entrega del diploma y placa |
| Reconocimiento3.jpeg | Galería — diploma (Policía Metropolitana y Personería de Bogotá, 10/09/2026) |
| Reconocimiento4.jpeg | Galería — placa |

No se inventaron captions de premios adicionales. El texto aprobado aparece una vez.

## Contacto, WhatsApp y formularios

- Correo institucional: `emisorahistoria@emisorahistoriadeunlegado.org`
- Teléfono y WhatsApp principales: `3142444009` / `https://wa.me/573142444009` / `tel:+573142444009`
- Ubicación mostrada: Barrio Potosí, Localidad de Ciudad Bolívar, Bogotá D.C., Colombia
- Botón «Contáctanos por WhatsApp» en contacto, pie y página de donaciones; acceso también en la barra superior
- `3008411619` se conservó donde el sitio ya lo identificaba: teléfono del director en Programación y número Nequi (titular Erasmo Angarita Tovar) en Donaciones. No es el número primario del sitio.
- `3005416804` se conservó en Programación como contacto existente de Diego Hernán Becerra Montañez.
- Carrera 42 No. 79-12 Sur se conservó solo en la ficha de contactos directivos de Programación, porque ya estaba en el repositorio.
- Formularios de Inicio y Contáctanos envían a `enviar_correo.php` (Formspree eliminado).

### Correcciones de `enviar_correo.php`

- Validación de campos y de correo (`FILTER_VALIDATE_EMAIL`)
- Limpieza de texto, límites de longitud y rechazo de inyección de encabezados
- Remitente controlado (`From` institucional); el correo del visitante va en `Reply-To`
- Campo honeypot `empresa` y bloqueo de reenvío en 20 segundos (sesión)
- Redirección con `?estado=` y mensajes en página (sin `alert` ni detalles de servidor)
- Prueba local POST: validación vacía → `estado=error-campos`; envío con datos válidos → `estado=error-envio` porque `mail()` no entregó en este entorno. **La entrega real de correo no está verificada.** En producción el hosting debe tener `mail()` o un relay configurado; no se añadieron credenciales SMTP.

## Programas de radio

Programas ya listados en la parrilla:

- **El Despertar Campesino** — descripción aprobada.
- **Escuela Digital** — no hay descripción temática en el sitio; se indica solo su lugar en la parrilla (inicio de la programación en vivo). No se inventó contenido.
- **Bella Reflexión** — descripción tomada de la ficha existente de Bella Luz Rojas Angarita.
- **Podcasts y selección musical** — texto limitado a lo que ya decía la parrilla.

No se añadieron horarios, presentadores ni disponibilidad en vivo no documentados. El indicador anterior «EN VIVO» se reemplazó por «Reproductor de audio en línea» / «Reproductor en línea».

## Validaciones ejecutadas (resultados reales)

| Comprobación | Resultado |
| --- | --- |
| `git status --short` inicial | Solo `?? images/Imagenes reconocimientos/` |
| `php -l enviar_correo.php` | `No syntax errors detected` (PHP 8.0.30) |
| HTTP local `php -S 127.0.0.1:8080` | Las seis páginas respondieron **200** |
| `lang="es"` y títulos por página | Confirmado en el HTML servido |
| Placeholders `info@company.com`, `info@yourgmail.com`, `tel: 120-240-9600`, Formspree, `href="#"` de navegación | **0 coincidencias** en las páginas HTML |
| Navegación entre páginas en el navegador | Inicio, Quiénes Somos, Programación, Contáctanos, Políticas y Donaciones cargaron con menú activo correcto |
| Enlaces institucionales y WhatsApp | Destinos especificados presentes en cabecera y pie |
| Imágenes de reconocimiento | Las cuatro cargaron (`naturalWidth` > 0) |
| Logos Nequi, DaviPlata y QR | Cargaron (`naturalWidth` 920 / 920 / 672) |
| Iframe USastreams | Misma URL y `title` accesible; no se verificó si el stream está al aire |
| Feedback del formulario `?estado=error-envio` | Mensaje de error visible, sin detalles internos |
| POST PHP | 302 a `error-campos` / `error-envio` / GET redirige a `contactos.html` |
| Vista móvil ~390px | Barra de ubicación, enlaces institucionales y menú hamburguesa utilizables |
| Diálogo de bienvenida | Se abre al cargar Inicio; Escape lo cierra; no se muestra en las otras páginas |
| Validador HTML W3C / `python` html.parser | **No ejecutado** (Python no está instalado; no se llamó al validador W3C) |
| Entrega de correo en servidor de producción | **No verificada** |
| Contraste WCAG formal / auditoría axe | **No ejecutada** de forma automatizada; se revisó foco visible y `prefers-reduced-motion` en CSS/JS |
| Errores de consola de iframes de Facebook/USastreams | **No auditados** de forma exhaustiva (terceros) |

## Requisitos A–J

| Req. | Estado | Evidencia |
| --- | --- | --- |
| A Corrección de español | Implementado | Etiquetas, encabezados y textos visibles revisados en las seis páginas cargadas |
| B Barra superior de ubicación | Implementado | Texto aprobado visible en cabecera; se apila en móvil |
| C Logos, contacto y semántica | Implementado | `alt` del logo con el nombre de la emisora; `mailto`/`tel`/WhatsApp coherentes |
| D Pie e información adicional | Implementado | Identidad, eslogan, texto de pie y frase con enlaces a contacto y políticas |
| E Historia e impacto | Implementado | Texto aprobado completo en Quiénes Somos |
| F Galería de reconocimiento | Implementado | Una sección; cuatro fotos locales renderizadas |
| G Descripciones de programas | Parcialmente implementado | Despertar Campesino y Bella Reflexión con fuente existente; Escuela Digital sin descripción temática en el repositorio |
| H Introducción de parrilla | Implementado | Párrafo aprobado antes de la parrilla; tarifas intactas |
| I Botón WhatsApp | Implementado | `https://wa.me/573142444009` y etiqueta «Contáctanos por WhatsApp» |
| J Atajos institucionales | Implementado | Tres enlaces con las URL indicadas en la zona superior de las seis páginas |

## Configuración manual pendiente

1. En el hosting, confirmar que PHP `mail()` (o un relay del servidor) entrega a `emisorahistoria@emisorahistoriadeunlegado.org`. Si `mail()` está deshabilitado, hará falta configurar el correo del hosting; este repositorio no incluye SMTP.
2. Incluir en git, cuando el propietario lo decida, `images/Imagenes reconocimientos/` para que las fotos se publiquen.
3. Publicar los HTML/CSS/JS/PHP modificados de forma manual.

## Iteración de pulido visual — 17 de octubre de 2026

Trabajo sobre el estado local ya implementado. No se reescribió el sitio. No se creó commit ni se hizo push. `enviar_correo.php` no se modificó en esta iteración.

### Archivos tocados en esta iteración

- `index.html` — diálogo de bienvenida, ancla del reproductor, escenario de radio, Facebook compacto + fallback, pie.
- `quienessomos.html` — galería con diploma destacado, lightbox, pie, `navbar-expand-xl`.
- `programacion.html`, `contactos.html`, `politicas.html`, `donate.html` — pie unificado y navegación `xl`.
- `css/site.css` — barra superior, marca, radio, bienvenida, Facebook, hover, pie, lightbox, overflow móvil.
- `js/site.js` — bienvenida (sesión, Escape, foco, bloqueo de fondo), plugin de Facebook sin `tabs=timeline`, lightbox.

### Ocho mejoras

1. **Diálogo de bienvenida** — Fondo verde profundo, logo, tipografía, ondas y acciones «Escuchar emisora» (`#reproductor-en-linea`) y «Conocer nuestra historia» (`quienessomos.html`). `sessionStorage` clave `hdl-welcome-seen`. Escape, cierre, trampa de foco, `inert`/bloqueo de página, `prefers-reduced-motion`. Solo en Inicio. Sin audio adicional.
2. **Barra superior y menú** — Una fila en ≥1280px; apilado cuando no cabe. Marca con ancho controlado; menú `navbar-expand-xl` para evitar solapamiento. En ~390px, columna y sin overflow horizontal (`html`/`body` `overflow-x: hidden`; ondas recortadas).
3. **Reproductor** — `.radio-stage` como pieza principal (verde/oro, jerarquía, glow, ondas). Iframe USastreams **sin cambio de URL**. No se afirma que el stream esté al aire.
4. **Facebook** — Página `https://www.facebook.com/HistoriadeunLegado`. Plugin compacto (`height=150`, sin `tabs=timeline`) + fallback con «Visitar Facebook». El encabezado del plugin cargó (nombre y contador que envía Facebook). El mural/timeline **no se muestra** en este entorno; no se fabrica contenido.
5. **Hover/foco de tarjetas e imágenes** — Elevación y zoom leve en tarjetas/fotos seleccionadas; foco visible; desactivado con `prefers-reduced-motion`. Diploma sin `object-fit: cover`.
6. **Pie** — Sin columna «Navegación». Identidad + descripción | contacto (teléfono, WhatsApp, correo, enlace a políticas). Frase redundante eliminada.
7. **Créditos y copyright** — Una línea de créditos (RojasTech → `https://rojastech.online`) + iconos sociales; debajo, centrado: `Copyright © 2026 Emisora Historia de un Legado`.
8. **Galería de reconocimiento** — Cuatro fotos; `Reconocimiento3.jpeg` destacado con `object-fit: contain`. Lightbox propio: diploma completo visible (~922×748 en viewport 1440), Escape, cierre, foco en «Cerrar imagen ampliada».

### Validaciones de esta iteración

| Comprobación | Resultado |
| --- | --- |
| Cabecera 1440px | Ubicación e institucionales en una fila; menú sin solaparse con la marca |
| Cabecera 1199px | Hamburguesa (`navbar-expand-xl`); institucionales debajo de la ubicación |
| ~390px | Sin overflow (`scrollWidth === 390` tras el recorte); menú hamburguesa |
| Bienvenida | Acciones, Escape y sesión comprobados en sesión previa; recarga no reabre el diálogo |
| Iframe radio | URL USastreams intacta; contenedor 100% de ancho. Stream en vivo **no verificado** |
| Facebook | Plugin de cabecera visible; fallback «Visitar Facebook» visible; timeline **no cargó** |
| Lightbox diploma | Diploma completo y legible; Escape cierra |
| Pie en las seis páginas | Sin columna de navegación; créditos + copyright; HTTP 200 en las seis |
| PHP `mail()` | Sin cambios; entrega **no verificada** |

## Refinamiento visual dirigido — 17 de octubre de 2026

Cuatro ajustes sobre el estado local. Sin commit ni push. Sin cambios de PHP, donaciones, historia, pie, stream ni políticas.

### Archivos

- `index.html` — una sola tarjeta de Facebook (sin iframe); reproductor sin cambio de URL.
- `quienessomos.html` — carrusel horizontal de las cuatro fotos de reconocimiento; lightbox reutilizado.
- `css/site.css` — tarjeta Facebook, carrusel, sombras/hover, tarjeta de radio esmeralda.
- `js/site.js` — se eliminó el plugin de Facebook; se añadió el carrusel (IntersectionObserver, controles, auto-avance lento que se detiene al interactuar).

### Cambios

1. **Facebook** — Una tarjeta: logo, icono Bootstrap, «Síguenos en Facebook», frase de invitación y botón «Visitar Facebook» → `https://www.facebook.com/HistoriadeunLegado/` (`target="_blank"` `rel="noopener noreferrer"`). **0 iframes** de Facebook. Sin avisos de mural ni cifras inventadas.
2. **Reconocimiento** — Carrusel de una fila (imágenes 1–4, todas `naturalWidth` > 0, `object-fit: contain`). Diploma (`Reconocimiento3.jpeg`) completo. Controles prev/next, indicadores, «Imagen n de 4», flechas de teclado, entrada LTR al entrar en vista, auto 8 s pausado/cancelado al usar controles, `prefers-reduced-motion` sin entrada ni auto. Lightbox existente: diploma ampliado, Escape, foco en cerrar. Texto del 10 de septiembre de 2026 **una sola vez**.
3. **Hover** — Sombras laterales perceptibles (`0 12px 28px` en reposo en fotos de fundador) y elevación/escala leve en tarjetas y fotos; diploma sin escala; `prefers-reduced-motion` anula transformaciones.
4. **Radio** — Tarjeta oscura alineada al diálogo de bienvenida (verde/oro, glow, ondas). Iframe USastreams visible (desktop y ~287×95 px en 390px). URL **sin cambio**. No se afirma que el stream esté al aire.

### Validación

| Comprobación | Resultado |
| --- | --- |
| Facebook: una tarjeta, sin iframe de timeline | Confirmado (0 iframes de Facebook; 1 `.facebook-card`) |
| Botón Facebook | `href` verificado a la página oficial |
| Cuatro fotos del carrusel | Cargan; prev/next e indicadores mueven a 1–4 |
| Diploma sin recorte | `object-fit: contain`; documento completo en carrusel y lightbox |
| Lightbox | Abre al pulsar el diploma; Escape cierra; foco en «Cerrar imagen ampliada» |
| ~390px | Carrusel usable; diploma visible; `scrollWidth === 390` |
| Hover fundador | Sombra en reposo medida; transiciones `transform, box-shadow` |
| Iframe radio | Misma URL; visible en escritorio y 390px |
| Texto de reconocimiento | Un solo `h2` en la sección |

Limitaciones: el audio del stream no se verificó como «en vivo». El hover se comprobó en fotos reales (sombra y CSS); no se simuló el puntero encima de cada imagen.

## Git (sin commit)

```
 M contactos.html
 M donate.html
 M enviar_correo.php
 M index.html
 M politicas.html
 M programacion.html
 M quienessomos.html
?? css/site.css
?? images/Imagenes reconocimientos/
?? js/site.js
?? AUDITORIA_Y_CAMBIOS.md
```
