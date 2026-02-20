class Model {
    constructor() {
        this.gameBoardStatus = Array(12).fill(null).map((_, index) => ({ id: index, hasMole: false }));
        this.score = 0;
        this.timeLeft = 30;
        this.gameInProgress = false;
    }

    reset() {
        this.score = 0;
        this.timeLeft = 30;
        this.gameBoardStatus.forEach(block => block.hasMole = false);
        this.gameInProgress = false;
    }

    decrementTime() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
        }
    }

    incrementScore() {
        this.score++;
    }

    setMole(id, hasMole) {
        const block = this.gameBoardStatus.find(b => b.id === id);
        if (block) {
            block.hasMole = hasMole;
        }
    }

    getActiveMoles() {
        return this.gameBoardStatus.filter(b => b.hasMole);
    }

    getEmptyBlocks() {
        return this.gameBoardStatus.filter(b => !b.hasMole);
    }
}


class View {
    constructor() {
        this.scoreEl = document.querySelector('.score_value');
        this.timerEl = document.querySelector('.timer_value');
        this.startBtn = document.querySelector('.start-game-btn');
        this.gameBoard = document.querySelector('.game-board');
        this.blocks = document.querySelectorAll('.game-board_block');
        //console.log(this.blocks);
    }

    renderScore(score) {
        this.scoreEl.textContent = score;
    }

    renderTimer(timeLeft) {
        this.timerEl.textContent = timeLeft;
    }

    renderBoard(boardStatus) {
        this.blocks.forEach((block, index) => {
            const blockState = boardStatus[index];
            block.innerHTML = ''; 
            if (blockState.hasMole) {
                const moleImage = document.createElement('img');
                moleImage.src = 'images/mole.jpg';
                moleImage.dataset.id = index;
                block.appendChild(moleImage);
            }
        });
    }

    bindStartGame(handler) {
        this.startBtn.addEventListener('click', handler);
    }

    bindBlockClick(handler) {
        this.gameBoard.addEventListener('click', (e) => {
            if (e.target.matches('img')) {
                const blockId = parseInt(e.target.dataset.id);
                //console.log(`Block clicked: ${blockId}`);
                handler(blockId);
            }
        });
    }
    
    showAlert(message) {
        alert(message);
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.timerId = null;
        this.moleTimerId = null;
        
        this.view.bindStartGame(this.handleStartGame);
        this.view.bindBlockClick(this.handleBlockClick);
        
        this._init();
    }

    _init = () => {
        this.view.renderScore(this.model.score);
        this.view.renderTimer(this.model.timeLeft);
        this.view.renderBoard(this.model.gameBoardStatus);
    }

    handleStartGame = () => {
        if (this.model.gameInProgress) return;

        this.model.reset();
        this.model.gameInProgress = true;
 

        this.timerId = setInterval(this._updateTimer, 1000);
        this.moleTimerId = setInterval(this._popMole, 1000);
    }
    
    handleBlockClick = (blockId) => {
        if (!this.model.gameInProgress) return;

        const block = this.model.gameBoardStatus.find(b => b.id === blockId);
        if (block && block.hasMole) {
            this.model.incrementScore();
            this.model.setMole(blockId, false);
            this.view.renderScore(this.model.score);
            this.view.renderBoard(this.model.gameBoardStatus);
        }
    }

    _updateTimer = () => {
        this.model.decrementTime();
        this.view.renderTimer(this.model.timeLeft);

        if (this.model.timeLeft <= 0) {
            this._stopGame();
        }
    }

    _popMole = () => {
        if (this.model.getActiveMoles().length >= 3) return;

        const emptyBlocks = this.model.getEmptyBlocks();
        //console.log(`Empty blocks available: ${emptyBlocks.map(b => b.id).join(', ')}`);
        const randomIndex = Math.floor(Math.random() * emptyBlocks.length);

        //console.log(`Random index for mole pop: ${randomIndex}`);
  

        const randomBlock = emptyBlocks[randomIndex];

        //console.log(`Mole popped at block: ${randomBlock.id}`);
        this.model.setMole(randomBlock.id, true);
        this.view.renderBoard(this.model.gameBoardStatus);
    }

    _stopGame = () => {
        clearInterval(this.timerId);
        clearInterval(this.moleTimerId);
        this.model.gameInProgress = false;
        this.view.showAlert("Time is Over!");
        this.model.reset();
        this._init();
    }
}

const app = new Controller(new Model(), new View());
