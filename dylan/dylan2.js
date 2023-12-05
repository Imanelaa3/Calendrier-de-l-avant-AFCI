"use strict";

export default class Dylan2 extends HTMLElement {
    constructor() {
        super();

        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameOver = false;

        const popupContent = `
       
    `;
    this.btn3 = document.querySelector('.b3');
    this.btn3.addEventListener('click', () => {
        this.style.display = "block";
        this.innerHTML = popupContent;

    });





        const closeButton = document.createElement('button');
        closeButton.style.position = 'absolute';
        closeButton.style.top = '52%';
        closeButton.style.right = '34%';
        closeButton.style.transform = 'translate(-50%)';
        closeButton.style.backgroundColor = 'red';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = () => this.closeComponent();

        this.appendChild(closeButton);

        const title = document.createElement('h1');
        title.innerText = 'Tic-Tac-Toe';
        this.appendChild(title);

        const gameBoard = document.createElement('div');
        gameBoard.className = 'tic-tac-toe-board';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.onclick = () => this.makeMove(i);
            gameBoard.appendChild(cell);
        }
        this.appendChild(gameBoard);

        this.resultDisplay = document.createElement('p');
        this.resultDisplay.id = 'result';
        this.appendChild(this.resultDisplay);

        const resetButton = document.createElement('button');
        resetButton.onclick = () => this.resetBoard();
        resetButton.innerText = 'Rejouer';
        resetButton.id = 'monBoutonRejouer'; 
        this.appendChild(resetButton);


    }
    closeComponent() {
        this.style.display = 'none';
    }

    makeMove(index) {
        if (this.gameOver || this.board[index] !== '') return;

        this.board[index] = this.currentPlayer;
        this.updateCellUI(index);

        if (this.checkWinner(this.currentPlayer)) {
            this.updateResultUI(`${this.currentPlayer} a gagné !`);
            this.gameOver = true;
        } else if (this.isBoardFull()) {
            this.updateResultUI("Match nul !");
            this.gameOver = true;
        } else {
            this.togglePlayer();
            if (!this.gameOver && this.currentPlayer === 'O') {
                this.makeComputerMove();
            }
        }
    }

    checkWinner(player) {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winCombos.some(combo => combo.every(index => this.board[index] === player));
    }

    isBoardFull() {
        return this.board.every(cell => cell !== '');
    }

    updateCellUI(index) {
        const cellElements = this.getElementsByClassName('cell');
        cellElements[index].innerText = this.board[index];
    }

    updateResultUI(message) {
        this.resultDisplay.innerText = message;
    }

    resetBoard() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.updateResultUI('');
        Array.from(this.getElementsByClassName('cell')).forEach(cell => cell.innerText = '');
    }

    togglePlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    makeComputerMove() {
        if (!this.gameOver) {
            let emptyCells = [];
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i] === '') {
                    emptyCells.push(i);
                }
            }

            let computerMove = -1;

           
            for (let i = 0; i < emptyCells.length; i++) {
                const tempBoard = [...this.board];
                tempBoard[emptyCells[i]] = 'O';
                if (this.checkWinner('O', tempBoard)) {
                    computerMove = emptyCells[i];
                    break;
                }
            }

            
            if (computerMove === -1) {
                for (let i = 0; i < emptyCells.length; i++) {
                    const tempBoard = [...this.board];
                    tempBoard[emptyCells[i]] = 'X';
                    if (this.checkWinner('X', tempBoard)) {
                        computerMove = emptyCells[i];
                        break;
                    }
                }
            }

           
            if (computerMove === -1) {
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                computerMove = emptyCells[randomIndex];
            }

            
            setTimeout(() => {
                this.board[computerMove] = 'O';
                this.updateCellUI(computerMove);

                if (this.checkWinner('O')) {
                    this.updateResultUI(`L'ordinateur a gagné !`);
                    this.gameOver = true;
                } else if (this.isBoardFull()) {
                    this.updateResultUI("Match nul !");
                    this.gameOver = true;
                } else {
                    this.togglePlayer();
                }
            }, 1000);
        }
    }

    
}

customElements.define("balise-animation1", Dylan2);