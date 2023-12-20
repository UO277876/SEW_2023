"use strict";
/**
 * El inspector me da un aviso respecto a los mapas debido a que para que me pase  el validador HTML
 * tuve que ponerle un h3 a los contenedores. El aviso es:
 * The map container element should be empty, otherwise the map's interactivity will 
 * be negatively impacted. If you want to display a message when WebGL is not supported, use the Mapbox GL Supported plugin instead
 */
class Viajes {
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));

        // Si no se ejecuta de esta manera no se carga por compelto el documento,
        // entonces no encuentra la section
        document.addEventListener("DOMContentLoaded", this.comprobarApiFile.bind(this));      
        
        // Para el carrusel de imagenes
        this.curSlide = 9;
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
        var ubicacion = document.querySelector("p[data-type='estatico']");
        
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
                    var stringDatos = "<article data-type='xml'>";
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
                    var index = 1;
                    $.each($("referencia",ruta), function(i,referencia){
                        stringDatos += "<p><a href=" + $(referencia).text() + "> Referencia " + index + "</a></p>";
                        index++;
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
                            var rutaFoto = $(foto).text();
                            
                            stringDatos += '<img src="../xml/multimedia/' + rutaFoto + '" alt="' + nombre_hito + '" />';
                        });

                        $.each($("video",hito), function(i,video){
                            var rutaVideo = $(video).text();
                            stringDatos += "<video src=../xml/multimedia/" + rutaVideo + " controls preload='auto'></video>";
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

    comprobarApiFile(){
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            //El navegador soporta el API File
            $("<p>Este navegador soporta el API File </p>").appendTo("section:nth-child(3)");
        } else {
            $("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>")
                .appendTo("section:nth-child(3)");
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
            zoom: 8, // starting zoom
        });

        var viajes = this;

        for(let i=0; i < files.length; i++){
            var archivo = files[i];
    
            var lector = new FileReader();
        
            lector.onload = function (event) {
                var kml = event.target.result;
                // Para coger todas las coordenadas
                var listCoordinates = $("coordinates", kml);   
                // Se dividen ls coordenadas en diferentes lineas
                listCoordinates = listCoordinates[0].innerHTML.split("\n");   

                // rute va a contener las coordenadas para pasarselas al json de mapbox
                var rute =[];

                // Se empieza en 1 porque el primer elemento es "" y el ultimo tambien (por eso .length - 1)
                // El bucle se hace ya que las coordenadas estan al reves (lat,long) y para añadirlas a rute
                for(let j=1; j < listCoordinates.length - 1; j++){
                    var coordinates = listCoordinates[j].split(",");
                    var long = coordinates[0];
                    var lat = coordinates[1];

                    rute.push([long,lat]);  
                }

                viajes.addRuta(rute,map,i);
            };  
            
            lector.readAsText(archivo);
        }     
    }

    /**
     * Crea una línea uniendo diferentes puntos (variable rute) en un mapa pasado como parámetro
     * La i es para cambiar el identificador de la ruta por el que sea correspondiente al llamar
     * al método
     */
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
        var viajes = this;

        for(let i=0; i < files.length; i++){
            var archivo = files[i];
    
            var lector = new FileReader();
        
            lector.onload = function (event) {
                var svg = event.target.result;
               
                viajes.printSVG(svg)
            };     
        
            lector.readAsText(archivo);

        }     
    }    

    /**
     * Imprime el svg pasado como parámetro en el HTML
     * @param {*} svg 
     */
    printSVG(svg){
        // Se quitan las dos líneas del svg en xml
        var lines = svg.split('\n').slice(2);
        var svgWithoutHeader = lines.join('\n');

        var stringDatos = "<svg>"
        stringDatos += svgWithoutHeader;
        stringDatos += "</svg>"
        $(stringDatos).appendTo($("section:nth-child(5)"));  
    }

    /**
     * Pasa la imagen del carrusel a la siguiente
     */
    nextSlide(){
        const slides = document.querySelectorAll("img");
        
        // maximum number of slides
        let maxSlide = slides.length - 1;
        

        if (this.curSlide === maxSlide) {
            this.curSlide = 0;
        } else {
            this.curSlide++;
        }
        
        //   move slide by -100%
        slides.forEach((slide, indx) => {
            var trans = 100 * (indx - this.curSlide);
            $(slide).css('transform', 'translateX(' + trans + '%)')
        });
    }

    /**
     * Pasa la imagen del carrusel a la anterior
     */
    prevSlide(){
        const slides = document.querySelectorAll("img");

        // maximum number of slides
        let maxSlide = slides.length - 1;

        if (this.curSlide === 0) {
            this.curSlide = maxSlide;
        } else {
            this.curSlide--;
        }
        //   move slide by 100%
        slides.forEach((slide, indx) => {
            var trans = 100 * (indx - this.curSlide);
            $(slide).css('transform', 'translateX(' + trans + '%)')
        });
    }

}

var viajes = new Viajes();