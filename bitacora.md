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



## Diagramas de referencias



### A. `agregarAlFinal(nuevo)`

- **Caso 1: Lista vacía (`cabeza === null`, `cola === null`, `tamanio === 0`)**

  - **Cambio:** Tanto `cabeza` como `cola` pasan a apuntar al `nuevo` nodo.

  ```text
  Antes:  cabeza ─► null     cola ─► null

  Después: cabeza ──┐
                    ▼
                 [ nuevo ] ──► null
                    ▲
           cola ────┘
  ```

- **Caso 2: Lista con 1 nodo (`cabeza === cola === [A]`)**

  - **Cambio:** `cola.siguiente` (que es `[A].siguiente`) apunta a `nuevo`, y luego `cola` se mueve a `nuevo`. `cabeza` no cambia.

  ```text
  Antes:   cabeza ─► [ A ] ◄─ cola

  Después: cabeza ─► [ A ] ───► [ nuevo ] ──► null
                                    ▲
                           cola ────┘
  ```

- **Caso 3: Lista con varios nodos (`cabeza ─► [A] ─► [B] ◄─ cola`)**

  - **Cambio:** `cola.siguiente` (`[B].siguiente`) se enlaza a `nuevo`, y `cola` avanza hacia `nuevo`. `cabeza` y `[A]` permanecen intactos.

  ```text
  Antes:   cabeza ─► [ A ] ───► [ B ] ◄─ cola

  Después: cabeza ─► [ A ] ───► [ B ] ───► [ nuevo ] ──► null
                                               ▲
                                      cola ────┘
  ```

### B. `agregarAlInicio(nuevo)`

- **Caso 4: Lista vacía (`cabeza === null`, `cola === null`, `tamanio === 0`)**

  - **Cambio:** Igual que al final: `cabeza` y `cola` pasan a apuntar a `nuevo`.

  ```text
  Antes:  cabeza ─► null     cola ─► null

  Después: cabeza ──┐
                    ▼
                 [ nuevo ] ──► null
                    ▲
           cola ────┘
  ```

- **Caso 5: Lista con 1 nodo (`cabeza === cola === [A]`)**

  - **Cambio:** `nuevo.siguiente` apunta a la actual `cabeza` (`[A]`), y luego `cabeza` retrocede hacia `nuevo`. `cola` se queda en `[A]`.

  ```text
  Antes:   cabeza ─► [ A ] ◄─ cola

  Después: cabeza ─► [ nuevo ] ───► [ A ] ──► null
                                       ▲
                              cola ────┘
  ```

- **Caso 6: Lista con varios nodos (`cabeza ─► [A] ─► [B] ◄─ cola`)**

  - **Cambio:** `nuevo.siguiente` apunta a `cabeza` (`[A]`), y `cabeza` se actualiza a `nuevo`. `cola` sigue apuntando a `[B]`.

  ```text
  Antes:   cabeza ─► [ A ] ───► [ B ] ◄─ cola

  Después: cabeza ─► [ nuevo ] ───► [ A ] ───► [ B ] ──► null
                                                  ▲
                                         cola ────┘
  ```
