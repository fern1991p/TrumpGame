let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

let startBtn = document.querySelector("#start")
let restartBtn = document.querySelector("#restart")

let bg = new Image();
bg.src = 'splashScreen.png' ;
let gs = new Image();
gs.src = 'gameScreen.png' ;
let go = new Image();
go.src = 'gameOver.png' ;
let trump = new Image();
trump.src = 'trump.png' ;
let vac = new Image();
vac.src = 'syringe.png' ;
let fake = new Image();
fake.src = 'fake.png'
let cloud = new Image();
cloud.src = "clouds.png";
let musicObj = new Audio();
musicObj.src = "fakenews.mp3"
let musicBackground = new Audio();
musicBackground.src = "backgroundmusic.wav"


let intervalId = 0
let gameOver = false 
let trumpWidth = 115 
let trumpHeight = 150
let trumpX = 250 
let trumpY = canvas.height - trumpHeight;
let isRight = false; let isLeft = false
let objX = 0
let objY = 0
let decObj = 3.5
let gap = 20;
let start = false;
let score = 0;


let obj = [
    {x: 60, y: objY, img: fake},
    {x: 100, y: objY + 300, img: vac},
    {x: 230, y: objY - 300, img: vac},
    {x: 300, y: objY - 200, img: vac},
    {x: 425, y: objY - 240, img: vac},
    {x: 550, y: objY - 360, img: vac},
    {x: 600, y: objY + 400, img: vac},
    {x: 380, y: objY - 200, img: vac},
    {x: 425, y: objY - 240, img: vac},
    {x: 500, y: objY - 360, img: vac}
]

let clouds = [
    {x: 10, y: 10, img: cloud},
    {x: 30, y: 50, img: cloud},
    {x: 120, y: 35, img: cloud},
    {x: 250, y: 15, img: cloud},
]

function animation(){

    ctx.drawImage (gs, 0, 0)
    ctx.drawImage(trump, trumpX, trumpY, trumpWidth, trumpHeight)

    if (isRight && trumpX + trumpWidth < canvas.width){
        trumpX = trumpX + 5
    }
    else if (isLeft && trumpX > 0){
        trumpX = trumpX - 5
    }

    let previousX = 0;
    let previousY = 0;

    for (i=0; i<obj.length; i++){
        ctx.drawImage(obj[i].img, obj[i].x, obj[i].y) 
        obj[i].y = obj[i].y + decObj 

        if ( obj[i].y > canvas.height){
            obj[i].x = Math.floor(Math.random()* (canvas.width - 60))
            obj[i].y = - Math.floor(Math.random()* (canvas.width/2))
        if (obj[i].x > previousX && obj[i].x < previousX + 64){
                obj[i].x += 64
            }
        previousX = obj[i].x
        previousY = obj[i].y
        }  
        
        if (obj[i].img === fake && trumpX + trumpWidth > obj[i].x && trumpX < obj[i].x + 60 && obj[i].y + 60 >= canvas.height - trumpHeight){
            score++
            obj[i].x = Math.floor(Math.random()* (canvas.width - 60))
            obj[i].y = - Math.floor(Math.random()* (canvas.width/2))

        }
        if (obj[i].img === fake && trumpX < obj[i].x && trumpX + trumpWidth > obj[i].x && obj[i].y + 60 >= canvas.height - trumpHeight){
            score++
            obj[i].x = Math.floor(Math.random()* (canvas.width - 60))
            obj[i].y = - Math.floor(Math.random()* (canvas.width/2))
        }

        if (obj[i].img === vac && trumpX + trumpWidth > obj[i].x && trumpX < obj[i].x + 60 && obj[i].y + 60 >= canvas.height - trumpHeight){
            gameOver = true
            


        }
        if (obj[i].img === vac && trumpX < obj[i].x && trumpX + trumpWidth > obj[i].x && obj[i].y + 60 >= canvas.height - trumpHeight){
            gameOver = true
           

        }

        if (score == 3){
            console.log("it works")
            decObj = 5
        }
        if (score == 6){
            console.log("it works")
            decObj = 6
        }
        
    }

for (i=0; i<clouds.length; i++){
    ctx.drawImage(cloud, clouds[i].x, clouds[i].y) 
    clouds[i].x = clouds[i].x + decObj 
    

       if (clouds[i].x + 60 > canvas.width){
         clouds[i].x = 0
        clouds[i].y = 30

      }

}



    ctx.font = '24px Verdana'
    ctx.fillText(`Score: ${score}`, 30, canvas.height - 40 )

if (gameOver){
    cancelAnimationFrame(intervalId);
    ctx.drawImage (go, 0, 0);
    musicBackground.pause()
    musicObj.play()
    musicObj.volume = 0.2

    
    
   
}

else{
    console.log("gameover is NOT true")
    intervalId = requestAnimationFrame(animation);
}



}



function handleStart(){
    startBtn.style.display = "none"
    canvas.style.display = " "; 
    animation()
    musicBackground.play()
    musicBackground.volume = 0.1
    musicBackground.loop = true;
    

}

function restart(){
    console.log("restart")
    score = 0;
    gameOver = false;
    obj = [
        {x: 60, y: objY, img: fake},
        {x: 100, y: objY + 300, img: vac},
        {x: 230, y: objY - 300, img: vac},
        {x: 300, y: objY - 200, img: vac},
        {x: 425, y: objY - 240, img: vac},
        {x: 550, y: objY - 360, img: vac},
        {x: 600, y: objY + 400, img: vac},
        {x: 380, y: objY - 200, img: vac},
        {x: 425, y: objY - 240, img: vac},
        {x: 500, y: objY - 360, img: vac}
    ]
    handleStart()
}


window.addEventListener('load', () => {
    ctx.drawImage (bg, 0, 0)
    restartBtn.style.display = "none";

    document.addEventListener('keydown', (event) => {
    if (event.key == "ArrowLeft"){
        isLeft = true;
        isRight = false;
        }
    if (event.key == "ArrowRight"){
        isRight = true;
        isLeft = false;
        }
    })

    document.addEventListener('keyup', () => {
        isLeft = false;
        isRight = false;
     })

    document.addEventListener('keydown', (event) => {
    if (event.key == "Enter" && start == false){
    start = true;
    handleStart()
    }

    if (event.key == "Enter" && gameOver == true){
    restart()

    }    
       
    })


            
    
    


})