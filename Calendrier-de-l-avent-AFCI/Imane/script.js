"use stict";

//-----------Import-----------------
import Imane from "./imane.js";








//----------------B1------------------

const buttons = document.querySelectorAll('button')
const baliseAnim = document.querySelector('balise-animation')
const currentDate = new Date()





buttons.forEach(button => {

    const day = parseInt(button.getAttribute('data-day'))
    const allowedDate = new Date (2023,10,day)

    if (currentDate >= allowedDate) {
        button.addEventListener('click', () => {
            if (baliseAnim.style.display === "none" || baliseAnim.style.display === "") {
                baliseAnim.style.display = "block";
                console.log('ok');
            }
            
            //TODO function import
            
        });
    } else {
        // Désactivez le bouton si la date actuelle est inférieure à la date autorisée
        button.disabled = true;
    }
    
    
    if(currentDate.getDate() === allowedDate.getDate())
    {
        const bnew = document.querySelector(`.b${day}`)
        const p = document.createElement('h3')
        p.style.color='red'
        p.textContent = 'Today'
        bnew.append(p)
        bnew.addEventListener('mouseenter',animationNew)

        
        
 
    }
});

//-------animation----------------

function animationNew()
{
    const newToAnimate= this.querySelector('h3')
    const keyframes = [
        { transform: 'skew(0deg, 0deg)'},
        { transform: 'skew(-34deg, 0deg)' },
        { transform: 'skew(0deg, 0deg)'},
        
    ];

    const options = {
    duration: 200,
    iterations: 5,
    fill: "forwards",
    direction: "alternate"
        };

    newToAnimate.animate(keyframes,options)
    console.log("new");

}






 
//function import (voir cours)
