var gameOver, restart;
var backgroundImage;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudGroup, cloudImage;
var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided",trex_collided);
    trex.scale = 0.5;
  ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -5;
  invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
  cloudGroup = new Group();
  obstacleGroup = new Group();
  gameOver = createSprite(300,60,40,35);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;
  restart = createSprite(300,120,35,30);
    restart.addImage(restartImg);
    restart.scale = 0.5;
}

function draw() {
  background(500);
  text("score:"+score,450,50);
  background('black');
  image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
  if (gameState === 1) {
    score = score + Math.round(getFrameRate()/60);
    if(keyDown("space")) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    gameOver.visible = false;
    restart.visible = false;
    spawnClouds();
    spawnObstacles();
    trex.collide(invisibleGround);
    if(obstacleGroup.isTouching(trex)) {
      gameState === 2;
    }
  }
  if (gameState === 2) {
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    trex.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}

function reset() {
  gameState = 1;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score = 0;
  ground.velocityX = -5;
}

function spawnClouds() {
  if (frameCount %60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.velocityX = -4;
    cloud.y = Math.round(random(80,120));
    cloudGroup.add(cloud);
    cloud.addImage(cloudImage);
    cloud.scale = 0.75;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 100;
  }
}
  
function spawnObstacles() {
  if (frameCount %60 === 0) {
    var obstacle = createSprite(600,165,40,10);
    obstacle.velocityX = -5;
    rand = Math.round(random(1,6));
    switch(rand){
        case 1: obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        case 5: obstacle.addImage(obstacle5);
        break;
        case 6: obstacle.addImage(obstacle6);
        break;
    }
    obstacle.scale = 0.5;
    obstacleGroup.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}