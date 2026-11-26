const Nodo = require('./Nodo');

class ListaEnlazada {
    constructor(){
        this.cabeza = null;
        this.cola = null;
        this.tamanio = 0;
    }
}

estaVacia() {
    return this.tamanio === 0;
}

obtenerTamanio() {
    return this.tamanio;
}