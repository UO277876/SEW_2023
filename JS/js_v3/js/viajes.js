"use strict";
class Viajes {
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));

        // Si no se ejecuta de esta manera no se carga por compelto el documento,
        // entonces no encuentra la section
        document.addEventListener("DOMContentLoaded", this.comprobarApiFile.bind(this));        
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
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom ="&zoom=15"
        var tam= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
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
                    stringDatos += "<ul><li> Tipo: " + tipo + "</li>";
                    stringDatos += "<li> Medio de transporte: " + medio_transporte + "</li>";
                    stringDatos += "<li> Duración: " + duracion + "</li>";
                    stringDatos += "<li> Agencia: " + agencia + "</li>";
                    stringDatos += "<li> Descripción: " + descripcion + "</li>";
                    stringDatos += "<li> Inicio: " + lugar_inicio + ", " + direcc_inicio + "</li>";
                    stringDatos += "<li> Recomendación: " + recomendacion + "</li>";
                    stringDatos += "<li> Coordenadas: " + latitud + "," + longitud + "," + altitud + "</li></ul>";

                    stringDatos += "<h3>Bibliografía</h3>";
                    $.each($("referencia",ruta), function(i,referencia ){
                        stringDatos += "<p>" + referencia.innerHTML + "</p>";
                        //var referencia = (referencia.innerHTML).split(":");
                        //stringDatos += "<p>" + referencia[0] + ": <a href='" + referencia[1] + "'>" + referencia[1] + "</a></p>";
                    });

                    // HITOS
                    stringDatos += "<h3>Hitos</h3>";

                    $.each($("hito",ruta), function(i,hito){
                        var nombre_hito = $('hnombre',hito).text();
                        var descripcion_hito = $('hdescripcion',hito).text();
                        var lat_hito = $('latitud',hito).text();
                        var long_hito = $('longitud',hito).text();
                        var alt_hito = $('altitud',hito).text();
                        var distancia = $('distancia',hito).text();
                        var unidades = $('distancia',hito).attr("unidades");

                        stringDatos += "<h4>" + nombre_hito + "</h4>";
                        stringDatos += "<ul><li> Descripción del hito: " + descripcion_hito + "</li>";
                        stringDatos += "<li> Coordenadas: " + lat_hito + "," + long_hito + "," + alt_hito + "</li>";
                        stringDatos += "<li> Distancia: " + distancia + " " + unidades + "</li></ul>";

                        $.each($("fotografia",hito), function(i,foto){
                            stringDatos += "<img" + "src=./xml/" + foto + "alt=foto ruta" + i + "/>";
                        });

                    });

                    stringDatos += "</article>"
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
        
        var map = new mapboxgl.Map({
            container: 'kml', // container ID
            center: [-89.191428, 13.698964], // Coordenadas de El Salvador
            zoom: 9, // starting zoom
        });

        var viajes = this;

        for(let i=0; i < files.length; i++){
            var archivo = files[i];
    
            var lector = new FileReader();
        
            lector.onload = function (event) {
                var kml = event.target.result;
                var listCoordinates = $("coordinates", kml);   
                listCoordinates = listCoordinates[0].innerHTML.split("\n");   

                var rute =[];

                // Se empieza en 1 porque el primer elemento es "" y el ultimo tambien (por eso .length - 1)
                for(let j=1; j < listCoordinates.length - 1; j++){
                    var coordinates = listCoordinates[j].split(",");
                    var long = coordinates[0];
                    var lat = coordinates[1];

                    rute.push([long,lat]);
                        
                    //viajes.añadirMarcador(map,long,lat,colorLinea);    
                }

                viajes.addRuta(rute,map,i);
            };  
            
            lector.readAsText(archivo);
        }     
    }


    addRuta(rute,map,i){
        map.on('load', () => {
            map.addSource('route' + i, {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': rute
                    }
                }
            });


            map.addLayer({
                'id': 'route' + i,
                'type': 'line',
                'source': 'route' + i,
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#FF0',
                    'line-width': 7
                }
            });
        });
    }

    /**
     * Se encarga de realizar la lectura de los ficheros svg
     */
    readInputSVG(files){
        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yNzc4NzYiLCJhIjoiY2xwcTVhZjR6MWRqdDJtdDN6YWxyYjcyZCJ9.KedYvGNNAfrOhXpkQKjFZQ';
        
        var map = new mapboxgl.Map({
            container: 'svg', // container ID
            center: [-89.191428, 13.698964], // Coordenadas de El Salvador
            zoom: 8, // starting zoom
        });

        var viajes = this;

        for(let i=0; i < files.length; i++){
            var archivo = files[i];
    
            var lector = new FileReader();
        
            lector.onload = function (event) {
                var svg = lector.result;
                
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
    añadirMarcador(map,long,lat,colorLinea){
        new mapboxgl.Marker({color: colorLinea})
        .setLngLat([long,lat])
        .addTo(map);
    }

    comprobarApiFile(){
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            //El navegador soporta el API File
            $("<p>Este navegador soporta el API File </p>").appendTo("section:nth-child(3)");
        } else {
            $("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>")
                .appendTo("section:nth-child(3)");
        }
    }

}

var viajes = new Viajes();