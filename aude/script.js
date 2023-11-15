document.addEventListener("DOMContentLoaded", function () {
  const santa = document.querySelector(".santa");
  const gift = document.querySelector(".gift");
  const scoreDisplay = document.querySelector(".score");
  const gameOverMessage = document.querySelector(".game-over-message");

  let score = parseFloat(localStorage.getItem("gameScore")) || 0;
  let initialGiftSpeed = parseFloat(localStorage.getItem("initialGiftSpeed")) || 2;
  let giftSpeed = initialGiftSpeed;

  let gameIsOver = false; 
  document.addEventListener("keydown", function (event) {
    const santaLeft = parseFloat(santa.style.left) || 50;

    if (event.key === "ArrowLeft" && santaLeft > 0) {
      santa.style.left = santaLeft - 10 + "px";
    } else if (event.key === "ArrowRight" && santaLeft < window.innerWidth - santa.clientWidth) {
      santa.style.left = santaLeft + 10 + "px";
    }
  });

  let touchStartX;

  document.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
  });

  document.addEventListener("touchmove", function (event) {
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

  let isMouseDown = false;

  santa.addEventListener("mousedown", function (event) {
    isMouseDown = true;
  });

  document.addEventListener("mousemove", function (event) {
    if (isMouseDown) {
      const santaLeft = event.clientX - santa.clientWidth / 2;
      if (santaLeft > 0 && santaLeft < window.innerWidth - santa.clientWidth) {
        santa.style.left = santaLeft + "px";
      }
    }
  });

  document.addEventListener("mouseup", function () {
    isMouseDown = false;
  });

  gameOverMessage.addEventListener("click", function () {
    resetGame();
  });

  function moveGift() {
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

      localStorage.setItem("gameScore", score);

      resetGift();
    }

    if (currentTop < window.innerHeight) {
      requestAnimationFrame(moveGift);
    } else if (!gameIsOver) { 
      gameIsOver = true;

      gameOverMessage.style.display = "block";

      const bestScore = parseFloat(localStorage.getItem("bestScore")) || 0;
      const scoreMessage = document.createElement("p");

      if (score > bestScore) {
        localStorage.setItem("bestScore", score);
        scoreMessage.textContent = "Félicitations! Vous avez battu votre meilleur score. Score final : " + score;
      } else {
        scoreMessage.textContent = "Score final : " + score;
      }

      gameOverMessage.appendChild(scoreMessage);
    }
  }

  function resetGift() {
    const randomLeft = Math.floor(Math.random() * (window.innerWidth - gift.clientWidth));
    gift.style.left = randomLeft + "px";
    gift.style.top = "0";

    giftSpeed = initialGiftSpeed;

    moveGift();
  }

  function resetGame() {
    score = 0;
    scoreDisplay.textContent = "Score: " + score;

    localStorage.setItem("gameScore", score);

    gameOverMessage.style.display = "none";

    localStorage.setItem("initialGiftSpeed", initialGiftSpeed);

    resetGift();

   
    gameIsOver = false;
  }

  resetGame();
});
