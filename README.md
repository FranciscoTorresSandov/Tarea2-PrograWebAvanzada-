
# Estantería Común — Tarea 2

**Universidad:** CENFOTEC  
**Curso:** SOFT-12 — Programación Web Avanzada  
**Estudiante:** Francisco Torres Sandoval  
**Periodo:** III cuatrimestre de 2026

## 1. Descripción del proyecto

**Estantería Común** es un proyecto para un club de lectura comunitario, formado por dos aplicaciones web independientes que permiten comparar la actualización manual del DOM con el modelo de componentes y estado de React.

- **Parte A — Buscador público:** JavaScript nativo, Bootstrap y Sass. Consulta libros en Open Library, permite mantener una lista de lecturas y enviar una propuesta de lectura a un servicio de pruebas.
- **Parte B — Tablero del club:** React con Vite. Administra una colección local de libros y miembros mediante componentes, estado, filtros, resumen y formulario controlado.

En las dos partes se puede **agregar un libro, cambiar su estado entre Pendiente, Leyendo y Leído y quitarlo**. Los datos de las listas se mantienen únicamente en memoria: no se requiere una base de datos ni persistencia tras recargar la página.

## 2. Tecnologías utilizadas

| Parte | Tecnologías y propósito |
| --- | --- |
| A | HTML5, CSS, JavaScript (módulos ES), Bootstrap instalado con npm, Sass, Fetch API, Open Library y JSONPlaceholder. |
| B | React, JSX, `useState`, JavaScript, CSS adaptable y Vite. |
| Ambas | Node.js, npm, Git, GitHub y herramientas de desarrollo del navegador. |

**Diferencia importante:** la Parte B no consume APIs externas; sus datos iniciales provienen de `tablero-react/src/data/datosIniciales.js`.

## 3. Estructura del repositorio

La siguiente es la **estructura prevista del entregable completo** tras implementar los commits 1–16. Los archivos generados o excluidos por Git se identifican en las notas posteriores.

```text
tarea-2/
├── README.md
├── .gitignore
├── docs/
│   ├── depuracion.md
│   ├── pruebas.md
│   ├── rubrica.md
│   ├── defensa.md
│   └── capturas/
│       ├── .gitkeep
│       ├── 01-error.png
│       ├── 02-breakpoint.png
│       ├── 03-network-antes.png
│       └── 04-network-despues.png
├── buscador-js/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   └── portada-alternativa.svg
│   ├── css/
│   │   └── main.css
│   ├── scss/
│   │   ├── main.scss
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _funciones.scss
│   │   └── _componentes.scss
│   ├── js/
│   │   ├── main.js
│   │   ├── api.js
│   │   ├── render.js
│   │   ├── lecturas.js
│   │   ├── render-lecturas.js
│   │   ├── formulario.js
│   │   ├── validacion.js
│   │   ├── autores.js
│   │   └── api-propuestas.js
│   └── tests/
│       ├── lecturas.test.js
│       └── correcciones.test.js
└── tablero-react/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── eslint.config.js
    ├── public/
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   ├── data/
    │   │   └── datosIniciales.js
    │   ├── utils/
    │   │   ├── lecturas.js
    │   │   └── validacionLibro.js
    │   └── components/
    │       ├── layout/
    │       │   ├── Cabecera.jsx
    │       │   └── Panel.jsx
    │       ├── libros/
    │       │   ├── ListaLibros.jsx
    │       │   └── TarjetaLibro.jsx
    │       ├── lecturas/
    │       │   ├── Filtros.jsx
    │       │   ├── Filtros.css
    │       │   ├── Resumen.jsx
    │       │   └── Resumen.css
    │       ├── formularios/
    │       │   ├── FormularioLibro.jsx
    │       │   └── FormularioLibro.css
    │       └── ui/
    │           └── BotonAccion.jsx
    └── tests/
        ├── lecturas.test.js
        └── validacionLibro.test.js
```

**Notas sobre la estructura:**

- `buscador-js/css/main.css` se **genera** con Sass y está excluido mediante `.gitignore`; no tiene por qué aparecer en GitHub, pero sí en el equipo después de compilar.
- `node_modules/` y `dist/` son carpetas generadas y no se incorporan al repositorio.
- Las cuatro imágenes de `docs/capturas/` deben ser **capturas reales** tomadas con DevTools. Si todavía no se han creado, no deben darse por entregadas.
- El archivo que administra el estado en la Parte A es **`js/lecturas.js`**. El que construye y actualiza las filas es **`js/render-lecturas.js`**; no utilizamos `estado-lecturas.js` en la implementación manual final.
- Los archivos de configuración que crea Vite pueden variar ligeramente según la versión de la plantilla; debe conservarse la configuración que realmente exista en el proyecto.

