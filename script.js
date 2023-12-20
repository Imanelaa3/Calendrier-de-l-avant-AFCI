"use strict";

//-----------Import-----------------
import Imane from "./Imane/imane.js";
import Dylan from "./dylan/dylan.js";
import Dylan2 from "./dylan/dylan2.js";
import Tim from "./tim/script.js";
import Aude from "./audejeu/quizz".js;




//----------------B1------------------

const buttons = document.querySelectorAll("button");
const baliseAnim = document.querySelector("balise-animation");
const currentDate = new Date();

const listImport = {
  1: { file: "./Imane/AnimImane.js", template: "#imane" },
  2: { file: "./audejeu/script.js", template: "#aude" },
  3: { file: "./dylan/dylan.js", template: "#dylan" },
  4: { file: "./dylan/dylan2.js", template: "#dylan2" },
  5: { file: "./Pierre-Papier-Cisseau-main/script.js", template: "#faissal" },
  6: { file: "./taquin/taquin.js", template: "#aude2" },
  7: { file: "./thomas/script.js", template: "#thomas" },
  8: { file: "./tim/script.js", template: "#tim" },
  9: { file: "./thomas2/Game2D - POO/script.js", template: "#thomas2" },
  10: { file: "./maria/maria1/mariia1.js", template: "#maria" },
  11: { file: "./maria/maria2/mariia2.js", template: "#maria2" },
  12: { file: "./thierry/thierry1/loterie-thierry1.js", template: "#thierry" },
  13: { file: "./thierry/thierry2/hockey-thierry2.js", template: "#thierry2" },
  14: {file: "./Calendrier-de-l-avent-AFCI/Maxime/baballe/script.js",template: "#maxime"},
  15: { file: "./casse_briques/game.js", template: "#khalid" },
  16: { file: "./harry/gremlinvasion.js", template: "#harry1" },
  17: {file:"./tim2/tim2.js",template:"#tim2"},
  18: "",
  19:{file:"./audejeu/quizz.js",template:"#aude4"},
  20: {file:"./audejeu/memory.js",template:"#aude3"},
  21: "",
  22: "",
  23: "",
  24: "",
};
console.log(listImport);
buttons.forEach((button) => {
  const day = parseInt(button.getAttribute("data-day"));
  const allowedDate = new Date(2023, 11, day);

  if (currentDate >= allowedDate) {
    button.addEventListener("click", async () => {
      if (
        baliseAnim.style.display === "none" ||
        baliseAnim.style.display === ""
      ) {
        console.log(listImport, listImport[day], day, listImport[day].template);
        const import1 = await import(listImport[day].file);
        console.log(import1);
        const anim = new import1.default();

        const template = document.querySelector(listImport[day].template);

        if (template) {
          //console.log("template");
          baliseAnim.append(template.content);
        }
        if (anim.container) {
          baliseAnim.append(anim.container);
        } else if (anim.canvas) {
          baliseAnim.append(anim.canvas);
        } else if (anim instanceof HTMLElement) {
          baliseAnim.append(anim);
        }
        baliseAnim.style.display = "block";
        //console.log("ok");
        if (anim.resize && typeof anim.resize == "function") {
          anim.resize();
        }
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
