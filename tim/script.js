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
        background: white;
        width: 200px;
        height: 284px;
        margin: 30px;
        cursor: pointer;
    }

    /* .number {
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
    } */

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
        background: url(./tim/img/fondNoel2.jpg) bottom no-repeat;
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


export default class ChristmasCalendar {
  constructor() {
    // modal
    this.container = document.createElement('div')
    this.modalContainer = document.createElement("div");
    this.modal = document.createElement("modal");
    this.closeButton = document.createElement("button");
    this.buttonCase = document.createElement("button");
    this.number = document.createElement("div");
    // this.containerModal = document.querySelector(".modal-container");
    this.modalTriggers = document.querySelectorAll(".modal-trigger");
    // this.closeButton = document.querySelector(".close-modal");
    this.isAnimating = false;
    this.backgroundMusic = document.createElement('source')
    this.backgroundMusic.src ='./tim/audio/je te souhaite joyeux noel (1).mp3'
    this.backgroundMusic.type = "audio/mp3"


    // Game
    this.game = document.createElement("div");
    this.gameInfo = document.createElement("div");
    this.scoreSpan = document.createElement("span");
    this.tempsSpan = document.createElement("span");
    this.containerGame = document.createElement("div");
    this.settingsContainer = document.createElement("div");
    this.startRestart = document.createElement("button");
    this.rules = document.createElement("h1");
    this.stopMusic = document.createElement("button");
    // this.theScore = document.querySelector(".score");
    // this.leTemps = document.querySelector(".temps");
    // this.containerShoot = document.querySelector(".containerGame");
    // this.restartBtn = document.querySelector(".startRestart");
    this.gameProgress = false;
    this.score = 0;
    this.temps = 30; // Default game duration
    this.interval = null;
 
    
    this.createStyles();
    this.createModal();
    this.createButton();
    // this.createNumber();
    this.addEventListeners();
    this.createGame();
    this.createInputContainer();
  }

  createStyles() {
    //this.body.style.height = "100vh";

    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    this.container.append(styleElement);
  }

  createModal() {
    this.modalContainer.className = "modal-container";
    this.container.append(this.modalContainer);

    this.modal.className = "modal";
    this.modalContainer.append(this.modal);

    this.closeButton.className = "close-modal";
    this.closeButton.classList.add("modal-trigger");
    this.closeButton.textContent = "X";
    this.modal.append(this.closeButton);
  }

  createButton() {
    this.buttonCase.className = "button";
    this.buttonCase.classList.add("modal-btn", "modal-trigger");
    this.container.append(this.buttonCase);
  }

  // createNumber() {
  //   this.number.className = "number";
  //   this.number.textContent = "6";
  //   this.buttonCase.append(this.number);
  // }

  addEventListeners() {
    this.buttonCase.addEventListener("click", () => {
      this.animation1();
      if (!this.isAnimating) {
        this.isAnimating = true;
        // Include the logic for doors animation here
      }
    });

    this.closeButton.addEventListener("click", () => {
      this.modalContainer.classList.remove("active");
      this.buttonCase.style.display = "block";
      // Include logic to pause background music
      //todothis.backgroundMusic.pause();
    });

    /*todo this.stopMusic.addEventListener("click", () => {
      if (this.backgroundMusic.paused) {
        // Si on met la musique est en pause, on appuye sur le bouton pour la jouer
        this.stopMusic.textContent = "stop music";
        this.backgroundMusic.play();
      } else {
        // Si la musique est en train d'être jouer, la mettre en pause
        this.stopMusic.textContent = "play Music";
        this.backgroundMusic.pause();
      }
    });
 */
    this.startRestart.addEventListener("click", () => {
      this.handleRestartButtonClick();
    })

  }

  animation1() {
    // setTimeout(() => {
    //   this.number.style.transition = "scale 1s linear";
    //   this.number.style.scale = "1 -0.029";
    // }, 0);

    // setTimeout(() => {
    //   this.number.style.transition = "rotate 2s linear";
    //   this.number.style.rotate = "90deg";
    // }, 2000);

    // setTimeout(() => {
    //   this.number.style.display = "none";
    // }, 5000);

    setTimeout(() => {
      this.buttonCase.style.display = "none";
      this.modalContainer.classList.add("active");
      // Include logic to play background music
      //todo backgroundMusic.play();
    }, 0);
  }


