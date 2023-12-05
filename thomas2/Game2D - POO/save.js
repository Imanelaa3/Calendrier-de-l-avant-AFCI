var canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth; // Set canvas width to full window width
canvas.height = window.innerHeight; // Set canvas height to full window height
var speed = 2;
var ctx = canvas.getContext("2d");
var level = 1;
var score = 0;
var nextLevelThreshold = 10; // Seuil pour le niveau 2

// Load character image
var characterImage = new Image();
characterImage.onload = function () {
  // Le code pour dessiner l'image ici, après que l'image soit chargée
  ctx.drawImage(
    characterImage,
    character.x,
    character.y,
    character.width,
    character.height
  );
};
characterImage.src = "./src/perso.png";

var backgroundImage = new Image();
backgroundImage.onload = function () {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};
backgroundImage.src = "./src/background.png";
const key = {};
// Character properties
var character = {
  x: canvas.width * 0.1,
  y: canvas.height * 0.8, // Start above the ground
  width: canvas.width * 0.05, // 5% of the canvas width
  height: canvas.width * 0.05, // 5% of the canvas width, assuming square character
  speed: 10,
  jumping: false,
  jumpPower: 20, // Puissance de saut
  verticalSpeed: -99,
};
//Structure des cadeaux
function Gift(x, y, category) {
  this.x = x;
  this.y = y;
  this.width = 20; // Taille arbitraire
  this.height = 20; // Taille arbitraire
  this.category = category; // 1, 2, ou 3
  this.speed = speed;
}

// Points du joueur
var score = 0;

// The ground
var ground = {
  y: canvas.height * 0.8, // 20% from the bottom
  height: canvas.height * 0.2,
};

// Générer des cadeaux
var gifts = [];
function generateGift() {
  let x = Math.random() * canvas.width;
  let y = canvas.height * 0.1; // 10% du haut
  let category = Math.ceil(Math.random() * 3); // Catégorie aléatoire 1, 2, ou 3
  let speed = Math.random() * 5 + 2; // Vitesse de chute aléatoire
  gifts.push(new Gift(x, y, category, speed));
}
// Dessiner les cadeaux
function drawGifts() {
  gifts.forEach((gift) => {
    if (gift.category === 1) {
      ctx.fillStyle = "green"; // Couleur pour catégorie 1
    } else if (gift.category === 2) {
      ctx.fillStyle = "blue"; // Couleur pour catégorie 2
    } else if (gift.category === 3) {
      ctx.fillStyle = "red"; // Couleur pour catégorie 3
    }
    ctx.fillRect(gift.x, gift.y, gift.width, gift.height);
  });
}
// Mettre à jour la position des cadeaux
function updateGifts() {
  for (let i = gifts.length - 1; i >= 0; i--) {
    gifts[i].y += gifts[i].speed;
    if (gifts[i].y > ground.y) {
      gifts.splice(i, 1); // Supprimer le cadeau s'il atteint le sol
    }
  }
}

// Détection des collisions
function checkCollisions() {
  gifts.forEach((gift, index) => {
    if (
      character.x < gift.x + gift.width &&
      character.x + character.width > gift.x &&
      character.y < gift.y + gift.height &&
      character.y + character.height > gift.y
    ) {
      // Collision détectée
      if (gift.category === 1) {
        score += 1;
      } else if (gift.category === 2) {
        score += 5;
      } else if (gift.category === 3) {
        score -= 5;
      }

      // Supprimer le cadeau
      gifts.splice(index, 1);
    }
  });
}

