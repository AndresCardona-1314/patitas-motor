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

    buscar(condicion){
        let actual = this.cabeza;

        while (actual !== null){
            if (condicion(actual.dato)){
                return actual.dato;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    insertarDespuesDe(condicion, dato){
        let actual = this.cabeza;

        while (actual !== null){
            if (condicion(actual.dato)){
                const nuevo = new Nodo(dato);

                nuevo.siguiente = actual.siguiente;

                actual.siguiente = nuevo;

                if (actual === this.cola){
                    this.cola = nuevo;
                }

                this.tamanio++;
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    eliminar(condicion){
        if (this.estaVacia()) return null;

        let actual = this.cabeza;
        let anterior = null;

        while (actual !== null){
            if (condicion(actual.dato)){
                if (anterior === null){
                    this.cabeza = actual.siguiente;

                    if (this.cabeza === null){
                        this.cola = null;
                    }
                }
                else{
                    anterior.siguiente = actual.siguiente;

                    if(actual === this.cola){
                        this.cola = anterior;
                    }
                }

                this.tamanio--;
                return actual.dato;

            }
            anterior = actual;
            actual = actual.siguiente;
        }
        return null;
    }




}


module.exports = ListaEnlazada;
