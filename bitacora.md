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


## Diagramas de `eliminar(condicion)`

### Caso 1: Eliminar la cabeza (`anterior === null`, `actual === this.cabeza`)

- **Lógica:** `this.cabeza` salta al segundo nodo (`this.cabeza.siguiente`). Si era el único nodo de la lista (`this.cabeza === null` tras moverla), también debemos poner `this.cola = null`.
Plaintext

```
Antes:   cabeza ─► [ A ] ───► [ B ] ───► [ C ] ◄─ cola

Después:           [ A ]      cabeza ─► [ B ] ───► [ C ] ◄─ cola
                 (eliminado)
```

### Caso 2: Eliminar un nodo intermedio (`anterior = [A]`, `actual = [B]`)

- **Lógica:** `anterior.siguiente` apunta directamente a `actual.siguiente` (`[C]`), saltándose `[B]`. Ni `cabeza` ni `cola` cambian.
Plaintext

```
Antes:   cabeza ─► [ A ] ───► [ B ] ───► [ C ] ◄─ cola
                  anterior   actual

                     ┌───────────────────┐
                     │                   ▼
Después: cabeza ─► [ A ]      [ B ]    [ C ] ◄─ cola
                            (eliminado)
```

### Caso 3: Eliminar la cola (`anterior = [B]`, `actual = [C] === this.cola`)

- **Lógica:** `anterior.siguiente` pasa a ser `null` (nuevo final de la lista) y `this.cola` retrocede hacia `anterior` (`[B]`).
Plaintext

```
Antes:   cabeza ─► [ A ] ───► [ B ] ───► [ C ] ◄─ cola
                             anterior   actual

Después: cabeza ─► [ A ] ───► [ B ] ──► null      [ C ]
                                ▲               (eliminado)
                       cola ────┘
```


## Complejidades y explicación

| **Operación** | **Complejidad Temporal** | **Complejidad Espacial** | **Justificación** |
|---|---|---|---|
| **`agregarAlInicio(dato)`** | **$O(1)$** | **$O(1)$** | Usa la referencia directa `this.cabeza` sin recorrer nodos. |
| **`agregarAlFinal(dato)`** | **$O(1)$** | **$O(1)$** | Usa la referencia directa `this.cola` sin recorrer nodos. |
| **`buscar(condicion)`** | **$O(n)$** | **$O(1)$** | En el peor caso (el elemento está al final o no existe) debe visitar los $n$ nodos secuencialmente. |
| **`insertarDespuesDe(condicion, dato)`** | **$O(n)$** | **$O(1)$** | El enlace de punteros toma $O(1)$, pero primero debe buscar el nodo objetivo recorriendo hasta $n$ elementos ($O(n)$). |
| **`eliminar(condicion)`** | **$O(n)$** | **$O(1)$** | Incluso si el objetivo es la cola conocida (`this.cola`), necesita recorrer desde `this.cabeza` para encontrar el nodo **anterior**. |

### ¿Por qué eliminar la cola en una lista simplemente enlazada requiere recorrerla ($O(n)$)?

> **Explicación:** Aunque tengamos un puntero directo `this.cola` apuntando al último nodo (`[C]`), al eliminarlo debemos actualizar `this.cola` para que apunte al **penúltimo nodo** (`[B]`) y cambiar `B.siguiente = null`.
>
> En una lista **simplemente enlazada**, cada nodo únicamente almacena una referencia hacia adelante (`.siguiente`), pero **no tiene ninguna referencia hacia atrás (`.anterior`)**. Desde `[C]` es imposible saber qué dirección de memoria ocupa `[B]`. Por lo tanto, la única manera de descubrir quién es el penúltimo nodo es comenzar desde `this.cabeza` y avanzar paso a paso con dos punteros (`anterior` y `actual`) hasta que `actual === this.cola`, lo que obliga a recorrer los $n$ nodos ($O(n)$). *(Nota: Este problema es precisamente la razón por la cual existen las **Listas Doblemente Enlazadas**, donde cada nodo guarda `.siguiente` y `.anterior`, logrando eliminar la cola en $O(1)$).*

### Tabla Comparativa

| **Operación** | **ListaEnlazada (con cabeza y cola)** | **Arreglo (Array en JS)** | **Explicación Técnica** |
|---|---|---|---|
| **Agregar al final** | **$O(1)$** | **$O(1)$** *(amortizado)* | La lista usa `this.cola.siguiente = nuevo` sin recorrer. El arreglo usa `.push()` al final de su bloque de memoria. |
| **Agregar al inicio** | **$O(1)$** | **$O(n)$** | La lista solo cambia `nuevo.siguiente = this.cabeza` en 2 pasos. El arreglo (`.unshift()`) debe desplazar todos los $n$ elementos una posición a la derecha. |
| **Acceder a la atención número $k$** | **$O(n)$** *(o $O(k)$)* | **$O(1)$** | El arreglo calcula la dirección exacta de memoria (`arr[k - 1]`) al instante. La lista debe caminar nodo por nodo desde `cabeza` contando hasta $k$. |
| **Buscar (por condición)** | **$O(n)$** | **$O(n)$** | Sin ordenamiento previo ni índice hash, ambas estructuras deben revisar elemento por elemento hasta encontrar coincidencia o llegar al final. |
| **Eliminar la primera** | **$O(1)$** | **$O(n)$** | La lista mueve `this.cabeza = this.cabeza.siguiente` en 1 paso. El arreglo (`.shift()`) debe mover los $n - 1$ elementos restantes hacia la izquierda para tapar el hueco. |











