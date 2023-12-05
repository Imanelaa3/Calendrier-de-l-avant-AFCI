export default class AnimImane {
  constructor() {
    this.container = document.createElement("div");
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.images = [];
    this.text = "DANS 24 JOURS C'est NOËL !!";
    this.text2 =
      "Alors on te propose pour patienter de decouvrir les jeux et animations de notre calendrier de l'avent ";
    this.backgroundImage = new Image();
    this.backgroundImage.src = "./images/paysage-noel.jpg";

    window.addEventListener("resize", () => this.resize());

    this.canvas.addEventListener("mousemove", (event) => this.animate(event));
    this.canvas.addEventListener("touchmove", (event) => this.animate(event));

  
    const imagePaths = [
      "./images/cadeau-noel.png",
      "./images/cadeau2.png",
      "./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/sapin.png",
      " ./images/cadeau-noel.png",
      " ./images/cadeau2.png",
      " ./images/boule.png",
      " ./images/biscuit.png",
      " ./images/sapin.png",
      " ./images/sapin.png",
    ];

    this.container.append(this.canvas);
    setTimeout(() => {
      this.resize();
      for (let i = 0; i < imagePaths.length; i++) {
        this.loadImage(imagePaths[i]);
      }

      this.animate();
    }, 500);
  }

  resize() {
    const size = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = size.width;
    this.canvas.height = size.height;
  }

  loadImage(path) {
    const img = new Image();
    img.src = path;
    const speedX = (Math.random() - 5) * 2;
    const speedY = (Math.random() - 5) * 2;
    this.images.push({
      img,
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      speedX,
      speedY,
    });
  }

  animate(event) {
    const mouseX = event ? event.clientX || event.touches[0].clientX : 0;
    const mouseY = event ? event.clientY || event.touches[0].clientY : 0;

    for (let i = 0; i < this.images.length; i++) {
      this.updateImage(this.images[i], mouseX, mouseY);
    }

    this.draw();
  }

  updateImage(image, mouseX, mouseY) {
    const dx = mouseX - image.x;
    const dy = mouseY - image.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) {
      image.x += (dx / distance) * 5;
      image.y += (dy / distance) * 5;
    } else {
      // Déplacez l'image de manière aléatoire
      image.x += (Math.random() - 0.5) * 4;
      image.y += (Math.random() - 0.5) * 4;

      if (
        image.x < 0 ||
        image.x > this.canvas.width ||
        image.y < 0 ||
        image.y > this.canvas.height
      ) {
        // Réinitialisez la position si l'image sort du canvas
        image.x = Math.random() * this.canvas.width;
        image.y = Math.random() * this.canvas.height;
      }
    }
  }
  drawText() {
    this.ctx.fillStyle = "black"; // Couleur du texte
    this.ctx.font = 0.05 * window.innerWidth + "px Calibri"; // Police et taille du texte
    this.ctx.fillText(this.text, 100, 400); // Coordonnées de départ du texte
  }

  drawBackground() {
    this.ctx.drawImage(
      this.backgroundImage,
      10,
      10,
      this.canvas.width,
      this.canvas.height
    );
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    for (let i = 0; i < this.images.length; i++) {
      const image = this.images[i];
      this.ctx.drawImage(image.img, image.x, image.y, 50, 50);
    }

    this.drawText();

    requestAnimationFrame(() => this.animate());
  }
}
