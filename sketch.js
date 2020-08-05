//Create variables here
var foods, foodStock,dog, happyDog, dogSprite, database;

function preload() {
  //load images here
   dog = loadImage("images/dogImg.png");
   happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  
  database = firebase.database();
  console.log(database);

  createCanvas(500, 500);
  dogSprite = createSprite(400,200);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.2;
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(rgb(46, 139, 87));
  if (keyWentDown(UP_ARROW)){
    writeStock(foods);
    dogSprite.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  fill("red");
  textSize(20)
  text("Note: Press Up Arrow Key to feed Drago milk",35,480);

}

function readStock(data){
  foods= data.val();
}

function writeStock(x){
   
  if(x<=0){
     x=0;
  }else{
    x= x-1;
  }

  database.ref('/').update({
    Food: x
  });
}

