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
        this.filas = 11;
        this.columnas = 9;
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
            for (let i=0; i < boardAux.filas; i++) {
                for (let j=0; j < boardAux.columnas; j++) {
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

        if(casillasACero == 0){
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

        // 1. Calculo los segundos, minutos y horas porque se tiene que devolver en hh:mm:ss
        var seconds = Math.floor(countTime / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);

        minutes = minutes % 60;
        seconds = seconds % 60;

        // 2. Se coloca en cada variable el valor final comprobando si hay un 0 delamte o el valor es
        // mayor a 0
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }

    /**
    * Comprueba si el numero pulsado es valido para la casilla seleccionada
    */
    introduceElement(tecla) {
        var expression_row = true;
        var expression_col = true;

        var cells = document.querySelectorAll("p");
        var cellFound = false;

        var row = 0;
        var column = 0;

        // aux es equivalente a multiplicar row*column, es decir, es el indice del parrafo
        var aux = 0;

        // Se saca la fila y columna del p que esta en state clicked
        for (let i=0; i < this.filas; i++) {
            for (let j=0; j < this.columnas; j++) {
                if(cells[aux].dataset.state == "clicked"){
                    row = i;
                    column = j;
                    cellFound = true;
                    this.tablero[i][j] = tecla;
                    break;
                }

                aux++;
            }

            if(cellFound){
                break;
            }
        }

        // Comprobaciones
        // 1º Comprobacion - Filas. Casilla hacia la derecha con =
        // Solo evalua si lo que hay a la derecha de la casilla es otra casilla
        if(column + 1 != this.columnas){
            expression_row = this.comprobacionFila(row,column,expression_row);
        }

        // 2º Comprobacion - Columnas. Casilla hacia abajo con =
        // Solo evalua si lo que hay a debajo de la casilla es otra casilla
        if(row + 1 != this.filas){
            expression_col = this.comprobacionColumna(row,column,expression_col);
        }

        // Todo correcto horizontal y verticalmente
        if(expression_row && expression_col){
            $("p[data-state='clicked'").text(this.tablero[row][column]);
            cells[aux].dataset.state = "correct";
        } else {
            this.tablero[row][column] = "0";
            cells[aux].removeAttribute("data-state");
            alert("El elemento introducido no es correcto");
        }

        if(this.check_win_condition()){
            this.end_time = new Date();
            var totalTime = this.calculate_date_difference();
            alert("Ha tardado " + totalTime + " en completar el tablero");
        }

    }

    /**
     * Comprueba la expresion de la fila de la casilla rellenada
     * @param {*} expression_row devuelve false si el resultado no es correcto
     * @returns False si los resultados no coinciden y True si coinciden
     */
    comprobacionFila(row,column,expression_row) {
        var index = 0;
        var columnIgual = 0;

        if(this.tablero[row][column + 1] == "-1"){
            return true;
        }

        while (this.tablero[row + index][column] != "=") {
            if(this.tablero[row][column + index + 1] == "="){
                columnIgual = column + index + 1;
                break;
            }

            index++;
        }

        var first_number = this.tablero[row][columnIgual - 3];
        var second_number = this.tablero[row][columnIgual - 1];
        var expression = this.tablero[row][columnIgual - 2];
        var result = this.tablero[row][columnIgual + 1];

        if (first_number != "0" && second_number != "0" && expression != "0" && result != "0") {
            // Comprobacion - Que el resultado obtenido de la expresion y el del crucigrama
            // sean iguales
            var expression_math = [first_number, expression, second_number]
            expression_math= expression_math.join("");

            var result2 = eval(expression_math);

            if (result2 != result) {
                expression_row = false;
            }
        }

        return expression_row;
    }

        /**
     * Comprueba la expresion de la columna de la casilla rellenada
     * @param {*} expression_col devuelve false si el resultado no es correcto
     * @returns False si los resultados no coinciden y True si coinciden
     */
    comprobacionColumna(row,column,expression_col) {
        var index = 0;
        var rowIgual = 0;

        if(this.tablero[row + 1][column] == "-1"){
            return true;
        }

        while (this.tablero[row + index][column] != "=") {
            if(this.tablero[row + index + 1][column] == "="){
                rowIgual = row + index + 1;
                break;
            }
    
            index++;
        }
    
        var first_number = this.tablero[rowIgual - 3][column];
        var second_number = this.tablero[rowIgual - 1][column];
        var expression = this.tablero[rowIgual - 2][column];
        var result = this.tablero[rowIgual + 1][column];
    
        if (first_number != "0" && second_number != "0" && expression != "0" && result != "0") {
            // Comprobacion - Que el resultado obtenido de la expresion y el del crucigrama
            // sean iguales
            var expression_math = [first_number, expression, second_number]
            expression_math= expression_math.join("");
    
            var result2 = eval(expression_math);
    
            if (result2 != result) {
                expression_col = false;
            }
        }
    
        return expression_col;
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