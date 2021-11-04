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
let putin = new Image();
putin.src = "putin.png"
let kim = new Image();
kim.src = "kim.png"
let musicObj = new Audio();
musicObj.src = "fakenews.mp3"
let musicBackground = new Audio();
musicBackground.src = "backgroundmusic.wav"

//-------------------------------------
// VARIABLES
//-------------------------------------


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
let kimShow = false;
let kimTime = 0
let putinShow = false;
let putinTime = 0

//-------------------------------------
// ARRAYS
//-------------------------------------

let obj = [
    {x: 60, y: objY, img: fake},
    {x: 100, y: objY + 300, img: fake},
    {x: 230, y: objY - 300, img: vac},
    {x: 300, y: objY - 200, img: vac},
    {x: 425, y: objY - 240, img: vac},
    {x: 550, y: objY - 360, img: vac}
    // {x: 600, y: objY + 400, img: vac},
    // {x: 380, y: objY - 200, img: vac},
    // {x: 425, y: objY - 240, img: vac},
    // {x: 500, y: objY - 360, img: vac}
]

let clouds = [
    {x: 10, y: 10, img: cloud},
    {x: 230, y: 65, img: cloud},
    {x: 420, y: 20, img: cloud},
    {x: 550, y: 15, img: cloud},
]

let kimArr = [
   {x: 750, y: 475}
]
let putinArr = [
    {x: 750, y: 300}
 ]

//-------------------------------------
// FUNCTIONS
//-------------------------------------

function animation(){
    ctx.drawImage (gs, 0, 0)
    ctx.drawImage(trump, trumpX, trumpY, trumpWidth, trumpHeight)

    if (isRight && trumpX + trumpWidth < canvas.width){
        trumpX = trumpX + 7
    }
    else if (isLeft && trumpX > 0){
        trumpX = trumpX - 7
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
        
//-------------------------------------
// COLLISIONS | FAKE NEWS / BLEACH
//-------------------------------------

        if (obj[i].img === fake && trumpX + trumpWidth > obj[i].x && trumpX < obj[i].x + 60 && obj[i].y + 60 >= canvas.height - trumpHeight){
            score++
            kimTime++
            putinTime++
            obj[i].x = Math.floor(Math.random()* (canvas.width - 60))
            obj[i].y = - Math.floor(Math.random()* (canvas.width/2))

        }
        if (obj[i].img === fake && trumpX < obj[i].x && trumpX + trumpWidth > obj[i].x && obj[i].y + 60 >= canvas.height - trumpHeight){
            score++
            kimTime++
            putinTime++
            obj[i].x = Math.floor(Math.random()* (canvas.width - 60))
            obj[i].y = - Math.floor(Math.random()* (canvas.width/2))
        }
        
//-------------------------------------
// COLLISIONS | VACCINE
//-------------------------------------

        if (obj[i].img === vac && trumpX + trumpWidth > obj[i].x && trumpX < obj[i].x + 60 && obj[i].y + 60 >= canvas.height - trumpHeight){
            gameOver = true
            }
        if (obj[i].img === vac && trumpX < obj[i].x && trumpX + trumpWidth > obj[i].x && obj[i].y + 60 >= canvas.height - trumpHeight){
            gameOver = true
        }
//-------------------------------------
// SCORES AND SPEED
//-------------------------------------
        if (score == 4){
            decObj = 5 
        }

        if (score == 7){
            decObj = 5.5
        }

        if (score == 9){
            decObj = 6 
        }

        if (score == 12){
            decObj = 6.7
        }

        
    }
//-------------------------------------
// CLOUDS
//-------------------------------------

for (i=0; i<clouds.length; i++){
    ctx.drawImage(cloud, clouds[i].x, clouds[i].y) 
    clouds[i].x = clouds[i].x + decObj 
    
        if (clouds[i].x + 60 > canvas.width){
        clouds[i].x =  0
        clouds[i].y =  Math.floor(Math.random()* (canvas.width/4))
      }

}
//-------------------------------------
// KIM, THE DICTATOR POPING UP
//-------------------------------------    
    if (kimTime % 9 === 0 && kimTime > 2){
        kimShow = true
    }
    if (kimShow){ 
        for (i=0; i < kimArr.length; i++){
            ctx.drawImage(kim, kimArr[i].x, kimArr[i].y, 273, 222) 
            kimArr[i].x = kimArr[i].x - 2 
            if (kimArr[i].x + 273 <= 0 ){
                kimShow = false
                kimArr[i].x = 750
                kimTime = 0
           } 
    
    }

}

//-------------------------------------
// PUTIN, THE DICTATOR POPING UP
//------------------------------------- 

        if (putinTime % 2 === 0 && putinTime > 2){
            putinShow = true
        }
        if (putinShow){ 
            for (i=0; i < putinArr.length; i++){
                ctx.drawImage(putin, putinArr[i].x, putinArr[i].y, 188, 263) 
                putinArr[i].x = putinArr[i].x - 2
                if (putinArr[i].x + 273 <= 0 ){
                    putinShow = false
                    putinArr[i].x = 750
                    putinTime = 0
            } 

        }

        }

//-------------------------------------
// SCORES
//------------------------------------- 
    ctx.font = '27px Verdana'
    ctx.fillText(`Score: ${score}`, 30, canvas.height - 650 )

//-------------------------------------
// GAME OVER
//------------------------------------- 

if (gameOver){
    cancelAnimationFrame(intervalId);
    ctx.drawImage (go, 0, 0);
    musicBackground.pause()
    musicObj.play()
    musicObj.volume = 0.2
    decObj = 3.5
    kimTime = 0    
    }

else{
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
    score = 0;
    kimTime = 0;
    putinTime = 0;
    gameOver = false;
    obj = [
        {x: 60, y: objY, img: fake},
        {x: 100, y: objY + 300, img: fake},
        {x: 230, y: objY - 300, img: vac},
        {x: 300, y: objY - 200, img: vac},
        {x: 425, y: objY - 240, img: vac},
        // {x: 550, y: objY - 360, img: vac},
        // {x: 600, y: objY + 400, img: vac},
        // {x: 380, y: objY - 200, img: vac},
        // {x: 425, y: objY - 240, img: vac},
        // {x: 500, y: objY - 360, img: vac}
    ]
    clouds = [
        {x: 10, y: 10, img: cloud},
        {x: 230, y: 65, img: cloud},
        {x: 420, y: 20, img: cloud},
        {x: 550, y: 15, img: cloud},
    ]
    
    kimArr = [
       {x: 750, y: 475}
    ]
    putinArr = [
        {x: 750, y: 300}
     ]
     kimShow = false
     putinShow = false
    handleStart()
}

//-------------------------------------
// ADD EVENT LISTENER
//------------------------------------- 

window.addEventListener('load', () => {
    ctx.drawImage (bg, 0, 0)
    startBtn.style.display = "none"
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