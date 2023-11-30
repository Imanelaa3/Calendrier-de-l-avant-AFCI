"use stict";

//-----------Import-----------------
import Imane from "./Imane/imane.js";
import Dylan from "./dylan/dylan.js";
import Dylan2 from "./dylan/dylan2.js";
import Tim from "./tim/script.js"
import AnimImane from "./Imane/AnimImane.js"


//----------------B1------------------

const buttons = document.querySelectorAll("button");
const baliseAnim = document.querySelector("balise-animation");
const currentDate = new Date();

const listImport = {
  1: { file: "Calendrier-de-l-avent-afci/Imane/AnimImane.js",template:'#imane' },
  2: { file: "./audejeu/script.js", template: "#aude" },
  3: { file: "./dylan/dylan.js", template: "#dylan" },
  4: { file: "./dylan/dylan2.js", template: "#dylan2" },
  5: { file: "./Pierre-Papier-Cisseau-main/script.js", template: "#faissal" },
  6: {file:"./taquin/taquin.js",template:"#aude2"},
  7: {file:"./thomas/script.js", template:"#thomas"},
  8: {file:"./tim/script.js",template:'#tim'},
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
  16: "",
  17: "",
  18: "",
  19: "",
  20: "",
  21: "",
  22: "",
  13: "",
  24: "",
};

buttons.forEach((button) => {
  const day = parseInt(button.getAttribute("data-day"));
  const allowedDate = new Date(2023, 10, day);

  if (currentDate >= allowedDate) {
    button.addEventListener("click", async () => {
      if (
        baliseAnim.style.display === "none" ||
        baliseAnim.style.display === ""
      ) {
        //console.log(listImport[day], day);
        const import1 = await import(listImport[day].file);
        //console.log(import1);
        const anim = new import1.default();

        const template = document.querySelector(listImport[day].template);

        if (template) {
          //console.log("template");
          baliseAnim.append(template.content);
        }
        if (anim.canvas) {
          baliseAnim.append(anim.canvas);
        } else if (anim instanceof HTMLElement) {
          baliseAnim.append(anim);
        } else if (anim.container) {
          baliseAnim.append(anim.container);
        }

        baliseAnim.style.display = "block";
        //console.log("ok");
      }

      //TODO function import
    });
  } else {
    // Désactivez le bouton si la date actuelle est inférieure à la date autorisée
    button.disabled = true;
  }

  if (currentDate.getDate() === allowedDate.getDate()) {
    const bnew = document.querySelector(`.b${day}`);
    const p = document.createElement("h3");
    p.style.color = "red";
    p.textContent = "Today";
    bnew.append(p);
    bnew.addEventListener("mouseenter", animationNew);
  }
});

//-------animation----------------

function animationNew() {
  const newToAnimate = this.querySelector("h3");
  const keyframes = [
    { transform: "skew(0deg, 0deg)" },
    { transform: "skew(-34deg, 0deg)" },
    { transform: "skew(0deg, 0deg)" },
  ];

  const options = {
    duration: 200,
    iterations: 5,
    fill: "forwards",
    direction: "alternate",
  };

  newToAnimate.animate(keyframes, options);
  //console.log("new");
}

//function import (voir cours)
