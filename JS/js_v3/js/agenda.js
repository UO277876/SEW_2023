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

        this.datos = null;
        // Este atributo vigila las llamadas cada 10 minutos, evitando que el html se
        // actualice si no se ha obtenido una llamada de la api
        this.isReceived = true;
    }

    /**
     * Obtiene información de las carreras a traves de la API de Ergast
     * Devuelve la información si se ha podido realizar la petición o el propio
     * last_api_result si no se puede realizar porque no cumple el intervalo
     * de tiempo
     */
    getCarreras(){
        // Deben pasar 10 minutos entre llamadas
        var fecha_actual = new Date();
        var countTime = fecha_actual - this.last_api_call;

        // 10 * 60 * 1000 representa 10 minutos en milisegundos
        if(countTime >= 10 * 60 * 1000 || this.last_api_result == null){
            var agenda = this;

            $.ajax({
                dataType: "xml",
                url: this.url,
                method: 'GET',
                success: function(data){
                    agenda.datos = data;
                    agenda.last_api_result = new Date(); 
                    agenda.isReceived = true;
                },
                error:function(){
                    agenda.last_api_result = new Date(); 
                    $("section").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://ergast.com'>Ergast</a>"); 
                }
            });
            
            this.isReceived = false;
            return this.last_api_call;
        }

        return this.last_api_result;
    }

    /**
     * Hace la llamada a la API para obtener las carreras
     * En caso de getCarreras() devuelva last_api_result no hace nada, solo 
     * actualiza last_api_call
     */
    getInformation(){
        this.last_api_call = new Date();
        this.getCarreras();

        if(this.datos != null && this.isReceived){
            //Presentacion del archivo XML en modo texto
            $("<h3>Información</h3>").appendTo($("section").last()); 

            $.each($("Race",this.datos), function(i,race ) {
                //Extracción de los datos contenidos en el XML
                var nombre_carrera = $('RaceName',race).text();
                var nombre_circuito =  $('CircuitName',race).text();
                var coord_lat = $('Location',race).attr("lat");
                var coord_long = $('Location',race).attr("long");
                var hora = $('Time',race).first().text();
                var fecha =  $('Date',race).first().text();              
                        
                // Colocar los datos del XML en el HTML
                var stringDatos = "<article>";
                stringDatos += "<ul><li> Nombre de la carrera: " + nombre_carrera + "</li>";
                stringDatos += "<li> Nombre del circuito: " + nombre_circuito + "</li>";
                stringDatos += "<li> Coordenadas: " + coord_lat + "," + coord_long + "</li>";
                stringDatos += "<li> Fecha: " + fecha + "</li>";
                stringDatos += "<li> Hora: " + hora + "</li></ul>";
                stringDatos += "</article>";
    
                $(stringDatos).appendTo($("section").last());  
                agenda.isReceived = false;
            });
        }             
    }
}

var agenda = new Agenda("http://ergast.com/api/f1/2023");