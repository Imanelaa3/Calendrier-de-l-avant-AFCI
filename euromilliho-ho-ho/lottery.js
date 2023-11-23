"use strict"

   let button = document.createElement("button")
   button.style.border = "none"
   button.style.cursor = "pointer"
   button.style.display = "block"
   button.style.width = "300px"
   button.style.backgroundColor = "green"
   button.style.padding = "10px"
   button.style.fontSize = "13pt"
   button.style.color = "white"
   button.style.textDecoration = "none"
   button.style.margin = "10px auto"
   button.style.marginBottom = "10px"
   button.style.borderRadius = "20px"
   button.textContent = "Jouer à l'EuroMilli-oh-oh-oh (Son conseillé)"
   document.body.append(button)

   button.addEventListener("click", creerGrille, {once: true})
   button.addEventListener("click", texte)
   button.addEventListener("click", musicBg, {once: true})

   let divCont = document.createElement("div")
   divCont.setAttribute("id", "cont")
   document.body.append(divCont)

   let divGrille = document.createElement("div")
   divGrille.setAttribute("id", "grille")
   divCont.append(divGrille)

   let divTirage= document.createElement("div")
   divTirage.setAttribute("id", "tirage")
   divCont.append(divTirage)

   let divCtirage = document.createElement("div")
   divCtirage.setAttribute("id", "ctirage")
   divTirage.append(divCtirage)

   let divChoix = document.createElement("div")
   divChoix.setAttribute("id", "choix")
   divCtirage.append(divChoix)

   let divRes = document.createElement("div")
   divRes.setAttribute("id", "res")
   divCtirage.append(divRes)

   let divBon = document.createElement("div")
   divBon.textContent = 0
   divBon.setAttribute("id", "bon")
   divCtirage.append(divBon)

   const musiqueChoix = new Audio('./musique-euro/meow.mp3');
   const musiqueTirage = new Audio ('./musique-euro/suspense.mp3')
   const musiqueBon = new Audio ('./musique-euro/wow.mp3')
   const musiqueEnd = new Audio ('./musique-euro/carey.mp3')

   function musicBg (){
      musiqueChoix.play()
    }
    function musicTirage (){
      musiqueTirage.play()
    }
    function musicBon (){
      musiqueBon.play()
    }
    function musicEnd (){
      musiqueEnd.play()
    }

    let i=1;
    let nbr=0;

 
   function texte (){
      button.textContent = "choisissez 6 numéroh-oh-oh"
   }

 function creerGrille(){
   //button.style.visibility = "hidden";
    let t=setTimeout("creerGrille()",50);
    let bouton =document.createElement("div");
    bouton.style.width = "26px"
    bouton.style.height = "26px"
    bouton.style.textAlign = "center"
    bouton.style.border = "solid 1px green"
    bouton.style.display = "flex"
    bouton.style.display = "inline-block"
    bouton.style.margin = "3px"
    bouton.style.cursor = "pointer"
    bouton.style.color = "red"
   
    bouton.innerHTML=i;
    bouton.setAttribute("id",i);
    bouton.addEventListener("click", function() {
       ajouter(bouton);
    })


    bouton.addEventListener("mouseenter", hover)
    bouton.addEventListener("mouseleave", nohover)

   function hover(){
   bouton.style.backgroundColor = "lightgreen"
   }
   function nohover(){
      bouton.style.backgroundColor = "#FFF"
      }

    document.getElementById("grille").append(bouton);
    if(i%7==0){
       let br=document.createElement("br");
       document.getElementById("grille").append(br);
    }
    i+=1;
    if(i>49)
       clearTimeout(t);
 }
 
 function ajouter(ob){
    if(nbr<6){
       ob.style.visibility="hidden";
       let nbouton=document.createElement("div");
       nbouton.style.width = "26px"
       nbouton.style.height = "26px"
       nbouton.style.textAlign = "center"
       nbouton.style.border = "solid 1px green"
       nbouton.style.display = "inline-flex"
       nbouton.style.alignItems = "center"
       nbouton.style.justifyContent = "center"
       nbouton.style.margin = "3px"
       nbouton.style.color = "red"
       nbouton.className="nbouton";
       nbouton.setAttribute("id","ch"+nbr);
       nbouton.innerHTML=ob.textContent;
       document.getElementById("choix").append(nbouton);
       choix[nbr]=ob.firstChild.nodeValue;
       nbr+=1;
       if(nbr==6){
          ztirage();
          musicTirage();
          musiqueChoix.pause()
       }
    }
 }
 let j=0;
 function ztirage(){
    setTimeout("ztirage()",100);
    if(j<6){
       let zbouton=document.createElement("div");
       zbouton.style.width = "26px"
       zbouton.style.height = "26px"
       zbouton.style.textAlign = "center"
       zbouton.style.border = "solid 1px green"
       zbouton.style.backgroundColor = "#F8F8F8"
       zbouton.style.display = "inline-flex"
       zbouton.style.alignItems = "center"
       zbouton.style.justifyContent = "center"
       zbouton.style.margin = "3px"
       zbouton.style.color = "red"
       zbouton.innerHTML=0;
       zbouton.setAttribute("id","res"+j);
       document.getElementById("res").append(zbouton);
       j+=1;
       if(j==6){
         let p2 = document.createElement("p")
         p2.textContent = "Voici le tirage effectué par mon cerf de justice assermenté, Bo-ho-honne chance !"
         divChoix.append(p2)
          document.getElementById("bon").style.visibility="visible";
          tirage();
          musicTirage();
       }
    }
 }
 let index=0;
 let rep=0;
 let tab=new Array();
 let itr=50;

 
 function tirage(){
    let tx=setTimeout("tirage()",40);
    rep+=1;
    if(rep<itr){
       for(let k=index+1;k<6;k++)
          document.getElementById("res"+k).innerHTML=Math.ceil(Math.random()*49);

       let v=Math.ceil(Math.random()*49);
       document.getElementById("res"+index).innerHTML=v;
       if(rep==itr-1){
          if(tab.indexOf(v)==-1){
             tab[index]=v;
             for(let k=0;k<6;k++){
                if(document.getElementById("ch"+k).firstChild.data==tab[index]){
                  musicBon();
                   document.getElementById("ch"+k).style.backgroundColor="green";
                   document.getElementById("res"+index).style.backgroundColor="green";
                   document.getElementById("ch"+k).style.color="#FFF";
                   document.getElementById("res"+index).style.color="#FFF";
                   document.getElementById("bon").innerHTML=parseInt(document.getElementById("bon").textContent)+1;
                  
                }
             }
          }
          else
             rep=itr-2;
       }
    }
    else{
       rep=0;
       index+=1;
       if(index==6){
          clearTimeout(tx);
          musicEnd();
          let p = document.createElement("p")
          let p2 = document.createElement("p")
          p.setAttribute("id", "fin")
          p.style.textAlign = "center"
          p.style.marginTop = "70px"
          p.style.fontSize = "1.5em"
          p.textContent = "Merci d'avoir joué, nous vous souhaitons un joyeux noël, de nombreux cadeaux* et à très bient-oh-oh-oh pour un nouveau tirage"
          document.body.append(p)

          p2.setAttribute("id", "fin2")
          p2.style.textAlign = "center"
          p2.style.marginTop = "40px"
          p2.style.fontSize = "1em"
          p2.textContent = "*Désolé, aucun cadeau ne vous sera envoyé même en remportant tout les numéros-ho-ho, les droits d'auteurs du titre de Mariah Carey étaient trop élevés cette année. "
          document.body.append(p2)
          console.log("c fin");

          
       }
    }
 }

 //////// style /////

 //div pricincipal chiffre
divCont.style.display = "grid";
divCont.style.gridTemplateColumns = "1fr";

divGrille.style.width = "50%"
divGrille.style.display = "flex"
divGrille.style.flexWrap = "wrap"
divGrille.style.margin = "15px auto"

divTirage.style.height = "220px";
divTirage.style.margin = "auto";

divChoix.style.textAlign = "center"

divCtirage.style.display = "inline-block";
divCtirage.style.textAlign = "center";

divBon.style.fontSize = "72pt"
divBon.style.margin = "30px auto"
divBon.style.textAlign = "center"
divBon.style.visibility = "hidden"
divBon.style.backgroundColor = "green"
divBon.style.color = "#FFF"
divBon.style.width = "120px"
divBon.style.height = "120px"
divBon.style.borderRadius = "100px"
divBon.style.lineHeight = "120px"












