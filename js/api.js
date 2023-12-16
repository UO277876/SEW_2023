"use strict";

class Api{
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        document.addEventListener("DOMContentLoaded", this.comprobarApiFile.bind(this));  

        // La imagen que se va a manejar como atributo de la clase para facilitar su implementación
        this.imagen = null;
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización";
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible";
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado";
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido";
            break;
        }
    }

    comprobarApiFile(){
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            //El navegador soporta el API File
            $("<p>Este navegador soporta el API File </p>").appendTo("section:nth-child(2)");
        } else {
            $("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>")
                .appendTo("section:nth-child(2)");
        }
    }

    /**
     * Pone en pantalla completa el vídeo principal
     */
    abrirPantallaCompleta(){
        var elem = document.querySelector("video");

        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } 
    }

    /**
     * Procesa la imagen recibidas como parámetro
     */
    readInput(files){
        // Si dejo la comprobación como atributo accept=".jpg,.png" no me funciona
        var archivo = files[0];
        var partesArchivo = archivo.name.split(".")

        if(partesArchivo[1] == "png" || partesArchivo[1] == "jpg"){
            var lector = new FileReader();
            lector.readAsDataURL(archivo);
            
            lector.onloadend = function (event) {
                this.loadImage(lector.result);
            }.bind(this);         
    
        } else {
            alert("Archivo no válido");
        }
    }

    /**
     * Para cargar la imagen en la clase
     * 
     * @param {*} result 
     */
    loadImage(result){
        this.imagen = document.createElement("img");
        // Se añaden el src y el titulo de la imagen
		this.imagen.src = result;
		this.imagen.alt = document.querySelector("#titulo").value;
    }

    /**
     * Añade una nueva canción a la lista con la información que se ha rellenado
     */
    addInformation(){
        var titulo = $("#titulo").val();
		var genero = $("#genero").val();
        var autor = $("#autor").val();

        if(titulo != "" && genero != "" && autor != "" && this.imagen != null){
            var stringDatos = "<article>";
            stringDatos += "<h3>" + titulo + "</h3>";
            stringDatos += "<p>Género: " + genero + "</p>";
            stringDatos += "<p>Autor: " + autor + "<p>";
            stringDatos += "</article>"
    
            $(stringDatos).appendTo($("section:nth-child(3)").last());
            $(this.imagen).appendTo($("article").last());

            // Se añaden las coordenadas desde donde se subió el archivo
            stringDatos = "<p>Subido desde las coordenadas (" + this.latitud + "," + this.longitud + ")</p>";
            $(stringDatos).appendTo($("article").last());
        } else {
            alert("Falta algún campo por rellenar");
        }
    }


}

var api = new Api();