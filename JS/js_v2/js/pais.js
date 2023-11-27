"use strict";
import Fondo from "./fondo.js";

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

        this.fondo= new Fondo(this.nombre,this.capital,this.coordenadas);
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

    getMeteo(){
        var api_key= "1e81407ed3ba1fb3db96fb8ede324525";
        var coordAux = this.coordenadas.split(',');
        var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + coordAux[0] + "&lon=" + coordAux[1] + "&appid=" + api_key;

        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function(datos){
                    //Presentacion de los datos contenidos en JSON
                    var stringDatos = "<h3>"+datos.name+"</h3>"
                        stringDatos += "<img src=http://openweathermap.org/img/wn/" + datos.weather[0].icon + "@2x.png alt=\"Icono del tiempo\"/>";
                        stringDatos += "<ul><li>Temperatura máxima: " + datos.list.temp_max + "</li>";
                        stringDatos += "<li>Temperatura mínima: " + datos.list.temp_min + "</li>";
                        stringDatos += "<li>Porcentaje de humedad: " + datos.list.humidity + "%</li>";
                        stringDatos += "<li>Cantidad de lluvia al día: " + datos.clouds.all + "</li></ul>";
                    
                    $("section").html(stringDatos);
                    $("section").prepend();
                },
            error:function(){
                $("section").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("section").remove();
            }
        });
    }
}

var pais = new Pais("El Salvador","San Salvador","6,314 millones");
pais.setInfo("Democracia","13.794185,-88.89653,600","Católica");

pais.getMeteo();