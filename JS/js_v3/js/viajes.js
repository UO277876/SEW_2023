"use strict";
class Viajes {
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
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

    getMapaEstaticoGoogle(){
        var ubicacion = document.getElementById("estatico");
        
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        //URL: obligatoriamente https
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        //Parámetros
        // centro del mapa (obligatorio si no hay marcadores)
        var centro = "center=" + this.latitud + "," + this.longitud;
        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom ="&zoom=15";
        //Tamaño del mapa en pixeles (obligatorio)
        var tam= "&size=800x600";
        //Escala (opcional)
        //Formato (opcional): PNG,JPEG,GIF
        //Tipo de mapa (opcional)
        //Idioma (opcional)
        //region (opcional)
        //marcadores (opcional)
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        //rutas. path (opcional)
        //visible (optional)
        //style (opcional)
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tam + marcador + sensor + apiKey;
        ubicacion.innerHTML = "<img src='"+this.imagenMapa+"' alt='mapa estático google' />";
    }

    initMap() {
        // Es la api_key publica de Mapbox
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yNzc4NzYiLCJhIjoiY2xwcTVhZjR6MWRqdDJtdDN6YWxyYjcyZCJ9.KedYvGNNAfrOhXpkQKjFZQ';
        var lat = this.latitud;
        var long = this.longitud;
        
        var map = new mapboxgl.Map({
            container: 'dinamico', // container ID
            center: [long, lat], // starting position [lng, lat]
            zoom: 13, // starting zoom
        });

        // Para añadir un marcador a la posicion del usuario
        const marker = new mapboxgl.Marker()
        .setLngLat([long,lat])
        .addTo(map);
    }
    
    
    /**
     * Se encarga de realizar la lectura de un fichero xml
     */
    readInputXML(files){
        var archivo = files[0];

        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) {
            var lector = new FileReader();

            lector.onload = function (event) {      
                $.each($("ruta",lector.result), function(i,ruta ) {
                    //Extracción de los datos contenidos en el XML
                    var nombre_ruta = $('nombre',ruta).text();
                    var tipo =  $('tipoRuta',ruta).text();
                    var medio_transporte = $('mtransporte',ruta).text();

                    var duracion = $('duracion',ruta).text();
                    duracion = duracion.replace("PT","");

                    var agencia = $('agencia',ruta).text();
                    var descripcion = $('descripcion',ruta).text();

                    var lugar_inicio = $('linicio',ruta).text();
                    var direcc_inicio = $('dinicio',ruta).text();

                    var latitud = $('latitud',ruta).first().text();
                    var longitud = $('longitud',ruta).first().text();
                    var altitud = $('altitud',ruta).first().text();

                    var recomendacion = $('recomendacion',ruta).text();           
                            
                    // Colocar los datos del XML en el HTML
                    var stringDatos = "<article>";
                    stringDatos += "<h3>" + nombre_ruta + "</h3>";
                    stringDatos += "<ul><li> Nombre de la ruta: " + nombre_ruta + "</li>";
                    stringDatos += "<li> Tipo: " + tipo + "</li>";
                    stringDatos += "<li> Medio de transporte: " + medio_transporte + "</li>";
                    stringDatos += "<li> Duración: " + duracion + "</li>";
                    stringDatos += "<li> Agencia: " + agencia + "</li>";
                    stringDatos += "<li> Descripción: " + descripcion + "</li>";
                    stringDatos += "<li> Inicio: " + lugar_inicio + ", " + direcc_inicio + "</li>";
                    stringDatos += "<li> Recomendación: " + recomendacion + "</li>";
                    stringDatos += "<li> Coordenadas: " + latitud + "," + longitud + "," + altitud + "</li></ul>";

                    stringDatos += "<h3> Bibliografía</h3>";
                    /*
                    $.each($("referencia",ruta), function(i,referencia ){
                        stringDatos += "<p> Referencia" + (i+1) + ": " + referencia.text() + "</p>";
                    });
                    */

                    // HITOS

                    
        
                    $(stringDatos).appendTo($("section:nth-child(3)"));  
                });
            };     

            lector.readAsText(archivo);
        } else {
            $("Error : ¡¡¡ Archivo XML no válido !!!").appendTo($("section:nth-child(3)"));  
        }     
    }

    /**
     * Se encarga de realizar la lectura de los ficheros kml
     */
    readInputKML(files){
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yNzc4NzYiLCJhIjoiY2xwcTVhZjR6MWRqdDJtdDN6YWxyYjcyZCJ9.KedYvGNNAfrOhXpkQKjFZQ';
        var auxLat = this.latitud;
        var auxLong = this.longitud;
        
        var map = new mapboxgl.Map({
            container: 'kml', // container ID
            center: [auxLong, auxLat], // starting position [lng, lat]
            zoom: 13, // starting zoom
        });

        var viajes = this;

        for(let i=0; i < files.length; i++){
            var archivo = files[i];
    
            var lector = new FileReader();
        
            lector.onload = function (event) {
                var kml = lector.result;
                var listCoordinates = $("coordinates", kml);   
                listCoordinates = listCoordinates[0].innerHTML.split("\n");   

                // Se empieza en 1 porque el primer elemento es "" y el ultimo tambien (por eso .length - 1)
                for(let j=1; j < listCoordinates.length - 1; j++){
                    var coordinates = listCoordinates[j].split(",");
                    var long = coordinates[0];
                    var lat = coordinates[1];
                        
                    viajes.añadirMarcador(map,long,lat);    
                }
            };     
        
            lector.readAsText(archivo);
        }     
    }

    /**
     * Añade un marcador en la longitud y latitud pasadas como parametro
     * 
     * @param {} map el mapa al que se añaden los marcadores
     * @param {*} long coordenada x
     * @param {*} lat coordenada y
     */
    añadirMarcador(map,long,lat){
        var marker = new mapboxgl.Marker()
        .setLngLat([long,lat])
        .addTo(map);
    }

}

var viajes = new Viajes();