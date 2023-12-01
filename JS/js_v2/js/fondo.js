"use strict";
class Fondo{

    /**
     * 
     * @param {*} nombre del pais
     * @param {*} capital del pais
     * @param {*} coordenadas de la capital del pais
     */
    constructor(nombre, capital, coordenadas){
        this.nombre = nombre;
        this.capital = capital;
        this.coordenadas = coordenadas;
    }

    /**
     * Obtiene la imagen que será el fondo
     */
    getImagen(){
        var api_key = "4511ac14f92ab9c9b89346ed14799e6c";
        var coord = this.coordenadas.split(",");
        var lat = coord[0];
        var lon = coord[1];
        var method = "flickr.photos.search";
        var flickrAPI = 
            "https://www.flickr.com/services/rest/?method=" + method +
                "&api_key=" + api_key + "&lat=" + lat + "&lon=" + lon 
                + "&format=json&nojsoncallback=1&api_sig=fd8e4ba83164aa4de51cce3da62f7648"
        $.getJSON({
                    url: flickrAPI
                })
            .done(function(data) {
                // Sacmos una posicion random en el json
                var pos = Math.round(Math.random() * 99);
                var ruta = data.photos;

                // Primero se obtiene la url de la imagen concatenando server + id + 
                var url = "https://live.staticflickr.com/" + ruta.photo[pos].server + "/" + ruta.photo[pos].id 
                    + "_" + ruta.photo[pos].secret + "_b.jpg";   
                
                // Para cambiar el fondo de body
                $('body').css("background-image","url(" + url + ")");
                $('body').css("background-size","cover");                
        });
    }
}

var fondo = new Fondo("San Salvador","El Salvador","13.698964,-89.191428");
fondo.getImagen();