"use strict";

const case8 = document.querySelector("body .flex .case8");
const huit = document.querySelector(".case8 .huit")
const rick = document.querySelector("body .flex .border img")
const audio = document.querySelector("body .flex .music audio")
console.log(case8.textContent);

    case8.addEventListener("click",()=>{  
        case8.style.backgroundColor = "red";
        case8.style.transition = "background-color 2s"
        huit.style.transform = "rotate(10turn)"
        huit.style.transition = "transform 3s cubic-bezier(.58,0,.36,1)"
        setTimeout(() => {
            case8.style.transformOrigin = "left";
            case8.style.transition = "all 0.5s ease-in-out"
            case8.style.transform = "perspective(1200px) translateZ(0px) translateX(0px) translateY(0px) rotateY(-105deg)"
        }, 3500);
        setTimeout(() => {
            huit.style.visibility = "hidden"
        }, 3900);
        setTimeout(() => {
            rick.style.transform = "scale(0.7)"
            rick.style.transform = "rotate(5turn)"
            rick.style.transition = "all 2s ease-in-out"
            audio.play()
        }, 4100);
        setTimeout(() => {
            audio.pause()
        }, 15000);
        setTimeout(() => {
            case8.style.transformOrigin = "left";
            case8.style.transition = "all 0.5s ease-in-out"
            case8.style.transform = "perspective(1200px) translateZ(0px) translateX(0px) translateY(0px) rotateY(0deg)"
        }, 16000);
        setTimeout(() => {
            huit.style.visibility = ""
        }, 16400);
})