  handleButtonClick() {
    this.animation1();
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.leftHalf.style.transition = "transform 5s 5s ease";
      this.rightHalf.style.transition = "transform 5s 5s ease";
      this.leftHalf.style.transform = "translateX(-70%)";
      this.rightHalf.style.transform = "translateX(70%)";

      // 8000 ms: temps pour ajuster la transition de la musique avec les portes
      setTimeout(() => {
        // jouer la musique
        //todo backgroundMusic.play();
      }, 8000);
    }
    // Start playing background music when the transition ends
  }


  createGame() {
  this.game.className = "game";
  this.modalContainer.append(this.game);

  this.gameInfo.className = "gameInfo";
  this.game.append(this.gameInfo);

  this.scoreSpan.className = "score";
  this.scoreSpan.textContent = "Your score : 0";
  this.gameInfo.append(this.scoreSpan);

  this.tempsSpan.className = "temps";
  this.tempsSpan.textContent = "time : ";
  this.gameInfo.append(this.tempsSpan);

  this.containerGame.className = "containerGame";
  this.game.append(this.containerGame);

  this.settingsContainer.className = "settingsContainer";
  this.game.append(this.settingsContainer);

  this.startRestart.className = "startRestart";
  this.startRestart.textContent = "Begin or restart";
  this.settingsContainer.append(this.startRestart);

  this.rules.className = "rules";
  this.rules.textContent =
  "Touch as many Christmas gift as you can, but take care not to touch Santa Claus";
  this.settingsContainer.append(this.rules);

  this.stopMusic.className = "stopMusic";
  this.stopMusic.textContent = "stop music";
  this.settingsContainer.append(this.stopMusic);
  }

  createInputContainer() {
    this.inputContainer = document.createElement("div");
    this.inputContainer.className = "time-input-container";
    const label = document.createElement("label");
    label.textContent = "Set Game Duration:";
    this.gameDurationInput = document.createElement("input");
    this.gameDurationInput.type = "number";
    this.gameDurationInput.id = "gameDurationInput";
    this.gameDurationInput.min = "1";
    this.gameDurationInput.value = "30";

    this.inputContainer.append(label, this.gameDurationInput);
    // Append the input to gameInfo
    this.gameInfo.append(this.inputContainer);
  }

  handleRestartButtonClick() {
    // While the game is in progress, do nothing
    if (this.gameProgress) {
      return;
    }

    this.gameProgress = true;
    this.score = 0;
    this.temps = parseInt(this.gameDurationInput.value) || 30; // Use the input value as the game duration
    this.containerGame.innerHTML = "";

    this.startGame();
  }
  startGame() {
    this.interval = setInterval(() => {
      this.cibleBouge();
    }, 500);
  }
  cibleBouge() {
    function createImage(src, id) {
      let img = document.createElement("img");
      img.src = src;
      img.id = id;
      this.containerGame.append(img);
      img.style.top =
        Math.random() * (this.containerGame.clientHeight - img.offsetHeight) +
        "px";
      img.style.right =
        Math.random() * (this.containerGame.clientWidth - img.offsetWidth) +
        "px";
      return img;
    }

    let cible = createImage.call(this, "./tim/img/cadeau.jpg", "cible");
    let pereNoel = createImage.call(this, "./tim/img/pereNoel.jpg", "pereNoel");

    // Hide images after a certain time
    setTimeout(() => {
      cible.remove();
      pereNoel.remove();
    }, 2000);

    // Handle click on the Christmas gift
    cible.addEventListener("click", () => {
      this.handleCibleClick(cible);
    });

    // Handle click on Santa Claus
    pereNoel.addEventListener("click", () => {
      this.handlePereNoelClick(pereNoel);
    });

    // Decrement time
    this.temps -= 1;

    // Display info
    this.tempsSpan.textContent = `Time: ${this.temps}`;

    // Game over
    if (this.temps === 0) {
      clearInterval(this.interval);
      this.containerGame.textContent = "The End";
      this.gameProgress = false; // End the game
    }
  }

  handleCibleClick(cible) {
    this.score += 1;
    cible.style.display = "none";
    this.scoreSpan.textContent = `Score: ${this.score}`;
  }

  handlePereNoelClick(pereNoel) {
    this.score -= 1;
    pereNoel.style.display = "none";
    this.scoreSpan.textContent = `Score: ${this.score}`;
  }
  
}

// Instantiate the ChristmasCalendar class
//christmasCalendarInstance = new ChristmasCalendar();
