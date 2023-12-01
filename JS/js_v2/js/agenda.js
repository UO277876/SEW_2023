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
        this.isReceived = false;
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
        var tiemStampCall = this.last_api_call.getTime();
        var tiemStampAct = fecha_actual.getTime();

        // 5 * 60 * 1000 representa 5 minutos en milisegundos
        if((tiemStampAct - tiemStampCall) >= 5 * 60 * 1000 || this.last_api_result == null){
            $.ajax({
                dataType: "xml",
                url: this.url,
                method: 'GET',
                success: function(data){
                    this.datos = data;
                    this.last_api_result = new Date(); 
                    this.isReceived = true;
                },
                error:function(){
                    this.last_api_result = new Date(); 
                    $("section").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://ergast.com'>Ergast</a>"); 
                }
            }); 
        } else {
            this.isReceived = false;
        }
    }

    /**
     * Hace la llamada a la API para obtener las carreras
     * En caso de getCarreras() devuelva last_api_result no hace nada, solo 
     * actualiza last_api_call
     */
    getInformation(){
        this.last_api_call = new Date();

        if(this.isReceived){
            //Presentacion del archivo XML en modo texto
            for (race in $('Race',this.datos)){
                //Extracción de los datos contenidos en el XML
                var nombre_carrera = $('RaceName',this.datos).text;
                var nombre_circuito =  $('CircuitName',this.datos).text;
                var coord_lat = $('Location',this.datos).attr("lat");
                var coord_long = $('Location',this.datos).attr("long");
                var fecha = $('Time',this.datos).text;
                var hora =  $('Date',this.datos).text;              
                        
                // Colocar los datos del XML en el HTML
                var stringDatos = "<article>";
                stringDatos += "<ul><li> Nombre de la carrera: " + nombre_carrera + "</li>";
                stringDatos += "<li> Nombre del circuito: " + nombre_circuito + "</li>";
                stringDatos += "<li> Coordenadas: " + coord_lat + "," + coord_long + "</li>";
                stringDatos += "<li> Fecha: " + fecha + "</li>";
                stringDatos += "<li> Hora: " + hora + "</li></ul>";
                stringDatos += "</article>";
    
                $("section").html(stringDatos);  
            }  
        }             
    }
}

var agenda = new Agenda("http://ergast.com/api/f1/2023");