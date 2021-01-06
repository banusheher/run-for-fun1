// sprites and their images.
var bk, bkI;
var runner, man, woman;
var boy, girl;
var home, homeI;
var gameover, gameoverI;
var getready, getreadyI;
var hurdle, hurdleI;
var coin, coinI;
var restart, restartI;
var start, startI;
var invisible;

// gamestates 
var Serve = 1;
var Ready = 2;
var Play = 3;
var End = 0;
var gameState = 2;

// scores and highscores 
var score;
var highscore;
var coins;
var totalcoins;

// groups
var coinGroup;
var obsGroup;

// sounds 
var coinssound;

function preload(){

 bkI = loadImage("city.jpg");

  man = loadAnimation("man1.png","man2.png","man3.png","man4.png","man5.png","man6.png","man7.png","man8.png");

  woman = loadAnimation("woman1.png","woman2.png","woman3.png","woman4.png","woman5.png","woman6.png","woman7.png","woman8.png");

  homeI = loadImage("Home.png");

  gameoverI = loadImage("GameOver.png");

  getreadyI = loadImage("GetReady.png");

  restartI = loadImage("restart.png");

  hurdleI = loadImage("hurdle.png");

  coinI = loadImage("coin.png");

  startI = loadImage("start.png");

  coinssound = loadSound("coins-sound.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  score = 0;
  highscore = 0;
  coins = 0;
  totalcoins = 0;

  coinGroup = new Group();
  
  obsGroup = createGroup();

  bk = createSprite(width/2,height/2);
  bk.addImage(bkI);
  bk.scale=1.5;
  bk.visible = false;
  // bk.velocityX=-10;

  runner = createSprite(width/6,height/1.35);
  runner.visible = false;

  home = createSprite(width-80,0+50);
  home.addImage(homeI);
  home.scale="0.1";  
  home.visible = false;

  boy = createSprite(width/4+width,height/1.35,width/6,height/8)
  boy.shapeColor="blue";

  girl = createSprite(width/1.35+width,height/1.35,width/6,height/8)
  girl.shapeColor="red";

  gameover = createSprite(width/2,height/2);
  gameover.addImage(gameoverI);
  gameover.visible=false;

  restart = createSprite(width/2,height/2-100);
  restart.addImage(restartI);
  restart.visible=false;

  start = createSprite(width/2,height/2);
  start.addImage(startI);
  start.scale = width/5000;
  start.debug=true;
  start.setCollider("circle",0,0,200);

  invisible = createSprite(width/2,height/1.02,width,20);
  invisible.visible=false;
}

function draw(){
  background("white");

if(gameState===2){
  textSize(width/14);
  text("CLICK SPACE TO START",width/14,0+150);
}

if(gameState===2 && keyDown("space")||mousePressedOver(start)){
 start.x=width+1000;
 gameState=1;
}

if(gameState===1){

  girl.x=width/1.35;
  boy.x=width/4;

  textSize(width/14);
  text("Are You A Boy or Girl",width/7,0+150)

  fill("blue");
  textSize(width/20);
  text("Boy",width/5,boy.y-50);

  fill("red");
  textSize(width/20);
  text("Girl",width/1.45,girl.y-50);
}

if(gameState===1 && keyDown("B")||mousePressedOver(boy)){
  runner.addAnimation("running",man);
  runner.scale=0.7;
  girl.x=width/1.35+width;
  boy.x=width/4+width;
  gameState=3;
}
if(gameState===1 && keyDown("G")||mousePressedOver(girl)){
  runner.addAnimation("running",woman);
  runner.scale=0.6;
  girl.x=width/1.35+width;
  boy.x=width/4+width;  
  gameState=3;
}

if(gameState===3){



  home.visible=true;
  runner.visible=true;
  bk.visible=true;

  bk.velocityX=-10;

  if(bk.x<0){
    bk.x=bk.width/1.35;
  }

  obs();
  Con();
  if(mousePressedOver(runner)||keyDown("J")){
   runner.velocityY=-19;
  }
  runner.velocityY=runner.velocityY+0.8;

  if(coinGroup.isTouching(runner)){
    coinssound.play()    
  }

}

  runner.collide(invisible)
  drawSprites();
  text(mouseX+","+mouseY,200,200)
}

function obs(){
  if(frameCount%120===0){
    var hurdle = createSprite(width+30,height/1.25);
    hurdle.addImage(hurdleI);
    hurdle.velocityX =-10;
    hurdle.scale=0.5;
    hurdle.lifetime=200;

    obsGroup.add(hurdle);
  }
}

function Con(){
  if(frameCount%50===0){
    var coin = createSprite(width+30,height/2.5);
    coin.addImage(coinI);
    coin.velocityX=-10;
    coin.scale = 0.1;
    coin.lifetime=200;

    coinGroup.add(coin);
  }
}