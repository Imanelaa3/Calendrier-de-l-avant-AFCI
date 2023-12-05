"use strict";

export default class Imane extends HTMLElement {
  constructor() {
    super();
    this.style.border = "5px dotted green";
    this.style.borderRadius = "10px";
    this.style.width = "99%";
    this.style.minWidth = "100px";
    this.style.height = "98%";
    this.style.minHeight = "200px";
    this.style.backgroundColor = "white";
    this.style.position = "absolute";
    this.style.top = "10px";
    this.style.right = "10px";
    this.style.left = "10px";
    this.style.display = "none";

    this.btn = document.createElement("input");
    this.btn.setAttribute("type", "button");
    this.btn.setAttribute("value", "X");
    console.log(this.btn);
    this.append(this.btn);

    const btnStyle = this.btn.style;
    btnStyle.width = "30px";
    btnStyle.height = "20px";
    btnStyle.position = "absolute";
    btnStyle.top = "5px";
    btnStyle.right = "5px";
    btnStyle.width = "20px";
    btnStyle.backgroundColor = "red";
    btnStyle.color = "white";
    btnStyle.zIndex = "99";

    this.btn.addEventListener("click", this.AnimBack.bind(this));
  }

  AnimBack() {
    if (this.style.display === "block") {
      this.textContent = "";
      this.style.display = "none";
      console.log("oui");
    }
  }
  attributeChangedCallback(name, old, now) {
    if (now.includes("display: none")) {
      console.log(this.btn);
      this.append(this.btn);
    }
  }
  static get observedAttributes() {
    return ["style"];
  }
}

customElements.define("balise-animation", Imane);
