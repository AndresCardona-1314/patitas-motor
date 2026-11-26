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