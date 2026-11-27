# Patitas Motor

Proyecto de ejemplo para gestionar historiales clínicos de pacientes de una clínica veterinaria. Registra las atenciones de cada mascota y genera un reporte en consola con su historial, la última vacunación registrada y el costo total acumulado.

## Requisitos

- Node.js instalado.
- No se requieren dependencias externas.

## Cómo ejecutarlo

Desde la raíz del proyecto, ejecuta:

```bash
node src/reporte.js
```

El programa carga datos de ejemplo y muestra un reporte para cada paciente en la terminal.

Para ejecutar los scripts de demostración de las estructuras:

```bash
node pruebas/listas.js
node pruebas/nodos.js
```

## Estructuras de datos

- **Lista simplemente enlazada (`ListaEnlazada`)**: guarda las atenciones de cada paciente en orden. Mantiene referencias a la cabeza y la cola, además del tamaño de la lista. Permite agregar al inicio o al final, recorrer, buscar, insertar después de un elemento, eliminar por condición y convertir su contenido en un arreglo.
- **Nodo (`Nodo`)**: contiene un dato —en este proyecto, una atención clínica— y una referencia al siguiente nodo.
- **Mapa (`Map`)**: `RegistroClinico` almacena los pacientes usando el nombre normalizado (sin espacios al inicio o al final y en minúsculas) como clave. Cada paciente tiene su nombre y una lista enlazada con su historial.
- **Objetos de JavaScript**: representan las atenciones y contienen fecha, motivo, veterinario y costo.

## Archivos principales

```text
src/
  Nodo.js              # Nodo de la lista enlazada
  ListaEnlazada.js     # Implementación de la lista y sus operaciones
  RegistroClinico.js   # Registro de pacientes e historiales
  reporte.js           # Datos de ejemplo y reporte en consola
pruebas/
  nodos.js             # Demostración de enlaces entre nodos
  listas.js            # Ejercicios y comprobaciones de operaciones de la lista
bitacora.md            # Notas y análisis de las estructuras
```
