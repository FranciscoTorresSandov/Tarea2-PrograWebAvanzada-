
# Estantería Común

**Universidad CENFOTEC**  
**Curso:** SOFT-12 — Programación Web Avanzada  
**Proyecto:** Tarea 2  
**Estudiante:** Francisco Torres Sandoval  
**Periodo:** III Cuatrimestre 2026

---

## 1. Descripción del proyecto

Estantería Común es una aplicación web desarrollada para
un club de lectura comunitario.

Su objetivo es permitir que los usuarios consulten libros
mediante una API pública, administren una lista personal
de lecturas y propongan nuevas obras para las sesiones
del club.

El proyecto está dividido en dos partes:

- **Parte A:** Buscador de libros desarrollado con JavaScript,
  Bootstrap y Sass.
- **Parte B:** Tablero de lecturas desarrollado con React.

Ambas partes permiten estudiar diferentes enfoques para
administrar el estado y actualizar las interfaces web.

### Estado actual

**Commits 1 al 8: Parte A**

Se ha desarrollado la estructura y funcionalidad del
buscador, la lista de lecturas y el formulario de propuestas.

El commit 8 incorpora el trabajo de depuración, análisis
de rendimiento y optimización de estilos.

**Commits 9 al 15: pendientes**

La implementación del tablero React, su integración y
la documentación comparativa se realizarán durante
los próximos commits.

---

## 2. Tecnologías utilizadas

### Parte A

- HTML5: estructura semántica y formularios.
- CSS3: diseño y presentación de componentes.
- JavaScript ES6+: lógica y manipulación del DOM.
- Bootstrap 5: diseño adaptable y componentes visuales.
- Sass (SCSS): personalización y modularización de estilos.
- Vite: servidor de desarrollo y compilación.
- npm: gestión de dependencias.
- Fetch API: comunicación con servicios externos.
- Open Library API: búsqueda de libros.
- JSONPlaceholder: simulación del envío de propuestas.
- Git y GitHub: control de versiones.

### Parte B

React y Vite.

Esta parte se incorporará a partir del commit 9.

---

## 3. Estructura del repositorio

```text
tarea-2/
│
├── README.md
├── .gitignore
│
├── docs/
│   ├── depuracion.md
│   └── capturas/
│
├── buscador-js/
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   │
│   ├── css/
│   │   └── main.css
│   │
│   ├── scss/
│   │   ├── main.scss
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _funciones.scss
│   │   └── _componentes.scss
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── api.js
│   │   ├── render.js
│   │   ├── lecturas.js
│   │   ├── estado-lecturas.js
│   │   ├── formulario.js
│   │   ├── validacion.js
│   │   ├── autores.js
│   │   └── api-propuestas.js
│   │
│   └── public/
│
└── tablero-react/
    └── (pendiente de implementación)
```

La estructura separa las responsabilidades del proyecto
para facilitar el mantenimiento y las pruebas.

Los módulos JavaScript utilizan importaciones y
exportaciones ES.

---

## 4. Requisitos previos

Para ejecutar la aplicación se necesita:

1. Node.js compatible con la versión de Vite instalada.
2. npm.
3. Git.
4. Visual Studio Code u otro editor.
5. Un navegador moderno.
6. Conexión a Internet para consumir las APIs externas.

Para comprobar las instalaciones:

```bash
node -v
npm -v
git --version
```

No es necesario instalar Bootstrap o Sass globalmente.
Las dependencias se administran mediante npm.

---

## 5. Instalación del proyecto

Clonar el repositorio desde GitHub:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar al directorio principal:

```bash
cd tarea-2
```

Acceder a la Parte A:

```bash
cd buscador-js
```

Instalar dependencias:

```bash
npm install
```

Esto descarga las dependencias indicadas en
`package.json`.

La carpeta `node_modules` no debe incorporarse
al repositorio Git.

---

## 6. Ejecutar la Parte A

### 6.1 Compilar Sass