// Draw the game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  var drawWidth = canvas.width;
  var drawHeight = canvas.height * 0.8; // 80% de la hauteur du canvas

  // Dessiner l'image d'arrière-plan
  ctx.drawImage(backgroundImage, 0, 0, drawWidth, drawHeight);

  // Draw the ground
  ctx.fillStyle = "black"; // Black color for the ground
  ctx.fillRect(0, ground.y, canvas.width, ground.height);

  // Draw the character
  ctx.drawImage(
    characterImage,
    character.x,
    character.y,
    character.width,
    character.height
  );

  window.requestAnimationFrame(draw);
  drawGifts(); // Dessiner les cadeaux
  drawScore(); // Dessiner le score
}
// Afficher le score
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, ground.y + 20); // Afficher dans la partie du sol
  ctx.fillText("Score: " + score + " - Niveau: " + level, 10, ground.y + 20);
}
// Update the game state
function update() {
  if (key.left) {
    character.x -= character.speed;
  }
  if (key.right) {
    character.x += character.speed;
  }
  // Gravity
  if (character.y + character.height < ground.y) {
    character.verticalSpeed += 1; // This simulates gravity
  } else {
    character.y = ground.y - character.height; // Adjust to land on the ground

    if (character.jumping) {
      character.jumping = false;
      character.verticalSpeed = -character.jumpPower;
    } else {
      character.verticalSpeed = 0;
    }

    //
  }
  character.y += character.verticalSpeed;

  // Limit the character to the canvas bounds
  if (character.x < 0) {
    character.x = 0;
  } else if (character.x + character.width > canvas.width) {
    character.x = canvas.width - character.width;
  }

  // Limit the character to the ground
  if (character.y + character.height > ground.y) {
    character.y = ground.y - character.height;
  }
  checkCollisions(); // Vérifier les collisions avec les cadeaux
  updateGifts(); // Mettre à jour la position des cadeaux
  checkLevelUp();
}

// Control the character with keyboard
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      key.left = true;
      // character.x -= character.speed;
      break;
    case "ArrowRight":
      key.right = true;
      // character.x += character.speed;
      break;
    case "ArrowUp":
    case " ":
      if (!character.jumping) {
        character.jumping = true;
        // character.verticalSpeed = -character.jumpPower; // Négatif pour le saut
      }
      break;
  }
});
document.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      key.left = false;
      // character.x -= character.speed;
      break;
    case "ArrowRight":
      key.right = false;
      // character.x += character.speed;
      break;
  }
});

var canvas = document.getElementById("gameCanvas");
var lastTapTime = 0;

function handleTouchStart(event) {
  var currentTime = new Date().getTime();
  var tapX = event.touches[0].clientX;
  var tapInterval = currentTime - lastTapTime;

  if (tapInterval < 300 && tapInterval > 0) {
    // Double tap détecté
    onDoubleTap();
  } else {
    // Tap simple, déterminer si c'est à gauche ou à droite
    if (tapX < canvas.width / 2) {
      onTapLeft();
    } else {
      onTapRight();
    }
  }

  lastTapTime = currentTime;
}

function onTapLeft() {
  console.log("Tap à gauche");
  key.left = true; // Déplace le personnage vers la gauche
}

function onTapRight() {
  console.log("Tap à droite");
  key.right = true; // Déplace le personnage vers la droite
}

function onDoubleTap() {
  console.log("Double tap détecté");
  if (!character.jumping) {
    character.jumping = true;
    character.verticalSpeed = -character.jumpPower; // Faire sauter le personnage
  }
}
// Arrêter le mouvement lorsque l'utilisateur arrête de toucher l'écran
canvas.addEventListener(
  "touchend",
  function () {
    key.left = false;
    key.right = false;
  },
  false
);

canvas.addEventListener("touchstart", handleTouchStart, false);
function speedincr() {
  if (speed < 10) speed++;
  else {
    return;
  }
}

// Gestions des niveaux ///

function increaseLevel() {
  //level UP
  alert("Niveau complété: Prochain niveau : " + (level + 1));
  level++;
  score = 0; // Réinitialiser le score
  nextLevelThreshold *= 2; // Double le seuil pour le prochain niveau
  key.left = false;
  key.right = false;
  setInterval(generateGift, 2000);
}
function checkLevelUp() {
  //check le level actuel
  if (score >= nextLevelThreshold) {
    increaseLevel();
  }
}

// Start the game loop
function startGame() {
  window.requestAnimationFrame(draw);
  setInterval(update, 20); // Update game state every 20ms
}
setInterval(speedincr, 4000);
setInterval(generateGift, 2000);
setInterval(generateGift, 2000);

startGame();
