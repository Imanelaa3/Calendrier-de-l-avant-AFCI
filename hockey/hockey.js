"use strict"

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//const gm = true;
const ball_speed = 8;
let xspeed = 0;
let yspeed = 0;
let com_score = 0;
let player_score = 0;
const x_min=15;
const x_max=230;
const y_min=15;
const y_max=300;
canvas.style.margin ="10px"
let relativeX =0
let relativeY =0
let test = document.getElementById('test');
let jouer = false;


document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
document.addEventListener("touchstart", start);
document.addEventListener("touchend", stop);

function start(e) {
    
    mouseMoveHandler(e)
    document.addEventListener("mousemove", dessiner)
    document.addEventListener("touchmove", dessiner)
  }

function stop() {
    document.removeEventListener("mousemove", dessiner);
    document.removeEventListener("touchmove", dessiner);
  }

function dessiner(positionSouris) {
    ctx.moveTo(relativeX, relativeY);
    mouseMoveHandler(positionSouris); 
  }


function mouseMoveHandler(e) {
    let relativeX = (e.clientX - canvas.offsetLeft) || (e.touches[0].clientX) ;
    let relativeY = (e.clientY -canvas.offsetTop) || (e.touches[0].clientY);
    if(relativeX > 0 && relativeX < canvas.width-30) {
        pMallet.x = relativeX;
    }
        //360
    if(relativeY > 18 && relativeY < 465){
        pMallet.y = relativeY;
    }    
 }

   

    //ligne interieur
function draw_rect(x,y,w,h,b){
    
    ctx.beginPath();
    if(b)
    {
        ctx.strokeStyle = "green"; // couleur contour
        ctx.lineWidth = 10;
    }
    else
    {
        ctx.strokeStyle = "green"; // couleur intérieur
        ctx.lineWidth = 2;
    }    
    ctx.strokeRect(x,y,w,h);
    ctx.closePath();
 }

    //cage/but, demi-cercle
function draw_goal(x,y,r,s)
{
    ctx.beginPath();
    ctx.lineWidth=2; 
    if(s)
        ctx.arc(x, y, r, 0, Math.PI, false);
    else
    ctx.arc(x, y, r, Math.PI, 0, false);
    ctx.strokeStyle = "blue"; // couleur demi-cercle
    ctx.stroke();
    ctx.closePath();
 }

    //ligne milieu
function draw_circle(x,y,r,w)
{
    ctx.beginPath();
    ctx.lineWidth=w;
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.strokeStyle = "red"; // ligne milieu
    ctx.stroke();
    ctx.closePath();
 }

    
function draw_filled_circle(x,y,r,d)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    if(d==1)
    {
        ctx.fillStyle = "red"; //joueur
        ctx.strokeStyle = "red"; //joueur
    }
    else if(d==2)
    {
        ctx.fillStyle = "green"; //adversaire
        ctx.strokeStyle = "green"; // adversaire
    }
    else
    {
        ctx.fillStyle = "blue"; //pad
        ctx.strokeStyle = "yellow"; // pad
    }    
        
    ctx.fill();
    ctx.lineWidth = 2; //bordure pad
    ctx.stroke();
    ctx.closePath();
 }

function draw_board()
{
    draw_rect(0,0,260,495,1); //contour ext
    draw_rect(15,22,230,452,0); // contour int
    draw_goal(130,22,52,1); // demi cercle int. adverse
    draw_goal(130,22,112,1); // demi cercle ext. adverse
    draw_goal(130,472,52,0); // demi cercle int. joueur
    draw_goal(130,472,112,0); // demi cercle ext. joueur
    draw_circle(130,243,30,2); // cercle centre
    draw_circle(130,243,4,2); // petit cercle interieur
    
    ctx.beginPath();
    ctx.moveTo(15, 243); // trait milieu 
    ctx.lineTo(245, 243); // trait milieu 
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(95, 22); // longueur but adv
    ctx.lineTo(165, 22); // longueur but adv
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#000"; //couleur but adv.
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(95, 475); // longueur but joueur
    ctx.lineTo(165, 475); // longueur but joueur
    ctx.stroke();
    ctx.closePath();

    ctx.font = "25px Arial"; // taille score
    ctx.lineWidth = 2
    ctx.strokeText(com_score,220,200);
    ctx.strokeText(player_score,220,295);
 }

function distance(x1,y1,x2,y2)
{
    let tempx = x2-x1;
    let tempy = y2-y1;
    tempx*=tempx;
    tempy*=tempy;
    return Math.sqrt(tempx+tempy);
 }


