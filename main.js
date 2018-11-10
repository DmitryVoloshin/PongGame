
var ballX = 75;
var ballSpeedX = 5;
var ballY = 75;
var ballSpeedY = 7;

const BRICK_W = 100;
const BRICK_H = 50;
const BRICK_COUNT = 4;


const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 30;
var paddleX = 400;

var canvas, canvasContext;
var mouseX = 0;
var mouseY = 0;

function updateMousePos(evt){

    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;


     mouseX = evt.clientX - rect.left - root.scrollLeft;
     mouseY = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH/2;

}


window.onload = function(){
    canvas = this.document.getElementById('gameCanvas');
   canvasContext = canvas.getContext('2d');

   var framesPerSecond = 30;
   this.setInterval(updateAll, 1000/framesPerSecond);


   canvas.addEventListener('mousemove',updateMousePos)
}
  


function updateAll(){
     moveAll();
     drawAll();
}     



function ballReset(){
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}


function moveAll(){

ballX += ballSpeedX;
ballY += ballSpeedY;
    
if(ballX < 0){  // лево
    ballSpeedX *= -1;
}
if(ballX > canvas.width){ // право
 ballSpeedX *= -1;
}
if(ballY < 0){   //верх
       ballSpeedY *= -1;
   }
if(ballY > canvas.height){  // низ
    ballReset();
   }

var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;

var paddleLeftEdgeX = paddleX;
var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

if( ballY > paddleTopEdgeY && 
    ballY < paddleBottomEdgeY && 
    ballX > paddleLeftEdgeX && 
    ballX < paddleRightEdgeX
){
  ballSpeedY *= -1;

  var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
  var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
  ballSpeedX = ballDistFromPaddleCenterX * 0.35;

}
}

function drawBricks(){
    colorRect(0,0, BRICK_W,BRICK_H, 'red')
    
}

function drawAll(){

    colorRect(0,0, canvas.width, canvas.height,'black'); //чистый экран
    colorCircle(ballX,ballY, 10,'white') //круг
    colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE,
    PADDLE_WIDTH,PADDLE_THICKNESS, 'white')

    drawBricks();

    colorText(mouseX+","+mouseY,mouseX,mouseY,'yellow');

 }

 function colorRect(topLeftX,topLeftY,boxWidth,boxHeight,fillColor){

    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
 }

 function colorCircle(centerX,centerY, radius, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true)
    canvasContext.fill();
 }

 function colorText(showWords, textX, textY,fillColor){
     canvasContext.fillStyle = fillColor;
     canvasContext.fillText(showWords, textX,textY);
 }
