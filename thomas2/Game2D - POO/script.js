export default class Game {
  constructor() {
    // Création de l'élément canvas
    this.canvas = document.createElement("canvas");
    this.canvas.id = "gameCanvas";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Ajout du canvas à la balise body du document
    document.body.appendChild(this.canvas);

    // Configuration du contexte du canvas
    this.ctx = this.canvas.getContext("2d");
    this.canvas = document.getElementById("gameCanvas");

    this.ctx = this.canvas.getContext("2d");
    this.speed = 2;
    this.level = 1;
    this.score = 0;
    this.nextLevelThreshold = 10;
    this.characterImage = new Image();
    this.backgroundImage = new Image();
    this.character = {
      y: this.canvas.height * 0.8,
      x: this.canvas.width * 0.1,
      width: this.canvas.width * 0.05,
      height: this.canvas.width * 0.05,
      speed: 10,
      jumping: false,
      jumpPower: 20,
      verticalSpeed: -99,
    };
    // Positionne le personnage à 80% de la hauteur du canvas (en partant du haut)
    // et ajuste pour que le bas du personnage soit aligné avec cette hauteur
    this.character.y = this.canvas.height * 0.8 - this.character.height;
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
    this.characterImage.src = "./thomas2/Game2D - POO/src/perso.png";

    this.backgroundImage.onload = () =>
      this.ctx.drawImage(
        this.backgroundImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    this.backgroundImage.src = "./thomas2/Game2D - POO/src/background.png";
  }

  addEventListeners() {
    // Ajout des écouteurs pour les événements tactiles
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

    // Ajout des écouteurs pour les événements du clavier
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
  }
  handleKeyDown(event) {
    switch (event.code) {
      case "ArrowLeft":
        this.key.left = true;
        break;
      case "ArrowRight":
        this.key.right = true;
        break;
      case "Space":
        if (!this.character.jumping) {
          this.character.jumping = true;
          this.character.verticalSpeed = -this.character.jumpPower;
        }
        break;
      case "ArrowUp":
        if (!this.character.jumping) {
          this.character.jumping = true;
          this.character.verticalSpeed = -this.character.jumpPower;
        }
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.code) {
      case "ArrowLeft":
        this.key.left = false;
        break;
      case "ArrowRight":
        this.key.right = false;
        break;
    }
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
    // Ajouter un intervalle pour générer régulièrement des cadeaux
    this.giftGenerateInterval = setInterval(this.generateGift.bind(this), 2000); // Ajuste ce délai selon les besoins du jeu
  }

  draw() {
    this.clearCanvas();
    this.drawBackground();
    this.drawCharacter();
    this.drawGifts();
    this.drawScoreAndLevel();
    this.drawPointScheme();
    window.requestAnimationFrame(this.draw.bind(this));
  }
  drawPointScheme() {
    const startX = 10; // Position X de départ pour le barème
    let currentY = this.canvas.height * 0.9; // Position Y de départ pour le barème
    const spaceBetween = 30; // Espace vertical entre chaque élément du barème

    // Fonction pour dessiner un carré et son score
    const drawGiftWithScore = (color, scoreText) => {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(startX, currentY, 20, 20);
      this.ctx.fillText(scoreText, startX + 25, currentY + 15);
      currentY += spaceBetween;
    };

    // Dessiner chaque cadeau avec son score
    drawGiftWithScore("green", "+3 "); // Cadeau vert
    drawGiftWithScore("blue", "+5 "); // Cadeau bleu
    drawGiftWithScore("red", "-10 "); // Cadeau rouge
  }
  drawScoreAndLevel() {
    const scoreText = `Score: ${this.score}`;
    const levelText = `Niveau: ${this.level}`;

    // Définir le style du texte
    this.ctx.fillStyle = "black"; // Choisis la couleur de ton choix
    this.ctx.font = "20px Arial"; // Ajuste la taille et le style de police selon tes besoins

    // Positionner le texte dans les 20% inférieurs du canvas
    const textY = this.canvas.height * 0.85; // Juste un peu au-dessus du bas du canvas
    this.ctx.fillText(scoreText, 10, textY); // Ajuste la position X selon tes besoins
    this.ctx.fillText(levelText, 10, textY + 30); // Un peu en dessous du score
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    // Calculer les dimensions pour 80% de la taille du canvas
    const bgWidth = this.canvas.width;
    const bgHeight = this.canvas.height * 0.8;

    // Calculer les positions pour centrer le background
    const bgX = 0;
    const bgY = 0;

    // Dessiner l'image de fond avec les nouvelles dimensions et positions
    this.ctx.drawImage(this.backgroundImage, bgX, bgY, bgWidth, bgHeight);
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

      // Vérification si le personnage atterrit sur le sol
      // Le sol est maintenant à 80% de la hauteur du canvas
      const groundLevel = this.canvas.height * 0.8 - this.character.height;
      if (this.character.y > groundLevel) {
        this.character.jumping = false;
        this.character.y = groundLevel; // Positionner le personnage sur le sol
        this.character.verticalSpeed = 0; // Réinitialiser la vitesse verticale
      }
    }
    // Vérifier si le personnage sort du canvas à gauche
    if (this.character.x < -this.character.width) {
      this.character.x = this.canvas.width; // Téléporter le personnage à droite
    }

    // Vérifier si le personnage sort du canvas à droite
    if (this.character.x > this.canvas.width) {
      this.character.x = -this.character.width; // Téléporter le personnage à gauche
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
      if (this.isColliding(this.character, gift)) {
        // Modifier le score en fonction de la catégorie du cadeau
        switch (gift.category) {
          case 1: // Vert
            this.score += 3;
            break;
          case 2: // Bleu
            this.score += 5;
            break;
          case 3: // Rouge
            this.score -= 10; // Enlève des points
            break;
        }

        this.gifts.splice(index, 1); // Supprimer le cadeau après la collision
      }
    });
  }

  updateScoreAndLevel() {
    if (this.score >= this.nextLevelThreshold) {
      alert(`Niveau complété: Prochain niveau : ${this.level + 1}`);
      this.handleTouchEnd();
      this.level++;
      this.score = 0;
      this.nextLevelThreshold *= 2;
      this.increaseSpeed();
      this.giftGenerateInterval = setInterval(
        this.generateGift.bind(this),
        2000
      );
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

  isColliding(obj1, obj2) {
    // Logique simple de collision entre deux rectangles
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.height + obj1.y > obj2.y
    );
  }
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
}

//const jeu = new Game();
