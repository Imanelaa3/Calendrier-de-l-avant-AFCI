export default class mariia1 extends HTMLElement{

    constructor(){
        super()
        this.init()

    }
    

    
    

init(){
    const popupContent = `
    
    <div id="bg"></div>
    <h1 id="h1">Chocolat chaud de Noël 🍫</h1>
    <p id="p6">La tradition de Noël consiste à boire un délicieux chocolat chaud. Je pense que c'est plutôt sympa ! Alors faisons-le avec vous ensemble. Vous n'avez besoin que de 3 ingrédients :)</p>
    <h2 id="h2">INGRÉDIENTS:</h2>
    <li id="li">- 70 g de chocolat noir (70% de cacao)</li>
    <li id="li2">160 ml de lait</li>
    <li id="li3">- 1 cuillère à soupe de cassonade</li>
    <li id="li4">- Une ou deux de vos garnitures préférées: crème fouettée, ou canne à sucre(bonbon), ou guimauves, ou cannelle, ou plus de chocolat</li>
    <h3 id="h22">PRÉPARATION:</h3>
    <p id="p2">2. Versez le lait dans une casserole. Chauffez à feu doux. Lorsque le lait est chaud, ajoutez le chocolat et mélangez au fouet. Cuire jusqu'à ce que le chocolat soit complètement dissout.</p>
    <p id="p3">3. Ajoutez le sucre, portez le lait à ébullition et versez dans des tasses.</p>
    <p id="p4">4. Décorez avec vos garnitures que vous avez choisies.</p>
    <p id="p5">En écoutant votre playlist préférée, prenez votre doux et confortable plaid et dégustez votre chocolat chaud. Sentez-vous l'atmosphère de Noël dans l'air ?</p>
    <img id="img" src="" alt="" > 
    
    
    `
    this.innerHTML = popupContent;

    
    const bg = this.querySelector('#bg')
    const h1 = this.querySelector('#h1')
    const p6 = this.querySelector('#p6')
    const h2 = this.querySelector('#h2')
    const li = this.querySelector('#li')
    const li2 = this.querySelector('#li2')
    const li3 = this.querySelector('#li3')
    const li4 = this.querySelector('#li4')
    const h22 = this.querySelector('#h22')
   
    const p2 = this.querySelector('#p2')
    const p3 = this.querySelector('#p3')
    const p4 = this.querySelector('#p4')
    const p5 = this.querySelector('#p5')
    const img = this.querySelector('#img')

 

    bg.style.width = "100vw"
    bg.style.height = "100vh"
    bg.style.background = "url(./images-maria1/christmas_hot_chocolat.jpg)"
    bg.style.position = "absolute"
    bg.style.opacity = "0.25"
    
    h1.style.color = "brown";
    h1.style.textAlign = "center";

    h2.style.textAlign = "center";
    h2.style.margin = "10px";
    h2.style.textDecoration = "underline";

    h22.style.textAlign = "center";
    h22.style.margin = "10px";
    h22.style.textDecoration = "underline";
    
    li.style.fontWeight = "bold";
    li.style.textAlign = "center"
    li2.style.fontWeight = "bold";
    li2.style.textAlign = "center"
    li3.style.fontWeight = "bold";
    li3.style.textAlign = "center";
    li4.style.fontWeight = "bold";
    li4.style.textAlign = "center";
    
   
    p2.style.fontWeight = "bold";
    p2.style.textAlign = "center";
    p2.style.fontSize = "1.2em";
    p3.style.fontWeight = "bold";
    p3.style.textAlign = "center";
    p4.style.fontWeight = "bold";
    p4.style.textAlign = "center";
    p5.style.fontWeight = "bold";
    p5.style.color = "green";
    p5.style.fontSize = "1.2em"
    p5.style.textAlign = "center";
    p5.style.margin = "10px";
    p6.style.fontWeight = "bold";
    p6.style.color = "brown"
    p6.style.textAlign = "center";




}

 
}

customElements.define("balise-animation13", mariia1);