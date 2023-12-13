/*
----------------------------------
  Style
------------------------------------
*/
const styles = /* CSS */ `
*,
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.boite {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: lightgray;
} 
.container {
  padding: 15px;
  background-color: white;
  border-radius: 1em;
}
.jeu {
  height: 543px;
  width: 80vw;
  border: 1px solid black;
  overflow: hidden;
  position: relative;
  background: url(./tim2/img/noel2.jpg) center / cover;
}

.button-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.buttonSet{
  display: flex;
  gap: 40px;
  margin-top: 10px;
}
.set {
  padding: 5px 10px;
  background-color: red;
  color: white;
  border-radius: 0.5em;
  cursor: pointer;
}
.rules {
  position: absolute;
  text-align: center;
  top: 40%;
  border: 1px solid white;
  width: 500px;
  display: none;
  z-index: 5;
}
.rules div p {
  color: rgb(255, 255, 255);
  font-weight: bold;
}
.obstacle1 {
  height: 25px;
  width: 25px;
  border: 1px solid black;
  background-color: red;
  border-radius: 3em;
  position: absolute;
  top: 518px;
  left: 1070px;
}
.animationObstacle1 {
  animation: parcoursObstacle 2s infinite;
}
.obstacle2 {
  height: 20px;
  width: 50px;
  border: 1px solid black;
  position: absolute;
  background-color: red;
  top: 450px;
  left: 1070px;
}
.animationObstacle2 {
  animation: parcoursObstacle 2s infinite;
}

.personnage {
  position: absolute;
  top: 420px;
  height: 120px;
}
/* .personnage2 {
  position: absolute;
  top: 465px; 
  left: -220px; 
} */
.animationPerso {
  animation: persoSaut 1s ease-in-out;
}

@keyframes parcoursObstacle {
  0% {
    left: 1070px;
  }
  100% {
    left: -200px;
  }
}
@keyframes parcoursObstacle2 {
  0% {
    left: 1070px;
  }
  100% {
    left: -200px;
  }
}

@keyframes persoSaut {
  0% {
    top: 395px;
  }
  50% {
    top: 330px;
  }
  100% {
    top: 395px;
  }
}

@media screen and (max-width:688px) {
  .rules {
    width: 250px;
    padding: 10px;
    line-height: 20px;
  }
}
@media screen and (max-width: 950px) {
  .animationObstacle1 {
    animation: parcoursObstacle 3s infinite;
  }
}

@media screen and (max-width: 1100px) {
  .personnage {
    position: absolute;
    top: 485px;
    height: auto;
  }
  @keyframes persoSaut {
    0% {
      top: 455px;
    }
    50% {
      top: 410px;
    }
    100% {
      top: 455px;
    }
  }
  .animationObstacle2 {
    animation: none;
  }
  .obstacle1 {
    height: 20px;
    width: 20px;
    top: 522px;
  }
}
`;

export default class Game {
  constructor() {
    // création de mes éléments HTML
    this.container = document.createElement("div");
    this.container.className = "boite";
    this.rulesDiv = document.createElement("div");
    this.containerDiv = document.createElement("div");
    this.startButton = this.createButton("Start", "buttonStart");
    this.restartButton = this.createButton("Restart", "buttonRestart");
    this.rulesButton = this.createButton("Rules", "buttonRules");

    this.personnageImg = this.createImage(
      "./tim2/img/personnage2.PNG",
      "personnage"
    );
    this.obstacle1Div = this.createObstacle("obstacle1");
    this.obstacle2Div = this.createObstacle("obstacle2");
    // this.jeu = document.querySelector(".jeu");
    // this.personnage = document.querySelector(".personnage");
    // this.obstacle1 = document.querySelector(".obstacle1");
    // this.obstacle2 = document.querySelector(".obstacle2");
    // this.startGameButton = document.querySelector(".buttonStart");
    // this.restartGameButton = document.querySelector(".buttonRestart");
    // this.rulesButton = document.querySelector(".buttonRules");
    // this.rules = document.querySelector(".rules");
    // console.log(this.startGameButton);
    // setup des différentes fonctionnalités
    this.jeuEnCours = false;
    this.jumping = false;
    this.resizing = false;
    this.obstacle1Array = [];
    this.obstacle2Array = [];
    this.obstacles = [
      [this.obstacle1Div, "animationObstacle1"],
      [this.obstacle2Div, "animationObstacle2"],
    ];

    //   this.personnageSize = this.personnageImg.getBoundingClientRect();
    //   this.leftlimit = parseInt(window.getComputedStyle(this.personnageImg).getPropertyValue("left")) + personnageSize.width;

    this.jump = this.jump.bind(this);
    this.resize = this.resize.bind(this);
    // this.verifObstacle1 = this.verifObstacle1.bind(this);
    // this.verifObstacle2 = this.verifObstacle2.bind(this);
    this.verifObstacle1Interval = setInterval(() => {
      this.verifObstacle1();
    });
    this.verifObstacle2Interval = setInterval(() => {
      this.verifObstacle2();
    });
    // Création de mes parties
    this.createStyles();
    this.createRules();
    this.createContainer();
    this.createGameElements();
    this.appendElementsToBody();
    this.createButton();
    this.createImage();
    this.createObstacle();

    // Prendre les sizes de mon personnages
    this.toplimit = parseInt(
      window.getComputedStyle(this.personnageImg).getPropertyValue("top")
    );
    // console.log(this.toplimit);
    this.personnageSize = this.personnageImg.getBoundingClientRect();
    // on calcule la position left de l'élément personnage et on ajoute sa largeur pour obtenir leftlimit.
    this.leftlimit =
      parseInt(
        window.getComputedStyle(this.personnageImg).getPropertyValue("left")
      ) + this.personnageSize.width;

    this.addEventListeners();
    // this.animateObstacle(...this.obstacles[Math.floor(Math.random()*this.obstacles.length)])

    this.resize();
    // this.resizeScreen();

    // this.verifObstacle1();
    // this.verifObstacle2();
    // this.restartGameFunction();
  }

