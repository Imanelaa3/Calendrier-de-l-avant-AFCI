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
    (this.elements = [
      {
        name: "pierre",
        imageSrc:
          "./Pierre-Papier-Cisseau-main/pierre.jpg",
      },
      {
        name: "ciseau",
        imageSrc:
          "./Pierre-Papier-Cisseau-main/ciseau.jpg",
      },
      {
        name: "papier",
        imageSrc:
          "./Pierre-Papier-Cisseau-main/papier.jpg",
      },
    ]),
      (this.clone = null);
    //creation boite
    this.container = document.createElement("div");
    this.container.className = "boite";

    this.boitePierre = document.createElement("div");
    this.boitePierre.className = "pierre";
    this.boitePapier = document.createElement("div");
    this.boitePapier.className = "papier";
    this.boiteCiseau = document.createElement("div");
    this.boiteCiseau.className = "cisseau";
    //creation image versus
    this.versus = document.createElement("img");
    this.versus.className = "img5";
    this.versus.src =
      "./Pierre-Papier-Cisseau-main/versus.jpg";
    //creation boutton pierre feuille cisseaux
    this.buttonC = document.createElement("button");
    this.buttonC.className = "click";
    this.buttonC.textContent = "Cisseau";
    this.cisseau = document.createElement("img");
    this.cisseau.className = "img5";
    this.cisseau.src = this.elements[1].imageSrc;

    this.buttonP = document.createElement("button");
    this.buttonP.className = "click";
    this.buttonP.textContent = "Pierre";
    this.pierre = document.createElement("img");
    this.pierre.className = "img5";
    this.pierre.src = this.elements[0].imageSrc;

    this.buttonF = document.createElement("button");
    this.buttonF.className = "click";
    this.buttonF.textContent = "Feuille";
    this.papier = document.createElement("img");
    this.papier.className = "img5";
    this.papier.src = this.elements[2].imageSrc;
    //creation button rejouer
    this.rejouer = document.createElement("button");
    this.rejouer.className = "button5";
    this.rejouer.textContent = "Rejouer";

    //ajout des element au dom
    this.boitePierre.append(this.pierre, this.buttonP);
    this.boitePapier.append(this.papier, this.buttonF);
    this.boiteCiseau.append(this.cisseau, this.buttonC);
    this.container.append(
      this.boiteCiseau,
      this.boitePapier,
      this.boitePierre,
      this.rejouer,
      this.versus
    );

    //ajout methode aux evvent
    this.buttonC.addEventListener("click", () => {
      this.cisseau.style.display = "block";
      this.versus.style.display = "block";

      this.choix = "ciseau";
      this.playGame();
      this.gamePlay();
      return this.choix;
    });
    this.buttonP.addEventListener("click", () => {
      this.pierre.style.display = "block";
      this.versus.style.display = "block";
      this.choix = "pierre";
      this.playGame();
      this.gamePlay();
      return this.choix;
    });
    this.buttonF.addEventListener("click", () => {
      this.papier.style.display = "block";
      this.versus.style.display = "block";
      this.choix = "papier";
      this.playGame();
      this.gamePlay();
      return this.choix;
    });
    this.rejouer.addEventListener("click", this.resetGame.bind(this));

    this.initGame();
  }

  initGame() {
    this.debut = document.createElement("p");
    this.debut.textContent =
      " A toi de jouer choisi la pierre le papier ou le cisseau";
    this.debut.className = "message1"
    this.container.appendChild(this.debut);
    this.rejouer.style.display = "none";
  }
/**
 * fonction qui permet d'ffacer les buton lors du jeu
 */
  playGame() {
    // this.choixOrdi();
    // const img = document.createElement("img");
    // img.style.display = "block";
    this.buttonC.style.display = "none";
    this.buttonF.style.display = "none";
    this.buttonP.style.display = "none";
    this.rejouer.style.display = "";
    this.debut.remove();
  }
/**
 * fonction du choix de l'ordi
 * @returns le choix de l'ordi en string
 */
  choixOrdi() {
    const choix = ["pierre", "papier", "cisseau"];
    const x = Math.floor(Math.random() * 3);
    let parent;
    console.log(choix[x]);
    switch (choix[x]) {
      case "pierre":
        parent = this.pierre;
        this.clone = this.pierre.cloneNode();
        this.container.append(this.clone);
        this.clone.style.display = "block";
        return "pierre";
        break;
      case "papier":
        parent = this.papier;
        this.clone = this.papier.cloneNode();
        this.container.append(this.clone);
        this.clone.style.display = "block";
        return "papier";
        break;
      case "cisseau":
        parent = this.cisseau;
        this.clone = this.cisseau.cloneNode();
        this.clone.style.display = "block";
        this.container.append(this.clone);
        return "ciseau";

        break;

      default:
        break;
    }
  }

  popup(text) {
    let message = document.createElement("h3");
    message.className = "message";
    message.textContent = text;
    this.container.appendChild(message);
    setTimeout(() => {
      message.style.display = "none";
    }, 3000);
  }
/**
 * fonction qui permet d'elir le vainqueur
 */
  gamePlay() {
    const gagner = "Gagné :)";
    const perdu = "Perdu :(";
    const egalité = "Egalité :|";
    const ia = this.choixOrdi();
    console.log(ia, this.choix);

    if (this.choix === ia) {
      this.popup(egalité);
    }
    if (this.choix == "ciseau" && ia == "papier") {
      this.popup(gagner);
    }
    if (this.choix == "ciseau" && ia == "pierre") {
      this.popup(perdu);
    }
    if (this.choix == "papier" && ia == "pierre") {
      this.popup(gagner);
    }
    if (this.choix == "papier" && ia == "ciseau") {
      this.popup(perdu);
    }
    if (this.choix == "pierre" && ia == "ciseau") {
      this.popup(gagner);
    }
    if (this.choix == "pierre" && ia == "papier") {
      this.popup(perdu);
    }
  }

  resetGame() {
    this.initGame();
    this.buttonC.style.display = "";
    this.buttonF.style.display = "";
    this.buttonP.style.display = "";
    this.cisseau.style.display = "none";
    this.pierre.style.display = "none";
    this.papier.style.display = "none";
    this.versus.style.display = "none";
    this.clone.remove();
  }
}
