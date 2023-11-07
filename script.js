"use strict";

//?-------------  Déclaration des Imports  -----------------//


//?-------------  Déclaration des Variables  ---------------//
const days = document.querySelectorAll('.dayBox');

//?-------------  Déclaration des Events  ------------------//
days.forEach(e => {
  days[e].addEventListener("click", selectGift);
});

// const hey = import("./katamari-day/katamari.js");

//!-------------  Instructions  ----------------------------//


//?-------------  Déclaration des Fonctions  ---------------//
function hello() {
  return console.log("salut");
}


//todo----------  TODO  ------------------------------------//


//*-------------  Zone Test  -------------------------------//


//*-------------  Fin  -------------------------------------//

