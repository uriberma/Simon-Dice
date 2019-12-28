/*  Variables  */
let game = document.querySelector('.game');
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
    }
}

function startGame() {
    let game = new Game();
}