Desde el directorio `buscador-js`:

```bash
npm run build:css
```

Este comando transforma los archivos SCSS en CSS.

El archivo generado se encuentra en:

```text
buscador-js/css/main.css
```

### 6.2 Iniciar el servidor de desarrollo

```bash
npm run dev
```

Vite mostrará una dirección local similar a:

```text
http://localhost:5173/
```

Abrir esa dirección en el navegador.

No se recomienda abrir directamente `index.html`
mediante el protocolo `file://`, ya que el proyecto
utiliza módulos JavaScript.

### 6.3 Compilación automática de Sass

En otra terminal:

```bash
npm run watch:css
```

Este comando recompila los estilos cuando se modifican
los archivos SCSS.

### 6.4 Generar una compilación de producción

```bash
npm run build:css
npm run build
```

La compilación de Vite genera los archivos optimizados
para distribución.

---

## 7. Funcionalidades de la Parte A

### 7.1 Búsqueda de libros

El usuario puede buscar libros escribiendo un título
o el nombre de un autor.

La aplicación consulta Open Library utilizando:

```text
https://openlibrary.org/search.json
```

La búsqueda se realiza mediante `fetch` y `async/await`.

Cada consulta solicita hasta 12 resultados.

Se contemplan cuatro estados de interfaz:

- Cargando resultados.
- Resultados disponibles.
- Sin resultados.
- Error de comunicación.

Cada resultado presenta información como:

- Título del libro.
- Autor o autores.
- Año de primera publicación.
- Portada, cuando está disponible.

Si no existe una portada, se utiliza una imagen
alternativa.

### 7.2 Detalles de un libro

El usuario puede consultar información adicional
mediante un modal de Bootstrap.

El contenido se actualiza dinámicamente según
el libro seleccionado.

### 7.3 Lista personal de lecturas

Los usuarios pueden agregar libros a una lista
personal mantenida en memoria.

Cada libro puede encontrarse en uno de tres estados:

1. Pendiente.
2. Leyendo.
3. Leído.

El usuario puede cambiar el estado o quitar un libro.

No se permite agregar dos veces el mismo libro.

Los eventos de los botones se gestionan mediante
delegación de eventos.

Las acciones de agregar, cambiar estado y quitar
utilizan clases CSS para activar animaciones.

Los datos permanecen en memoria durante la sesión.
No se utiliza una base de datos.

---

## 8. Formulario de propuesta de lectura

El formulario permite proponer libros para las
próximas sesiones del club.

### Campos disponibles

- Título del libro.
- Uno o más autores.
- Año de publicación.
- Cantidad de páginas.
- Género literario.
- Correo electrónico del proponente.
- Fecha propuesta para la sesión.
- Motivo de la propuesta.

### 8.1 Validaciones

El formulario utiliza las validaciones nativas
de HTML5 y la Constraint Validation API.

Se utilizan restricciones como:

- `required`
- `min`
- `max`
- `minlength`
- `maxlength`
- `type="email"`
- `type="date"`

También se implementan reglas personalizadas
mediante JavaScript.

Entre ellas:

- El título es obligatorio.
- Debe existir al menos un autor.
- El año de publicación no puede ser futuro.
- La cantidad de páginas debe ser válida.
- El correo electrónico debe tener un formato correcto.
- La fecha de sesión no puede ser anterior al día actual.
- El motivo debe cumplir la longitud mínima establecida.

Los errores se comunican al usuario para que
pueda corregir los datos.

### 8.2 Autores dinámicos

El formulario permite agregar y eliminar campos
de autor sin recargar la página.

Se establece un mínimo de un autor y un máximo
de cinco autores.

Los campos adicionales utilizan las mismas
restricciones que el campo original.

### 8.3 Envío asincrónico

Una vez completadas las validaciones, la propuesta
se envía mediante `fetch`.

Servicio utilizado:

```text
https://jsonplaceholder.typicode.com/posts
```

