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
        // Fill sirve para añadirle las columnas rellenando el array con otro
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

        for (let i=0; i < this.tablero.length; i++) {
            for (let j=0; j < this.tablero[i].length; j++) {

                if(this.tablero[i][j] == 0){
                    // Evento que pulsa una casilla y cambia su estado a clicked
                    cells[aux].addEventListener('click', function cellClick(){
                        var cellClicked = document.querySelector("p[data-state='clicked']");
                        if(cellClicked != null){
                            cellClicked.dataset.state = "";
                        }

                        this.dataset.state = "clicked"
                    });

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
        var cellClicked = document.querySelector("p[data-state='clicked']");
        var aux = 0;

        for (let i=0; i < this.tablero.length; i++) {
            for (let j=0; j < this.tablero[i].length; j++) {
                if(this.tablero[i][j]){
                    
                }

                aux++;
            }
        }
    }

}

var game = new Sudoku();
game.paintSudoku();

document.addEventListener('keydown', function(e) {
    var cellClicked = document.querySelector("p[data-state='clicked']");

    // Comprueba si hay alguna casilla seleccionada
    if(cellClicked == null){
        alert("Debe pulsar una casilla antes de continuar")
    } else {
        // Comprueba si la casilla seleccionada esta en estado clicked (por si acaso)
        if(cellClicked.dataset.state == "clicked"){
            if(e.key >= "1" && e.key <= "9"){
                game.introduceNumber(e.key).bind(cellClicked);
            } else {
                alert("La tecla seleccionada no es correcta")
            }
        }
    }
});

