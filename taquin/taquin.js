export default class aude extends HTMLElement{

setHTML()
{
    const popupContent = `
        <link rel="stylesheet" href="./taquin/taquin.css">
        <h1>Jeu du Taquin Saint Nicolas</h1>
        <audio id="background-music" loop>
            <source src="./taquin/music.mp3" type="audio/mp3">
        </audio>

        <div id="timer" style="display: none;">0:00</div>

        <div class="flex">
            <div id="puzzle-container" class="easy"></div>
            <div id="original-images-container">
                <img id="original-image-easy" class="original-image" src="./taquin/nicolas.jpg" alt="Image originale facile">
                <img id="original-image-medium" class="original-image" src="./taquin/nicolas2.jpg" alt="Image originale moyenne">
                <img id="original-image-hard" class="original-image" src="./taquin/nicolas3.jpg" alt="Image originale difficile">
                <img id="original-image-extreme" class="original-image" src="./taquin/pere.jpg" alt="Image originale extreme">
                <img id="original-image-ultime" class="original-image" src="./taquin/merci.jpg" alt="Image originale ultime">
            </div>
        </div>

        <button id="new-game-button">Nouvelle Partie</button><br><br>
        <button id="easy-button">Facile</button>
        <button id="medium-button">Moyen</button>
        <button id="hard-button">Difficile</button>
        <button id="extreme-button">extreme</button>
        <button id="ultime-button">ultime</button>
        
    `;  


    this.style.display = "block";
    this.innerHTML = popupContent;
    this.backgroundMusic = document.getElementById("background-music");
    document.body.addEventListener('click', this.startMusicOnClick.bind(this));
    document.getElementById("new-game-button").addEventListener("click", () => this.startNewGame);
    document.getElementById("easy-button").addEventListener("click", () => this.changeLevel("easy"));
    document.getElementById("medium-button").addEventListener("click", () => this.changeLevel("medium"));
    document.getElementById("hard-button").addEventListener("click", () => this.changeLevel("hard"));
    document.getElementById("extreme-button").addEventListener("click", () => this.changeLevel("extreme"));
    document.getElementById("ultime-button").addEventListener("click", () => this.changeLevel("ultime"));
}




timerInterval;
seconds = 0;
minutes = 0;
bestTime;



startMusic() {
    backgroundMusic.play();
}
stopMusic() {
    backgroundMusic.pause();
}

startNewGame() {
    console.log("Starting a new game...");
    createPuzzlePieces();
    shufflePuzzlePieces();
    emptyPiece = pieces.at(-1);
    resetTimer();
    changeLevel('easy');
    document.getElementById("timer").style.display = "block";
    document.getElementById("game-container").style.display = "block";
    bestTime = localStorage.getItem("bestTime");

    if (bestTime) {
        console.log("Best time:", bestTime);
        alert("Meilleur temps : " + bestTime);
    }

    renderOriginalImage();
    renderPuzzle();
    startTimer();
    startMusic();
}

startMusicOnClick() {
    document.body.removeEventListener('click', this.startMusicOnClick);
    console.log(this);
    this.backgroundMusic.play();
}




startTimer() {
    this.timerInterval = setInterval(this.updateTimer.bind(this), 1000);
}

stopTimer() {
    clearInterval(this.timerInterval);
}

updateTimer() {
    this.seconds++;
    if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
    }
    this.updateTimerDisplay();
}

resetTimer() {
    this.stopTimer();
    this.seconds = 0;
    this.minutes = 0;
    this.updateTimerDisplay();
}

updateTimerDisplay() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `${this.minutes}:${this.seconds < 10 ? "0" : ""}${this.seconds}`;
}

movePiece(clickedPiece) {
    console.log(`Piece clicked: ${JSON.stringify(clickedPiece)}`);
    console.log(isAdjacent(clickedPiece, emptyPiece));
    if (isAdjacent(clickedPiece, emptyPiece)) {
        console.log("Moving piece...");
        console.log(clickedPiece, emptyPiece);
        swapPieces(clickedPiece, emptyPiece);
        console.log(clickedPiece, emptyPiece);
        renderPuzzle();

        if (isPuzzleSolved()) {
            stopTimer();
            alert(`Félicitations ! Vous avez résolu le puzzle de Saint-Nicolas en ${minutes} minutes et ${seconds} secondes !`);
        }
    }
}

levels = {
    easy: { boardSize: 3, pieceSize: 100, image: "./taquin/nicolas.jpg" },
    medium: { boardSize: 4, pieceSize: 75, image: "./taquin/nicolas2.jpg" },
    hard: { boardSize: 5, pieceSize: 60, image: "./taquin/nicolas3.jpg" },
    extreme: { boardSize: 7, pieceSize: 50, image: "./taquin/pere.jpg" },
    ultime: { boardSize: 8, pieceSize: 40, image: "./taquin/merci.jpg" }
};

currentLevel = this.levels.easy;
boardSize = this.currentLevel.boardSize;
pieceSize = this.currentLevel.pieceSize;
imageSrc = this.currentLevel.image;

pieces = [];
emptyPiece = { row: this.boardSize - 1, col: this.boardSize - 1 };



