"use strict";

export default class ImaneAnim {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.images = [];
        this.ctx = this.canvas.getContext("2d");
    }




// Charge les images et initialise l'application
 initialize() {
    for (let i = 0; i < 10; i++) {
        const image = new Image();
        image.src = "../../images/cadeau-noel.png"; 
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        this.images.push(new ImageObject(image, x, y, 50, 50));
        console.log("init");
    }

    this.canvas.addEventListener("click", this.handleClick.bind(this));
    this.drawImages();
    this.animate();
}

 drawImages() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const imageObj of this.images) {
        this.ctx.drawImage(imageObj.image, imageObj.x, imageObj.y, imageObj.width, imageObj.height);
    }
}

 handleClick(event) {
    const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

    for (let i = this.images.length - 1; i >= 0; i--) {
        const imageObj = this.images[i];
        if (
            mouseX >= imageObj.x &&
            mouseX <= imageObj.x + imageObj.width &&
            mouseY >= imageObj.y &&
            mouseY <= imageObj.y + imageObj.height
        ) {
            this.images.splice(i, 1);
        }
    }

    this.drawImages();
}

 animate() {
    for (const imageObj of this.images) {
        imageObj.x += Math.random() * 4 - 2;
        imageObj.y += Math.random() * 4 - 2;

        imageObj.x = Math.max(0, Math.min(canvas.width - imageObj.width, imageObj.x));
        imageObj.y = Math.max(0, Math.min(canvas.height - imageObj.height, imageObj.y));
    }

    this.drawImages();
    window.requestAnimationFrame(this.animate.bind(this));

    this.initialize();

}
}




