
// /* ===== CHARGEMENT DES DIFFERENTS SONS DU JEU===== */
// const WALL_HIT = new Audio('sounds/wall.mp3');

// const PADDLE_HIT = new Audio('sounds/paddle_hit.mp3');

// const BRICK_HIT = new Audio('sounds/brick_hit.mp3');

// const WIN = new Audio('sounds/win.mp3');

// const LIFE_LOST = new Audio('sounds/life_lost.mp3');

// /* ===== CHARGEMENT DES IMAGES ===== */
// const LEVEL_IMG = new Image(40, 40);
// LEVEL_IMG.src = 'img/level.png';
// const LIFE_IMG = new Image(40, 40);
// LIFE_IMG.src = 'img/life.png';
// const SCORE_IMG = new Image();
// SCORE_IMG.src = 'img/score.png';

// //Initialisation du canvas et définition du context
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// // Ajout de la bordure au canvas
// canvas.style.border = '1px solid #6198d8';
// ctx.lineWidth = 1;

// //Constantes nécessaires
// const PADDLE_WIDTH = 100;
// const PADDLE_MARGIN_BOTTOM = 20;
// const PADDLE_HEIGHT = 10;
// const BALL_RADIUS = 5;
// const SCORE_UNIT = 10;
// const MAX_LEVEL = 3;


// //Variables nécessaires
// let life = 3;
// let score = 0;
// let level = 1;
// let gameOver = false;
// let leftArrow = false;
// let rightArrow = false;
// let isPaused = false;

// //PROPRIETES DE LA PLANCHE
// const paddle = {
//     x: (canvas.width / 2) - (PADDLE_WIDTH /2),
//     y: canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
//     w: PADDLE_WIDTH,
//     h: PADDLE_HEIGHT,
//     dx: 8
// }

// //Déssiner la planche
// function drawPaddle() {
//     ctx.beginPath();

//     ctx.fillStyle = '#fff';
//     ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
//     ctx.strokeStyle = '#6198d8';
//     ctx.strokeRect(paddle.x, paddle.y, paddle.w, paddle.h);

//     ctx.closePath();
// }

// //Mise en place des touches de control de la planche
// document.addEventListener('keydown', (e) => {
//    if (e.key === 'Left' || e.key === 'ArrowLeft') { leftArrow = true;}
//    else if (e.key === 'Right' || e.key === 'ArrowRight') { rightArrow = true;}
// });
// document.addEventListener('keyup', (e) => {
//    if (e.key === 'Left' || e.key === 'ArrowLeft') { leftArrow = false;}
//    else if (e.key === 'Right' || e.key === 'ArrowRight') { rightArrow = false;}
// });

// //Animation - déplacement de la planche
// function movePaddle() {
//     if (leftArrow && paddle.x > 0) {
//         paddle.x -= paddle.dx;
//     } else if (rightArrow && paddle.x + paddle.w < canvas.width) {
//         paddle.x += paddle.dx;
//     }
// }

// function resetPaddle() {
//     paddle.x = canvas.width / 2 - PADDLE_WIDTH / 2;
//     paddle.y = canvas.height - (PADDLE_MARGIN_BOTTOM + PADDLE_HEIGHT);
// }

// //PROPRIETES DE LA BALLE
// const ball = {
//     x: canvas.width / 2,
//     y: paddle.y - BALL_RADIUS,
//     radius: BALL_RADIUS,
//     velocity: 7,
//     dx: 3 * (Math.random() * 2 - 1),
//     dy: -3
// }

// //Déssiner la balle
// function drawBall() {
//     ctx.beginPath();

//     ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
//     ctx.fillStyle = '#fff';
//     ctx.fill();

//     ctx.strokeStyle = '#6198d8';
//     ctx.stroke();

//     ctx.closePath();
// }

// //Mouvement de la balle
// function moveBall() {
//     ball.x += ball.dx;
//     ball.y += ball.dy;
// }

// //Interaction ball - mur
// function bwCollision() {
//     //Collision sur l'axe des x;
//     if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
//         WALL_HIT.play();
//         ball.dx *= -1;
//     }

