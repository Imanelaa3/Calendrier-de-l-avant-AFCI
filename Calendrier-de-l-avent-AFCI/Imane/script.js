"use stict";

//-----------Import-----------------
import Imane from "./imane.js";




//----------------B1------------------

const b1 = document.querySelector('.b1')
const baliseAnim = document.querySelector('balise-animation')

b1.addEventListener('click',()=>{
    if(baliseAnim.style.display === "none")
    {
        baliseAnim.style.display= ""
    }
})





