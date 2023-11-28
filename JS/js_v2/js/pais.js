"use strict";

class Pais{
    constructor(nombre, capital, poblacion){
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;

    }

    setInfo(gobierno, coordenadas, religion){
        this.gobierno = gobierno;
        this.coordenadas = coordenadas;
        this.religion = religion;

    }

    getNombre(){
        return "Nombre: " + this.nombre;
    }

    getCapital(){
        return "Capital: " + this.capital;
    }

    // Para obtener la informacion de la poblacion + gobierno + religion en forma
    // de lista desordenada
    getInfo(){
        return "<ul><li> Población: " + this.poblacion + "</li>\n"
            + "<li> Forma de gobierno: " + this.gobierno + "</li>\n"
            + "<li> Religión mayoritaria: " + this.religion + "</li></ul>";
    }

    getCoordenadas(){
        document.write("<p> Coordenadas: " + this.coordenadas + "</p>");
    }

    /**
     * Obtiene los datos meteorológicos de San Salvador a las 00:00:00 de los 5 días siguientes a la 
     * fecha actual
     */
    getMeteo(){
        var api_key= "1e81407ed3ba1fb3db96fb8ede324525";
        var coordAux = this.coordenadas.split(',');
        var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + coordAux[0] + 
            "&lon=" + coordAux[1] + "&appid=" + api_key;

        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function(datos){
                var stringDatos = "<h2> Tiempo en " + datos.city.name + "</h2>"

                $.each(datos.list, function(i,item ) {
                    // se obtiene la hora de cada item a traves de .split (divide fecha - hora)
                    var time = item.dt_txt.split(" ")
                    
                    // Se comprueba que coja el tiempo de las 12:00:00 de cada día
                    if(time[1] == "12:00:00"){
                        //Presentacion de los datos contenidos en JSON
                        stringDatos += "<article data-state=meteo>"
                        stringDatos += "<h3> Tiempo del día " + time[0]  + "</h3>"
                        stringDatos += "<img src=http://openweathermap.org/img/wn/" + item.weather[0].icon 
                            + "@2x.png alt=\"Icono del tiempo\"/>";
                        stringDatos += "<ul><li>Temperatura máxima: " + item.main.temp_max + "</li>";
                        stringDatos += "<li>Temperatura mínima: " + item.main.temp_min + "</li>";
                        stringDatos += "<li>Porcentaje de humedad: " + item.main.humidity + "%</li>";
                        stringDatos += "<li>Nubosidad: " + item.clouds.all + "%</li></ul>";
                        stringDatos += "</article>"

                        $("section").html(stringDatos);
                        $("section").prepend();
                    }
                });
                },

            error:function(){
                $("section").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("section").remove();
            }
        });
    }

    /**
     * Llama al getMeteo() 
     */
    obtenerDatos(){
        this.getMeteo();

        // Para poner a cada article creado el data-state 
//        $("section").each(article,function() {
//            $(article).attr("data-state=meteo");
//        });

        // Para deshabilitar el botón de obtener tiempo una vez se ha obtenido la información
        $("button").attr("disabled", "disabled");
    }
}

var pais = new Pais("El Salvador","San Salvador","6,314 millones");
pais.setInfo("Democracia","13.698964,-89.191428,600","Católica");
