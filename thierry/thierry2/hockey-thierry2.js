export default class Thierry2 extends HTMLElement {

    
 

      constructor(){
         super()
          this.init()
          
  
      }
  
      canvas = document.createElement("canvas")
      ctx = this.canvas.getContext('2d');
    
      
  
      ball_speed = 8;
      xspeed = 0;
      yspeed = 0;
      com_score = 0;
      player_score = 0;
      x_min=15;
      x_max=230;
      y_min=15;
      y_max=300;
      relativeX =0
      relativeY =0
      test = document.getElementById('test');
      jouer = false;
  
      
      
  
      init(){

        

  
          //this.ctx = this.canvas.getContext('2d');
          this.canvas.getAttribute("id", "canvas")
          this.canvas.style.margin ="10px"
          this.canvas.position ="relative"
          this.canvas.width = "260"
          this.canvas.height = "495"
          document.body.append(this.canvas)
      
  
  
          document.addEventListener("mousedown", this.start.bind(this));
          document.addEventListener("mouseup", this.stop.bind(this));
          document.addEventListener("touchstart", this.start.bind(this));
          document.addEventListener("touchend", this.stop.bind(this));
          setInterval(this.play.bind(this),10);   
      }
  
      start(e) {
      
          this.mouseMoveHandler(e)
          document.addEventListener("mousemove", this.dessiner.bind(this))
          document.addEventListener("touchmove", this.dessiner.bind(this))
        }
      
      stop() {
          document.removeEventListener("mousemove", this.dessiner.bind(this));
          document.removeEventListener("touchmove", this.dessiner.bind(this));
        }
      
      dessiner(positionSouris) {
          this.ctx.moveTo(this.relativeX, this.relativeY);
          this.mouseMoveHandler(positionSouris); 
        }
      
      
      mouseMoveHandler(e) {
          let relativeX = (e.clientX - this.canvas.offsetLeft) || (e.touches[0].clientX) ;
          let relativeY = (e.clientY  -this.canvas.offsetTop) || (e.touches[0].clientY);
          if(relativeX > 0 && relativeX < this.canvas.width-30) {
              this.pMallet.x = relativeX;
          }
              //360
          if(relativeY > 18 && relativeY < 465){
              this.pMallet.y = relativeY;
          }    
       }
      
         
      
          //ligne interieur
      draw_rect(x,y,w,h,b){
          
          this.ctx.beginPath();
          if(b)
          {
              this.ctx.strokeStyle = "green"; // couleur contour
              this.ctx.lineWidth = 10;
          }
          else
          {
              this.ctx.strokeStyle = "green"; // couleur intérieur
              this.ctx.lineWidth = 2;
          }    
          this.ctx.strokeRect(x,y,w,h);
          this.ctx.closePath();
       }
      
          //cage/but, demi-cercle
      draw_goal(x,y,r,s)
      {
          this.ctx.beginPath();
          this.ctx.lineWidth=2; 
          if(s)
              this.ctx.arc(x, y, r, 0, Math.PI, false);
          else
          this.ctx.arc(x, y, r, Math.PI, 0, false);
          this.ctx.strokeStyle = "blue"; // couleur demi-cercle
          this.ctx.stroke();
          this.ctx.closePath();
       }
      
          //ligne milieu
      draw_circle(x,y,r,w)
      {
          this.ctx.beginPath();
          this.ctx.lineWidth=w;
          this.ctx.arc(x, y, r, 0, Math.PI*2, false);
          this.ctx.strokeStyle = "red"; // ligne milieu
          this.ctx.stroke();
          this.ctx.closePath();
       }
      
          
      draw_filled_circle(x,y,r,d)
      {
          this.ctx.beginPath();
          this.ctx.arc(x, y, r, 0, Math.PI*2);
          if(d==1)
          {
              this.ctx.fillStyle = "red"; //joueur
              this.ctx.strokeStyle = "red"; //joueur
          }
          else if(d==2)
          {
              this.ctx.fillStyle = "green"; //adversaire
              this.ctx.strokeStyle = "green"; // adversaire
          }
          else
          {
              this.ctx.fillStyle = "blue"; //pad
              this.ctx.strokeStyle = "yellow"; // pad
          }    
              
          this.ctx.fill();
          this.ctx.lineWidth = 2; //bordure pad
          this.ctx.stroke();
          this.ctx.closePath();
       }
      
      draw_board()
      {
          this.draw_rect(0,0,260,495,1); //contour ext
          this.draw_rect(15,22,230,452,0); // contour int
          this.draw_goal(130,22,52,1); // demi cercle int. adverse
          this.draw_goal(130,22,112,1); // demi cercle ext. adverse
          this.draw_goal(130,472,52,0); // demi cercle int. joueur
          this.draw_goal(130,472,112,0); // demi cercle ext. joueur
          this.draw_circle(130,243,30,2); // cercle centre
          this.draw_circle(130,243,4,2); // petit cercle interieur
          
          this.ctx.beginPath();
          this.ctx.moveTo(15, 243); // trait milieu 
          this.ctx.lineTo(245, 243); // trait milieu 
          this.ctx.stroke();
          this.ctx.closePath();
      
          this.ctx.beginPath();
          this.ctx.moveTo(95, 22); // longueur but adv
          this.ctx.lineTo(165, 22); // longueur but adv
          this.ctx.lineWidth = 6;
          this.ctx.strokeStyle = "#000"; //couleur but adv.
          this.ctx.stroke();
          this.ctx.closePath();
      
          this.ctx.beginPath();
          this.ctx.moveTo(95, 475); // longueur but joueur
          this.ctx.lineTo(165, 475); // longueur but joueur
          this.ctx.stroke();
          this.ctx.closePath();
      
          this.ctx.font = "25px Arial"; // taille score
          this.ctx.lineWidth = 2
          this.ctx.strokeText(this.com_score,220,200);
          this.ctx.strokeText(this.player_score,220,295);
       }
      
      distance(x1,y1,x2,y2)
      {
          let tempx = x2-x1;
          let tempy = y2-y1;
          tempx*=tempx;
          tempy*=tempy;
          return Math.sqrt(tempx+tempy);
       }
      
      
      Mallet = function(x,y,r)
      {
          this.x = x;
          this.y = y;
          this.radius = r;
       }
          // Player's object
      pMallet = new this.Mallet(130,this.canvas.height-50,15);
          
      cMallet = new this.Mallet(130,50,15);
      
          // Ball class
      Ball = function (x,y,r) {
          this.x = x;
          this.y = y;
          this.radius = r;
      }
          // ball object
      ball = new this.Ball(this.canvas.width/2,this.canvas.height-100,8); 
        
      play()
      {
      
          //const ricoche =  new Audio('./music-hockey/hit.wav');
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.draw_board();
          this.draw_filled_circle(this.pMallet.x,this.pMallet.y,this.pMallet.radius,1);   
          this.draw_filled_circle(this.cMallet.x,this.cMallet.y,this.cMallet.radius,2);   
          this.draw_filled_circle(this.ball.x,this.ball.y,this.ball.radius,0);
          if(this.ball.x + this.xspeed > this.canvas.width-this.ball.radius-15 || this.ball.x + this.xspeed < this.ball.radius + 15) {
              this.xspeed *= -1;
              //palet();
          }
                  
          //function palet () {
             // ricoche.play();
           //}
      
          //const musiqueGoal = new Audio ('./music-hockey/goal.mp3')
      
          //function musicGoal (){
           //   musiqueGoal.play()
           //}
      
          if(this.ball.x>95 && this.ball.x<165){
              if(this.ball.y + this.yspeed > this.canvas.height+this.ball.radius-15){
                 // musicGoal();
                 
                  this.ball.x = this.canvas.width/2;
                  this.ball.y = this.canvas.height/2+50;
                  this.xspeed = 0;
                  this.yspeed = 0 ;
                  this.com_score = this.com_score + 1;
              }
              else if(this.ball.y + this.yspeed < 15-this.ball.radius ){
                  //musicGoal();
               
                  this.ball.x = this.canvas.width/2;
                  this.ball.y = this.canvas.height/2-50;
                  this.xspeed = 0;
                  this.yspeed = 0;
                  this.player_score = this.player_score + 1; 
               }
           }
         else if (this.ball.y + this.yspeed > this.canvas.height-this.ball.radius-15  || this.ball.y + this.yspeed  < 15+this.ball.radius) {
              
                  this.yspeed *= -1;
               }
         else if (this.ball.x>240 || this.ball.x<5 || this.ball.y<5 || this.ball.y>490 ) {
            this.ball.x = this.canvas.width/2;
            this.ball.y = this.canvas.height/2+50;
            this.xspeed = 0;
            this.yspeed = 0 ;

         }
                
              
          let ed = true;
          let er = 1;
          let p2s;
          if(ed){er=1;}
              if((Math.abs(this.xspeed)+Math.abs(this.yspeed))<10&&this.ball.y<=this.canvas.height/2){
                  if(this.ball.y-10>this.cMallet.y){
                      this.cMallet.y+=2;
                   }
                  else{
                   this.cMallet.y-=2;
                   }
               }
              else if(this.cMallet.y>50){
                  this.cMallet.y-=2;
               }
              else if(this.cMallet.y<50){
                  this.cMallet.y+=2;
               }
      
          if(this.cMallet.x<this.x_min)
            {this.cMallet.x=this.x_min;}
          if(this.cMallet.x>this.x_max)
            {this.cMallet.x=this.x_max;}
          if(this.cMallet.y<this.y_min)
            {this.cMallet.y=this.y_min;}
          if(this.cMallet.y>this.y_max)
            {this.cMallet.y=this.y_max;}
          
          if(!ed){p2s = 2;}
          else{p2s=3;}
          
          if(this.ball.y<this.cMallet.y&&this.ball.x>this.cMallet.x-15&&this.ball.x<this.cMallet.x+15){p2s = -2;}
          if(this.cMallet.x<this.ball.x+er){this.cMallet.x+=p2s;}if(this.cMallet.x>this.ball.x-er){this.cMallet.x-=p2s;}
      
          let pDist = this.distance(this.pMallet.x,this.pMallet.y,this.ball.x,this.ball.y);    
          let cDist = this.distance(this.cMallet.x,this.cMallet.y,this.ball.x,this.ball.y);          
                
          if(pDist<23)
          {
              //palet();
              let dx = this.ball.x - this.pMallet.x;
              let dy = this.ball.y - this.pMallet.y;
              dx/=15;
              dy/=15;
              this.xspeed = dx*this.ball_speed;
              this.yspeed = dy*this.ball_speed;
           }  
      
          if(cDist<23)
          {
              //palet();
              let cdx = this.ball.x - this.cMallet.x;
              let cdy = this.ball.y- this.cMallet.y;
              cdx/=23;
              cdy/=23;
              this.xspeed = cdx*this.ball_speed;
              this.yspeed = cdy*this.ball_speed;
           }
      
          this.ball.x += this.xspeed;
          this.ball.y += this.yspeed;
          this.xspeed *=0.99;
          this.yspeed *=0.99;
          this.ctx.font = "15px serif";
          this.ctx.fillText("Grinch", 200, 220);
          this.ctx.fillText("Père-Noël", 180, 270);
       }
  
     

  
  
  
  }

    customElements.define("balise-animation10", Thierry2);