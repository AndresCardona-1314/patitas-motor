const ListaEnlazada = require('./ListaEnlazada');

class RegistroClinico {
    constructor(){
        this.pacientes = new Map();
    }

    registrarAtencion(mascota, atencion){
        const clave = mascota.trim().toLowerCase();

        if (!this.pacientes.has(clave)){
            this.pacientes.set(clave, {
                nombre: mascota.trim(),
                historial: new ListaEnlazada()
            });
        }

        const paciente = this.pacientes.get(clave);
        paciente.historial.agregarAlFinal(atencion);
        return this;
    }

    obtenerHistorial(mascota){
        const clave = mascota.trim().toLowerCase();
        const paciente = this.pacientes.get(clave);
        return paciente ? paciente.historial : null;
    }

    obtenerTodosLosPacientes(){
        return Array.from(this.pacientes.values());
    }


}

module.exports = RegistroClinico;