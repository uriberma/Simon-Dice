/*  Variables  */
let blue = document.querySelector('.blue');
let violet = document.querySelector('.violet');
let orange = document.querySelector('.orange');
let green = document.querySelector('.green');
let startGameBtn = document.querySelector('#start-game');

class Game {
    constructor() {
        this.init();
    }

    init() {
        startGameBtn.classList.add('hide');
        this.generateSequence();
        this.level = 10;
        this.colors = {
            blue,
            violet,
            orange,
            green
        }
        this.nextLevel()
    }

    generateSequence() {
        this.sequence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    nextLevel() {
        this.illuminateSequence()
    }

    transformNumberToColor(num) {
        switch(num) {
            case 0: 
                return 'blue'
            case 1: 
                return 'violet'
            case 2: 
                return 'orange'
            case 3:
                return 'green'
        }
    }

    illuminateSequence() {
        for (let i=0; i<this.level; i++) {
            const color = this.transformNumberToColor(this.sequence[i]);
            setTimeout(() => {
                this.illuminateColor(color);
            }, 1000 * i)
        }
    }

    illuminateColor(color) {
        this.colors[color].classList.add('light');
        setTimeout(() =>{
            this.turnOffColorLight(color)
        },450)
    }

    turnOffColorLight(color) {
        this.colors[color].classList.remove('light')
    }
}

function startGame() {
    window.game = new Game();
}