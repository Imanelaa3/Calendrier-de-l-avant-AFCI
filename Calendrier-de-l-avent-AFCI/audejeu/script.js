/* document.addEventListener("DOMContentLoaded", function () {
  // Déclaration des variables nécessaires
  const santa = document.querySelector(".santa");
  const gift = document.querySelector(".gift");
  const scoreDisplay = document.querySelector(".score");
  const gameOverMessage = document.querySelector(".game-over-message");
  const gameAudio = document.getElementById("gameAudio");

  // Initialisation des variables
  let score = 0;
  let initialGiftSpeed = parseFloat(localStorage.getItem("initialGiftSpeed")) || 2;
  let giftSpeed = initialGiftSpeed;
  let gameRunning = true;

  // Fonction pour commencer la musique
  function startMusic() {
    gameAudio.play()
      .then(() => {
        // Retire l'écouteur d'événements après le démarrage de la musique
        document.body.removeEventListener("click", startMusic);
      })
      .catch((error) => {
        console.error("Erreur lors du démarrage de la musique : ", error);
        // Si la lecture automatique est bloquée, affiche un message demandant à l'utilisateur d'interagir
        displayInteractionMessage();
      });
  }
0
  // Fonction pour afficher un message demandant à l'utilisateur d'interagir
  function displayInteractionMessage() {
    const message = document.createElement("div");
    message.textContent = "Cliquez n'importe où sur la page pour commencer la musique";
    message.style.position = "fixed";
    message.style.top = "50%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.backgroundColor = "#fff";
    message.style.padding = "20px";
    message.style.border = "1px solid #000";

    document.body.appendChild(message);

    // Ajoute un écouteur d'événements pour démarrer la musique lors de la première interaction utilisateur (clic)
    document.body.addEventListener("click", function () {
      gameAudio.play();
      document.body.removeChild(message);
    });
  }

  // Fonction de gestion du déplacement avec le clavier
  document.addEventListener("keydown", function (event) {
    if (!gameRunning) return;

    const santaLeft = parseFloat(santa.style.left) || 50;

    if (event.key === "ArrowLeft" && santaLeft > 0) {
      santa.style.left = santaLeft - 10 + "px";
    } else if (event.key === "ArrowRight" && santaLeft < window.innerWidth - santa.clientWidth) {
      santa.style.left = santaLeft + 10 + "px";
    }
  });

  // Fonction de gestion du déplacement tactile
  let touchStartX;

  document.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
  });

  document.addEventListener("touchmove", function (event) {
    if (!gameRunning) return;

    const touchEndX = event.touches[0].clientX;

    if (touchEndX < touchStartX) {
      const santaLeft = parseFloat(santa.style.left) || 50;
      if (santaLeft > 0) {
        santa.style.left = santaLeft - 10 + "px";
      }
    } else if (touchEndX > touchStartX) {
      const santaLeft = parseFloat(santa.style.left) || 50;
      if (santaLeft < window.innerWidth - santa.clientWidth) {
        santa.style.left = santaLeft + 10 + "px";
      }
    }
  });

  // Fonction de gestion du clic de la souris
  let isMouseDown = false;

  santa.addEventListener("mousedown", function (event) {
    if (!gameRunning) return;

    isMouseDown = true;
  });

  document.addEventListener("mousemove", function (event) {
    if (!gameRunning || !isMouseDown) return;

    const santaLeft = event.clientX - santa.clientWidth / 2;
    if (santaLeft > 0 && santaLeft < window.innerWidth - santa.clientWidth) {
      santa.style.left = santaLeft + "px";
    }
  });

  document.addEventListener("mouseup", function () {
    isMouseDown = false;
  });

  // Gestion du clic sur l'écran de fin de partie
  gameOverMessage.addEventListener("click", function () {
    resetGame();
  });

  // Fonction de déplacement du cadeau
  function moveGift() {
    if (!gameRunning) return;

    const currentTop = parseFloat(gift.style.top) || 0;

    gift.style.top = currentTop + giftSpeed + "px";

    const santaRect = santa.getBoundingClientRect();
    const giftRect = gift.getBoundingClientRect();

    if (
      santaRect.left < giftRect.right &&
      santaRect.right > giftRect.left &&
      santaRect.bottom > giftRect.top &&
      santaRect.top < giftRect.bottom
    ) {
      score++;
      scoreDisplay.textContent = "Score: " + score;
      resetGift();
    }

    if (currentTop < window.innerHeight) {
      requestAnimationFrame(moveGift);
    } else {
      endGame();
    }
  }

  // Fonction de réinitialisation du cadeau
  function resetGift() {
    if (!gameRunning) return;

    const randomLeft = Math.floor(Math.random() * (window.innerWidth - gift.clientWidth));
    gift.style.left = randomLeft + "px";
    gift.style.top = "0";

    giftSpeed = initialGiftSpeed;

    moveGift();
  }

  // Fonction de fin de jeu
  function endGame() {
    gameRunning = false;

    const highScore = localStorage.getItem("highScore") || 0;

    if (score > highScore) {
      localStorage.setItem("highScore", score);
      gameOverMessage.textContent = "Félicitations ! Nouveau record : " + score;
    } else {
      gameOverMessage.textContent =
        "Game Over. Votre score : " + score + " | Meilleur score : " + highScore;
    }

    score = 0;
    scoreDisplay.textContent = "Score: " + score;

    gameOverMessage.style.display = "block";

    gameAudio.pause();
  }

  // Fonction de réinitialisation du jeu
  function resetGame() {
    gameRunning = true;

    score = 0;
    scoreDisplay.textContent = "Score: " + score;

    gameOverMessage.style.display = "none";

    localStorage.setItem("initialGiftSpeed", initialGiftSpeed);

    resetGift();

    // Commence la musique lorsque le jeu est réinitialisé, déclenchée par une interaction utilisateur
    startMusic();
  }

  // Ajoute cet écouteur pour démarrer la musique dès que la page est chargée
  document.body.addEventListener("click", startMusic);

  // Appelle resetGame pour commencer le jeu
  resetGame();
});
 */

