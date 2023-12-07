"use strict";

export default class AnimImane2 {
    constructor(...img) {
        this.intervalId = 0;
        this.slider = {
            dots: [],
            items: [],
            btns: []
        };
        this.time = 0;
        this.conta = this.create(img)
        this.init()
    }

    create(imgs) {
        this.slider = {
            dots: [],
            items: [],
            btns: []
        };

        const container = document.createElement("div");
        container.classList.add("slider-container");

        const dots = document.createElement("div");
        dots.classList.add("dots");
//console.log(imgs);
        imgs.forEach((img, i) => {

            const div = document.createElement("div");
            div.classList.add("items", "fade");
            const image = document.createElement("img");
            image.src = img;
            div.append(image);
            const dot = document.createElement("span");
            dot.classList.add("dot");
            dot.dataset.id = i;
            dots.append(dot);
            container.append(div);

            this.slider.items.push(div);
            this.slider.dots.push(dot);
        });

        container.append(dots);

        const next = document.createElement("a");
        next.classList.add("next");
        next.innerHTML = "&#10095;";
        const prev = document.createElement("a");
        prev.classList.add("prev");
        prev.innerHTML = "&#10094;";
        container.append(next, prev);

        this.slider.btns.push(prev, next);

        return container;
    }

    showItems(n) {
        let index = n > this.slider.items.length - 1 ? 0 : n < 0 ? this.slider.items.length - 1 : n;

        this.slider.items.forEach((item, i) => {
            item.style.display = "none";
            this.slider.dots[i].classList.remove("active");
        });

        this.slider.items[index].style.display = "block";
        this.slider.dots[index].classList.add("active");
    }

    currentItem(e) {
        clearInterval(this.intervalId);
        let n = parseInt(e.target.dataset.id);
        this.showItems(n);
    }

    changeItem(e) {
        clearInterval(this.intervalId);
        let n = document.querySelector(".dot.active").dataset.id;

        if (e.target.classList.contains("next")) {
            this.showItems(++n);
        } else {
            this.showItems(--n);
        }

        this.startInterval();
    }

    init(timing = 3000) {
        this.time = timing;
        this.showItems(0);

        this.slider.dots.forEach(dot => dot.addEventListener("pointerdown", (e) => this.currentItem(e)));
        this.slider.btns.forEach(btn => btn.addEventListener("pointerdown", (e) => this.changeItem(e)));
        this.startInterval();
    }

    startInterval() {
        this.intervalId = setInterval(() => {
            this.slider.btns[1].click();
        }, this.time);
    }
}



    