Se utiliza una petición HTTP POST para simular
el registro de una propuesta.

JSONPlaceholder es un servicio de pruebas, por
lo que no representa una base de datos persistente
del proyecto.

El formulario debe mostrar mensajes de éxito
o error sin recargar la página.

---

## 9. Organización del código JavaScript

Los archivos JavaScript se distribuyen en módulos
para separar responsabilidades.

### main.js

Punto de entrada de la aplicación.

Coordina la inicialización de los componentes
y los eventos principales.

### api.js

Se encarga de realizar solicitudes a Open Library.

Centraliza la comunicación con el servicio
y la gestión de errores HTTP.

### render.js

Construye los elementos visuales de los libros
utilizando métodos del DOM.

Los datos procedentes de la API se insertan
como texto para evitar interpretar contenido
externo como HTML.

### estado-lecturas.js

Administra las operaciones de estado sobre
la lista personal.

Contiene la lógica para agregar libros,
evitar duplicados y cambiar estados.

### lecturas.js

Gestiona la representación de la lista y
la interacción con sus botones.

Utiliza delegación de eventos.

### validacion.js

Contiene las reglas de validación del formulario.

Permite verificar restricciones y comunicar
errores personalizados.

### formulario.js

Coordina la lectura de los campos, la validación
y el proceso de envío de las propuestas.

### autores.js

Administra los campos dinámicos de autores.

Controla la incorporación y eliminación
de campos y sus límites.

### api-propuestas.js

Centraliza la comunicación con JSONPlaceholder.

Realiza la solicitud POST y gestiona las
respuestas del servicio de pruebas.

---

## 10. Bootstrap y Sass

Bootstrap se instala mediante npm y se
personaliza utilizando Sass.

Los estilos se organizan en archivos parciales.

### _variables.scss

Define variables de personalización como
colores, espacios y otros valores reutilizables.

### _mixins.scss

Contiene mixins que permiten reutilizar
declaraciones CSS.

### _funciones.scss

Contiene funciones Sass para calcular
valores reutilizables.

### _componentes.scss

Incluye estilos personalizados de los componentes
y las animaciones de la interfaz.

### main.scss

Archivo principal encargado de importar los
estilos necesarios y generar el CSS final.

La aplicación combina:

- Sistema de grillas de Bootstrap.
- Clases utilitarias.
- Navbar.
- Tarjetas.
- Modal.
- Formularios.
- Alertas.
- Tablas.
- CSS Grid.
- Media queries.

Se utiliza un enfoque mobile-first para
adaptar la interfaz a diferentes tamaños
de pantalla.

---

## 11. Depuración y optimización

Durante el commit 8 se incorpora el proceso
de análisis y documentación del rendimiento
de la Parte A.

El registro técnico se encuentra en:

```text
docs/depuracion.md
```

Las capturas de evidencia se almacenan en:

```text
docs/capturas/
```

### 11.1 Depuración

Se utilizan las herramientas de desarrollo
del navegador, especialmente:

- Console.
- Sources.
- Network.
- Breakpoints.

El documento de depuración debe registrar
un error real encontrado durante el desarrollo.

También debe incluir:

1. Descripción del problema.
2. Pasos para reproducirlo.
3. Ubicación del breakpoint.
4. Análisis de las variables relevantes.
5. Causa identificada.
6. Solución implementada.
7. Evidencia de la corrección.

### 11.2 Análisis de rendimiento

El panel Network permite analizar las solicitudes
y los recursos cargados por la aplicación.

Las métricas principales son:

- Cantidad de peticiones.
- Tamaño transferido.
- Tamaño total de los recursos.
- Tiempo de carga.

Las mediciones deben realizarse bajo condiciones
comparables antes y después de la optimización.

### 11.3 Optimización

La optimización debe reducir la cantidad o
el peso de los recursos utilizados, sin afectar
las funcionalidades de la aplicación.

Las técnicas consideradas incluyen:

