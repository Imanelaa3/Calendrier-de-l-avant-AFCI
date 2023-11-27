"use strict"
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

