const RegistroClinico = require('./RegistroClinico');
const ListaEnlazada = require('./ListaEnlazada');

const registro = new RegistroClinico();
const formatearCOP = (valor) => `$${valor.toLocaleString("es-CO")}`;

const datosTabla = [
    {mascota: "Lola (gata)", fecha: "02/02", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000},
    {mascota: "Lola (gata)", fecha: "15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000},
    {mascota: "Lola (gata)", fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000},
    {mascota: "Toby (perro)", fecha: "10/01", motivo: "Consulta por cojera", veterinario: "Dr. Gómez", costo: 60000},
    {mascota: "Toby (perro)", fecha: "12/01", motivo: "Radiografía de pata", veterinario: "Dr. Gómez", costo: 120000},
    {mascota: "Toby (perro)", fecha: "05/04", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000},
    {mascota: "Mía (gata)", fecha: "18/02", motivo: "Esterilización", veterinario: "Dra. Ríos", costo: 280000},
    {mascota: "Mía (gata)", fecha: "25/02", motivo: "Control posquirúrgico", veterinario: "Dra. Ríos", costo: 0},
];

for (const fila of datosTabla){
    const {mascota, ...atencion} = fila;
    registro.registrarAtencion(mascota, atencion);
}

console.log("==========================================================");
console.log("   CLÍNICA VETERINARIA — REPORTE DE HISTORIALES CLÍNICOS");
console.log("==========================================================");


for (const {nombre, historial} of registro.obtenerTodosLosPacientes()){
    console.log(`\nPaciente: ${nombre}`);
    console.log(`Número de atenciones: ${historial.obtenerTamanio()}`);

    let costoTotal = 0;
    const historialRecientePrimero = new ListaEnlazada();

    historial.recorrer((atencion) => {
        costoTotal += atencion.costo;
        historialRecientePrimero.agregarAlInicio(atencion);

        console.log(
            `-[${atencion.fecha}] ${atencion.motivo} | Vet: ${atencion.veterinario} | ${formatearCOP(atencion.costo)}`
        );
    });

    const ultimaVacuna = historialRecientePrimero.buscar((a) =>
        a.motivo.toLowerCase().includes("vacunación")
    );

    const textoVacuna = ultimaVacuna
        ? `${ultimaVacuna.motivo} (${ultimaVacuna.fecha} - ${ultimaVacuna.veterinario})`
        : "Sin registro";

    
    console.log(`Última vacunación: ${textoVacuna}`);
    console.log(`Costo total acumulado: ${formatearCOP(costoTotal)}`);
    console.log("----------------------------------------------------------");    
    
   
}
