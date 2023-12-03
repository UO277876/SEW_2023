"use strict";
class Sudoku {

    /**
     * tableroNumeros - Indica los valores de cada casilla en forma de cadena de texto
     * filas - Indica el numero de filas
     * columnas - Indica el numero de filas
     * tablero - Array con las dimensiones del tablero [filas][columnas]
     */
    constructor(){
        this.tableroNumeros = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
        //this.tableroNumeros = "2221111112.211111192211111111111111111111111111111111111111111111111111111111111.";
        this.filas = 9;
        this.columnas = 9;
        this.tablero = [];

        this.start();
    }

    /**
     * Pone valores dentro de las celdas del tablero
     */
    start(){
        // Variable para ir recorriendo los caracteres de la cadena
        var intChar = 0;

        for (let i=0; i < this.filas; i++) {
            this.tablero[i] = [];
            for (let j=0; j < this.columnas; j++) {
                if(this.tableroNumeros[intChar] != "."){
                    this.tablero[i][j] = this.tableroNumeros[intChar];
                } else {
                    this.tablero[i][j] = 0;
                }

                intChar++;
            }
            
        }
    }

    /**
     * Crea en el HTML los párrafos que representan las celdas del sudoku
     */
    createStructure() {
        for (let i=0; i < this.filas; i++) {
            for (let j=0; j < this.columnas; j++) {
                // Se crean inicialmente vacios
                document.write("<p></p>");
            }
        }
    }

    /**
    * Pone a cada parrafo del HTML el valor del sudoku
    */
    paintSudoku() {
        this.createStructure();
        var cells = document.querySelectorAll("p");
        var aux = 0;

        for (let i=0; i < this.filas; i++) {
            for (let j=0; j < this.columnas; j++) {

                if(this.tablero[i][j] == 0){
                    // Evento que pulsa una casilla y cambia su estado a clicked
                    // si ya hay una pulsada elimina su estado clicked
                    cells[aux].addEventListener('click', this.cellClick);

                } else {
                    cells[aux].innerText = this.tablero[i][j];
                    cells[aux].dataset.state = "blocked";
                }

                aux++;
            }
        }
    }

    /**
    * Comprueba si el numero pulsado es valido para la casilla seleccionada
    */
    introduceNumber(number) {
        var cells = document.querySelectorAll("p");
        var row = 0;
        var column = 0;
        // aux es equivalente a multiplicar row*column, es decir, es el indice del parrafo
        var aux = 0;
        var cellFound = false;

        // Se saca la fila y columna del p que esta en state clicked
        for (let i=0; i < this.filas; i++) {
            for (let j=0; j < this.columnas; j++) {
                if(cells[aux].dataset.state == "clicked"){
                    row = i;
                    column = j;
                    cellFound = true;
                    break;
                }

                aux++;
            }

            if(cellFound){
                break;
            }
        }

        // Comprobaciones
        if(!this.comprobaciones(row,column,number)){
            // No se puede poner el numero
            return;
        } else {
            // Se puede poner el numero
            cells[aux].innerText = number;
            this.tablero[row][column] = number;

            // Estado de la celda y evento clicked
            cells[aux].dataset.state = "correct";
            cells[aux].removeEventListener('click',this.cellClick);

            // Comprobacion de si esta completo
            this.comprobacionFinal();
        }

    }

    /**
     * Comprueba que el tablero esta completo
     */
    comprobacionFinal(){
        var casillasACero = 0;

        for (let i=0; i < this.filas; i++) {
            for (let j=0; j < this.columnas; j++) {
                if(this.tablero[i][j] == "0"){
                    casillasACero++;
                }
            }
        }

        if(casillasACero == 0){
            alert("Tablero completado")
        }
    }

    /**
     * Comprueba que en la casilla se puede poner el numero seleccionado
     * 
     * @param {*} number El numero a poner en la celda seleccionada
     * @param {*} row Fila de la celda a comprobar
     * @param {*} column Columna de la celda a comprobar
     * @returns True si las comprobaciones no dan error, False si dan
     */
    comprobaciones(row,column,number){
        // Comprobacion de numero en fila
        for(let j=0; j < this.tablero[row].length; j++){
            if(this.tablero[row][j] == number){
                return false;
            }
        }

        // Comprobacion de numero en columna
        for(let i=0; i < this.tablero.length; i++){
            if(this.tablero[i][column] == number){
                return false;
            }
        }

        // Comprobacion de numero 3x3
        var rowAux = row - row%3;
        var columnAux = column - column%3;

        var rowFor = rowAux + 3;
        var columnFor = columnAux + 3;

        for(let i=rowAux; i < rowFor; i++) {
            for(let j=columnAux; j < columnFor; j++){
                if(this.tablero[i][j] == number){
                    return false;
                }
            }
        }

        return true;
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

var game = new Sudoku();