//     //Collision sur la partie supérieure
//     if (ball.y - ball.radius < 0) {
//         WALL_HIT.play();
//         ball.dy *= -1;
//     }

//     //Collision sur le bord inférieur (Cette collision entraine la perte d'une vie)
//     if (ball.y + ball.radius > canvas.height) {
//         LIFE_LOST.play();
//         life--;
//         resetBall();
//         resetPaddle();
//     }
// }

// //Reinitialisation de la balle en cas de perte d'une vie
// function resetBall() {
//     ball.x = canvas.width / 2;
//     ball.y = paddle.y - BALL_RADIUS;
//     ball.dx = 3 * (Math.random() * 2 - 1);
//     ball.dy = -3;
// }

// //Collision balle - planche
// function bpCollision() {
//     if (ball.x + ball.radius > paddle.x &&
//         ball.x - ball.radius < paddle.x + paddle.w &&
//         ball.y + ball.radius > paddle.y) {

//         PADDLE_HIT.play();

//         //On crée un point de collision
//         let collidePoint = ball.x - (paddle.x + paddle.w/2);

//         //On normalise le point de collision de facon à n'avoir qu'un repère trgonométrique
//         collidePoint = collidePoint / (paddle.w/2);

//         //On défini un angle de tir a rebond de la balle sur la planche
//         let angle = collidePoint * Math.PI/3;

//         ball.dx = ball.velocity * Math.sin(angle);
//         ball.dy = -ball.velocity * Math.cos(angle);
//     }
// }

// //PROPRIETES DES BRIQUES
// const brickProp = {
//     row: 2,
//     column: 13,
//     w: 35,
//     h: 10,
//     padding: 3,
//     offsetX: 55,
//     offsetY: 40,
//     fillColor: '#fff',
//     visible: true,
// }

// //Création des briques
// let bricks = [];
// function createBricks() {
//     for (let r = 0; r < brickProp.row; r++) {
//         bricks[r] = [];
//         for (let c= 0; c < brickProp.column; c++) {
//             bricks[r][c] = {
//                 x: c * (brickProp.w + brickProp.padding) + brickProp.offsetX,
//                 y: r * (brickProp.h + brickProp.padding) + brickProp.offsetY,
//                 status: true,
//                 ...brickProp,
//             }
//         }
//     }
// }
// createBricks();

// //Dessiner les briques
// function drawBricks() {
//     bricks.forEach(column => {
//         column.forEach(brick => {
//             if (brick.status) {
//                 ctx.beginPath();

//                 ctx.rect(brick.x, brick.y, brick.w, brick.h);
//                 ctx.fillStyle = brick.fillColor;
//                 ctx.fill();

//                 ctx.closePath();
//             }
//         })
//     })
// }

// //Collision balle - briques
// function bbCollision() {
//     bricks.forEach(column => {
//         column.forEach(brick => {
//             if (brick.status) {
//                 if (ball.x + ball.radius > brick.x &&
//                     ball.x - ball.radius < brick.x + brick.w &&
//                     ball.y + ball.radius > brick.y &&
//                     ball.y - ball.radius < brick.y + brick.h
//                 ) {

//                     BRICK_HIT.play().then(r => null);

//                     ball.dy *= -1;
//                     brick.status = false;
//                     score += SCORE_UNIT;
//                 }
//             }
//         })
//     })
// }

// //Afficher les statistiques du jeu
// function showStats(img, iPosX, iPosY, text = '', tPosX = null, tPosY = null) {
//     ctx.fillStyle = '#fff';
//     ctx.font = '20px gruppo';
//     ctx.fillText(text, tPosX, tPosY);
//     ctx.drawImage(img, iPosX, iPosY, width = 20, height = 20);
// }

// //Fin de la partie
// function gameover () {
//     if (life <= 0) {
//         showEndInfo('lose');
//         gameOver = true;
//     }
// }

// //Aller au niveau suivant
// function nextLevel () {
//     let isLevelUp = true;

//     for (let r = 0; r < brickProp.row; r++) {
//         for (let c = 0; c < brickProp.column; c++) {
//             isLevelUp = isLevelUp && !bricks[r][c].status;
//         }
//     }