## 4. Requisitos previos

Se necesita Node.js compatible con la versión de Vite instalada, npm, Git, un editor como Visual Studio Code y un navegador moderno. La **Parte A** requiere conexión a Internet para consultar Open Library y utilizar JSONPlaceholder.

Verificar las herramientas:

```bash
node --version
npm --version
git --version
```

Bootstrap y Sass se instalan localmente con npm; no se requieren instalaciones globales.

## 5. Instalación y ejecución — Parte A

Desde la raíz del repositorio:

```bash
cd buscador-js
npm ci
npm run build:css
npm run dev -- --port 5173
```

Abrir `http://localhost:5173/` (o la dirección mostrada por Vite).

Para recompilar Sass automáticamente durante el desarrollo, ejecutar en **otra terminal** situada en `buscador-js`:

```bash
npm run watch:css
```

Para construir la versión de producción:

```bash
npm run build
```

El punto de entrada Sass es `scss/main.scss`, que genera `css/main.css`. **Es necesario compilar Sass al clonar el repositorio**, porque el CSS generado no se versiona. No abrir el HTML usando `file://`: utilizar Vite.

### Funcionalidades de la Parte A

- Búsqueda al enviar el formulario, por título o autor, mediante `GET https://openlibrary.org/search.json?q={texto}&limit=12`.
- Estados explícitos de carga, error, resultados vacíos y resultados encontrados.
- Tarjetas creadas con métodos del DOM, sin insertar información externa mediante `innerHTML`.
- Título, autores, año, portada alternativa y detalle en un modal de Bootstrap.
- Lista de lecturas en memoria que impide duplicados; tres estados y eliminación.
- Delegación de eventos desde el contenedor de la tabla, con transiciones CSS para agregar, actualizar y quitar.
- Formulario de propuesta con título, entre uno y cinco autores, año, páginas, género, correo, fecha de sesión y motivo.
- Validación HTML5 y Constraint Validation API con mensajes junto a cada campo; rechazo de años futuros, fechas pasadas y campos de texto inválidos.
- Envío `POST` asincrónico a `https://jsonplaceholder.typicode.com/posts`, con alerta de éxito o error sin recarga. **JSONPlaceholder simula el registro: no persiste la propuesta.**

### Organización de JavaScript — Parte A

| Archivo | Responsabilidad |
| --- | --- |
| `js/main.js` | Inicialización, búsqueda y coordinación de los eventos del catálogo y de la lista. |
| `js/api.js` | Consulta y normalización de resultados de Open Library. |
| `js/render.js` | Tarjetas de resultados y contenido del modal. |
| `js/lecturas.js` | Colección de lecturas en memoria y cambios de estado. |
| `js/render-lecturas.js` | Creación y actualización puntual de filas, animaciones y eliminación visual. |
| `js/validacion.js` | Reglas HTML5/complementarias y mensajes de Constraint Validation API. |
| `js/autores.js` | Creación, eliminación y validación de campos de autores. |
| `js/formulario.js` | Coordinación del formulario y procesamiento del envío. |
| `js/api-propuestas.js` | Petición HTTP POST a JSONPlaceholder. |

### Bootstrap y Sass

Se utilizan grilla y utilidades de Bootstrap, más **navbar, cards, modal, formulario, alertas y tabla**. Sass organiza variables de origen, mixins, funciones y estilos de componentes en parciales. El diseño propio emplea CSS Grid, variables CSS, unidades relativas y media queries con enfoque *mobile-first*. Bootstrap no se personaliza mediante `!important`.

## 6. Instalación y ejecución — Parte B (React)

Desde la raíz del repositorio, en una terminal distinta de la Parte A:

```bash
cd tablero-react
npm ci
npm run dev -- --port 5174
```

Abrir `http://localhost:5174/` (o la dirección mostrada por Vite).

Para construir la versión de producción:

```bash
npm run build
```

Para ejecutar ESLint, si está configurado en el `package.json` generado por la plantilla:

```bash
npm run lint
```

### Funcionalidades de la Parte B

- Libros y miembros iniciales cargados desde un módulo JavaScript local, **sin consumir APIs**.
- Visualización del miembro proponente y de los estados Pendiente, Leyendo y Leído.
- Cambio de estado y eliminación utilizando `useState` y operaciones inmutables.
- Filtros combinables por estado y miembro, junto con un resumen de cantidades por estado.
- Filtros y resumen como componentes hermanos, sincronizados desde `App.jsx` mediante estado elevado.
- Lista filtrada y conteos calculados durante el renderizado; no se guardan como estados duplicados.
- Formulario controlado para agregar libros, con validación y mensajes junto a cada campo.
- Mensaje cuando no existen libros o cuando ningún libro coincide con los filtros.
- Componentes reutilizables que reciben props, `children` y funciones; listas con keys estables y sin manipulación directa del DOM en los componentes.

