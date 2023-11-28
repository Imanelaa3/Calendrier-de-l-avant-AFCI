"use strict";
/*
==============================
Styles
==============================
*/
const styles = /* CSS */ ` 
    *, ::before, ::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Case calendrier */
    .button {
        position: relative;
        background: white;
        width: 200px;
        height: 284px;
        margin: 30px;
        cursor: pointer;
    }

     .number {
        position: relative;
        font-size: 2.5em;
        top: 35px;
        left: 1px;
        color: red;
        z-index: 10;
    }

    .left,
    .right {
        position: absolute;
        background-color: red;
        width: 50%;
        height: 100%;
        top: 0;
        z-index: 5;
    }

    .left {
        left: 0;
    }

    .left div {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .right {
        right: 0;
    } 

    /* Modale */
    .modal-container {
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        overflow-y: hidden;
        display: none;
    }

    .modal-container.active {
        display: block;
    }

    .modal {
        width: 100%;
        height: 100%;
        padding: 30px;
        background-color: white;
    }

    .close-modal {
        padding: 5px 5px;
        color: white;
        border: none;
        border-radius: 0.3em;
        font-size: 18px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        background: rgb(240, 8, 8);
    }

    /* Jeu */
    .game {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .gameInfo {
        display: flex;
        gap: 100px;
    }

    .gameInfo span {
        font-size: 1em;
    }

    .containerGame {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 3em;
        height: 80vh;
        width: 90vw;
        border: 1px solid red;
        position: relative;
        cursor: url(https://cur.cursors-4u.net/holidays/hol-4/hol393.cur), auto !important;;
        padding: 10px;
        box-shadow: 2px 2px 5px black;
        overflow: hidden;
        background: url(./img/fondNoel2.jpg) bottom no-repeat;
    }

    .settingsContainer {
        margin-top: 20px;
        display: flex;
        gap: 150px;
    }

    .rules {
        font-size: 1.2em;
        color: red;
        text-align: center;
    }
    #gameDurationInput {
        width: 60px
    }
    .startRestart,
    .stopMusic {
        align-self: flex-end;
        padding: 10px 20px;
        background-color: green;
        border-radius: 1em;
        cursor: pointer;
        color: white;
    }

    #cible,
    #pereNoel {
        height: 40px;
        width: 40px;
        border-radius: 5em;
        position: absolute;
        transition: 0.3s;
        animation: cible 30s infinite;
    }

    @keyframes cible {
        to {
            transform: translateY(-200px) rotate(360deg);
        }
    }

    @media screen and (max-width:630px) {
        .gameInfo {
            gap: 50px; 
        }
        }
    @media screen and (max-width:830px) {
        .settingsContainer {
            gap: 10px;
        }

        .startRestart,
        .stopMusic {
            font-size: 0.8em;
            padding: 5px;
        }

        .rules {
            font-size: 1em;
        }
    }
`;

/*
==============================
Création de toutes mes parties 
==============================
*/
const body = document.querySelector("body");
body.style.height = "100vh";

// Injecter le style
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
body.append(styleElement);

// Création modale
const modalContainer = document.createElement("div");
modalContainer.className = "modal-container";
body.append(modalContainer);
const modal = document.createElement("modal");
modal.className = "modal";
modalContainer.append(modal);
const buttonModal = document.createElement("button");
buttonModal.className = "close-modal";
buttonModal.classList.add("modal-trigger");
buttonModal.textContent = "X";
modal.append(buttonModal);

// Créer le bouton
const buttonCase = document.createElement("button");
buttonCase.className = "button";
buttonCase.classList.add("modal-btn", "modal-trigger");
body.append(buttonCase);

// //Créer la partie gauche
const leftHalf = document.createElement("div");
leftHalf.className = "left";
buttonCase.append(leftHalf);
const leftImage = document.createElement("img");
leftImage.src = "./img/gauche.png";
leftImage.alt = "leftimage";
leftHalf.append(leftImage);

// Créer la partie droite
const rightHalf = document.createElement("div");
rightHalf.className = "right";
buttonCase.append(rightHalf);
const rightImage = document.createElement("img");
rightImage.src = "./img/droite.png";
rightImage.alt = "rightImage";
rightHalf.appendChild(rightImage);

//Créer la partie Nombre
const number = document.createElement("div");
number.className = "number";
number.textContent = "6";
buttonCase.append(number);

/*
=================================
Création de ma case du calendrier
et de la modal
=================================
*/

// Sélection de mes différentes parties
const containerModal = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const closeButton = document.querySelector(".close-modal");
let isAnimating = false;

