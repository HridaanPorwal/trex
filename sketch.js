var obstacle
var groundimage
var invisible
var cloudImage
var cloud
var ground
var trex ,trex_running;
var gamestate="play";
var obtacleGroup
var cloudGroup
var score=0

function preload(){
    trex_running = loadAnimation("trex1.png", "trex3.png",             "trex4.png");
  trex_collided=loadAnimation("trex_collided.png")
  groundimage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameOver=loadAnimation("gameOver.png")
  restart=loadAnimation("restart.png")
}

function setup(){

    createCanvas(600,200)
    edge=createEdgeSprites()
  
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided",trex_collided)
    trex.scale=0.5
    trex.setCollider("circle",10,0,40)

    ground=createSprite(300,180,600,10)
    ground.velocityX=-5
    ground.addImage(groundimage)
    
    invisible=createSprite(300,190,600,10)
    invisible.visible=false
  
    obstacleGroup=new Group()
    cloudGroup=createGroup()
  
    gameover=createSprite(300,10,10,10)
    gameover.addAnimation("over",gameOver)
    gameover.visible=false
    
    restartgame=createSprite(300,100,10,10)
    restartgame.addAnimation("restart",restart)
    restartgame.scale=0.5
    restartgame.visible=false
  
    //trex.debug=true
    
    
    }

  //whatever we write in the draw function is called a frame.


function draw(){
    background("white")
    drawSprites()
    text("SCORE:"+score,500,15)
    //diffrent game states
    
    if (gamestate==="play"){
     ground.velocityX=-5
     score=Math.round(score+frameCount/60)
     
           
      
      if (keyDown("space")&&trex.y>160){
       trex.velocityY=-12
      }
      
      if (keyDown(UP_ARROW)&&trex.y>160){
       trex.velocityY=-12
      }
      
  //code to gravity
    trex.velocityY=trex.velocityY+0.8
    
     //infinite runner
    if (ground.x<0){
      ground.x=ground.width/2 
     }
     //console.log(trex.y)
    spawnObstacle()
    spawnCloud()
      
    if (trex.isTouching(obstacleGroup)){
      gamestate="end"
      console.log("obstacle.isTouched")
    }  
   
 
 }
  
  
  
    else if(gamestate==="end"){
     ground.velocityX=0
     obstacleGroup.setVelocityXEach(0)
     cloudGroup.setVelocityXEach(0)
     obstacleGroup.setLifetimeEach(-1)
     cloudGroup.setLifetimeEach(-1)
     trex.changeAnimation("collided",trex_collided)
     trex.velocityY=0
     gameover.visible=true
     restartgame.visible=true
     
      
     if (mousePressedOver(restartgame)){
       gamestate="play"
       gameover.visible=false
       restartgame.visible=false
       obstacleGroup.destroyEach()
       cloudGroup.destroyEach()
       score=0
       trex.changeAnimation("running",trex_running)
       
     }
    }
   //rand=Math.trunc(random(100,200),2)
   //console.log(rand)
   //jump when space key is pressed


    trex.collide(invisible)
 
 
}
  
    //console.log(frameCount)
function spawnCloud(){
    if (frameCount%40===0){
    cloud=createSprite(600,10,10,10)
    cloud.addImage(cloudImage)
    cloud.velocityX=-5
    cloud.y=Math.round(random(5,50))
    // console.log(cloud.y)
    trex.depth=cloud.depth+1
    //lifetime given for memory leak
    cloud.lifetime=130
    cloudGroup.add(cloud)
    } 
  }


function spawnObstacle(){
    if (frameCount%60===0){
    var rand=Math.round(random(1,6))
      obstacle=createSprite(590,150,10,10)
      obstacle.lifetime=200
     /* if (rand===1){
      obstacle.addImage(obstacle1)  
      }
      if (rand===2){
      obstacle.addImage(obstacle2)  
      }
      if (rand===3){
      obstacle.addImage(obstacle3)  
      }
      if (rand===4){
      obstacle.addImage(obstacle4)  
      }
      if (rand===5){
      obstacle.addImage(obstacle5)  
      }
      if (rand===6){
      obstacle.addImage(obstacle6)  
      }*/

      switch(rand){
        case 1:obstacle.addImage(obstacle1)
        break;
        case 2:obstacle.addImage(obstacle2)
        break;
        case 3:obstacle.addImage(obstacle3)
        break;
        case 4:obstacle.addImage(obstacle4)
        break;
        case 5:obstacle.addImage(obstacle5)
        break;
        case 6:obstacle.addImage(obstacle6)
        break;
        default:break
      }
      obstacle.scale=0.5
      obstacle.velocityX=-5
      obstacleGroup.add(obstacle)
      //obstacle.debug=true
    }

  }