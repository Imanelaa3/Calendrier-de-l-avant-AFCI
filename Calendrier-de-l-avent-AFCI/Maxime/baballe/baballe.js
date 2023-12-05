"use strict";

export default class Baballes{
    vv = Math.random()<0.5?5:-5; 
    vh = Math.random()<0.5?5:-5;
    r = 50;
    loaded = false;
constructor(canvas, x, y) {
let c1 = Math.floor(Math.random()*255)
let c2 = Math.floor(Math.random()*255)
let c3 = Math.floor(Math.random()*255)

this.x = x;
this.y = y;
    this.c = `rgb(${c1} ,${c2} ,${c3})`
console.log(`${c1} ,${c2} ,${c3}`);

this.img=new Image()
this.img.src= "./Calendrier-de-l-avent-AFCI/Maxime/baballe/balle.png"
this.img.onload = () => {
    this.loaded = true;
}
}

    dessin(canvas) {
        const ctx = canvas.getContext("2d")
        if (this.loaded) {
            ctx.drawImage(this.img, this.x, this.y, this.r, this.r)
        }
        if(this.x + this.r > canvas.width || this.x-this.r < -0)
        this.vh = -this.vh;
        if (this.y+ +this.r > canvas.height || this.y-this.r < -0)
        this.vv = -this.vv
        this.x += this.vh;
        this.y += this.vv;
    }
    static background(canvas) {
        let b1 = Math.floor(Math.random()*255)
        let b2 = Math.floor(Math.random()*255)
        let b3 = Math.floor(Math.random()*255)
        canvas.style.backgroundColor = `rgb(${b1}, ${b2}, ${b3})`;
        

    }
}


