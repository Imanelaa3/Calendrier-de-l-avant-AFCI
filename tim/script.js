"use strict"
// ! Faire une modal sur toute la page pour l'animation

const caseElement = document.querySelector('.case');
const button = document.querySelector('.button');
const number = document.querySelector(".number")

button.addEventListener("click", ()=>{
    number.style.transition = "all 4s linear"
    number.style.transform = "scaleX(-0.029)"
})
