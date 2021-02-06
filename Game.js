class Game{
   constructor(){

   }
   getState(){
       var gameStateref=database.ref('gameState');
       gameStateref.on("value",function(data) {
        gameState=data.val();   
       })
   }
   update(state){
       database.ref("/").update({
           'gameState': state

       })
   }
   async start(){
       if (gameState===0){
           player=new Player();
           var playercountRef=await database.ref('playerCount').once("value")
           if(playercountRef.exists()){
              playerCount=playercountRef.val();
              player.getCount();
           }
         
           form=new Form()
           form.display();
           
       }
       car1=createSprite(100,200)
       car1.addImage(car1_image);
       car2=createSprite(300,200)
       car2.addImage(car2_image)
       car3=createSprite(500,200)
       car3.addImage(car3_image)
       car4=createSprite(700,200)
       car4.addImage(car4_image)
       cars=[car1,car2,car3,car4];
       
   }
   play(){
       form.hide();
       background(ground_image)
       text("game start",120,100);

       Player.getPlayerInfo();
       player.getFinishedPlayer();

       console.log(allPlayers);
       if(allPlayers!==undefined){
           image(track_image,0,-displayHeight*4,displayWidth,displayHeight*5);
           var index=0
           var x=175
           var y=0
           var pos=130
           for (var plr in allPlayers){
               //console.log("for")
               index=index+1
               x+=200
               y=displayHeight-allPlayers[plr].distance
               cars[index-1].x=x
               cars[index-1].y=y
               if(index===player.index){
                  fill("red");
                  ellipse(x,y,60,60);
                 // cars[index-1].shapeColor="red"
                  camera.position.x=displayWidth/2
                  camera.position.y=cars[index-1].y
               }
            else{
                fill("black");
            }
              
            textSize(15)
            text(allPlayers[plr].name+":"+allPlayers[plr].distance,cars[index-1].x,cars[index-1].y+70)
            //pos=pos+20
           }

         
       }
       drawSprites();
       if (keyIsDown(UP_ARROW)&& player.index!==null && flag!==true){
           player.distance+=50
           player.update();

       }
       if(player.distance>=5550 && finishPlayers<=4 && flag===false){
          Player.updateFinishedPlayer();
          player.rank=finishPlayers
          player.update()
          flag=true
       }

      
       
   }
   
   end(){
      // console.log("reach the end")
      //camera.position.x=0
      //camera.position.y=0;
       Player.getPlayerInfo()
       imageMode(CENTER)
       textSize(30);
       fill("White")
       console.log(displayWidth/4+":"+displayHeight/9)
       for (var plr in allPlayers){
          if (allPlayers[plr].rank===1){
             text("First!"+ allPlayers[plr].name,50,320); 
             image(platinum_image,100,200,75,150);
          }

          else if (allPlayers[plr].rank===2){
            text("Second!"+ allPlayers[plr].name,250,320); 
            image(gold_image,300,200,75,150);
         }
         else   if (allPlayers[plr].rank===3){
            text("Third!"+ allPlayers[plr].name,450,320); 
            image(silver_image,500,200,75,150);
         }
         else   if (allPlayers[plr].rank===4){
            text("Fourth!"+ allPlayers[plr].name,650,320); 
            image(bronze_image,700,200,75,150);
         }
         
      }     
   
}
}