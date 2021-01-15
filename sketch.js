//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogimg,happyDogimg,dogimg1,feedDog;

function preload()
{
  //load images here
  dogimg = loadAnimation("images/dogImg.png");
  happyDogimg = loadAnimation("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addAnimation("dogim",dogimg);
  dog.addAnimation("dogi",dogimg1);

  dog.scale=0.3;
  //dog.addImage(dogimg);

  database = firebase.database();

  feedButton=createButton("Feed");
  feedButton.position(250,300);
  feedButton.mousePressed((feedDog));

  addButton=createButton("Add Food");
  addButton.position(280,300);
  addButton.mousePressed((addFoodS));

  foodO=new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  var currentTime=hour();
}


function draw() {  
background(46,139,87);
if(foodS===0){
  dog.changeAnimation("dogimg",dogimg)
}
foodO.display();
fedTime=database.ref("LastFed");
fedTime.on("value",function(data){
  LF=data.val();
})
  drawSprites();
  //add styles here
  fill("red")
  textSize(15);
text("Food Remaining:"+foodS,100,70);
text("Press Up Arrow to Feed The Dog",80,120);
if(LF>=12){
  text("Last Fed Time:"+LF%12+" pm",15,400)
}
else if(LF===0){
  text("Last Fed Time: 12 am",15,400)

}
else{
  text("Last Fed Time:"+LF+" am",15,400)
}
}

function readStock(data){
  foodS=data.val();
  foodO.updateFoodStock(foodS)
  if(foodS<0){
    foodS=0
  }
}

function addFoodS(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.changeAnimation("dogi",doogImg1);
  foodO.updateFoodStock(foodO.getFoodStock()-1);
  database.re('/').update({
    Food:foodO.getFoodStock(),
  LastFed:hour()
  })
}