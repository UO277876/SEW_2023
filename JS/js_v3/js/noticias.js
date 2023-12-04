"use strict";
class Noticias {

    constructor(){
        var mensaje = '';

        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            //El navegador soporta el API File
            mensaje = "Este navegador soporta el API File";
        } else {
            mensaje = "¡¡¡Este navegador NO soporta el API File y este programa puede no funcionar correctamente!!!";
        }

        $(mensaje).appendTo($("section").first());
    }

    /**
     * Se encarga de realizar la lectura de un fichero de noticias
     */
    readInputFile(files){
        //Solamente admite archivos de tipo texto
        var archivo = files[0];

        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) {
            var lector = new FileReader();

            //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
            //La propiedad "result" es donde se almacena el contenido del archivo
            //Esta propiedad solamente es válida cuando se termina la operación de lectura
            lector.onload = function (event) {
                this.printNotices(lector.result);
            }.bind(this);     

            lector.readAsText(archivo);
        } else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }     
    }

    /**
     * Añade al documento HTML cada noticia de la cadena pasada como parametro
     * @param {} result El archivo de texto que contiene las noticias 
     */
    printNotices(result){
        if(result != null){
            // 1º - se saca cada noticia (vienen separadas por /n)
            var noticias = result.split("\n");

            for(let i=0; i < noticias.length; i++){
                // 1º - se saca la información de la noticia (viene separada por _)
                var informacion = noticias[i].split("_");

                var stringDatos = "<article>";
                stringDatos += "<h3>" + informacion[0] + "</h3>"
                stringDatos += "<h4>" + informacion[1] + "</h4>";
                stringDatos += "<p>" + informacion[2] + "<p>";
                stringDatos += "<p>Autor: " + informacion[3] + "<p>";
                stringDatos += "</article>"

                $(stringDatos).appendTo($("section").last());
            }
        } else {
            alert("Contenido del fichero inválido");
        }
    }

    /**
     * Añade nuevas noticias creadas por el usuario
     */
    addInformation(){
        var titulo = $("#titulo").val();
		var subtitulo = $("#subtitulo").val();
		var descripcion = $("#descripcion").val();
        var autor = $("#autor").val();

        if(titulo != "" && subtitulo != "" && descripcion != "" && autor != ""){
            var stringDatos = "<article>";
            stringDatos += "<h3>" + titulo + "</h3>"
            stringDatos += "<h4>" + subtitulo + "</h4>";
            stringDatos += "<p>" + descripcion + "<p>";
            stringDatos += "<p>Autor: " + autor + "<p>";
            stringDatos += "</article>"
    
            $(stringDatos).appendTo($("section").last());
        } else {
            alert("Falta algún campo por rellenar");
        }
    }
}

var noticias = new Noticias();