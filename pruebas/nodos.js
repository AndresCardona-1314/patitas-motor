const Nodo = require('../src/Nodo');

const nodo1 = new Nodo({
    fecha: "02/02",
    motivo: "Vacunación",
    veterinario: "Dra. Ríos",
    costo: 85000

})

const nodo2 = new Nodo({
    fecha: "15/03",
    motivo: "Control de peso",
    veterinario: "Dr. Gómez",
    costo: 40000
})


const nodo3 = new Nodo({
    fecha: "20/05",
    motivo: "Limpieza dental",
    veterinario: "Dra. Ríos",
    costo: 150000
})

nodo1.siguiente = nodo2;
nodo2.siguiente = nodo3;
const cabeza = nodo1;

console.log("=== HISTORIAL MÉDICO DE LOLA (gata - 4 años) ===");
let actual = cabeza;


while(actual !== null){
    const {fecha, motivo, veterinario, costo} = actual.dato;
    console.log(`[${fecha}] ${motivo} - ${veterinario} - costo: $${costo.toLocaleString("es-CO")}`);
    actual = actual.siguiente;
}

let totalCosto = 0;
let punteroCosto = cabeza;

while (punteroCosto !== null){
    totalCosto += punteroCosto.dato.costo;
    punteroCosto = punteroCosto.siguiente;
}

console.log(`\nCosto total del historial: $${totalCosto.toLocaleString("es-CO")}`);

/* console.log("\n=== SIMULACIÓN: PERDIENDO EL ENLACE DEL PRIMER NODO ===");

nodo1.siguiente = null;

let recorridoRoto = cabeza;

while (recorridoRoto !== null){
    console.log("Atención encontrada; ", recorridoRoto.dato.motivo);
    recorridoRoto = recorridoRoto.siguiente;
}
 */
