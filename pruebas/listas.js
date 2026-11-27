const ListaEnlazada = require("../src/ListaEnlazada");

function verificarEstado(lista, paso, esperadoCabeza, esperadoCola, esperadoTamanio){
    const cabezaActual = lista.cabeza ? lista.cabeza.dato.motivo : null;
    const colaActual = lista.cola ? lista.cola.dato.motivo : null;
    const tamanioActual = lista.obtenerTamanio();

    console.log(`\n[${paso}]`);
    console.log(`cabeza: ${cabezaActual}`);
    console.log(`cola: ${colaActual}`);
    console.log(`tamanio: ${tamanioActual} | estaVacia: ${lista.estaVacia()}`);
    console.log(`orden: `, lista.Arreglo().map((a)=> a.motivo));

    console.assert(cabezaActual === esperadoCabeza, `Error en cabeza: esperado ${esperadoCabeza}, obtenido ${cabezaActual}`);
    console.assert(colaActual === esperadoCola, `Error en cola: esperado ${esperadoCola}, obtenido ${colaActual}`);
    console.assert(tamanioActual === esperadoTamanio, `Error en tamanio: esperado ${esperadoTamanio}, obtenido ${tamanioActual}`);
}

const atencion1 = { fecha: "02/02", motivo: "Vacunación", veterinario: "Dra. Ríos", costo: 85000 };
const atencion2 = { fecha: "15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000 };
const atencion3 = { fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000 };

// ============================================================================
// BLOQUE A: Pruebas de agregarAlFinal (Casos 1, 2 y 3)
// ============================================================================
console.log("=== PRUEBAS agregarAlFinal ===");
const listaFinal = new ListaEnlazada();
verificarEstado(listaFinal, "Estado inicial vacío", null, null, 0);

// Caso 1: Agregar al final de lista vacía
listaFinal.agregarAlFinal(atencion1);
verificarEstado(listaFinal, "Caso 1: agregarAlFinal en lista vacía", "Vacunación", "Vacunación", 1);

// Caso 2: Agregar al final de lista con 1 nodo
listaFinal.agregarAlFinal(atencion2);
verificarEstado(listaFinal, "Caso 2: agregarAlFinal con 1 nodo", "Vacunación", "Control de peso", 2);

// Caso 3: Agregar al final de lista con varios nodos
listaFinal.agregarAlFinal(atencion3);
verificarEstado(listaFinal, "Caso 3: agregarAlFinal con varios nodos", "Vacunación", "Limpieza dental", 3);

// ============================================================================
// BLOQUE B: Pruebas de agregarAlInicio (Casos 4, 5 y 6)
// ============================================================================
console.log("\n=== PRUEBAS agregarAlInicio ===");
const listaInicio = new ListaEnlazada();

// Caso 4: Agregar al inicio de lista vacía
listaInicio.agregarAlInicio(atencion1);
verificarEstado(listaInicio, "Caso 4: agregarAlInicio en lista vacía", "Vacunación", "Vacunación", 1);

// Caso 5: Agregar al inicio de lista con 1 nodo
listaInicio.agregarAlInicio(atencion2);
verificarEstado(listaInicio, "Caso 5: agregarAlInicio con 1 nodo", "Control de peso", "Vacunación", 2);

// Caso 6: Agregar al inicio de lista con varios nodos
listaInicio.agregarAlInicio(atencion3);
verificarEstado(listaInicio, "Caso 6: agregarAlInicio con varios nodos", "Limpieza dental", "Vacunación", 3);

// ============================================================================
// PRUEBA EXTRA: Método recorrer(callback)
// ============================================================================
console.log("\n=== RECORRIDO CON CALLBACK ===");
listaFinal.recorrer((atencion, idx) => {
    console.log(`${idx + 1}. [${atencion.fecha}] ${atencion.motivo} - $${atencion.costo.toLocaleString("es-CO")}`);
});

// ============================================================================
// Pruebas de buscar, insertarDespuesDe y eliminar (Casos Borde)
// ============================================================================


console.log(`\n=== PRUEBAS DE BÚSQUEDA, INSERCIÓN INTERMEDIA Y ELIMINACIÓN ===`);

const atencion4 = {fecha: "10/06", motivo: "Desparasitación", veterinario: "Dr. Gómez", costo: 35000};

// 1. Eliminar en una lista vacía
const listaVacia = new ListaEnlazada();
const resVacia = listaVacia.eliminar((a) => a.motivo === "Vacunación");
console.assert(resVacia === null, "Error: debería devolver null en lista vacía");
verificarEstado(listaVacia, "Border 1: Eliminar en lista vacía", null, null, 0);


// 2. Eliminar el único nodo de la lista
const listaUnica = new ListaEnlazada();
listaUnica.agregarAlFinal(atencion1);
const resUnica = listaUnica.eliminar((a) => a.motivo === "Vacunación");
console.assert(resUnica.motivo === "Vacunación", "Error: debió devolver el dato eliminado");
verificarEstado(listaUnica, "Border 2: Eliminar el único nodo", null, null, 0);

const listaBordes = new ListaEnlazada();
listaBordes.agregarAlFinal(atencion1).agregarAlFinal(atencion2).agregarAlFinal(atencion3);


// Pruebas de buscar

const encontrada = listaBordes.buscar((a) => a.veterinario === "Dr. Gómez");
const noEncontrada = listaBordes.buscar((a) => a.costo > 500000);
console.log("\nBúsqueda exitosa (Dr. Gómez):", encontrada);
console.log("\nBúsqueda sin resultados (costo > $500.000):", noEncontrada);

console.assert(encontrada?.motivo == "Control de peso", "Error en buscar existente");
console.assert(noEncontrada === null, "Error en buscar inexistentes");


// 3. Insertar después de la cola

const inserto = listaBordes.insertarDespuesDe((a) => a.motivo === "Limpieza dental", atencion4);
console.assert(inserto === true, `Error: debió insertar después de la cola`);
verificarEstado(listaBordes, "Borde 3: Insertar después de la cola", "Vacunación", "Desparasitación", 4)


// 4. Eliminar algo que no existe

const resInexistente = listaBordes.eliminar((a) => a.motivo === "cirugía");
console.log("\nDato Inexistente: ", resInexistente);
console.assert(resInexistente === null, "Error: debió de devolver null al no exitir");
verificarEstado(listaBordes, "Borde 4: Eliminar elemento inexistente", "Vacunación", "Desparasitación", 4);


// 5. Eliminar la cabeza

const resCabeza = listaBordes.eliminar((a => a.motivo === "Vacunación"));
console.assert(resCabeza.motivo === "Vacunación", "Error al eliminar cabeza");
verificarEstado(listaBordes, "Borde 5: Eliminar la cabeza", "Control de peso", "Desparasitación", 3);


// 6. Eliminar la cola

const resCola = listaBordes.eliminar((a) => a.motivo === "Desparasitación");
console.assert(resCola.motivo === "Desparasitación", "Error al eliminar cola");
verificarEstado(listaBordes, "Borde 6: Eliminar la cola", "Control de peso", "Limpieza dental", 2);


