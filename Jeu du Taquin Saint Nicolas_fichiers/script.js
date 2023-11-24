let timerInterval;
let seconds = 0;
let minutes = 0;
let bestTime;

const backgroundMusic=document.getElementById("background-music");

function startMusic() {
    backgroundMusic.play();
 }
 function stopMusic() {
    backgroundMusic.pause();
 }
 

function startNewGame() {
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

function startMusicOnClick() {
    document.body.removeEventListener('click', startMusicOnClick);
    backgroundMusic.play();
}

document.body.addEventListener('click', startMusicOnClick);



function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    updateTimerDisplay();
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    minutes = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function movePiece(clickedPiece) {
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

const levels = {
    easy: { boardSize: 3, pieceSize: 100, image: "nicolas.jpg" },
    medium: { boardSize: 4, pieceSize: 75, image: "nicolas2.jpg" },
    hard: { boardSize: 5, pieceSize: 60, image: "nicolas3.jpg" },
    extreme: { boardSize: 7, pieceSize: 50, image: "pere.jpg" },
    ultime: { boardSize:8, pieceSize: 40, image: "merci.jpg" }
};

let currentLevel = levels.easy;
let boardSize = currentLevel.boardSize;
let pieceSize = currentLevel.pieceSize;
let imageSrc = currentLevel.image;

let pieces = [];
let emptyPiece = { row: boardSize - 1, col: boardSize - 1 };

document.getElementById("new-game-button").addEventListener("click", startNewGame);
document.getElementById("easy-button").addEventListener("click", () => changeLevel("easy"));
document.getElementById("medium-button").addEventListener("click", () => changeLevel("medium"));
document.getElementById("hard-button").addEventListener("click", () => changeLevel("hard"));
document.getElementById("extreme-button").addEventListener("click", () => changeLevel("extreme"));
document.getElementById("ultime-button").addEventListener("click", () => changeLevel("ultime"));

function changeLevel(level) {
    currentLevel = levels[level];
    boardSize = currentLevel.boardSize;
    pieceSize = currentLevel.pieceSize;
    imageSrc = currentLevel.image;

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
    startNewGame();
}

let besTime;

function startNewGame() {
    console.log("Starting a new game...");
    createPuzzlePieces();
    shufflePuzzlePieces();
    // console.log(pieces);
    emptyPiece = pieces.at(-1);
    document.getElementById("timer").style.display = "block";
    resetTimer();
    besTime = localStorage.getItem("bestTime");
    if (bestTime) {
        console.log("Best time:", bestTime);
        alert("Meilleur temps : " + bestTime);
    }
    renderPuzzle();
    startTimer();

}



function createPuzzlePieces() {
    pieces = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const number = row * boardSize + col + 1;
            const piece = { number, row, col, drawCol: col, drawRow: row };
            pieces.push(piece);
        }
    }
}

function shufflePuzzlePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        swapPieces(pieces[i], pieces[j]);
    }
}

function swapPieces(piece1, piece2) {
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

function renderPuzzle() {
    console.log("Rendering puzzle...");
    const puzzleContainer = document.getElementById("puzzle-container");
    puzzleContainer.innerHTML = "";

    pieces.forEach(piece => {
        const pieceElement = document.createElement("div");
        pieceElement.classList.add("puzzle-piece");
        pieceElement.id = piece.number
        pieceElement.style.width = pieceSize + "px";
        pieceElement.style.height = pieceSize + "px";
        pieceElement.style.cursor = "pointer";
        pieceElement.style.backgroundImage = `url(${imageSrc})`;
        if (piece === emptyPiece) {
            pieceElement.style.backgroundImage = "";
        }
        pieceElement.style.backgroundSize = `${boardSize * pieceSize}px ${boardSize * pieceSize}px`;
        pieceElement.style.backgroundPosition = `-${piece.drawCol * pieceSize}px -${piece.drawRow * pieceSize}px`;
        // console.log(piece, pieceElement); 
        pieceElement.style.gridRow = `${piece.row + 1} / span 1`;
        pieceElement.style.gridColumn = `${piece.col + 1} / span 1`;
        pieceElement.addEventListener("click", () => movePiece(piece));
        puzzleContainer.appendChild(pieceElement);
    });
}
function movePiece(clickedPiece) {
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

            const currentTime = minutes * 60 + seconds;
            if (!bestTime || currentTime < bestTime) {
                bestTime = currentTime;

                localStorage.setItem("bestTime", bestTime);

                alert(`Félicitations ! Vous avez résolu le puzzle de Saint-Nicolas en ${minutes} minutes et ${seconds} secondes ! Nouveau meilleur temps : ${formatTime(bestTime)} !`);
            } else {
                alert(`Félicitations ! Vous avez résolu le puzzle de Saint-Nicolas en ${minutes} minutes et ${seconds} secondes ! Meilleur temps actuel : ${formatTime(bestTime)} !`);
            }
        }
    }
}

function isAdjacent(piece1, piece2) {
    const rowDiff = Math.abs(piece1.row - piece2.row);
    const colDiff = Math.abs(piece1.col - piece2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}


function isPuzzleSolved() {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].number !== i + 1) {
            return false;
        }
    }
    return true;
}

startNewGame();