export default class SantaGame {
  constructor() {
    // Création des éléments HTML
    this.gameAudio = document.createElement("audio");
    this.gameAudio.id = "gameAudio";
    this.gameAudio.loop = true;
    this.gameAudio.preload = "auto";

    const audioSource = document.createElement("source");
    audioSource.src = "../../Calendrier-de-l-avent-AFCI/audejeu/music.mp3";
    audioSource.type = "audio/mp3";

    this.gameAudio.appendChild(audioSource);

    this.gameContainer = document.createElement("div");
    this.gameContainer.className = "game-container";

    this.santa = document.createElement("div");
    this.santa.className = "santa";

    this.gift = document.createElement("div");
    this.gift.className = "gift";

    this.gameContainer.appendChild(this.santa);
    this.gameContainer.appendChild(this.gift);

    this.scoreDisplay = document.createElement("div");
    this.scoreDisplay.className = "score";
    this.scoreDisplay.textContent = "Score: 0";

    this.gameOverMessage = document.createElement("div");
    this.gameOverMessage.className = "game-over-message";
    this.gameOverMessage.style.display = "none";
    this.gameOverMessage.textContent = "Game Over!";
    this.container = document.createElement("div");
    // Ajout des éléments au DOM
    this.container.appendChild(this.gameAudio);
    this.container.appendChild(this.gameContainer);
    this.container.appendChild(this.scoreDisplay);
    this.container.appendChild(this.gameOverMessage);

    // Initialisation des variables
    this.score = 0;
    this.initialGiftSpeed =
      parseFloat(localStorage.getItem("initialGiftSpeed")) || 2;
    this.giftSpeed = this.initialGiftSpeed;
    this.gameRunning = true;

    // Attacher les méthodes aux événements
    document.addEventListener("DOMContentLoaded", () => this.init());
    document.addEventListener("keydown", (event) => this.santaMove(event));
    document.addEventListener("touchstart", (event) => this.touchStart(event));
    document.addEventListener("touchmove", (event) => this.touchMove(event));
    this.santa.addEventListener("mousedown", (event) => this.mouseDown(event));
    document.addEventListener("mousemove", (event) => this.mouseMove(event));
    document.addEventListener("mouseup", () => this.mouseUp());

    //initialiser le jeu
    this.init();
  }

  init() {
    // Ajouter l'écouteur pour démarrer la musique dès que la page est chargée
    document.body.addEventListener("click", () => this.startMusic());

    // Appeler resetGame pour commencer le jeu
    this.resetGame();
  }

  startMusic() {
    this.gameAudio
      .play()
      .then(() => {
        // Retire l'écouteur d'événements après le démarrage de la musique
        document.body.removeEventListener("click", () => this.startMusic());
      })
      .catch((error) => {
        console.error("Erreur lors du démarrage de la musique : ", error);
        // Si la lecture automatique est bloquée, affiche un message demandant à l'utilisateur d'interagir
        this.displayInteractionMessage();
      });
  }