//     if (isLevelUp) {
//         WIN.play();

//         if (level >= MAX_LEVEL) {
//             showEndInfo();
//             gameOver = true;
//             return;
//         }
//         brickProp.row += 2;
//         createBricks();
//         ball.velocity += .5;
//         resetBall();
//         resetPaddle();
//         level++;
//     }
// }

// //Relatif à tous les dessins du jeu
// function draw() {
//     drawPaddle();
//     drawBall();
//     drawBricks();
//     showStats(SCORE_IMG, canvas.width - 100, 5, score, canvas.width - 65, 22);
//     showStats(LIFE_IMG, 35, 5, life, 70, 22);
//     showStats(LEVEL_IMG,(canvas.width / 2) - 25, 5, level, (canvas.width / 2), 22);
// }

// //Mettre à jour toutes les actions du jeu durant son cours.
// function update() {
//     movePaddle();
//     moveBall();
//     bwCollision();
//     bpCollision();
//     bbCollision();
//     gameover();
//     nextLevel();
// }

// // function loop() {
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);

// //     if (!isPaused) {
// //         draw();

// //         update();
// //     }

// //     if(!gameOver) {
// //         requestAnimationFrame(loop);
// //     }
// // }
// // loop();
// function loop() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     if (!gameOver) {
//         draw();
//         update();
//         if (!isPaused) {
//             requestAnimationFrame(loop);
//         }
//     }
// }
// loop();

// //GESTION DES EVENEMENTS AUDIO
// const sound = document.getElementById('sound');
// sound.addEventListener('click', audioManager);

// function audioManager() {
//     //Changer l'image
//     let imgSrc = sound.getAttribute('src');
//     let SOUND_IMG = imgSrc === 'img/sound_on.png' ? 'img/mute.png' : 'img/sound_on.png';
//     sound.setAttribute('src', SOUND_IMG);

//     //Modification des sons en fonction des etats
//     WALL_HIT.muted = !WALL_HIT.muted;
//     PADDLE_HIT.muted = !PADDLE_HIT.muted;
//     BRICK_HIT.muted = !BRICK_HIT.muted;
//     WIN.muted = !WIN.muted;
//     LIFE_LOST.muted = !LIFE_LOST.muted;
// }

// //GESTION DU DOM POUR L'AFFICHAGE DES ERREURS
// //Importation des éléments du DOM
// const rules = document.getElementById('rules');
// const rulesBtn = document.getElementById('rules-btn');
// const closeBtn = document.getElementById('close-btn');
// const game_over = document.getElementById('game-over');
// const youWin = game_over.querySelector('#you-won');
// const youLose = game_over.querySelector('#you-lose');
// const restart = game_over.querySelector('#restart');
// const pauseBtn = document.getElementById('pause-btn');

// // gestion d'evenement pause
// pauseBtn.addEventListener('click', togglePause);

// function togglePause() {
//     isPaused = !isPaused;
//     if (isPaused) {
//         pauseBtn.textContent = 'Jouer';
//     } else {
//         pauseBtn.textContent = 'Pause';
//         // Pour redémarrer la boucle après la pause
//         loop();
//     }
// }

// //Affichage des règles du jeu
// rulesBtn.addEventListener('click', () => {
//     rules.classList.add('show');
//     isPaused = true;
// });
// closeBtn.addEventListener('click', () => {
//     rules.classList.remove('show');
//     isPaused = false;
// });


// //Affichage des info de fin de parties (Victoire ou echec)
// function showEndInfo(type = 'win') {
//     game_over.style.visibility = 'visible';
//     game_over.style.opacity = '1';
//     if (type === 'win') {
//         youWin.style.visibility = 'visible';
//         youLose.style.visibility = 'hidden';
//         youLose.style.opacity = '0';
//     } else {
//         youWin.style.visibility = 'hidden';
//         youWin.style.opacity = '0';
//         youLose.style.visibility = 'visible';
//     }
// }

// //Relancer le jeu
// restart.addEventListener('click', () => {location.reload();});

