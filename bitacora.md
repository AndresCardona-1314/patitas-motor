# Diagrama de nodos y flechas

```text
cabeza
  │
  ▼
┌──────────────────────────────────────┐
│ nodo1                                │
│ dato:                                │
│   fecha: "02/02"                     │
│   motivo: "Vacunación"               │
│   veterinario: "Dra. Ríos"           │
│   costo: 85000                       │
├──────────────────────────────────────┤
│ siguiente ───────────────────────────┼─────┐
└──────────────────────────────────────┘     │
                                             ▼
┌──────────────────────────────────────┐
│ nodo2                                │
│ dato:                                │
│   fecha: "15/03"                     │
│   motivo: "control de peso"          │
│   veterinario: "Dr. Gómez"           │
│   costo: 40000                       │
├──────────────────────────────────────┤
│ siguiente ───────────────────────────┼─────┐
└──────────────────────────────────────┘     │
                                             ▼
┌──────────────────────────────────────┐
│ nodo3                                │
│ dato:                                │
│   fecha: "20/05"                     │
│   motivo: "limpieza dental"          │
│   veterinario: "Dra. Ríos"           │
│   costo: 150000                      │
├──────────────────────────────────────┤
│ siguiente: null                      │
└──────────────────────────────────────┘
```


## Explicación de la pérdida de enlace

Al asignar `nodo1.siguiente = null`, el recorrido desde `cabeza` **solo logra visitar el primer nodo (`Vacunación`) y se detiene prematuramente**, ignorando por completo `Control de peso` y `Limpieza dental`.

**Por qué sucede:** A diferencia de un arreglo donde los elementos están contiguos en memoria y se accede por índice (`arr[1]`, `arr[2]`), en una lista enlazada **la única forma de llegar al nodo $k$ es atravesando la referencia `.siguiente` del nodo $k-1$**. Al sobrescribir `nodo1.siguiente` con `null`, destruimos el único puente que conectaba la cabeza con el resto de la cadena. Si además no existieran variables externas apuntando a `nodo2` y `nodo3`, esos nodos quedarían **huérfanos en memoria** (*unreachable*) y el recolector de basura (*Garbage Collector*) de JavaScript los eliminaría definitivamente.





