"use strict";

class Agenda{

    /**
     * last_api_call - Almacena el momento temporal de la última petición a la API
     * last_api_result - Almacena el momento temporal de la última respuesta de la API
     * @param {*} url La URL del sitio para consultar la información de las carreras
     */
    constructor(url){
        this.url = url;
        this.last_api_call = null;
        this.last_api_result = null;
    }
}