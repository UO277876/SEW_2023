"use strict";
class Crucigrama {

    /**
     * board - Indica los valores de cada casilla en forma de cadena de texto
     * filas - Indica el numero de filas
     * columnas - Indica el numero de filas
     * init_time - Indica cuando se inicia el juego
     * end_time - Indica cuando se acaba el juego
     * tablero - Array con las dimensiones del tablero [filas][columnas]
     */
    constructor(){
        this.board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-" +
        ",.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-" +
        ",#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16"
        this.filas = 9;
        this.columnas = 11;
        this.init_time = null;
        this.end_time = null;
        this.tablero = [];

        this.start();
    }

    /**
     * Pone valores dentro de las celdas del tablero
     * Si hay un . se pone un 0 
     * Si hay un # se pone un -1
     * Si hay un número se pone ese valor
     */
    start(){
        // Variable para ir recorriendo los caracteres de la cadena
        var chainSplit = this.board.split(",");
        var intChar = 0;

        for (let i=0; i < this.filas; i++) {
            this.tablero[i] = [];
            for (let j=0; j < this.columnas; j++) {
                if(chainSplit[intChar] == "."){
                    this.tablero[i][j] = 0;
                } else if (chainSplit[intChar] == "#") {
                    this.tablero[i][j] = -1;
                } else {
                    this.tablero[i][j] = chainSplit[intChar];
                }

                intChar++;
            }
            
        }
    }

    /**
     * Crea en el HTML los párrafos que representan las celdas del crucigrama
     * usando JQuery
     */
    paintMathword() {
        // Para poder hacer las comprobaciones del tablero dentro de la funcion
        var boardAux = this;

        $(document).ready(function(){
            for (let i=0; i < boardAux.tablero.length; i++) {
                for (let j=0; j < boardAux.tablero[i].length; j++) {
                    var newP = $("<p></p>").appendTo("main");

                    if(boardAux.tablero[i][j] == "0"){
                        newP.appendTo("main").bind("click", boardAux.cellClick);
                    } else {
                        if(boardAux.tablero[i][j] == "-1"){
                            newP.attr("data-state", "empty");
                        } else {
                            newP.text(boardAux.tablero[i][j]).attr("data-state", "blocked");
                        }
                    }
                }
            }
        });

        this.init_time = new Date();
    }

    /**
     * Comprueba si se ha completado el crucigrama
     */
    check_win_condition(){
        var casillasACero = 0;

        for (let i=0; i < this.filas; i++) {
            for (let j=0; j < this.columnas; j++) {
                if(this.tablero[i][j] == "0"){
                    casillasACero++;
                }
            }
        }

        if(casillasACero = 0){
            return true;
        } else {
            return false;
        }
    }

    /**
     * Realiza una cuenta con los valores de las variables
     * init_time y end_time para obtener el tiempo total invertido en resolver el crucigrama y
     * lo devuelve como una cadena de texto
     */
    calculate_date_difference(){
        var countTime = this.end_time - this.init_time;

        // 1. Calculo los segundos, minutos y horas porque se tiene que devolver en hh:min:s
        var seconds = Math.floor(countTime / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);

        minutes %= 60;
        seconds %= 60;

        // Se devuelve en el formato correcto
        return hours + ":" + minutes + ":" + seconds;
    }

    /**
    * Comprueba si el numero pulsado es valido para la casilla seleccionada
    */
    introduceElement(tecla) {
        var expression_row = true;
        var expression_col = true;

        var cells = document.querySelector("p");
        var cellFound = false;

        // Se saca la fila y columna del p que esta en state clicked
        for (let i=0; i < this.tablero.length; i++) {
            for (let j=0; j < this.tablero[i].length; j++) {
                if(cells[i*j].dataset.state == "clicked"){
                    row = i;
                    column = j;
                    cellFound = true;
                    this.tablero[i][j] = tecla;
                    break;
                }
            }

            if(cellFound){
                break;
            }
        }

        // Comprobaciones
        // 1º Comprobacion - Casilla a la derecha con =
        var index = 1;
        var columnIgual = 0;
        while(tablero[row][column + index] != "="){
            if(tablero[row][column + 1] == "-1"){
                break;
            }

            columnIgual = tablero[row][column + index];
            index++;
        }

        var first_number = tablero[row][columnIgual - 3];
        var second_number = tablero[row][columnIgual + 1];
        var expression = tablero[row][columnIgual - 2];
        var result = tablero[row][columnIgual + 1];
        
        if(first_number != "0" && second_number != "0" && expression != "0" && result != "0"){

        }
    }

    /**
     * Cambia una casilla al estado clicked y si hay otra en ese estado lo cambia
     */
    cellClick(event){
        var cellClicked = document.querySelector("p[data-state='clicked']");

        if(cellClicked != null){
            cellClicked.removeAttribute("data-state");
        }

        if(event != null){
            event.currentTarget.dataset.state = "clicked"
        }  
    }
}

var game = new Crucigrama();
game.paintMathword();

document.addEventListener('keydown', function(e) {
    var cellClicked = document.querySelector("p[data-state='clicked']");

    // Comprueba si hay alguna casilla seleccionada
    if(cellClicked == null){
        alert("Debe pulsar una casilla antes de continuar")
    } else {
        // Comprueba si la casilla seleccionada esta en estado clicked (por si acaso)
        if(cellClicked.dataset.state == "clicked"){
            if((e.key >= "1" && e.key) <= "9" || 
                (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/")){
                    game.introduceElement(e.key);
            } else {
                alert("La tecla seleccionada no es correcta")
            }
        }
    }
});