class Memoria {

    /**
     * hasFlippedCard - Indica si hay uan carta dada la vuelta
     * lockBoard - Indica si el tablero esta bloquado
     * Primera carta en dar la vuelta
     * secondCard - Segunda carta en dar la vuelta
     */
    constructor(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        
        this.elements = 
            [{
                "nombre": "HTML5",
                "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"
            },
            {
                "nombre": "CSS3",
                "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
            },
            {
                "nombre": "JS",
                "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"
            },
            {
                "nombre": "PHP",
                "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
            },
            {
                "nombre": "SVG",
                "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
            },
            {
                "nombre": "W3C",
                "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg"
            },
            {
                "nombre": "HTML5",
                "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"
            },
            {
                "nombre": "CSS3",
                "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
            },
            {
                "nombre": "JS",
                "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"
            },
            {
                "nombre": "PHP",
                "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
            },
            {
                "nombre": "SVG",
                "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
            },
            {
                "nombre": "W3C",
                "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg"
            }];

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    /**
     * Mediante el algoritmo Durstenfeld mezcla los elementos del json
     * elements 
     */
    shuffleElements(){
        var random = 0;
        var elemento = null;

        for (var i=this.elements.length-1; i >= 0; i--) {
            random = Math.floor(Math.random() * this.elements.length);

            elemento = this.elements[random];
            this.elements[random] = this.elements[i];
            this.elements[i] = elemento;
        }
    }

    /**
     * Bloquea el tablero en primer lugar y luego voltea las cartas que esten
     * bocarriba y resetea el tablero
     */
    unflipCards(){
        this.lockBoard = true;

        for (var i=0; i < elements.length; i++) {
            var article = document.querySelector("article.dataset.flip");
        }

        resetBoard();
    }

    /**
     * Pone todas las variables a sus valores de inicio
     */
    resetBoard(){
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    /**
     * Comprueba si las cartas voltedas son iguales. Si lo son se invoca a 
     * disableCards() si no a unflipCards()
     */
    checkForMatch(){
        if(this.firstCard === this.secondCard){
            disableCards();
        } else {
            unflipCards();
        }
    }

    /**
     * Deshabilita las interacciones sobre las tarjetas de memoria 
     * que ya han sido emparejadas
     */
    disableCards(){
        for (var i=0; i < this.elements.length; i++) {
            var card = document.querySelector("article:nth-child(" + i + ")");

            if(card.dataset.state = "flip"){
                card.dataset.state = "revealed";
            }
        }
        
        resetBoard();
    }

    /**
     * Crea por cada elemento en el JSON un nodo article
     */
    createElements(){
        for (var i=0; i < this.elements.length; i++) {
            document.write("<article " + "data-element=" + this.elements[i] + " data-state=initial>");
            document.write("<h3>Tarjeta de memoria</h3>");
            document.write("<img src=" + this.elements[i].source +
            " alt=" + this.elements[i].nombre + "/>");
            document.write("</article>");
        }
    }

    /**
     * Recorre todas las tarjetas creadas y 
     * provoca una llamada al método flipCard
     */
    addEventListeners(){
        for (var i=0; i < this.elements.length; i++) {
            var card = document.querySelector("article[data-element='+" + this.elements[i] + "']");

            card.setAttribute('onClick','flipCard');
        }
    }

    /**
     * Da la vuelta a las tarjetas
     */
    flipCard(game){
        if(card.dataset.state == "revealed" || game.lockBoard){
            return;
        }

        card.dataset.state = "flip" 
        if(game.hasFlippedCard){
            game.secondCard = this;
            checkForMatch();
        } else {
            game.hasFlippedCard = true;
            game.firstCard = this;
        }
    }
}

var game = new Memoria();