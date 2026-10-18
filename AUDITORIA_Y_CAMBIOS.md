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