- Importación selectiva de estilos Bootstrap.
- Reducción del CSS innecesario.
- Optimización del tamaño de las imágenes.
- Eliminación de recursos que no se utilizan.

Los cambios aplicados y sus resultados medidos
se documentan en `docs/depuracion.md`.

No se incluyen valores de rendimiento estimados.
Las métricas deben obtenerse directamente
desde DevTools.

---

## 12. Pruebas de la Parte A

### 12.1 Pruebas automatizadas

Desde `buscador-js`:

```bash
npm test
```

Estas pruebas verifican la lógica cubierta
por los archivos de pruebas del proyecto.

### 12.2 Pruebas funcionales

Los escenarios que deben comprobarse son:

1. Buscar libros por título.
2. Buscar libros por autor.
3. Consultar detalles en el modal.
4. Mostrar resultados vacíos.
5. Gestionar errores de búsqueda.
6. Agregar un libro a la lista.
7. Impedir libros duplicados.
8. Cambiar el estado de lectura.
9. Eliminar un libro de la lista.
10. Comprobar las animaciones.
11. Validar los campos del formulario.
12. Rechazar un año futuro.
13. Rechazar fechas anteriores al día actual.
14. Agregar autores dinámicamente.
15. Eliminar autores respetando el mínimo permitido.
16. Impedir más de cinco autores.
17. Enviar una propuesta válida.
18. Mostrar mensajes de éxito y error.
19. Verificar la interfaz en dispositivos móviles.
20. Revisar la consola del navegador.

Los resultados y evidencias deben corresponder
a ejecuciones reales de la aplicación.

---

## 13. Parte B — React

**Pendiente de implementación.**

El tablero React se desarrollará a partir
del commit 9.

Esta sección se actualizará cuando se creen
los componentes, el estado, los filtros
y el formulario de la Parte B.

También se incorporarán las instrucciones
de instalación, ejecución y pruebas.

---

## 14. Del DOM manual a React

**Sección pendiente de completar.**

La comparación definitiva se incorporará
cuando se implemente la Parte B.

Se analizará cómo cambia el estado de un
libro mediante manipulación directa del DOM
en JavaScript y cómo React actualiza
la interfaz a partir de su estado.

La comparación incluirá referencias
a los archivos de ambas implementaciones.

---

## 15. Control de versiones

El proyecto utiliza Git y GitHub para
registrar los avances de forma incremental.

Se ha organizado un plan de 15 commits
con responsabilidades diferenciadas.

### Primera etapa — Parte A

Los primeros ocho commits corresponden
a la construcción y documentación de
la aplicación JavaScript.

Incluyen:

- Estructura inicial.
- Integración con Open Library.
- Renderizado de resultados.
- Gestión de lecturas.
- Personalización con Bootstrap y Sass.
- Validación de propuestas.
- Autores dinámicos y comunicación asincrónica.
- Depuración y optimización.

### Segunda etapa — Parte B

Los próximos commits incorporarán React,
la gestión de estado, componentes,
filtros y funcionalidades del tablero.

### Etapa final

Se completará la documentación comparativa,
se verificarán las dos aplicaciones y se
preparará la entrega.

La etiqueta Git `tarea-2` se creará
al finalizar el proyecto y deberá apuntar
al commit definitivo.

---

## 16. Consideraciones importantes

- No se requiere una base de datos.
- La lista de lecturas de la Parte A se mantiene en memoria.
- Open Library se utiliza como catálogo externo.
- JSONPlaceholder simula el registro de propuestas.
- Las solicitudes externas requieren conexión a Internet.
- Las dependencias de npm no deben incorporarse al repositorio.
- El código está organizado en módulos con responsabilidades separadas.
- Las mediciones de rendimiento deben respaldarse con evidencias reales.

---

## 17. Autor

**Francisco Torres Sandoval**

Universidad CENFOTEC  
Programación Web Avanzada  
III Cuatrimestre 2026