### Organización de React

| Archivo o carpeta | Responsabilidad |
| --- | --- |
| `src/App.jsx` | Estado compartido, filtros, selección y coordinación de acciones. |
| `src/data/datosIniciales.js` | Miembros y libros iniciales. |
| `src/utils/lecturas.js` | Actualizaciones inmutables, filtros y resúmenes. |
| `src/utils/validacionLibro.js` | Validación y normalización del nuevo libro. |
| `src/components/layout/` | Cabecera y panel reutilizable mediante `children`. |
| `src/components/libros/` | Lista y tarjetas de libros. |
| `src/components/lecturas/` | Filtros y resumen. |
| `src/components/formularios/` | Formulario controlado. |
| `src/components/ui/` | Botón reutilizable que recibe una función como prop. |

## 7. Del DOM manual a React

**Misma interacción comparada: cambiar el estado de un libro.**

En la **Parte A**, `buscador-js/js/main.js` detecta el clic mediante una única escucha delegada en la tabla y utiliza `data-accion` y `data-id` para identificar el libro. `buscador-js/js/lecturas.js` cambia el estado en la colección en memoria. Después, `buscador-js/js/render-lecturas.js` localiza la etiqueta de estado de esa fila, actualiza su `textContent` y sus clases y activa una animación. El programador debe mantener sincronizados explícitamente los datos y el DOM.

En la **Parte B**, `tablero-react/src/components/libros/TarjetaLibro.jsx` envía la acción por una prop de función. `tablero-react/src/App.jsx` llama a `setLibros`, usando la función `actualizarEstadoLectura` de `src/utils/lecturas.js`, que crea un arreglo nuevo con `map()` y un nuevo objeto para el libro modificado. React calcula y refleja la interfaz a partir del estado actualizado.

**Diferencia principal:** en React ya no necesitamos buscar manualmente la fila ni cambiar su texto y sus clases cuando se modifica un estado. Describimos la interfaz mediante componentes y actualizamos el estado de forma inmutable; React coordina el renderizado. La Parte A ofrece control explícito de los nodos, mientras que React facilita compartir el estado y componer la interfaz sin sincronización manual de cada elemento.

## 8. Pruebas y depuración

Desde cada subproyecto, ejecutar las pruebas unitarias de su lógica:

```bash
node --test
```

Para validar las compilaciones:

```bash
npm run build
```

Las comprobaciones funcionales, resultados observados y casos límite se documentan en `docs/pruebas.md`. Las pruebas unitarias **no sustituyen** la revisión de la interfaz en el navegador ni de la comunicación con los servicios externos.

`docs/depuracion.md` debe contener un error real investigado mediante breakpoints, capturas de DevTools, cantidad de solicitudes y peso total en Network, así como una optimización con mediciones **antes y después**. Las capturas se guardan en `docs/capturas/`; no se inventan resultados ni métricas.

## 9. Control de versiones y entrega

El desarrollo se planificó en quince commits descriptivos y un **commit correctivo adicional**, si este último se registró en el repositorio. La existencia, el orden y las fechas reales de los commits deben verificarse con:

```bash
git log --oneline --reverse
git rev-list --count HEAD
git status
```

El repositorio debe incluir la etiqueta **`tarea-2`** apuntando al commit definitivo. Para comprobarla:

```bash
git show tarea-2 --stat
```

La entrega en Moodle consiste en un archivo **`.txt` con el enlace al repositorio de GitHub**. Antes de entregar, verificar que la etiqueta esté publicada, el README corresponda al código real y las evidencias estén completas.

## 10. Defensa técnica

La defensa individual exige explicar cualquier parte del código, recorrer una interacción completa en ambas aplicaciones y justificar las decisiones de diseño. Deben ejecutarse las dos partes y las modificaciones solicitadas por el profesor se hacen en una **rama aparte**, sin alterar el commit etiquetado.

La guía de estudio se encuentra en `docs/defensa.md` y la matriz de los 17 criterios en `docs/rubrica.md`. Durante la defensa no deben utilizarse asistentes de IA ni herramientas de generación o autocompletado de código prohibidas por la consigna.

## 11. Limitaciones del alcance

- Los datos de las lecturas no persisten después de recargar.
- La Parte A consume APIs externas; la Parte B usa únicamente datos iniciales locales y estado React.
- JSONPlaceholder devuelve una respuesta de prueba, no crea un registro persistente.
- No se requiere backend propio ni base de datos.

---

**Autor:** Francisco Torres Sandoval  
**Universidad CENFOTEC — Programación Web Avanzada — III cuatrimestre de 2026**