export default class BrickBreakerGame {
    constructor() {
        this.init();
        this.initializeGame();
        
    }

    init() {
        this.container = document.createElement("div");
        this.createHTML();
        this.applyCSS();
        this.gameOverElement = this.container.querySelector('#game-over');
        console.log(this.container);
        
    }

    createHTML() {
        this.container.innerHTML = `
        <section class="game" id="game">
        <button id="pause-btn" class="pause-btn">Pause</button>

        <button id="rules-btn" class="btn rules-btn">Règles de jeu</button>
        <div id="rules" class="rules">
            <h2>Règles de jeu</h2>
            <p>Utilisez les touches gauche ◄ et droite ► du clavier pour diriger la planche <br>
                La balle doit rebondir sur la planche pour rentrer briser les briques</p>
            <p>Si elle tombe à même le sol, vous perdez une vie. Le jeu s'arrete dès que vous n'avez plus de vie</p>
            <button id="close-btn" class="btn close-btn">Quitter</button>
        </div>
        
        <div class="sound-container">
            <img src="./casse_briques/img/sound_on.png" alt="Sound Image" id="sound">
        </div>
        
        <div id="game-over">
            <img src="img/you-won.png" alt="" id="you-won">
            <img src="img/game-over.png" alt="" id="you-lose">
            <div id="restart">Rejouer</div>
        </div>

        <canvas id="canvas" width="600" height="500"></canvas>
    </section>
    <script type="text/javascript" src="https://click123.ca/dist/js/snow.js"></script>
    <script src="game.js"></script>
            `
        
        
      }
      

    applyCSS() {
        const style = document.createElement("style");
    style.innerHTML = `
        


.game {
    background-image: url(./casse_briques/img/boules.webp);
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    margin: 0;
}

#game-over {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    width: 250px;
    height: 300px;
    visibility: hidden;
    opacity: 0;
}

#you-won {
    width: 160px;
}

#you-lose {
    width: 160px;
}

#restart {
    color: #fff;
    cursor: pointer;
    padding: 4px 8px;
    line-height: 1.5;
    border: 1px solid #6198d8;
    border-radius: 4px;
    text-align: center;
    transition: .1s ease-in-out;
}

#restart:hover {
    background-color: #6198d8;
}

.sound-container {
    position: absolute;
    top: 50%;
    right: 15%;
}

.sound-container img {
    width: 40px;
    height: auto;
    transition: .1s ease-in-out;
}

#sound:hover {
    box-shadow: 1px 1px 3px rgba(255, 255, 255, .5);
}

canvas {
    background: #111;
    display: block;
    border-radius: 4px;
}
.pause-btn
{
    cursor: pointer;
    background-color: #000;
    border: none;
    border-color: #000;
    padding: 10px 20px;
    color: #fff;
    border-radius: 5px;
    font-family: gruppo, sans-serif;
    transition: background-color .1s ease-in;
}

.pause-btn:hover {
    background-color: #376599;
}

.pause-btn{
    position: absolute;
    top: 30px;
    right: 30px;
    
    
}


.btn {
    cursor: pointer;
    background-color: #000;
    border: none;
    padding: 10px 20px;
    color: #fff;
    border-radius: 5px;
    font-family: gruppo, sans-serif;
    transition: background-color .1s ease-in;
}

.btn:hover {
    background-color: #376599;
}

.btn:focus {
    outline: none;
}

.btn:active {
    transform: scale(.98);
}

.rules-btn {
    position: absolute;
    top: 30px;
    left: 30px;
}

.rules {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    background-color: #6198d8;
    color: #fff;
    width: 400px;
    padding: 20px;
    line-height: 1.5;
    border-radius: 4px;
    visibility: hidden;
    opacity: 0;
    transition: visibility .3s ease-in, opacity .3s ease-in;
}

.rules.show {
    visibility: visible;
    opacity: 1;
}

.rules p {
    margin-bottom: .5rem;
    margin-top: 0;
}

/* Ajout de Media Queries pour rendre le site responsive */

@media only screen and (max-width: 600px) {
    .game {
        padding: 10px; /* Ajoutez d'autres styles nécessaires pour la version mobile */
      
    }

    #canvas{
        width: 300px;
        height: 300px;

    }

    #game-over {
        width: 90%; /* Ajustez la largeur pour une meilleure adaptation */
    }

    .sound-container {
        right: 5%;
    }

    .rules {
        width: 90%;
        padding:10px;
    }
    .btn
    {
        padding: 8px 16px;
    }
    .rules-btn
    {
        top:10px;
        left:10px;
    }

    .pause-btn
    {
        top:10px;
        right:10px;
    }
}
`
;
document.head.appendChild(style);
 }

