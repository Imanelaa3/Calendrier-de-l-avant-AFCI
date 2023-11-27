document.addEventListener("DOMContentLoaded", function () {
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