  displayInteractionMessage() {
    const message = document.createElement("div");
    message.textContent =
      "Cliquez n'importe où sur la page pour commencer la musique";
    message.style.position = "fixed";
    message.style.top = "50%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.backgroundColor = "#fff";
    message.style.padding = "20px";
    message.style.border = "1px solid #000";

    this.container.appendChild(message);

    // Ajoute un écouteur d'événements pour démarrer la musique lors de la première interaction utilisateur (clic)
    document.body.addEventListener("click",  () =>{
      this.gameAudio.play();
      //document.body.removeChild(message);
    });
  }

  // Vous pouvez organiser les autres fonctions de votre code ici, telles que moveGift, resetGift, endGame, etc.
  santaMove(event) {
    if (!this.gameRunning) return;

    const santaLeft = parseFloat(this.santa.style.left) || 50;

    if (event.key === "ArrowLeft" && santaLeft > 0) {
      this.santa.style.left = santaLeft - 10 + "px";
    } else if (
      event.key === "ArrowRight" &&
      santaLeft < window.innerWidth - this.santa.clientWidth
    ) {
      this.santa.style.left = santaLeft + 10 + "px";
    }
  }

  touchStart(event) {
    if (!this.gameRunning) return;

    this.touchStartX = event.touches[0].clientX;
  }

  touchMove(event) {
    if (!this.gameRunning) return;

    const touchEndX = event.touches[0].clientX;

    if (touchEndX < this.touchStartX) {
      const santaLeft = parseFloat(this.santa.style.left) || 50;
      if (santaLeft > 0) {
        this.santa.style.left = santaLeft - 10 + "px";
      }
    } else if (touchEndX > this.touchStartX) {
      const santaLeft = parseFloat(this.santa.style.left) || 50;
      if (santaLeft < window.innerWidth - this.santa.clientWidth) {
        this.santa.style.left = santaLeft + 10 + "px";
      }
    }
  }

  mouseDown(event) {
    if (!this.gameRunning) return;

    this.isMouseDown = true;
  }

  mouseMove(event) {
    if (!this.gameRunning || !this.isMouseDown) return;

    const santaLeft = event.clientX - this.santa.clientWidth / 2;
    if (santaLeft > 0 && santaLeft < window.innerWidth - this.santa.clientWidth) {
      this.santa.style.left = santaLeft + "px";
    }
  }

  mouseUp() {
    this.isMouseDown = false;
  }

  // Exemple de méthode de déplacement du cadeau
  moveGift() {
    if (!this.gameRunning) return;

    const currentTop = parseFloat(this.gift.style.top) || 0;

    this.gift.style.top = currentTop + this.giftSpeed + "px";

    const santaRect = this.santa.getBoundingClientRect();
    const giftRect = this.gift.getBoundingClientRect();

    if (
      santaRect.left < giftRect.right &&
      santaRect.right > giftRect.left &&
      santaRect.bottom > giftRect.top &&
      santaRect.top < giftRect.bottom
    ) {
      this.score++;
      this.scoreDisplay.textContent = "Score: " + this.score;
      this.resetGift();
    }

    if (currentTop < window.innerHeight) {
      requestAnimationFrame(() => this.moveGift());
    } else {
      this.endGame();
    }
  }

  // Exemple de méthode de réinitialisation du cadeau
  resetGift() {
    if (!this.gameRunning) return;

    const randomLeft = Math.floor(
      Math.random() * (window.innerWidth - this.gift.clientWidth)
    );
    this.gift.style.left = randomLeft + "px";
    this.gift.style.top = "0";

    this.giftSpeed = this.initialGiftSpeed;

    this.moveGift();
  }

  // Exemple de méthode de fin de jeu
  endGame() {
    this.gameRunning = false;

    const highScore = localStorage.getItem("highScore") || 0;

    if (this.score > highScore) {
      localStorage.setItem("highScore", this.score);
      gameOverMessage.textContent =
        "Félicitations ! Nouveau record : " + this.score;
    } else {
      this.gameOverMessage.textContent =
        "Game Over. Votre score : " +
        this.score +
        " | Meilleur score : " +
        highScore;
    }

    this.score = 0;
    this.scoreDisplay.textContent = "Score: " + this.score;

    this.gameOverMessage.style.display = "block";

    //this.gameAudio.pause();

    document.addEventListener('click',this.init.bind(this))

    
  }

  // Exemple de méthode de réinitialisation du jeu
  resetGame() {
    this.gameRunning = true;

    this.score = 0;
    this.scoreDisplay.textContent = "Score: " + this.score;

    this.gameOverMessage.style.display = "none";

    localStorage.setItem("initialGiftSpeed", this.initialGiftSpeed);

    this.resetGift();

    // Commence la musique lorsque le jeu est réinitialisé, déclenchée par une interaction utilisateur
    this.startMusic();
  }
}

// Instancier l'objet SantaGame
// const santaGame = new SantaGame();
