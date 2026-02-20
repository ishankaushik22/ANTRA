class Model {
    constructor() {
        this.gameBoardStatus = Array(12).fill(null).map((_, index) => ({ id: index, hasMole: false, hasSnake: false }));
        this.score = 0;
        this.timeLeft = 30;
        this.gameInProgress = false;
    }

    reset() {
        this.score = 0;
        this.timeLeft = 30;
        this.gameBoardStatus.forEach(block => {
            block.hasMole = false;
            block.hasSnake = false;
        });
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

    setSnake(id, hasSnake) {
        const block = this.gameBoardStatus.find(b => b.id === id);
        if (block) {
            block.hasSnake = hasSnake;
        }
    }

    getSnakeBlock() {
        return this.gameBoardStatus.find(b => b.hasSnake);
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
            if (blockState.hasSnake) {
                const snakeImage = document.createElement('img');
                snakeImage.src = 'images/snake.jpg';
                snakeImage.dataset.id = index;
                snakeImage.dataset.type = 'snake';
                block.appendChild(snakeImage);
            } else if (blockState.hasMole) {
                const moleImage = document.createElement('img');
                moleImage.src = 'images/mole.jpg';
                moleImage.dataset.id = index;
                moleImage.dataset.type = 'mole';
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
                const type = e.target.dataset.type;
                //console.log(`Block clicked: ${blockId}`);
                handler({type, id: blockId});
            }
        });
    }
    
    showAlert(message) {
        alert(message);
    }

    renderSnakeGameOverBoard() {
        this.blocks.forEach(block => {
            block.innerHTML = '';
            const snakeImage = document.createElement('img');
            snakeImage.src = 'images/snake.jpg';
            block.appendChild(snakeImage);
        });
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.timerId = null;
        this.moleTimerId = null;
        this.snakeTimerId = null;
        
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
        this._init();
        this.model.gameInProgress = true;
 

        this.timerId = setInterval(this._updateTimer, 1000);
        this.moleTimerId = setInterval(this._popMole, 1000);
        this.snakeTimerId = setInterval(this._popSnake, 2000);
    }
    
    handleBlockClick = (block) => {
        if (!this.model.gameInProgress) return;

        const { type, id } = block;

        if (type === 'mole') {
            const moleBlock = this.model.gameBoardStatus.find(b => b.id === id);
            if (moleBlock && moleBlock.hasMole) {
                this.model.incrementScore();
                this.model.setMole(id, false);
                this.view.renderScore(this.model.score);
                this.view.renderBoard(this.model.gameBoardStatus);
            }
        } else if (type === 'snake') {
            this._snakeGameOver();
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
        const randomIndex = Math.floor(Math.random() * emptyBlocks.length);
        const randomBlock = emptyBlocks[randomIndex];
        this.model.setMole(randomBlock.id, true);
        this.view.renderBoard(this.model.gameBoardStatus);
    }

    _popSnake = () => {
        const currentSnake = this.model.getSnakeBlock();
        if(currentSnake) {
            this.model.setSnake(currentSnake.id, false);
        }
        const randomIndex = Math.floor(Math.random() * this.model.gameBoardStatus.length);
        this.model.setSnake(randomIndex, true);
        this.view.renderBoard(this.model.gameBoardStatus);
    }

    _snakeGameOver = () => {
        clearInterval(this.timerId);
        clearInterval(this.moleTimerId);
        clearInterval(this.snakeTimerId);
        this.model.gameInProgress = false;
        this.view.showAlert("You clicked the snake! Game Over!");
        this.view.renderSnakeGameOverBoard();
    }

    _stopGame = () => {
        clearInterval(this.timerId);
        clearInterval(this.moleTimerId);
        clearInterval(this.snakeTimerId);
        this.model.gameInProgress = false;
        this.view.showAlert("Time is Over!");
        this._init();
    }
}

const app = new Controller(new Model(), new View());
