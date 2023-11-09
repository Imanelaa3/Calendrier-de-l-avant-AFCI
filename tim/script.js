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
=======================
Création de mon Canvas
======================
 */
const canvas = document.createElement("canvas")
canvas.className = "modal-canvas"
modalContainer.append(canvas)
const modalCanvas = document.querySelector("modal-canvas")
console.log(modalCanvas);
// Obtention du contexte 2D du canvas
const context = canvas.getContext("2d");

function resize() {
    const snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
    // permet de récupérer la taille et la position d'un élément
    const size = document.body.getBoundingClientRect();
    canvas.width = size.width;
    canvas.height = size.height;
    // Replace l'image donné à la position indiqué
    context.putImageData(snapshot,0 , 0)
}
resize();
window.addEventListener("resize", resize)

/*
============
Création Jeu 
============
*/
class Boundary {
    // nous ajoutons des propriétés static pour faciliter la lisibilité du code
    static width = 40
    static height = 40
    constructor({position}) { // référencer dynamiquement dans un objet pour que l'ordre de nos propriétés à l'intérieur n'aient pas d'importance
        this.position = position
        this.width = 40
        this.height = 40
    }
    draw() {
        context.fillStyle = 'green'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


// à chaque fois que je vais boucler sur les tiret, je veux générer un nouveau carré et dans ' ' nous disons que nous voulons juste un espace, cela va créer notre périmètre de jeu
const map = [
    ['-','-','-','-','-','-',],
    ['-',' ',' ',' ',' ','-',],
    ['-',' ','-','-',' ','-',],
    ['-',' ',' ',' ',' ','-',],
    ['-','-','-','-','-','-',]
]
const boundaries = [
    // première solution, créer des carrés afin de faire le contour de notre jeu mais nous devrions effectuer énormément de code car nous devons changer la position x à chaque carrée, nous allons utiliser map
    // new Boundary({
    //     position: {
    //         x:0,
    //         y:0
    //     }
    // }),
    // new Boundary({
    //     position: {
    //         x:41,
    //         y:0
    //     }
    // })
]

//Création de notre boucle
// row pour représenté notre première ligne
map.forEach((row, i) =>{ // Joue avec les lignes, bouce sur les lignes 1, 2, 3 et 4 
    console.log(map);
    //nous bouclons chaque symbole '-'
    row.forEach((symbol, index) => {
        console.log(row);
        // console.log(symbol); // nous obtenons nos tirets et espaces
        switch (symbol) { // nous allons sélectionner nos symboles est dire ce que l'on veut faire,
            case '-':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * index, // nous allons rajouter des carrées pour chaque '-'
                        y: Boundary.height * i // lorsque les lignes vont faire le bas, on touche à y, chaque itération nous allons pousser les carrées de 40px
                    }
                }))
                break;
        
            default:
                break;
        }
    })
})

boundaries.forEach(boundary => {
    boundary.draw()
})

// Création joueur
class Player {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity // rapidité personnage
        this.radius = 20
    }

    cercle() {
        context.save();
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.clip();
        
        const img = new Image();
        img.src = "./img/pereNoel.jpg"; // Remplacez par le chemin de votre image
        img.onload = () => {
            context.drawImage(img, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);
            /*En soustrayant this.radius à la position horizontale, vous déplacez le point de départ de l'image vers la gauche de sorte qu'elle soit centrée horizontalement sur le joueur, pour Y  il déplace la position de départ vers le haut pour que l'image soit centrée verticalement sur le joueur.
            En multipliant this.radius par 2, vous spécifiez que la largeur et la hauteur de la zone de dessin de l'image sont égales au diamètre du cercle du joueur. Cela garantit que l'image s'adapte parfaitement au cercle.*/
            context.restore(); // Restaurer le contexte après avoir dessiné l'image
        };
    }
}
// mouvement Player 
// const img = new Image();
// img.src = "./img/pereNoel.jpg"
// img.style.border = "1px solid black"
// img.onload = () =>{
//     context.save()
//     cercle(30, 30, 20, 0)
//     context.clip()
//     context.drawImage(img, 9, 10, 40, 40)
//     context.restore
// }


const player = new Player({
    position: {
        x: 40,
        y: 40
    },
    velocity: {
        x:0,
        y:0
    }
})
player.cercle()
