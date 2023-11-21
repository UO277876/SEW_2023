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
                    // si ya hay una pulsada elimina su estado clicked
                    cells[aux].addEventListener('click', function cellClick(){
                        var cellClicked = document.querySelector("p[data-state='clicked']");
                        if(cellClicked != null){
                            cellClicked.removeAttribute("data-state");
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
        var cells = document.querySelectorAll("p");
        var row = 0;
        var column = 0;
        var aux = 0;
        var cellFound = false;

        // Se saca la fila y columna del p que esta en state clicked
        for (let i=0; i < this.tablero.length; i++) {
            for (let j=0; j < this.tablero[i].length; j++) {
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
        // Comprobacion de numero en fila
        for(let j=0; j < this.tablero[row].length; j++){
            if(this.tablero[row][j] == number){
                return;
            }
        }

        // Comprobacion de numero en columna
        for(let i=0; i < this.tablero.length; i++){
            if(this.tablero[i][column] == number){
                return;
            }
        }

        // Comprobacion de numero 3x3
        var rowAux = row%3;
        var columnAux = column%3;
        for(let i=rowAux; rowAux < 3; rowAux++) {
            for(let j=columnAux; columnAux < 3; columnAux++){
                if(this.tablero[i][j] == number){
                    return;
                }
            }
        }

        // Todo correcto
        // Asignaciones de texto y a la matriz
        cells[aux].innerText = number;
        this.tablero[row][column] = number;

        // Estado de la celda
        cells[aux].dataset.state = "correct";
        cells[aux].removeEventListener('click');
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
                game.introduceNumber(e.key);
            } else {
                alert("La tecla seleccionada no es correcta")
            }
        }
    }
});

