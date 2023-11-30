class StarWarsScene {
  constructor() {
    this.container = document.createElement("div");
    this.container.id = "containerId";
    this.init();
  }

  init() {
    this.createHTML();
    this.applyCSS();
  }

  createHTML() {
    this.container.innerHTML = `
            <div class="container-starwars">
                <div class="img1-vador">
                    <div class="img1-vador-content"></div>
                </div>
                <div class="img2-lightsaber">
                    <div class="img2-lightsaber-content"></div>
                </div>
                <div class="img3-smoke">
                    <div class="img3-smoke-content"></div>
                </div>
            </div>
        `;
  }

  applyCSS() {
    const style = document.createElement("style");
    style.innerHTML = `
            *,
            ::before,
            ::after {
                box-sizing: border-box;
                margin: 0;
            }

            #containerId {
                height: 100%;
                width: 100%;
                background-color: #020202;
                display: flex;
                flex-direction: column;
                justify-content: end;
                align-items: center;
            }

            .container-starwars {
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-rows: auto 1fr auto;
                grid-template-columns: auto 1fr auto;
              }
              
              .container-starwars > .img1-vador,
              .img2-lightsaber,
              .img3-smoke {
                width: 100%;
                height: 100%;
                grid-row: 2;
                grid-column: 2;
              }
              .img1-vador > .img1-vador-content {
                height: 100%;
                background-image: url(./thomas/src/vadorsmokeinit.png);
                background-repeat: no-repeat;
                background-size: contain;
              }
              .img2-lightsaber {
                height: 100%;
              }
              .coverimg2-lightsaber {
                height: 50%;
              }
              .img2-lightsaber > .img2-lightsaber-content {
                height: 100%;
                background-image: url(./thomas/src/vadorsmoke_lightsaber.png);
                background-repeat: no-repeat;
                background-size: contain;
                animation: lights 10s ease infinite;
                visibility: 0;
              }
              .img3-smoke > .img3-smoke-content {
                height: 100%;
                background-image: url(./thomas/src/vadorsmoke_smoke.png);
                background-repeat: no-repeat;
                background-size: contain;
                animation: gotop 10s linear infinite;
              }

            @keyframes lights {
                from {
                    visibility: 0;
                    opacity: 0;
                  }
                  10% {
                    visibility: 1;
                    opacity: 1;
                  }
                  50% {
                    visibility: 1;
                    opacity: 1;
                  }
                  61% {
                    visibility: 0;
                    opacity: 0;
                  }
                
                  to {
                    visibility: 1;
                    opacity: 0;
                  }
            }

            @keyframes gotop {
                from {
                    opacity: 0;
                    transform: translateY(0);
                  }
                
                  40% {
                    opacity: 0.4;
                    transform: translateY(-10%);
                  }
                  50% {
                    opacity: 0;
                  }
                
                  75% {
                    opacity: 0;
                    transform: translateY(-30%);
                  }
                  to {
                    opacity: 0;
                    transform: translateY(-100%);
                  }
            }
        `;
    document.head.appendChild(style);
  }
}

export default StarWarsScene;
