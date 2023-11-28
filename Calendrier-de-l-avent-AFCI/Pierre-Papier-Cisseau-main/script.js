/* "use strict"
const pierre = document.querySelector(".pierre img")
const papier = document.querySelector(".papier img")
const cisseau = document.querySelector(".cisseau img")
const btnpierre = document.querySelector(".click1")
const btnpapier = document.querySelector(".click2")
const btncisseau = document.querySelector(".click3")
const versu = document.querySelector(".versus img");
const boite = document.querySelector(".boite")
let clone
btnpierre.addEventListener("click",jeux);
btnpapier.addEventListener("click",jeux);
btncisseau.addEventListener("click",jeux);
function jeux() {
    const img = this.parentElement.querySelector("img");
    img.style.display = "block";
    btncisseau.style.display = "none"
    btnpierre.style.display = "none"
    btnpapier.style.display = "none"
    versus(this.textContent.toLowerCase())
}

function ordi() {
    const choix = ["pierre", "papier", "cisseau"];
    const x = Math.floor(Math.random() * 3);
    let parent  
    switch (choix[x]) {
        case "pierre":
            parent = pierre.parentElement
            clone = pierre.cloneNode()
            // pierre.parentElement.prepend(pierre.cloneNode())//cloner l'image 
            break;
        case "papier":
            parent = papier.parentElement
            clone = papier.cloneNode()
            // pierre.parentElement.prepend(pierre.cloneNode())//cloner l'image 
            break;
        case "cisseau":
            parent = cisseau.parentElement
            clone = cisseau.cloneNode()
            // pierre.parentElement.prepend(pierre.cloneNode())//cloner l'image 
            break;
    
        default:
            break;
    }
    boite.append(versu);
    boite.append(clone)
    clone.style.display = "block" 
    return choix[x];
}
const gagner = "Gagné"
const perdu = "Perdu"
function versus(joueur) {
    const ia = ordi()
    console.log(joueur,ia);
    versu.style.display = "block";
    if (joueur== ia) {
        popup("Egaliter")
    }
    if (joueur=="cisseau" && ia=="papier") {
        popup(gagner)
    }
    if (joueur=="cisseau" && ia=="pierre") {
        popup(perdu)
    }
    if (joueur=="papier" && ia=="pierre") {
        popup(gagner)
    }
    if (joueur=="papier" && ia=="cisseau") {
        popup(perdu)
    }
    if (joueur=="pierre" && ia=="cisseau") {
        popup(gagner)
    }
    if (joueur=="pierre" && ia=="papier") {
        popup(perdu)
    }
  const reset = document.createElement("button");
  document.body.append(reset)
  reset.textContent = "Rejouer";
  reset.addEventListener("click", ()=>{
    btncisseau.style.display = "block"
    btnpierre.style.display = "block"
    btnpapier.style.display = "block"
    pierre.style.display = "none"
    papier.style.display = "none"
    cisseau.style.display = "none"
    versu.style.display = "none"
    clone.remove()
    reset.remove()
})

}

function popup(text) {
   let message = document.createElement("p")
    message.className = "message" 
    message.textContent = text
    document.body.appendChild(message)
    setTimeout(() => {
        message.style.display = "none"
    }, 3000);
}

 */

export default class Game {
    constructor() {
        this.elements = [
            { name: "pierre", imageSrc: "../../Calendrier-de-l-avent-AFCI/Pierre-Papier-Cisseau-main/pierre.jpg" },
            { name: "ciseau", imageSrc: "../../Calendrier-de-l-avent-AFCI/Pierre-Papier-Cisseau-main//ciseau.jpeg" },
            { name: "papier", imageSrc: "../../Calendrier-de-l-avent-AFCI/Pierre-Papier-Cisseau-main/papier.jpg" }
        ];

        this.playerChoice = null;
        this.computerChoice = null;
        this.gameContainer = this.createGameContainer();
        this.versusImage = this.createVersusImage();
        this.resetButton = null;

        this.setupGame();
    }

    createGameContainer() {
        const container = document.createElement("div");
        container.className = "boite";
        document.body.appendChild(container);
        return container;
    }

    createVersusImage() {
        const image = document.createElement("img");
        image.className = "img5"
        image.src = "../../Calendrier-de-l-avent-AFCI/Pierre-Papier-Cisseau-main/versus.jpg";
        image.alt = "";
        const versusContainer = document.createElement("div");
        versusContainer.className = "versus";
        versusContainer.appendChild(image);
        this.gameContainer.appendChild(versusContainer);
        return image;
    }

    createElement(elementData) {
        const container = document.createElement("div");
        container.className = "div5"
        container.className = elementData.name;

        const image = document.createElement("img");
        image.className = "img5"
        image.src = elementData.imageSrc;
        image.alt = "";

        const button = document.createElement("button");
        button.className = "button5"
        button.className = `click ${elementData.name}`;
        button.textContent = elementData.name.charAt(0).toUpperCase() + elementData.name.slice(1);

        container.appendChild(image);
        container.appendChild(button);

        return container;
    }

    setupGame() {
        this.elements.forEach(elementData => {
            const elementNode = this.createElement(elementData);
            const button = elementNode.querySelector("button");
            button.className = "button5"
            button.addEventListener("click", () => this.play(elementData.name));
            this.gameContainer.appendChild(elementNode);
        });
    }

    play(playerChoice) {
        this.playerChoice = playerChoice;
        this.hideButtons();
        this.computerChoice = this.getRandomElement();
        this.showVersusImage();
        this.determineWinner();
        this.showResetButton();
    }

    getRandomElement() {
        const randomIndex = Math.floor(Math.random() * this.elements.length);
        return this.elements[randomIndex].name;
    }

    hideButtons() {
        this.elements.forEach(elementData => {
            const button = this.gameContainer.querySelector(`.${elementData.name} button`);
            button.style.display = "none";
        });
    }

    showVersusImage() {
        this.versusImage.style.display = "block";
    }

    determineWinner() {
        // Implementation of winner determination logic
        // ...

        // Example: Displaying the result in the console
        console.log(`Player: ${this.playerChoice}, Computer: ${this.computerChoice}`);
    }

    showResetButton() {
        this.resetButton = document.createElement("button");
        this.resetButton.className = "button5"
        this.resetButton.textContent = "Rejouer";
        this.resetButton.addEventListener("click", () => this.resetGame());
        document.body.appendChild(this.resetButton);
    }

    resetGame() {
        this.elements.forEach(elementData => {
            const button = this.gameContainer.querySelector(`.${elementData.name} button`);
            button.style.display = "block";
        });

        this.versusImage.style.display = "none";
        this.playerChoice = null;
        this.computerChoice = null;

        if (this.resetButton) {
            this.resetButton.remove();
        }
    }
}
