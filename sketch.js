var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var ground;
var score;
var background1, backgroundimage;
var survivaltime;


function preload() {


  monkeyrunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  backgroundimage = loadImage("jungle.jpg");


}



function setup() {
  createCanvas(400, 400);

  ground = createSprite(250, 340, 800, 10);
  ground.velocityX = -4;

  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  background1 = createSprite(0, 0, 800, 10);
  background1.addImage(backgroundimage);
  background1.velocityX = -4;
  background1.scale = 1.5;


  monkey = createSprite(50, 300, 25, 25)
  monkey.addAnimation("running", monkeyrunning);
  monkey.scale = 0.11;

  score = 0;
}


function draw() {
  background("green");

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (background1.x < 100) {
    background1.x = background1.width / 2;
  }
  if (keyDown("j") && monkey.y >= 300) {
    monkey.velocityY = -13;
  }


  if (monkey.isTouching(obstacleGroup)) {
    monkey.scale = 0.09;
  }
  monkey.velocityY = monkey.velocityY + 0.5

  monkey.debug = false;

  monkey.collide(ground);

  bananas();
  obstacles();
  drawSprites();

  stroke("red");
  textSize(15);
  survivaltime = Math.ceil(frameCount / frameRate());
  text("⏱️SURVIVAL TIME: " + survivaltime, 50, 75);

  stroke("yellow");
  textSize(15);
  text("🍌BANANAS EATEN: " + score, 50, 50);

  if (monkey.isTouching(FoodGroup)) {
    score = score + 5;
    FoodGroup.destroyEach();

    switch (score) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;
      default:
        break;
    }
  }
}

function bananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 300, 40, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.11;
    banana.velocityX = -5;
    banana.lifetime = 100;

    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 200 === 0) {
    obstacle = createSprite(400, 317, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstacle.scale = 0.13;

    obstacleGroup.add(obstacle);
  }
}