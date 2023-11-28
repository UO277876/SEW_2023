"use strict";
class Fondo{
    constructor(nombre, capital, coordenadas){
        this.nombre = nombre;
        this.capital = capital;
        this.coordenadas = coordenadas;
    }

    getImagen(){
        var coordAux = this.coordenadas.split(',');
        var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        var key_api= "9d61c740301a658bb4f4f8f7bd99076b";

        $.getJSON(flickrAPI, 
                {
                    api_key: key_api,
                    lat: coordAux[0],
                    lon: coordAux[1],
                    format: "json"
                })
            .done(function(data) {
                    $.each(data.items, function(i,item ) {
                        $("<img />").attr( "src", url('https://live.staticflickr.com/' 
                        + item.size + '/' + id + '_' + secret + "_b" + ".jpg")).appendTo("main");
                        $("<img />").attr("alt", item.title).appendTo("main");
                        $('main').css(item.title,'cover');
                    });
        });
    }
}

export default Fondo;