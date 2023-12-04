export default class Thierry1 extends HTMLElement {
    

    
        constructor(){
            super()
            this.init()
         }
      
        // button = document.createElement("button")
        // divCont = document.createElement("div")
        // divGrille = document.createElement("div")
        // divTirage = document.createElement("div")
        // divCtirage = document.createElement("div")
        // divChoix = document.createElement("div")
        // divRes = document.createElement("div")
        // divBon = document.createElement("div")
        
      
            
         init() {
    
            const popupContent = `
            <div id="test">
                <button id="button"></button>
                <div id="divCont"></div>
                <div id="divGrille"></div>
                <div id="divTirage"></div>
                <div id="divCtirage"></div>
                <div id="divChoix"></div>
                <div id="divRes"></div>
                <div id="divBon">0</div>
                <p id="#p2"></p>
            <div>
                `
    
                //this.style.display = "block";
                this.innerHTML = popupContent;
                
    
            const test = this.querySelector('#test')
            const button = this.querySelector('#button')
            const divCont = this.querySelector('#divCont')
            const divGrille = this.querySelector('#divGrille')
            const divTirage = this.querySelector('#divTirage')
            const divCtirage = this.querySelector('#divCtirage')
            const divChoix = this.querySelector('#divChoix')
            const divRes = this.querySelector('#divRes')
            const divBon = this.querySelector('#divBon')
            const p2 = this.querySelector('#p2')
    
            
    
      
            //button
         //const button = document.createElement("button")
         button.style.border = "none"
         button.style.cursor = "pointer"
         button.style.display = "block"
         button.style.width = "300px"
         button.style.backgroundColor = "green"
         button.style.padding = "10px"
         button.style.fontSize = "15px"
         button.style.color = "white"
         button.style.textDecoration = "none"
         button.style.margin = "10px auto"
         button.style.marginBottom = "10px"
         button.style.borderRadius = "20px"
         button.textContent = "Jouer à l'EuroMilli-oh-oh-oh"
      
      
            //addevent
         button.addEventListener("click", this.creerGrille.bind(this), {once: true})
         button.addEventListener("click", this.texte.bind(this))
         //button.addEventListener("click", this.musicBg.bind(this), {once: true})
      
            //creation des elements
         //let divCont = document.createElement("div")
         
      
      
         divCont.style.display = "grid";
         divCont.style.gridTemplateColumns = "1fr";
      
         divGrille.style.width = "80%"
         divGrille.style.display = "flex"
         divGrille.style.flexWrap = "wrap"
         divGrille.style.margin = "15px auto"
      
         divTirage.style.height = "50px";
         divTirage.style.margin = "auto";
         divTirage.style.textAlign = "center";
      
         divChoix.style.textAlign = "center"
        
      
         divCtirage.style.display = "inline-block";
         divCtirage.style.textAlign = "center";
      
         divBon.style.fontSize = "100px"
         divBon.style.margin = "30px auto"
         divBon.style.textAlign = "center"
         divBon.style.visibility = "hidden"
         divBon.style.backgroundColor = "green"
         divBon.style.color = "#FFF"
         divBon.style.width = "120px"
         divBon.style.height = "120px"
         divBon.style.borderRadius = "100px"
         divBon.style.lineHeight = "120px"

         divRes.style.textAlign = "center"
      
         }
      
         i = 1
         nbr = 0
      
        texte (){
            button.textContent = "choisissez 6 numéroh-oh-oh"
         }
      
         creerGrille(){
         //button.style.visibility = "hidden";
            console.log(this);
            let t=setTimeout(this.creerGrille.bind(this),50);
            let bouton = document.createElement("div");
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
         
         divGrille.append(bouton);
         if(this.i%7==0){
            let br=document.createElement("br");
            divGrille.append(br);
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
             divTirage.append(nbouton);
             //choix[this.nbr]=ob.firstChild.nodeValue;
             this.nbr+=1;
             if(this.nbr==6){
                this.ztirage();
                //this.musicTirage();
                //this.musiqueChoix.pause()
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
             divRes.append(zbouton);
             this.j+=1;
             if(this.j==6){
               let p2 = document.createElement("p")
                p2.textContent = "Voici le tirage effectué par mon cerf de justice assermenté, Bo-ho-honne chance !"
                divTirage.append(p2)
                divBon.style.visibility="visible";
                this.tirage();
                //this.musicTirage();
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
                     // this.musicBon();
                       document.getElementById("ch"+k).style.backgroundColor="lightgreen";
                       //divRes.style.backgroundColor="green";
                       document.getElementById("ch"+k).style.color="red";
                       document.getElementById("res"+this.index).style.backgroundColor="lightgreen";
                       divBon.innerHTML=parseInt(divBon.textContent)+1;
                      
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
                //this.musicEnd();
                let p = document.createElement("p")
                let p2 = document.createElement("p")
                p.setAttribute("id", "fin")
                p.style.textAlign = "center"
                p.style.marginTop = "200px"
                p.style.fontSize = "1em"
                p.style.marginLeft = "5px"
                p.style.marginright = "5px"
                p.textContent = "Merci d'avoir joué, nous vous souhaitons un joyeux noël, de nombreux cadeaux* et à très bient-oh-oh-oh pour un nouveau tirage"
                divTirage.append(p)
      
                //p2.setAttribute("id", "fin2")
                p2.style.textAlign = "center"
                p2.style.marginTop = "25px"
                p2.style.marginLeft = "5px"
                p2.style.marginright = "5px"
                p2.style.fontSize = "0.8em"


                p2.textContent = `*Désolé, aucun cadeau ne vous sera envoyé même en remportant tout les numéros-ho-ho, les droits d'auteurs du titre de Mariah Carey étaient trop élevés cette année `
                divTirage.append(p2)
      
                
             }
          }
       }
      ///musique
      
      /*
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
    
           
        
        
        */
        }

customElements.define("balise-animation9", Thierry1);
