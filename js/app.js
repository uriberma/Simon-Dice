/*  Variables  */
let blue = document.querySelector('.blue');
let violet = document.querySelector('.violet');
let orange = document.querySelector('.orange');
let green = document.querySelector('.green');
let startGameBtn = document.querySelector('#start-game');
const LAST_LEVEL = 15;

class Game {
    constructor() {
        this.init();
    }

    init() {
        this.selectColor = this.selectColor.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
        this.toggleStartBtn = this.toggleStartBtn.bind(this);
        this.illuminateSequence = this.illuminateSequence.bind(this);

        this.toggleStartBtn();
        this.generateSequence();
        this.level = 1;
        this.colors = {
            blue,
            violet,
            orange,
            green
        };
        setTimeout(() => {
            this.nextLevel();
        }, 650);
    }

    toggleStartBtn() {
        if (startGameBtn.classList.contains('hide')) {
            startGameBtn.classList.remove('hide');
        } else {
            startGameBtn.classList.add('hide');
        }
    }

    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    nextLevel() {
        this.subLevel = 0;
        if (this.level === 1) {
            const CASUAL_SONG = new Audio('./../songs/casual.wav');
            CASUAL_SONG.play();
            swal('Good Look 😜', `Level ${this.level}`, {
                buttons: false,
                timer: 3000,
            })
                .then(() => {
                    setTimeout(this.illuminateSequence, 1200);
                })
        } else {
            const CORRECT_SONG = new Audio('./../songs/correct.wav');
            CORRECT_SONG.play();
            setTimeout(() => {
                swal('Good Job 😌', `Ready for level ${this.level}?? 😜`)
                .then(() => {
                    setTimeout(this.illuminateSequence, 1200);
                })
            }, 700);
        }
        this.addClickEvents();
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

    transformColorToNumber(color) {
        switch(color) {
            case 'blue': 
                return 0
            case 'violet': 
                return 1
            case 'orange': 
                return 2
            case 'green':
                return 3
        }
    }

    illuminateSequence() {
        for (let i=0; i<this.level; i++) {
            const color = this.transformNumberToColor(this.sequence[i]);
            setTimeout(() => {
                const ACTION_SONG = new Audio('./../songs/action.wav');
                ACTION_SONG.play();
                this.illuminateColor(color);
            }, 1200 * i)
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

    removeClickEvents() {
        this.colors.blue.removeEventListener('click', this.selectColor)
        this.colors.violet.removeEventListener('click', this.selectColor)
        this.colors.orange.removeEventListener('click', this.selectColor)
        this.colors.green.removeEventListener('click', this.selectColor)
    }

    selectColor (ev) {
        const selectedColor = ev.target.dataset.color;
        const selectedColorInNumber = this.transformColorToNumber(selectedColor);
        this.illuminateColor(selectedColor);

        if (selectedColorInNumber === this.sequence[this.subLevel]) {
            this.subLevel++;
            if (this.level === this.subLevel) {
                this.level++;
                this.removeClickEvents();
                if (this.level === (LAST_LEVEL + 1)) {
                    this.winGame();
                } else {
                    this.nextLevel();
                }
            }
        } else {
            this.lostGame();
        }
    }

    winGame() {
        const WIN_SONG = new Audio('../songs/win.mp3');
        WIN_SONG.play();
        swal('YOU WIN!! 🤩', 'Cogratulations!! you have successfully completed the game', 'success')
            .then(() => {
                this.removeClickEvents();
                this.restart();
            })
    }

    lostGame() {
        const ERROR_SONG = new Audio('./../songs/error.wav');
        ERROR_SONG.play();
        swal('GAME OVER 🙁', 'Sorry, you lose', 'error')
            .then(() => {
                this.removeClickEvents();
                this.restart();
            })
    }

    restart() {
        this.toggleStartBtn();
    }
}

function startGame() {
    let game = new Game();
}