class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.speed = 2;
    this.level = 1;
    this.score = 0;
    this.nextLevelThreshold = 10;
    this.characterImage = new Image();
    this.backgroundImage = new Image();
    this.character = {
      x: this.canvas.width * 0.1,
      y: this.canvas.height * 0.8,
      width: this.canvas.width * 0.05,
      height: this.canvas.width * 0.05,
      speed: 10,
      jumping: false,
      jumpPower: 20,
      verticalSpeed: -99,
    };
    this.gifts = [];
    this.key = {};
    this.init();
  }

  init() {
    this.loadImages();
    this.addEventListeners();
    this.startGame();
  }

  loadImages() {
    this.characterImage.onload = () =>
      this.ctx.drawImage(
        this.characterImage,
        this.character.x,
        this.character.y,
        this.character.width,
        this.character.height
      );
    this.characterImage.src = "./src/perso.png";

    this.backgroundImage.onload = () =>
      this.ctx.drawImage(
        this.backgroundImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    this.backgroundImage.src = "./src/background.png";
  }

  addEventListeners() {
    this.canvas.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this),
      false
    );
    this.canvas.addEventListener(
      "touchend",
      this.handleTouchEnd.bind(this),
      false
    );
  }
  handleTouchStart(event) {
    var currentTime = new Date().getTime();
    var tapX = event.touches[0].clientX;
    var tapInterval = currentTime - this.lastTapTime;

    if (tapInterval < 300 && tapInterval > 0) {
      this.onDoubleTap();
    } else {
      this.onTap(tapX);
    }

    this.lastTapTime = currentTime;
  }

  handleTouchEnd() {
    this.key.left = false;
    this.key.right = false;
  }

  onTap(tapX) {
    if (tapX < this.canvas.width / 2) {
      this.onTapLeft();
    } else {
      this.onTapRight();
    }
  }

  onTapLeft() {
    this.key.left = true; // Déplace le personnage vers la gauche
  }

  onTapRight() {
    this.key.right = true; // Déplace le personnage vers la droite
  }

  onDoubleTap() {
    if (!this.character.jumping) {
      this.character.jumping = true;
      this.character.verticalSpeed = -this.character.jumpPower;
    }
  }

  startGame() {
    window.requestAnimationFrame(this.draw.bind(this));
    this.updateGameInterval = setInterval(this.update.bind(this), 20);
    this.speedIncreaseInterval = setInterval(
      this.increaseSpeed.bind(this),
      4000
    );
  }

  draw() {
    this.clearCanvas();
    this.drawBackground();
    this.drawCharacter();
    this.drawGifts();
    // Demande la prochaine frame de dessin
    window.requestAnimationFrame(this.draw.bind(this));
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    this.ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  drawCharacter() {
    this.ctx.drawImage(
      this.characterImage,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height
    );
  }

  update() {
    this.updateCharacter();
    this.updateGifts();
    this.checkCollisions();
    this.updateScoreAndLevel();
    // Autres mises à jour de l'état du jeu
  }

  updateCharacter() {
    // Gestion du déplacement horizontal
    if (this.key.left) this.character.x -= this.character.speed;
    if (this.key.right) this.character.x += this.character.speed;

    // Gestion du saut
    if (this.character.jumping) {
      this.character.y += this.character.verticalSpeed;
      this.character.verticalSpeed += 1; // Gravité

      // Vérification si le personnage touche le sol
      if (this.character.y > this.canvas.height * 0.8) {
        this.character.jumping = false;
        this.character.y = this.canvas.height * 0.8;
        this.character.verticalSpeed = -99;
      }
    }
  }
  updateGifts() {
    for (let i = this.gifts.length - 1; i >= 0; i--) {
      this.gifts[i].y += this.gifts[i].speed;
      if (this.gifts[i].y > this.canvas.height * 0.8) {
        // Si le cadeau atteint le sol
        this.gifts.splice(i, 1);
      }
    }
  }

  checkCollisions() {
    this.gifts.forEach((gift, index) => {
      // Logique de collision ici
      // Si collision, augmenter le score et supprimer le cadeau
    });
  }

  updateScoreAndLevel() {
    if (this.score >= this.nextLevelThreshold) {
      alert(`Niveau complété: Prochain niveau : ${this.level + 1}`);
      this.level++;
      this.score = 0;
      this.nextLevelThreshold *= 2;
      this.increaseSpeed();
    }
  }
  increaseSpeed() {
    if (this.speed < 10) {
      this.speed++;
      // Ajouter ici toute logique supplémentaire liée à l'augmentation de la vitesse
    }
  }

  generateGift() {
    let x = Math.random() * this.canvas.width;
    let y = this.canvas.height * 0.1; // 10% du haut
    let category = Math.ceil(Math.random() * 3); // Catégorie aléatoire 1, 2, ou 3
    let speed = Math.random() * 5 + 2; // Vitesse de chute aléatoire
    this.gifts.push(new Gift(x, y, category, speed));
  }

  drawGifts() {
    this.gifts.forEach((gift) => {
      // Définir la couleur en fonction de la catégorie du cadeau
      switch (gift.category) {
        case 1:
          this.ctx.fillStyle = "green"; // Couleur pour catégorie 1
          break;
        case 2:
          this.ctx.fillStyle = "blue"; // Couleur pour catégorie 2
          break;
        case 3:
          this.ctx.fillStyle = "red"; // Couleur pour catégorie 3
          break;
        default:
          this.ctx.fillStyle = "black"; // Couleur par défaut
      }
      this.ctx.fillRect(gift.x, gift.y, gift.width, gift.height);
    });
  }

  checkCollisions() {
    this.gifts.forEach((gift, index) => {
      if (this.isColliding(this.character, gift)) {
        // Logique de scoring basée sur la catégorie du cadeau
        this.score += gift.category * 10; // Exemple de scoring
        this.gifts.splice(index, 1); // Supprimer le cadeau après la collision
      }
    });
  }

  isColliding(obj1, obj2) {
    // Logique simple de collision entre deux rectangles
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.height + obj1.y > obj2.y
    );
  }

  // ... [Autres méthodes]
}

// Classe pour les cadeaux
class Gift {
  constructor(x, y, category, speed) {
    this.x = x;
    this.y = y;
    this.width = 20; // Taille arbitraire
    this.height = 20; // Taille arbitraire
    this.category = category; // 1, 2, ou 3
    this.speed = speed;
  }

  // Méthodes pour Gift si nécessaire
}