    initializeGame() {
        /* ===== CHARGEMENT DES DIFFERENTS SONS DU JEU===== */
        this.WALL_HIT = new Audio('./casse_briques/sounds/wall.mp3');
        this.PADDLE_HIT = new Audio('./casse_briques/sounds/paddle_hit.mp3');
        this.BRICK_HIT = new Audio('./casse_briques/sounds/brick_hit.mp3');
        this.WIN = new Audio('./casse_briques/sounds/win.mp3');
        this.LIFE_LOST = new Audio('./casse_briques/sounds/life_lost.mp3');

        /* ===== CHARGEMENT DES IMAGES ===== */
        this.LEVEL_IMG = new Image(40, 40);
        this.LEVEL_IMG.src = '/casse_briques/img/level.png';
        this.LIFE_IMG = new Image(40, 40);
        this.LIFE_IMG.src = './casse_briques/img/life.png';
        this.SCORE_IMG = new Image();
        this.SCORE_IMG.src = './casse_briques/img/score.png';

        //Initialisation du canvas et définition du context
        this.canvas = this.container.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');

        // Ajout de la bordure au canvas
        this.canvas.style.border = '1px solid #6198d8';
        this.ctx.lineWidth = 1;

        //Constantes nécessaires
        this.PADDLE_WIDTH = 100;
        this.PADDLE_MARGIN_BOTTOM = 20;
        this.PADDLE_HEIGHT = 10;
        this.BALL_RADIUS = 5;
        this.SCORE_UNIT = 10;
        this.MAX_LEVEL = 3;

        //Variables nécessaires
        this.life = 3;
        this.score = 0;
        this.level = 1;
        this.gameOver = false;
        this.leftArrow = false;
        this.rightArrow = false;
        this.isPaused = false;

        //PROPRIETES DE LA PLANCHE
        this.paddle = {
            x: (this.canvas.width / 2) - (this.PADDLE_WIDTH / 2),
            y: this.canvas.height - this.PADDLE_MARGIN_BOTTOM - this.PADDLE_HEIGHT,
            w: this.PADDLE_WIDTH,
            h: this.PADDLE_HEIGHT,
            dx: 8
        };

        //PROPRIETES DE LA BALLE
        this.ball = {
            x: this.canvas.width / 2,
            y: this.paddle.y - this.BALL_RADIUS,
            radius: this.BALL_RADIUS,
            velocity: 7,
            dx: 3 * (Math.random() * 2 - 1),
            dy: -3
        };

        //PROPRIETES DES BRIQUES
        this.brickProp = {
            row: 2,
            column: 13,
            w: 35,
            h: 10,
            padding: 3,
            offsetX: 55,
            offsetY: 40,
            fillColor: '#fff',
            visible: true,
        };

        //Création des briques
        this.bricks = [];
        this.createBricks();
        this.loop();
        this.setupEventListeners();
    }

    createBricks() {
        for (let r = 0; r < this.brickProp.row; r++) {
            this.bricks[r] = [];
            for (let c = 0; c < this.brickProp.column; c++) {
                this.bricks[r][c] = {
                    x: c * (this.brickProp.w + this.brickProp.padding) + this.brickProp.offsetX,
                    y: r * (this.brickProp.h + this.brickProp.padding) + this.brickProp.offsetY,
                    status: true,
                    ...this.brickProp,
                };
            }
        }
    }

