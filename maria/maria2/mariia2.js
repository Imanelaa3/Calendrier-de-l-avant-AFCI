export default class mariia2 extends HTMLElement{


    constructor(){
    super()
    this.init();
    }


    init(){

        const popupContent = `
            <img id="img1" src="" alt="" >  
            <img id="img2" src="" alt="" >  
        `


    this.innerHTML = popupContent;

    const img1 = this.querySelector('#img1')
    const img2 = this.querySelector('#img2')
    const img3 = this.querySelector('#img3')
    

    img1.style.width = "99%"
    img1.style.height = "95vh"
    img1.style.background = " top / cover no-repeat url(./images-maria2/bg-train.gif)"
    img1.style.position = "relative"
    img1.style.opacity = "1"
 

    img2.style.display = "block"
    img2.style.width = "100%"
    img2.style.position = "absolute"
    img2.style.top = "30%"
    img2.setAttribute("src", "./maria/maria2/images-maria2/merry-christmas-train.png")
    
       
    }

}

customElements.define("balise-animation12", mariia2);