changeLevel(level) {
    this.currentLevel = this.levels[level];
    this.boardSize = this.currentLevel.boardSize;
    this.pieceSize = this.currentLevel.pieceSize;
    this.imageSrc = this.currentLevel.image;

    const originalImagesContainer = document.getElementById("original-images-container");
    const originalImageElements = document.querySelectorAll('.original-image');

    originalImageElements.forEach(img => {
        img.style.display = 'none';
    });

    const originalImage = document.getElementById("original-image-" + level);
    if (originalImage) {
        originalImage.style.display = 'block';
    } else {
        console.error("L'élément originalImage est null.");
    }

    const puzzleContainer = document.getElementById("puzzle-container");
    puzzleContainer.className = "";
    puzzleContainer.classList.add(level);
    this.startNewGame();
}

besTime;

startNewGame() {
    console.log("Starting a new game...");
    this.createPuzzlePieces();
    this.shufflePuzzlePieces();
    // console.log(pieces);
    this.emptyPiece = this.pieces.at(-1);
    document.getElementById("timer").style.display = "block";
    this.resetTimer();
    this.besTime = localStorage.getItem("bestTime");
    if (this.bestTime) {
        console.log("Best time:", this.bestTime);
        alert("Meilleur temps : " + this.bestTime);
    }
    this.renderPuzzle();
    this.startTimer();

}



createPuzzlePieces() {
    this.pieces = [];
    const boardSize = this.boardSize;
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const number = row * boardSize + col + 1;
            const piece = { number, row, col, drawCol: col, drawRow: row };
            this.pieces.push(piece);
        }
    }
}

shufflePuzzlePieces() {
    for (let i = this.pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        this.swapPieces(this.pieces[i], this.pieces[j]);
    }
}

swapPieces(piece1, piece2) {
    const tempRow = piece1.row;
    const tempCol = piece1.col;
    const tempnum = piece1.number;
    piece1.number = piece2.number;
    piece1.row = piece2.row;
    piece1.col = piece2.col;
    piece2.number = tempnum;
    piece2.row = tempRow;
    piece2.col = tempCol;
}

renderPuzzle() {
    console.log("Rendering puzzle...");
    const puzzleContainer = document.getElementById("puzzle-container");
    puzzleContainer.innerHTML = "";
    const pieceSize = this.pieceSize;
    this.pieces.forEach(piece => {
        const pieceElement = document.createElement("div");
        pieceElement.classList.add("puzzle-piece");
        pieceElement.id = piece.number
        pieceElement.style.width = pieceSize + "px";
        pieceElement.style.height = pieceSize + "px";
        pieceElement.style.cursor = "pointer";
        pieceElement.style.backgroundImage = `url(${this.imageSrc})`;
        if (piece === this.emptyPiece) {
            pieceElement.style.backgroundImage = "";
        }
        pieceElement.style.backgroundSize = `${this.boardSize * pieceSize}px ${this.boardSize * pieceSize}px`;
        pieceElement.style.backgroundPosition = `-${piece.drawCol * pieceSize}px -${piece.drawRow * pieceSize}px`;
        // console.log(piece, pieceElement); 
        pieceElement.style.gridRow = `${piece.row + 1} / span 1`;
        pieceElement.style.gridColumn = `${piece.col + 1} / span 1`;
        pieceElement.addEventListener("click", () => this.movePiece(piece));
        puzzleContainer.appendChild(pieceElement);
    });
}
movePiece(clickedPiece) {
    const emptyPiece = this.emptyPiece;
    console.log(`Piece clicked: ${JSON.stringify(clickedPiece)}`);
    console.log(this.isAdjacent(clickedPiece, emptyPiece));
    if (this.isAdjacent(clickedPiece, emptyPiece)) {
        console.log("Moving piece...");
        console.log(clickedPiece, emptyPiece);
        this.swapPieces(clickedPiece, emptyPiece);
        console.log(clickedPiece, emptyPiece);
        this.renderPuzzle();

        if (this.isPuzzleSolved()) {
            this.stopTimer();
            const besTime = this.besTime, minutes = this.minutes, seconds = this.seconds;
            const currentTime = minutes * 60 + seconds;
            if (!bestTime || currentTime < bestTime) {
                bestTime = currentTime;

                localStorage.setItem("bestTime", bestTime);

                alert(`Félicitations ! Vous avez résolu le puzzle de Saint-Nicolas en ${minutes} minutes et ${seconds} secondes ! Nouveau meilleur temps : ${(bestTime)} !`);
       

            } else {
                alert(`Félicitations ! Vous avez résolu le puzzle de Saint-Nicolas en ${minutes} minutes et ${seconds} secondes ! Meilleur temps actuel : ${(bestTime)} !`);
            }
        }

    }
}

isAdjacent(piece1, piece2) {
    const rowDiff = Math.abs(piece1.row - piece2.row);
    const colDiff = Math.abs(piece1.col - piece2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}


isPuzzleSolved() {
    for (let i = 0; i < this.pieces.length; i++) {
        if (this.pieces[i].number !== i + 1) {
            return false;
        }
    }
    return true;
}
    connectedCallback()
    {
        this.setHTML();
        this.startNewGame();
    }
    disconnectedCallback()
    {
        this.textContent = "";
    }
}
customElements.define("balise-animation6",aude)