  createStyles() {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    this.container.append(styleElement);
  }

  createRules() {
    this.rulesDiv.classList.add("rules");

    this.rulesContentDiv = document.createElement("div");

    this.rulesParagraph1 = document.createElement("p");

    this.rulesParagraph1.textContent = "- Esquiver les obstacles";

    this.rulesParagraph2 = document.createElement("p");
    this.rulesParagraph2.textContent =
      "- Pour jouer, utiliser les touches directionnelles du clavier, flèche du haut pour sauter et flèche du bas pour rétrécir (ordinateur) ou appuyer en dessous du personnage pour sauter (tablette et téléphone)";

    this.rulesContentDiv.appendChild(this.rulesParagraph1);
    this.rulesContentDiv.appendChild(this.rulesParagraph2);
    this.rulesDiv.appendChild(this.rulesContentDiv);
  }

  createContainer() {
    this.containerDiv.classList.add("container");

    this.buttonContainerDiv = document.createElement("div");
    this.buttonContainerDiv.classList.add("button-container");
    this.containerDiv.append(this.buttonContainerDiv);

    this.buttonSetDiv = document.createElement("div");
    this.buttonSetDiv.classList.add("buttonSet");

    this.buttonSetDiv.appendChild(this.startButton);
    this.buttonSetDiv.appendChild(this.restartButton);
    this.buttonSetDiv.appendChild(this.rulesButton);

    this.buttonContainerDiv.appendChild(this.buttonSetDiv);

    this.jeuDiv = document.createElement("div");
    this.jeuDiv.classList.add("jeu");
    this.containerDiv.append(this.jeuDiv);
  }

  createGameElements() {
    this.jeuDiv.appendChild(this.personnageImg);
    this.jeuDiv.appendChild(this.obstacle1Div);
    this.jeuDiv.appendChild(this.obstacle2Div);
  }

  createButton(text, className) {
    const button = document.createElement("button");
    button.classList.add(className, "set");
    button.textContent = text;
    return button;
  }

  createImage(src, alt) {
    const img = document.createElement("img");
    img.classList.add(alt);
    img.src = src;
    img.alt = alt;
    return img;
  }

  createObstacle(className) {
    const obstacleDiv = document.createElement("div");
    obstacleDiv.classList.add(className);
    return obstacleDiv;
  }

  appendElementsToBody() {
    this.container.appendChild(this.rulesDiv);
    this.container.appendChild(this.containerDiv);
  }

