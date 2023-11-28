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
        var coordAux = this.coordenadas.split(',');
        var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        var key_api= "9d61c740301a658bb4f4f8f7bd99076b";

        $.getJSON(flickrAPI, 
                {
                    api_key: key_api,
                    lat: coordAux[0],
                    lon: coordAux[1],
                    method: "flickr.photos.search",
                    format: "json"
                })
            .done(function(data) {
                $.each(data.items, function(i,item ) {
                    if(i == 1){                
                        // Primero se obtiene la url de la imagen
                        var url = item.media.m;
                        url = url.replace("_m","_b");

                        // Para cambiar el fondo de body
                        $('body').css("background-image","url(" + url + ")");
                        $('body').css("background-size","cover");
                    }
                });
        });
    }
}

var fondo = new Fondo("San Salvador","El Salvador","13.698964,-89.191428");
fondo.getImagen();