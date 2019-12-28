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
        this.selectColor = this.selectColor.bind(this);
        startGameBtn.classList.add('hide');
        this.generateSequence();
        this.level = 1;
        this.colors = {
            blue,
            violet,
            orange,
            green
        };

        this.nextLevel();
        this.addClickEvents();
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

    addClickEvents() {
        this.colors.blue.addEventListener('click', this.selectColor)
        this.colors.violet.addEventListener('click', this.selectColor)
        this.colors.orange.addEventListener('click', this.selectColor)
        this.colors.green.addEventListener('click', this.selectColor)
    }

    selectColor (ev) {
        console.log(this)
    }
}

function startGame() {
    window.game = new Game();
}