    drawPaddle() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.w, this.paddle.h);
        this.ctx.strokeStyle = '#6198d8';
        this.ctx.strokeRect(this.paddle.x, this.paddle.y, this.paddle.w, this.paddle.h);
        this.ctx.closePath();
    }

    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.strokeStyle = '#6198d8';
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawBricks() {
        this.bricks.forEach(column => {
            column.forEach(brick => {
                if (brick.status) {
                    this.ctx.beginPath();
                    this.ctx.rect(brick.x, brick.y, brick.w, brick.h);
                    this.ctx.fillStyle = brick.fillColor;
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            });
        });
    }

    showStats(img, iPosX, iPosY, text = '', tPosX = null, tPosY = null) {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '20px gruppo';
        this.ctx.fillText(text, tPosX, tPosY);
        this.ctx.drawImage(img, iPosX, iPosY, 20, 20);
    }

    movePaddle() {
        if (this.leftArrow && this.paddle.x > 0) {
            this.paddle.x -= this.paddle.dx;
        } else if (this.rightArrow && this.paddle.x + this.paddle.w < this.canvas.width) {
            this.paddle.x += this.paddle.dx;
        }
    }

    resetPaddle() {
        this.paddle.x = this.canvas.width / 2 - this.PADDLE_WIDTH / 2;
        this.paddle.y = this.canvas.height - (this.PADDLE_MARGIN_BOTTOM + this.PADDLE_HEIGHT);
    }

    moveBall() {
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;
    }

    bwCollision() {
        if (this.ball.x + this.ball.radius > this.canvas.width || this.ball.x - this.ball.radius < 0) {
            this.WALL_HIT.play();
            this.ball.dx *= -1;
        }

        if (this.ball.y - this.ball.radius < 0) {
            this.WALL_HIT.play();
            this.ball.dy *= -1;
        }

        if (this.ball.y + this.ball.radius > this.canvas.height) {
            this.LIFE_LOST.play();
            this.life--;
            this.resetBall();
            this.resetPaddle();
        }
    }

    resetBall() {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.paddle.y - this.BALL_RADIUS;
        this.ball.dx = 3 * (Math.random() * 2 - 1);
        this.ball.dy = -3;
    }

    bpCollision() {
        if (
            this.ball.x + this.ball.radius > this.paddle.x &&
            this.ball.x - this.ball.radius < this.paddle.x + this.paddle.w &&
            this.ball.y + this.ball.radius > this.paddle.y
        ) {
            this.PADDLE_HIT.play();
                let collidePoint = this.ball.x - (this.paddle.x + this.paddle.w / 2);
                collidePoint = collidePoint / (this.paddle.w / 2);
    
                let angle = collidePoint * Math.PI / 3;
    
                this.ball.dx = this.ball.velocity * Math.sin(angle);
                this.ball.dy = -this.ball.velocity * Math.cos(angle);
            }
        }
    
        bbCollision() {
            this.bricks.forEach(column => {
                column.forEach(brick => {
                    if (brick.status) {
                        if (
                            this.ball.x + this.ball.radius > brick.x &&
                            this.ball.x - this.ball.radius < brick.x + brick.w &&
                            this.ball.y + this.ball.radius > brick.y &&
                            this.ball.y - this.ball.radius < brick.y + brick.h
                        ) {
                            this.BRICK_HIT.play().then(r => null);
    
                            this.ball.dy *= -1;
                            brick.status = false;
                            this.score += this.SCORE_UNIT;
                        }
                    }
                });
            });
        }
    
        showEndInfo(type = 'win') {
            console.log("test");
            const game_over = this.container.querySelector('#game-over');
            const youWin = game_over.querySelector('#you-won');
            const youLose = game_over.querySelector('#you-lose');
    
            game_over.style.visibility = 'visible';
            game_over.style.opacity = '1';
    
            if (type === 'win') {
                youWin.style.visibility = 'visible';
                youLose.style.visibility = 'hidden';
                youLose.style.opacity = '0';
            } else {
                youWin.style.visibility = 'hidden';
                youWin.style.opacity = '0';
                youLose.style.visibility = 'visible';
            }
        }
    
        gameover() {
            if (this.life <= 0) {
                this.showEndInfo('lose');
                this.gameOver = true;
            }
        }
    
        nextLevel() {
            let isLevelUp = true;
    
            for (let r = 0; r < this.brickProp.row; r++) {
                for (let c = 0; c < this.brickProp.column; c++) {
                    isLevelUp = isLevelUp && !this.bricks[r][c].status;
                }
            }
    
            if (isLevelUp) {
                this.WIN.play();
    
                if (this.level >= this.MAX_LEVEL) {
                    this.showEndInfo();
                    this.gameOver = true;
                    return;
                }
    
                this.brickProp.row += 2;
                this.createBricks();
                this.ball.velocity += 0.5;
                this.resetBall();
                this.resetPaddle();
                this.level++;
            }
        }
    
        draw() {
            this.drawPaddle();
            this.drawBall();
            this.drawBricks();
            this.showStats(this.SCORE_IMG, this.canvas.width - 100, 5, this.score, this.canvas.width - 65, 22);
            this.showStats(this.LIFE_IMG, 35, 5, this.life, 70, 22);
            this.showStats(this.LEVEL_IMG, (this.canvas.width / 2) - 25, 5, this.level, (this.canvas.width / 2), 22);
        }
    
        update() {
            this.movePaddle();
            this.moveBall();
            this.bwCollision();
            this.bpCollision();
            this.bbCollision();
            this.gameover();
            this.nextLevel();
        }
    
        loop() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
            if (!this.gameOver) {
                this.draw();
                this.update();
                if (!this.isPaused) {
                    requestAnimationFrame(() => this.loop());
                }
            }
        }
    
        setupEventListeners() {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Left' || e.key === 'ArrowLeft') { this.leftArrow = true; }
                else if (e.key === 'Right' || e.key === 'ArrowRight') { this.rightArrow = true; }
            });
    
            document.addEventListener('keyup', (e) => {
                if (e.key === 'Left' || e.key === 'ArrowLeft') { this.leftArrow = false; }
                else if (e.key === 'Right' || e.key === 'ArrowRight') { this.rightArrow = false; }
            });
    
            const sound = this.container.querySelector('#sound');
            sound.addEventListener('click', () => this.audioManager());
    
            const pauseBtn = this.container.querySelector('#pause-btn');
            pauseBtn.addEventListener('click', () => this.togglePause());
    
            const rulesBtn = this.container.querySelector('#rules-btn');
            const closeBtn = this.container.querySelector('#close-btn');
    
            rulesBtn.addEventListener('click', () => {
                const rules = this.container.querySelector('#rules');
                rules.classList.add('show');
                this.isPaused = true;
            });
    
            closeBtn.addEventListener('click', () => {
                const rules = this.container.querySelector('#rules');
                rules.classList.remove('show');
                this.isPaused = false;
            });
            console.log(this);
            const restart = this.gameOverElement.querySelector('#restart');
            restart.addEventListener('click', () => location.reload());
        }
    
        audioManager() {
            const sound = this.container.querySelector('#sound');
            let imgSrc = sound.getAttribute('src');
            let SOUND_IMG = imgSrc === 'img/sound_on.png' ? 'img/mute.png' : 'img/sound_on.png';
            sound.setAttribute('src', SOUND_IMG);
    
            this.WALL_HIT.muted = !this.WALL_HIT.muted;
            this.PADDLE_HIT.muted = !this.PADDLE_HIT.muted;
            this.BRICK_HIT.muted = !this.BRICK_HIT.muted;
            this.WIN.muted = !this.WIN.muted;
            this.LIFE_LOST.muted = !this.LIFE_LOST.muted;
        }
    
        togglePause() {
            const pauseBtn = this.container.querySelector('#pause-btn');
            this.isPaused = !this.isPaused;
            if (this.isPaused) {
                pauseBtn.textContent = 'Jouer';
            } else {
                pauseBtn.textContent = 'Pause';
                this.loop();
            }
        }

    }
    
    // Création d'une instance du jeu
    // const brickBreakerGame = new BrickBreakerGame();
    
    
    