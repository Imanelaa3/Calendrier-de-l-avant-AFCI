export default class GameModal {
  constructor() {
    this.container = null;
    this.openModal();
  }

  closePopup() {
    this.style.display = "none";
}

  openModal() {
    this.container = document.createElement('div');
    this.container.classList.add('modal');
    const Iframe = document.createElement("iframe");
    Iframe.src = "./harry/game1/index.html"
    this.container.append(Iframe);
    this.Iframe = Iframe;
  }

    resize() {
    const size = this.container.parentElement.getBoundingClientRect();
    this.Iframe.width = size.width -10;
    this.Iframe.height = size.height -10;
  }

  closeModal() {
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
    }
  }
}