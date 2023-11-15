"use strict";
/* 
==============================
Création de toutes mes parties 
==============================
*/

const body = document.querySelector("body")
body.style.height = "100vh";

// Création modale
const modalContainer = document.createElement('div')
modalContainer.className = "modal-container"
body.append(modalContainer)
const modal = document.createElement('modal')
modal.className = "modal"
modalContainer.append(modal)
const buttonModal = document.createElement('button')
buttonModal.className = "close-modal"
buttonModal.classList.add("modal-trigger")
buttonModal.textContent = "X"
modal.append(buttonModal)

// Créer le bouton
const buttonCase = document.createElement("button");
buttonCase.className = 'button';
buttonCase.classList.add("modal-btn", "modal-trigger");
body.append(buttonCase);

//Créer la partie gauche
const leftHalf = document.createElement('div');
leftHalf.className = 'left';
buttonCase.append(leftHalf);
const leftImage = document.createElement('img');
leftImage.src = './img/gauche.png';
leftImage.alt = 'leftimage';
leftHalf.append(leftImage);

// Créer la partie droite
const rightHalf = document.createElement('div');
rightHalf.className = 'right';
buttonCase.append(rightHalf);
const rightImage = document.createElement('img');
rightImage.src = './img/droite.png';
rightImage.alt = 'rightImage';
rightHalf.appendChild(rightImage);

//Créer la partie Nombre
const number = document.createElement("div");
number.className = 'number';
number.textContent = '6';
buttonCase.append(number)



/*
=================================
Création de ma case du calendrier
et de la modal
=================================
*/

// Sélection de mes différentes parties
const containerModal = document.querySelector(".modal-container")
const modalTriggers = document.querySelectorAll(".modal-trigger")
const modalButton = document.querySelector(".close-modal")
let isAnimating = false;

// animation nombre
function animation1() {
    // Premier changement de transformation au bout de 1000 ms
    setTimeout(() => {
        number.style.transition = "scale 1s linear";
        number.style.scale= "1 -0.029";
    }, 0);

    // Deuxième changement de transformation au bout de 3000 ms
    setTimeout(() => {
        number.style.transition = "rotate 2s linear"
        number.style.rotate = "90deg";
    }, 2000);
    setTimeout(()=> {
        number.style.display = "none";
    }, 5000)
    setTimeout(()=>{
        // Cacher le bouton
        buttonCase.style.display = "none";
        // Activer la modal
        containerModal.classList.add("active");
    }, 9000)
}

// event de déclenchement de mon button et des portes
buttonCase.addEventListener("click", () => {
    animation1()
    if (!isAnimating) {
        isAnimating = true;
        leftHalf.style.transition = "transform 5s 5s ease";
        rightHalf.style.transition = "transform 5s 5s ease";
        leftHalf.style.transform = "translateX(-70%)";
        rightHalf.style.transform = "translateX(70%)";
    }
});

// Retirer ma modal

modalButton.addEventListener("click", ()=> {
    containerModal.classList.remove("active")
    buttonCase.style.display = "block"
})

/* 
======================
    Création Jeu
======================
*/
// Création des éléments Html 
const game = document.createElement('div')
game.className = "game"
modalContainer.append(game)

const startRestart = document.createElement('button')
startRestart.className = "startRestart"
startRestart.textContent = "Begin or restart"
game.append(startRestart)

const gameInfo = document.createElement('div')
gameInfo.className = "gameInfo"
game.append(gameInfo)

const score = document.createElement('span')
score.className = "score"
score.textContent = "Your score : 0"
gameInfo.append(score)


const temps = document.createElement('span')
temps.className = "temps"
temps.textContent = "time : 0"
gameInfo.append(temps)

const containerGame = document.createElement('div')
containerGame.className = "containerGame"
game.append(containerGame)

// Sélection de mes éléments Html 

let theScore = document.querySelector('.score')
let leTemps = document.querySelector('.temps')
let containerShoot = document.querySelector('.containerGame')
let restartBtn = document.querySelector('.startRestart')

restartBtn.addEventListener("click", function () {
    let score = 0;
    let temps = 30;
    containerShoot.innerHTML = "";

    let interval = setInterval(function cibleBouge() {
        function createImage(src, id) {
            let img = document.createElement("img");
            img.src = src;
            img.id = id;
            containerShoot.append(img);
            img.style.top = Math.random() * (containerShoot.clientHeight - img.offsetHeight) + "px"
            img.style.right = Math.random() * (containerShoot.clientWidth - img.offsetWidth) + "px"
            return img;
        }

        let cible = createImage("./img/cadeau.jpg", "cible");
        let pereNoel = createImage("./img/pereNoel.jpg", "pereNoel")

        // disparition cible après un certain temps 
        setTimeout(function () {
            cible.remove();
            pereNoel.remove();
        }, 2000)

        // clique sur la cible
        cible.addEventListener("click", function () {
            score += 1
            cible.style.display = "none"
            theScore.textContent = `score : ${score}`
        })

        // clique sur le père Noël
        pereNoel.addEventListener("click", function () {
            score -= 1
            pereNoel.style.display = "none"
            theScore.textContent = `score : ${score}`
        })

        temps -= 1;

        // affichage de nos infos 
        leTemps.textContent = `time : ${temps}`

        // fin du jeu 
        if (temps === 0) {
            clearInterval(interval)
            containerShoot.textContent = "The End"
            
        }
    }, 500) // Définir le délai à 500 millisecondes (0,5 seconde) pour une apparition plus fréquente
})