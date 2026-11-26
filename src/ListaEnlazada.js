const Nodo = require('./Nodo');

class ListaEnlazada {
    constructor(){
        this.cabeza = null;
        this.cola = null;
        this.tamanio = 0;
    }

    estaVacia() {
    return this.tamanio === 0;
}

    obtenerTamanio() {
        return this.tamanio;
    }

    agregarAlFinal(dato){
        const nuevo = new Nodo(dato);

        if (this.estaVacia()){
            this.cabeza = nuevo;
            this.cola = nuevo;
        }
        else{
            this.cola.siguiente = nuevo;
            this.cola = nuevo;
        }

        this.tamanio++;
        return this;
    }


    agregarAlInicio(dato){
        const nuevo = new Nodo(dato);

        if (this.estaVacia()){
            this.cabeza = nuevo;
            this.cola = nuevo;
        }
        else{
            nuevo.siguiente = this.cabeza;
            this.cabeza = nuevo;
        }

        this.tamanio++;
        return this;
    }

    recorrer(callback){
        let actual = this.cabeza;
        let indice = 0;

        while (actual !== null){
            callback(actual.dato, indice);
            actual = actual.siguiente;
            indice++;
        }
    }

    Arreglo() {
        const resultado = [];
        this.recorrer((dato) => resultado.push(dato));
        return resultado;
    }




}


module.exports = ListaEnlazada;
