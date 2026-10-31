# Depuración y optimización — Estantería Común

## Información

Proyecto: Tarea 2 — Estantería Común
Parte: A — JavaScript, Bootstrap y Sass

## 1. Error identificado durante el desarrollo

### Descripción

[Describir el error real observado]

### Pasos para reproducirlo

1. [Primer paso]
2. [Segundo paso]
3. [Resultado incorrecto]

### Comportamiento esperado

[Describir el resultado correcto]

### Comportamiento observado

[Describir el resultado incorrecto]

### Hipótesis inicial

[Explicar qué se sospechaba]

### Depuración mediante breakpoint

Archivo: [ruta exacta]
Función: [nombre de la función]

Se estableció un punto de interrupción
para inspeccionar [variables o expresiones].

### Evidencia

![Error observado](capturas/01-error.png)

![Breakpoint en DevTools](capturas/02-breakpoint.png)

### Causa identificada

[Explicar la causa concreta]

### Corrección aplicada

[Explicar el cambio de código]

### Verificación

[Describir cómo se comprobó la corrección]

---

## 2. Análisis de Network

### Condiciones de medición

Navegador: [nombre y versión]
URL local: [dirección]
Caché deshabilitada: Sí
Throttling: No throttling

### Métricas antes de la optimización

Solicitudes: [cantidad]
Transferencia total: [valor y unidad]
Recursos totales: [valor y unidad]
Tamaño de main.css: [bytes]

![Network antes](capturas/03-network-antes.png)

### Métricas después de la optimización

Solicitudes: [cantidad]
Transferencia total: [valor y unidad]
Recursos totales: [valor y unidad]
Tamaño de main.css: [bytes]

![Network después](capturas/04-network-despues.png)

---

## 3. Optimización aplicada

### Situación inicial

La aplicación importaba Bootstrap completo
mediante su archivo principal Sass.

### Cambio realizado

Se sustituyó la importación completa
por importaciones selectivas de los
componentes utilizados por la aplicación.

Archivo modificado:
buscador-js/scss/main.scss

### Comparación

CSS anterior: [valor en bytes]
CSS posterior: [valor en bytes]

Reducción porcentual: [valor] %

### Resultado

[Explicar los resultados reales y las
funcionalidades verificadas después del cambio]

### Conclusión

[Indicar qué mejoró, qué no cambió
y qué limitaciones tiene la medición]