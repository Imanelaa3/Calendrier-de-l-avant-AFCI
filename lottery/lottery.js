
export default class thierry1  {

   constructor(){
      this.init()
   }

   button = document.createElement("button")
   divCont = document.createElement("div")
   divGrille = document.createElement("div")
   divTirage = document.createElement("div")
   divCtirage = document.createElement("div")
   divChoix = document.createElement("div")
   divRes = document.createElement("div")
   divBon = document.createElement("div")
  

      
   init(){

      //button
   //const button = document.createElement("button")
   this.button.style.border = "none"
   this.button.style.cursor = "pointer"
   this.button.style.display = "block"
   this.button.style.width = "300px"
   this.button.style.backgroundColor = "green"
   this.button.style.padding = "10px"
   this.button.style.fontSize = "13pt"
   this.button.style.color = "white"
   this.button.style.textDecoration = "none"
   this.button.style.margin = "10px auto"
   this.button.style.marginBottom = "10px"
   this.button.style.borderRadius = "20px"
   this.button.textContent = "Jouer à l'EuroMilli-oh-oh-oh (Son conseillé)"
   document.body.append(this.button)

      //addevent
   this.button.addEventListener("click", this.creerGrille.bind(this), {once: true})
   this.button.addEventListener("click", this.texte.bind(this))
   this.button.addEventListener("click", this.musicBg.bind(this), {once: true})

      //creation des elements
   //let divCont = document.createElement("div")
   this.divCont.setAttribute("id", "cont")
   document.body.append(this.divCont)

   //let divGrille = document.createElement("div")
   this.divGrille.setAttribute("id", "grille")
   this.divCont.append(this.divGrille)

   //let divTirage= document.createElement("div")
   this.divTirage.setAttribute("id", "tirage")
   this.divCont.append(this.divTirage)

   //let divCtirage = document.createElement("div")
   this.divCtirage.setAttribute("id", "ctirage")
   this.divTirage.append(this.divCtirage)

   //let divChoix = document.createElement("div")
   this.divChoix.setAttribute("id", "choix")
   this.divCtirage.append(this.divChoix)

   //let divRes = document.createElement("div")
   this.divRes.setAttribute("id", "res")
   this.divCtirage.append(this.divRes)

   //let divBon = document.createElement("div")
   this.divBon.textContent = 0
   this.divBon.setAttribute("id", "bon")
   this.divCtirage.append(this.divBon)


   this.divCont.style.display = "grid";
   this.divCont.style.gridTemplateColumns = "1fr";

   this.divGrille.style.width = "50%"
   this.divGrille.style.display = "flex"
   this.divGrille.style.flexWrap = "wrap"
   this.divGrille.style.margin = "15px auto"

   this.divTirage.style.height = "220px";
   this.divTirage.style.margin = "auto";

   this.divChoix.style.textAlign = "center"

   this.divCtirage.style.display = "inline-block";
   this.divCtirage.style.textAlign = "center";

   this.divBon.style.fontSize = "72pt"
   this.divBon.style.margin = "30px auto"
   this.divBon.style.textAlign = "center"
   this.divBon.style.visibility = "hidden"
   this.divBon.style.backgroundColor = "green"
   this.divBon.style.color = "#FFF"
   this.divBon.style.width = "120px"
   this.divBon.style.height = "120px"
   this.divBon.style.borderRadius = "100px"
   this.divBon.style.lineHeight = "120px"

   }

   i = 1
   nbr = 0

  texte (){
      this.button.textContent = "choisissez 6 numéroh-oh-oh"
   }

   creerGrille(){
   //button.style.visibility = "hidden";
      console.log(this);
      let t=setTimeout(this.creerGrille.bind(this),50);
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
   
      bouton.innerHTML=this.i;
      bouton.setAttribute("id",this.i);
      /*probleme ici :
      objectif : Lors de l'appui sur la variable "bouton", la méthode "ajouter" (avec comme paramètre la variable)" Ne fonctionne pas.
      
      */
      bouton.addEventListener("click", () => {
         console.log(this);
         this.ajouter(bouton);
   })
   
   document.getElementById("grille").append(bouton);
   if(this.i%7==0){
      let br=document.createElement("br");
      document.getElementById("grille").append(br);
   }
   this.i+=1;
   if(this.i>49)
      clearTimeout(t);
 }
 
 ajouter(ob){
    if(this.nbr<6){
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
       nbouton.setAttribute("id","ch"+this.nbr);
       nbouton.innerHTML=ob.textContent;
       document.getElementById("choix").append(nbouton);
       choix[this.nbr]=ob.firstChild.nodeValue;
       this.nbr+=1;
       if(this.nbr==6){
          this.ztirage();
          this.musicTirage();
          this.musiqueChoix.pause()
       }
    }
 }

 j = 0
 


 ztirage(){
    setTimeout(this.ztirage.bind(this),100);
    if(this.j<6){
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
       zbouton.setAttribute("id","res"+this.j);
       document.getElementById("res").append(zbouton);
       this.j+=1;
       if(this.j==6){
         let p2 = document.createElement("p")
         p2.textContent = "Voici le tirage effectué par mon cerf de justice assermenté, Bo-ho-honne chance !"
         this.divChoix.append(p2)
          document.getElementById("bon").style.visibility="visible";
          this.tirage();
          this.musicTirage();
       }
    }
 }

 index = 0
 rep = 0
 tab = new Array()
 itr = 50

 tirage(){
    let tx=setTimeout(this.tirage.bind(this),40);
    this.rep+=1;
    if(this.rep<this.itr){
       for(let k=this.index+1;k<6;k++)
          document.getElementById("res"+k).innerHTML=Math.ceil(Math.random()*49);

       let v=Math.ceil(Math.random()*49);
       document.getElementById("res"+this.index).innerHTML=v;
       if(this.rep==this.itr-1){
          if(this.tab.indexOf(v)==-1){
             this.tab[this.index]=v;
             for(let k=0;k<6;k++){
                if(document.getElementById("ch"+k).firstChild.data==this.tab[this.index]){
                  this.musicBon();
                   document.getElementById("ch"+k).style.backgroundColor="green";
                   document.getElementById("res"+this.index).style.backgroundColor="green";
                   document.getElementById("ch"+k).style.color="#FFF";
                   document.getElementById("res"+this.index).style.color="#FFF";
                   document.getElementById("bon").innerHTML=parseInt(document.getElementById("bon").textContent)+1;
                  
                }
             }
          }
          else
             this.rep=this.itr-2;
       }
    }
    else{
       this.rep=0;
       this.index+=1;
       if(this.index==6){
          clearTimeout(tx);
          this.musicEnd();
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
///musique

musiqueChoix = new Audio('./assets-lottery/meow.mp3') 
musiqueTirage = new Audio ('./assets-lottery/suspense.mp3') 
musiqueBon = new Audio ('./assets-lottery/wow.mp3') 
musiqueEnd = new Audio ('./assets-lottery/carey.mp3') 

   musicBg (){
      this.musiqueChoix.play()
    }
    musicTirage (){
      this.musiqueTirage.play()
    }
    musicBon (){
      this.musiqueBon.play()
    }
    musicEnd (){
      this.musiqueEnd.play()
    }


};