let Mallet = function(x,y,r)
{
    this.x = x;
    this.y = y;
    this.radius = r;
 }
    // Player's object
let pMallet = new Mallet(130,canvas.height-50,15);
    
let cMallet = new Mallet(130,50,15);

    // Ball class
let Ball = function (x,y,r) {
    this.x = x;
    this.y = y;
    this.radius = r;
}
    // ball object
let ball = new Ball(canvas.width/2,canvas.height-100,8); 
  
function play()
{

    const ricoche =  new Audio('./music-hockey/hit.wav');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_board();
    draw_filled_circle(pMallet.x,pMallet.y,pMallet.radius,1);   
    draw_filled_circle(cMallet.x,cMallet.y,cMallet.radius,2);   
    draw_filled_circle(ball.x,ball.y,ball.radius,0);
    if(ball.x + xspeed > canvas.width-ball.radius-15 || ball.x + xspeed < ball.radius + 15) {
        xspeed *= -1;
        palet();
    }
            
    function palet () {
        ricoche.play();
     }

    const musiqueGoal = new Audio ('./music-hockey/goal.mp3')

    function musicGoal (){
        musiqueGoal.play()
     }

    if(ball.x>95 && ball.x<165){
        if(ball.y + yspeed > canvas.height+ball.radius-15){
            musicGoal();
            console.log("Computer Score");
            ball.x = canvas.width/2;
            ball.y = canvas.height/2+50;
            xspeed = 0;
            yspeed = 0 ;
            com_score = com_score + 1;
        }
        else if(ball.y + yspeed < 15-ball.radius ){
            musicGoal();
            console.log("you Score");
            ball.x = canvas.width/2;
            ball.y = canvas.height/2-50;
            xspeed = 0;
            yspeed = 0;
            player_score = player_score + 1; 
         }
     }
    else{
        if(ball.y + yspeed > canvas.height-ball.radius-15  || ball.y + yspeed  < 15+ball.radius){
            yspeed *= -1;
         }
     }
          
        
    let ed = true;
    let er = 1;
    let p2s;
    if(ed){er=1;}
        if((Math.abs(xspeed)+Math.abs(yspeed))<10&&ball.y<=canvas.height/2){
            if(ball.y-10>cMallet.y){
                cMallet.y+=2;
             }
            else{
             cMallet.y-=2;
             }
         }
        else if(cMallet.y>50){
            cMallet.y-=2;
         }
        else if(cMallet.y<50){
            cMallet.y+=2;
         }

    if(cMallet.x<x_min)
      {cMallet.x=x_min;}
    if(cMallet.x>x_max)
      {cMallet.x=x_max;}
    if(cMallet.y<y_min)
      {cMallet.y=y_min;}
    if(cMallet.y>y_max)
      {cMallet.y=y_max;}
    
    if(!ed){p2s = 2;}
    else{p2s=3;}
    
    if(ball.y<cMallet.y&&ball.x>cMallet.x-15&&ball.x<cMallet.x+15){p2s = -2;}
    if(cMallet.x<ball.x+er){cMallet.x+=p2s;}if(cMallet.x>ball.x-er){cMallet.x-=p2s;}

    let pDist = distance(pMallet.x,pMallet.y,ball.x,ball.y);    
    let cDist = distance(cMallet.x,cMallet.y,ball.x,ball.y);          
          
    if(pDist<23)
    {
        palet();
        let dx = ball.x - pMallet.x;
        let dy = ball.y - pMallet.y;
        dx/=15;
        dy/=15;
        xspeed = dx*ball_speed;
        yspeed = dy*ball_speed;
     }  

    if(cDist<23)
    {
        palet();
        let cdx = ball.x - cMallet.x;
        let cdy = ball.y- cMallet.y;
        cdx/=23;
        cdy/=23;
        xspeed = cdx*ball_speed;
        yspeed = cdy*ball_speed;
     }

    ball.x += xspeed;
    ball.y += yspeed;
    xspeed *=0.99;
    yspeed *=0.99;
    ctx.font = "15px serif";
    ctx.fillText("Grinch", 200, 220);
    ctx.fillText("Père-Noël", 180, 270);
 }
      
    setInterval(play,10);   
    
    const block = document.querySelector(".unblock")
    block.textContent = "débloquer le palet"
    block.style.position = "absolute"
    block.style.top = "530px"
    block.style.left = "10px"
    block.style.backgroundColor = "lightblue"
    block.addEventListener("click", unblock)

    function unblock (){
        ball.x = canvas.width/2;
        ball.y = canvas.height/2+50;
        xspeed = 0;
        yspeed = 0 ;
    }

         
