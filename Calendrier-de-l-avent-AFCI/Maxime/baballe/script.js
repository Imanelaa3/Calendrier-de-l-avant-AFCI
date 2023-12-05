
import Baballes from "./baballe.js";



export default class balleAnimation {
    canvas = document.createElement("canvas");
    ctx = this.canvas.getContext("2d")
    balles = [];
    constructor() {

        this.resize()
        window.addEventListener("resize", this.resize.bind(this));
        this.canvas.addEventListener("click", this.balle.bind(this))
        setInterval(Baballes.background, 1000,this.canvas)
        Baballes.background(this.canvas)
        this.draw()
    }
    resize() {
        const snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        const size = document.body.getBoundingClientRect();
        this.canvas.width = size.width;
        this.canvas.height =  size.height;
        this.ctx.putImageData(snapshot, 0, 0);
    }
    balle(e) {
        const balle2 = new Baballes(this.canvas, e.clientX, e.clientY)
        // balle2.dessin(canvas)
        this.balles.push(balle2);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.balles.forEach((a)=>{
            a.dessin(this.canvas)
        })
        requestAnimationFrame(this.draw.bind(this))
    }
}

