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
}

var pais = new Pais("El Salvador","San Salvador","6,314 millones");
pais.setInfo("Democracia","13.794185,-88.89653,600","Católica");
document.write("<p>" + pais.getNombre() + "</p>");
document.write("<p>" + pais.getCapital() + "</p>");
document.write("<p> Información secundaria:</p>" + pais.getInfo());
pais.getCoordenadas();