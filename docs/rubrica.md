
# Verificación de rúbrica — Tarea 2

## Criterios del producto

### 1. DOM dinámico — Parte A

- [ ] Resultados generados mediante métodos del DOM.
- [ ] No se insertan datos externos con innerHTML.
- [ ] Funciones de renderizado reutilizables.
- [ ] Actualizaciones precisas.

Archivos:
- buscador-js/js/render.js
- buscador-js/js/render-lecturas.js

### 2. Eventos, propagación y delegación

- [ ] Una escucha en el contenedor de lecturas.
- [ ] Identificación robusta del origen.
- [ ] Propagación controlada cuando corresponde.
- [ ] Sin listeners duplicados.

Archivos:
- buscador-js/js/main.js
- buscador-js/js/render-lecturas.js

### 3. Validación de formularios

- [ ] Restricciones HTML5.
- [ ] Constraint Validation API.
- [ ] Errores personalizados junto a los campos.
- [ ] Año no futuro.
- [ ] Fecha de sesión no pasada.

Archivos:
- buscador-js/index.html
- buscador-js/js/validacion.js

### 4. Autores dinámicos

- [ ] Se permite agregar autores.
- [ ] Se permite eliminar autores.
- [ ] Mínimo uno y máximo cinco.
- [ ] Todos los autores se validan.
- [ ] Todos los autores se envían.

Archivo:
- buscador-js/js/autores.js

### 5. Comunicación asincrónica

- [ ] Búsqueda con fetch y async/await.
- [ ] Verificación de response.ok.
- [ ] Manejo de errores.
- [ ] Estados de carga, error, vacío y resultados.
- [ ] Envío POST sin recarga.

Archivos:
- buscador-js/js/api.js
- buscador-js/js/api-propuestas.js
- buscador-js/js/main.js
- buscador-js/js/formulario.js

### 6. Transiciones y animaciones

- [ ] Animación al agregar.
- [ ] Animación al cambiar estado.
- [ ] Animación al quitar.
- [ ] Uso de clases CSS.
- [ ] Eliminación al terminar la transición.

Archivos:
- buscador-js/scss/_componentes.scss
- buscador-js/js/render-lecturas.js

### 7. Organización, depuración y rendimiento

- [ ] Módulos ES con responsabilidades claras.
- [ ] Consola sin errores durante uso normal.
- [ ] Error real depurado con breakpoint.
- [ ] Evidencia mediante capturas.
- [ ] Análisis del panel Network.
- [ ] Optimización medida antes y después.

Archivo:
- docs/depuracion.md

### 8. Bootstrap

- [ ] Grilla adaptable.
- [ ] Utilidades CSS.
- [ ] Navbar.
- [ ] Cards.
- [ ] Modal.
- [ ] Formulario.
- [ ] Alerta.
- [ ] Tabla.

Archivo:
- buscador-js/index.html

### 9. Sass y diseño adaptable

- [ ] Variables de origen de Bootstrap.
- [ ] Parciales Sass.
- [ ] Variable Sass.
- [ ] Mixin.
- [ ] Función.
- [ ] Anidamiento.
- [ ] Grid o Flexbox propio.
- [ ] Variables CSS.
- [ ] Unidades relativas.
- [ ] Enfoque mobile-first.

Archivos:
- buscador-js/scss/

### 10. Componentes y props React

- [ ] Componentes funcionales.
- [ ] Responsabilidades separadas.
- [ ] Organización en carpetas.
- [ ] Uso de props.
- [ ] Uso de children.
- [ ] Props de tipo función.
- [ ] Sin manipulación directa del DOM.

Archivos:
- tablero-react/src/components/

### 11. Estado, eventos y listas React

- [ ] Uso correcto de useState.
- [ ] Actualización inmutable.
- [ ] Keys estables.
- [ ] Resumen derivado.
- [ ] Lista filtrada derivada.
- [ ] Renderizado condicional.

Archivos:
- tablero-react/src/App.jsx
- tablero-react/src/utils/lecturas.js

### 12. Formularios y comunicación

- [ ] Formulario controlado.
- [ ] Validación por campo.
- [ ] Mensajes personalizados.
- [ ] Estado elevado.
- [ ] Filtros y resumen sincronizados.

Archivos:
- tablero-react/src/components/formularios/
- tablero-react/src/components/lecturas/
- tablero-react/src/App.jsx

### 13. Repositorio y documentación

- [ ] README completo.
- [ ] Instalación de ambas partes.
- [ ] Compilación Sass.
- [ ] Comparación DOM manual y React.
- [ ] Referencias al código.
- [ ] Al menos quince commits descriptivos.
- [ ] Historial progresivo auténtico.
- [ ] Etiqueta tarea-2.
- [ ] node_modules excluido.

Archivos:
- README.md
- .gitignore
- Historial Git

---

## Criterios de defensa individual

### 14. Explicación del código

- [ ] Explicar cualquier módulo solicitado.
- [ ] Recorrer una interacción completa en Parte A.
- [ ] Recorrer una interacción completa en React.

### 15. Dominio técnico

- [ ] Explicar criterios 1 al 13.
- [ ] Relacionar conceptos con archivos concretos.
- [ ] Contestar preguntas sobre alternativas técnicas.

### 16. Decisiones de diseño

- [ ] Justificar módulos ES.
- [ ] Justificar Bootstrap y Sass.
- [ ] Justificar componentes React.
- [ ] Justificar ubicación del estado.
- [ ] Explicar ventajas y limitaciones.
- [ ] Comparar DOM manual con React.

### 17. Modificaciones en caliente

- [ ] Crear una rama separada.
- [ ] Modificar una funcionalidad en Parte A.
- [ ] Modificar una funcionalidad en React.
- [ ] Verificar que no se rompan otras funciones.
- [ ] Explicar cada modificación realizada.

---

## Resultado de la revisión

Criterios técnicos verificados: [Completar]

Problemas pendientes: [Completar]

Fecha de revisión: [Completar]