// animation nombre
function animation1() {
  // Premier changement de transformation au bout de 0 ms
  setTimeout(() => {
    number.style.transition = "scale 1s linear";
    number.style.scale = "1 -0.029";
  }, 0);

  // Deuxième changement de transformation au bout de 2000 ms
  setTimeout(() => {
    number.style.transition = "rotate 2s linear";
    number.style.rotate = "90deg";
  }, 2000);
  setTimeout(() => {
    number.style.display = "none";
  }, 5000);
  setTimeout(() => {
    // Cacher le bouton
    buttonCase.style.display = "none";
    // appararition de la modal au bout de 9000 ms
    containerModal.classList.add("active");
  }, 9000);
}
const backgroundMusic = document.getElementById("backgroundMusic");
// event de déclenchement de mon button et des portes
buttonCase.addEventListener("click", () => {
  animation1();
  if (!isAnimating) {
    isAnimating = true;
    leftHalf.style.transition = "transform 5s 5s ease";
    rightHalf.style.transition = "transform 5s 5s ease";
    leftHalf.style.transform = "translateX(-70%)";
    rightHalf.style.transform = "translateX(70%)";

    // 8000 ms: temps pour ajuster la transition de la musique avec les portes
    setTimeout(() => {
      // jouer la musique
      backgroundMusic.play();
    }, 8000);
  }
  // Start playing background music when the transition ends
});

// Retirer ma modal

closeButton.addEventListener("click", () => {
  containerModal.classList.remove("active");
  buttonCase.style.display = "block";

  backgroundMusic.pause();
});

/* 
======================
    Création Jeu
======================
*/

// Création des éléments Html
const game = document.createElement("div");
game.className = "game";
modalContainer.append(game);

const gameInfo = document.createElement("div");
gameInfo.className = "gameInfo";
game.append(gameInfo);

const score = document.createElement("span");
score.className = "score";
score.textContent = "Your score : 0";
gameInfo.append(score);

const temps = document.createElement("span");
temps.className = "temps";
temps.textContent = "time : ";
gameInfo.append(temps);

const containerGame = document.createElement("div");
containerGame.className = "containerGame";
game.append(containerGame);

const settingsContainer = document.createElement("div");
settingsContainer.className = "settingsContainer";
game.append(settingsContainer);

const startRestart = document.createElement("button");
startRestart.className = "startRestart";
startRestart.textContent = "Begin or restart";
settingsContainer.append(startRestart);

const rules = document.createElement("h1");
rules.className = "rules";
rules.textContent =
  "Touch as many Christmas gift as you can, but take care not to touch Santa Claus";
settingsContainer.append(rules);

// Création d'un bouton permettant d'arrêter la musique
const stopMusic = document.createElement("button");
stopMusic.className = "stopMusic";
stopMusic.textContent = "stop music";
settingsContainer.append(stopMusic);

// Création de l'event stopMusic

stopMusic.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    // Si on met la musique est en pause, on appuye sur le bouton pour la jouer
    stopMusic.textContent = "stop music";
    backgroundMusic.play();
  } else {
    // Si la musique est en train d'être jouer, la mettre en pause
    stopMusic.textContent = "play Music";
    backgroundMusic.pause();
  }
});

// Sélection de mes éléments Html
let theScore = document.querySelector(".score");
let leTemps = document.querySelector(".temps");
let containerShoot = document.querySelector(".containerGame");
let restartBtn = document.querySelector(".startRestart");
let gameProgress = false;

// Création dynamique de l'input pour la durée du jeu
let inputContainer = document.createElement("div");
inputContainer.className = "time-input-container";
let label = document.createElement("label");
label.textContent = "Set Game Duration:";
let gameDurationInput = document.createElement("input");
gameDurationInput.type = "number";
gameDurationInput.id = "gameDurationInput";
gameDurationInput.min = "1";
gameDurationInput.value = "30";

inputContainer.append(label, gameDurationInput);
// je met dans gameInfo l'input que je viens de créer
document.querySelector(".gameInfo").append(inputContainer);

restartBtn.addEventListener("click", function () {
  // Tant que le jeu est en cours, on ne fait rien
  if (gameProgress === true) {
    return;
  }

  gameProgress = true;
  let score = 0;
  let temps = parseInt(gameDurationInput.value); // Utilisez la valeur de l'input comme la durée du jeu
  containerShoot.innerHTML = "";

  let interval = setInterval(function cibleBouge() {
    function createImage(src, id) {
      let img = document.createElement("img");
      img.src = src;
      img.id = id;
      containerShoot.append(img);
      img.style.top =
        Math.random() * (containerShoot.clientHeight - img.offsetHeight) + "px";
      img.style.right =
        Math.random() * (containerShoot.clientWidth - img.offsetWidth) + "px";
      return img;
    }

    let cible = createImage("./img/cadeau.jpg", "cible");
    let pereNoel = createImage("./img/pereNoel.jpg", "pereNoel");

    // disparition cible après un certain temps
    setTimeout(function () {
      cible.remove();
      pereNoel.remove();
    }, 2000);

    // clique sur la cible
    cible.addEventListener("click", function () {
      score += 1;
      cible.style.display = "none";
      theScore.textContent = `score : ${score}`;
    });

    // clique sur le père Noël
    pereNoel.addEventListener("click", function () {
      score -= 1;
      pereNoel.style.display = "none";
      theScore.textContent = `score : ${score}`;
    });

    temps -= 1;

    // affichage de nos infos
    leTemps.textContent = `time : ${temps}`;

    // fin du jeu
    if (temps === 0) {
      clearInterval(interval);
      containerShoot.textContent = "The End";
      gameProgress = false; // on met fin au jeu
    }
  }, 500); // Définir le délai à 500 millisecondes (0,5 seconde) pour une apparition plus fréquente
});