  addEventListeners() {
    this.startButton.addEventListener("click", () => this.startGameFunction());

    this.restartButton.addEventListener("click", () =>
      this.restartGameFunction()
    );

    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp") {
        this.personnageImg.style.height = "";
        this.personnageImg.style.top = "";
        this.personnageImg.style.left = "0px";
        this.jump();
      } else if (e.code === "ArrowDown") {
        this.resize();
        this.personnageImg.style.height = "auto";
        this.personnageImg.style.top = "486px";
        this.personnageImg.style.left = "33px";
      }
    });

    document.addEventListener("click", (event) => {
      const personnageRect = this.personnageImg.getBoundingClientRect();
      const clickYPersonnage = event.clientY - personnageRect.top;

      if (clickYPersonnage >= personnageRect.height / 2) {
        this.jump();
        this.personnageImg.style.height = "";
        this.personnageImg.style.top = "";
        this.personnageImg.style.left = "0px";
      }
    });

    this.rulesButton.addEventListener("click", () => {
      if (this.rulesDiv.style.display === "block") {
        this.rulesDiv.style.display = "none";
      } else {
        this.rulesDiv.style.display = "block";
      }
    });
  }

  startGameFunction() {
    // console.log("Jeu démarre");
    this.animateObstacle(
      ...this.obstacles[Math.floor(Math.random() * this.obstacles.length)]
    );
    // on appelle la fonction prenant en compte les changements pour les écran < 1100px
    this.resizeScreen();
  }

  animateObstacle(obstacle, animationClass) {
    // console.log(obstacle);
    if (!this.jeuEnCours) {
      this.jeuEnCours = true;
      setTimeout(() => {
        obstacle.classList.add(animationClass);

        setTimeout(() => {
          obstacle.classList.remove(animationClass);
          this.jeuEnCours = false;
          // console.log(this.obstacles);
          this.animateObstacle(
            ...this.obstacles[Math.floor(Math.random() * this.obstacles.length)]
          );
        }, 2000);
      }, 1000);
    }
  }

  jump() {
    if (!this.jumping) {
      this.jumping = true;
      this.personnageImg.classList.add("animationPerso");

      setTimeout(() => {
        this.personnageImg.classList.remove("animationPerso");
        this.jumping = false;
      }, 1000);
    }
  }

  resize() {
    this.toplimit = parseInt(
      window.getComputedStyle(this.personnageImg).getPropertyValue("top")
    );
    if (!this.resizing) {
      this.resizing = true;
      // Add your resize logic here
    }
  }

  verifObstacle1() {
    const personnageTop = parseInt(
      window.getComputedStyle(this.personnageImg).getPropertyValue("top")
    );
    const obstacleleft = parseInt(
      window.getComputedStyle(this.obstacle1Div).getPropertyValue("left")
    );
    // on calcule la position left de l'élément personnage et on ajoute sa largeur pour obtenir leftlimit.
    //  this.toplimit = parseInt(window.getComputedStyle(this.personnageImg).getPropertyValue("top"));
    this.personnageSize = this.personnageImg.getBoundingClientRect();
    this.leftlimit = parseInt( window.getComputedStyle(this.personnageImg).getPropertyValue("left")) + this.personnageSize.width;
    console.log(personnageTop, this.toplimit);
    // console.log(obstacleleft, this.leftlimit);

    // console.log(personnageTop + ' / ' + this.toplimit);
    if (
      obstacleleft < this.leftlimit &&
      obstacleleft > 0 &&
      personnageTop >= this.toplimit
    ) {
      this.obstacle1Div.style.animation = "none";
      alert("perdu");
      this.jeuEnCours = false;
      this.obstacle1Div.style.display = "none";
      this.obstacle2Div.style.display = "none";
      // console.log(this.obstacle2Array);
    }
  }

  verifObstacle2() {
    const personnageTop = parseInt(
      window.getComputedStyle(this.personnageImg).getPropertyValue("top")
    );

    const obstacle2left = parseInt(
      window.getComputedStyle(this.obstacle2Div).getPropertyValue("left")
    );

    // Conditions de collision pour les deux personnages
    const collisionPersonnage1 =
      obstacle2left < 80 && obstacle2left > 0 && personnageTop <= 350;

    const collisionPersonnage2 =
      obstacle2left < 80 && obstacle2left > 0 && personnageTop <= 450;

    if (collisionPersonnage2 || collisionPersonnage1) {
      this.obstacle2Div.style.animation = "none";
      alert("perdu avec personnage 2");
      this.jeuEnCours = false;
      this.obstacle1Div.style.display = "none";
      this.obstacle2Div.style.display = "none";
    }
  }

  restartGameFunction() {
    this.jeuEnCours = true;
    this.obstacle1Div.style.animation = ""; // Remettre l'animation à zéro
    this.obstacle2Div.style.animation = "";
    this.obstacle1Div.style.display = "inline";
    this.obstacle2Div.style.display = "inline";

    // Redémarrer le jeu
    // console.log("test");
    this.startGameFunction();
    // on appelle la fonction prenant en compte les changements pour les écran < 1100px
    this.resizeScreen();
    // console.log(this.startGameFunction);
  }

  resizeScreen() {
    // console.log("resizeScreen() called");
    if (window.matchMedia("(max-width: 1100px)").matches) {
      // this.animateObstacle(...this.obstacles[[this.obstacle1Div, "animationObstacle1"]]);
      // console.log("petit");
      
      this.obstacles = [[this.obstacle1Div, "animationObstacle1"]];
    } else if (window.matchMedia("(min-width: 1100px)").matches) {
      this.obstacles = [
        [this.obstacle1Div, "animationObstacle1"],
        [this.obstacle2Div, "animationObstacle2"],
      ];
    }
  }
}
// Instantiate the Game class
// const game = new Game();

// setInterval(() => {
//   game.verifObstacle1();
// }, 100);

// setInterval(() => {
//   game.verifObstacle2();
// }, 100);
