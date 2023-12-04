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

    /*
    initMap(){
        var centro = {lat: 43.3672702, lng: -5.8502461};
        var mapaGeoposicionado = new google.maps.Map(document.getElementById('dinamico'),{
            zoom: 8,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
            
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        
            infoWindow.setPosition(pos);
            infoWindow.setContent('Localización encontrada');
            infoWindow.open(mapaGeoposicionado);
            mapaGeoposicionado.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
        }
    }
        
    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                            'Error: Ha fallado la geolocalización' :
                            'Error: Su navegador no soporta geolocalizaciÃ³n');
        infoWindow.open(mapaGeoposicionado);
    }       

    getMapaDinamicoGoogle(){
        viajes.initMap = initMap();
    }
    */

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

            //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
            //La propiedad "result" es donde se almacena el contenido del archivo
            //Esta propiedad solamente es válida cuando se termina la operación de lectura
            lector.onload = function (event) {
                var areaVisualizacion = document.querySelector("p[data-type='xml']");
                areaVisualizacion.innerText = lector.result;

                $("input:first").attr("disabled", "disabled");
            };     

            lector.readAsText(archivo);
        } else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }     
    }

    /**
     * Se encarga de realizar la lectura de los ficheros kml
     */
        readInputKML(files){
            for(let i=0; i < files.length; i++){
                var archivo = files[i];
    
                var tipoTexto = /text.*/;
                if (archivo.type.match(tipoTexto)) {
                    var lector = new FileReader();
        
                    //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
                    //La propiedad "result" es donde se almacena el contenido del archivo
                    //Esta propiedad solamente es válida cuando se termina la operación de lectura
                    lector.onload = function (event) {
                        
                    };     
        
                    lector.readAsText(archivo);
                } else {
                    errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
                }
            }     
        }

}

var viajes = new Viajes();