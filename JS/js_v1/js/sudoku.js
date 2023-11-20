class Sudoku {

    /**
     * tableroNumeros - Indica los valores de cada casilla en forma de cadena de texto
     * filas - Indica el numero de filas
     * columnas - Indica el numero de filas
     * tablero - Array con las dimensiones del tablero [filas][columnas]
     */
    constructor(){
        this.tableroNumeros = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
        this.filas = 9;
        this.columnas = 9;
        // Fill sirve para añadirle las columnas reyenando el array con otro
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
        for (let i=0; i < this.tablero.length; i++) {
            for (let j=0; j < this.tablero[i].length; j++) {
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

        for (let i=0; i < this.tablero.length; i++) {
            for (let j=0; j < this.tablero[i].length; j++) {
                if(this.tablero[i][j] == 0){
                    cells[aux].dataset.state = "clicked";
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

    }

}

var game = new Sudoku();
game.paintSudoku();