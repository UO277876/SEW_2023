"use strict";
class Memoria {

    /**
     * hasFlippedCard - Indica si hay uan carta dada la vuelta
     * lockBoard - Indica si el tablero esta bloquado
     * firstCard - Primera carta en dar la vuelta
     * secondCard - Segunda carta en dar la vuelta
     * elements - JSON con la información de cada tarjeta
     */
    constructor(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        
        this.elements = 
            [{
                "element": "HTML5",
                "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"
            },
            {
                "element": "CSS3",
                "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
            },
            {
                "element": "JS",
                "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"
            },
            {
                "element": "PHP",
                "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
            },
            {
                "element": "SVG",
                "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
            },
            {
                "element": "W3C",
                "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg"
            },
            {
                "element": "HTML5",
                "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"
            },
            {
                "element": "CSS3",
                "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
            },
            {
                "element": "JS",
                "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"
            },
            {
                "element": "PHP",
                "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
            },
            {
                "element": "SVG",
                "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
            },
            {
                "element": "W3C",
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

        // Al unflip le meto un delay para que la segunda carta tarde un poco en voltearse
        function unflip(){
            this.firstCard.dataset.state = "initial";
            this.secondCard.dataset.state = "initial";
            this.resetBoard();
        }
          
        setTimeout(unflip.bind(this), 2500);
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
        this.firstCard.dataset.element == this.secondCard.dataset.element
         ? this.disableCards() :  this.unflipCards();
    }

    /**
     * Deshabilita las interacciones sobre las tarjetas de memoria 
     * que ya han sido emparejadas
     */
    disableCards(){
        this.firstCard.dataset.state = "revealed";
        this.secondCard.dataset.state = "revealed";

        this.resetBoard();
    }

    /**
     * Crea por cada elemento en el JSON un nodo article
     */
    createElements(){
        for (var i=0; i < this.elements.length; i++) {
            document.write("<article " + "data-element=" + this.elements[i].element + " data-state=initial>");
            document.write("<h3>Tarjeta de memoria</h3>");
            document.write('<img src=' + this.elements[i].source +
            ' alt=' + this.elements[i].element + ' />');
            document.write("</article>");
        }
    }

    /**
     * Recorre todas las tarjetas creadas y 
     * provoca una llamada al método flipCard
     */
    addEventListeners(){
        var cards = document.querySelectorAll("article");

        for (var i=0; i < cards.length; i++) {
            var card = cards[i];
            card.addEventListener('click', this.flipCard.bind(card, this));
        }
    }

    /**
     * Da la vuelta a las tarjetas
     */
    flipCard(game){
        if(this.dataset.state == "revealed" || game.lockBoard || game.firstCard === this){
            return;
        }

        this.dataset.state = "flip"

        if(game.hasFlippedCard){
            game.secondCard = this;
            game.checkForMatch();
        } else {
            game.hasFlippedCard = true;
            game.firstCard = this;
        }
    }
}

var game = new Memoria();