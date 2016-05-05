var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
const PADDLE_THICKNESS = 10;
const PADDLE_WIDTH = 200;
var score = 0;
var best = 0;
var fps = 30;
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballVx = Math.random()*10;
var ballVy = Math.random()*10;

window.onload = function() {
        
    gameplay = setInterval(doALLtheThings, 1000/fps);

    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(evt);
        paddleLeftPos = mousePos.y - (PADDLE_WIDTH/2);
        paddleTopPos = mousePos.x - (PADDLE_WIDTH/2);
        paddleRightPos = mousePos.y - (PADDLE_WIDTH/2); 
        paddleBottomPos = mousePos.x - (PADDLE_WIDTH/2);
    }); 
}

start.onclick = function() {
    best = 0;
    score = 0;
}

/*stop.onclick = function() {
    
} // pauses the game

reset.onclick = function() {
    clearTimeout(t);
    time.textContent = "00:00";
    sec = 0;
    min = 0;
} */ // resets the value of count (aka timer) and clears balls
   
//----------------------------------FUNCTIONS---------------------------------------------//
//GAMEPLAY FUNCTIONS

function drawPaddle(left, top, width, height, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.fillRect(left, top, width, height);
} // draw paddles based on parameters given

function drawField (){
    var grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 5, canvas.width/2, canvas.height/2, 200);
    grd.addColorStop(1, "#0e0e2e");
    grd.addColorStop(0, "#2C75FF");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBall(ctrX, ctrY, radius, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.beginPath();
    ctx.arc(ctrX, ctrY, radius, 0, Math.PI*2, true);
    ctx.fill();

} //draw ball based on parameters given

function drawALL() {

    var paddleLeftX = 0; // X coord of left paddle
    var paddleTopY = 0; // Y coord of top paddle
    var paddleRightX = canvas.width - PADDLE_THICKNESS; // X coord of right paddle
    var paddleBottomY = canvas.height - PADDLE_THICKNESS; // Y coord of bottom paddle
    var color = "#acb2ff";

    drawField();
    drawPaddle(paddleLeftX, paddleLeftPos, PADDLE_THICKNESS, PADDLE_WIDTH, color);
    drawPaddle(paddleTopPos, paddleTopY, PADDLE_WIDTH, PADDLE_THICKNESS, color);
    drawPaddle(paddleRightX, paddleRightPos, PADDLE_THICKNESS, PADDLE_WIDTH, color);
    drawPaddle(paddleBottomPos, paddleBottomY, PADDLE_WIDTH, PADDLE_THICKNESS, color);
    drawBall(ballX, ballY, 20, color);
    
}    

function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;

	return {
		x:mouseX, y:mouseY
	};
}

function moveALL () {
        
        ballX += ballVx;
        ballY += ballVy;
    
    if (ballX-20 <= 0) {
		if (ballY >= paddleLeftPos && ballY < paddleLeftPos + PADDLE_WIDTH){
			ballVx = -ballVx - (ballVx*0.1);
			var delY = ballY - (paddleLeftPos + PADDLE_WIDTH/2);
			ballVy = delY * 0.1;
            score++;
		}
		else {
			ballReset();
		}
	}

	if (ballX+20 > canvas.width) {
		if (ballY > paddleRightPos && ballY < paddleRightPos + PADDLE_WIDTH) {
			ballVx = -ballVx - (ballVx*0.1);
			var delY = ballY - (paddleRightPos + PADDLE_WIDTH/2);
			ballVy = delY * 0.1;
            score++;
		}
		else {
			ballReset();
		}
	}
    
    if (ballY-20 <= 0) {
		if (ballX > paddleTopPos && ballX < paddleTopPos + PADDLE_WIDTH){
			ballVy = -ballVy - (ballVy*0.1);
			var delX = ballX - (paddleTopPos + PADDLE_WIDTH/2);
			ballVx = delX * 0.1;
            score++;
		}
		else {
			ballReset();
		}
	}

	if (ballY+20 > canvas.height) {
		if (ballX > paddleBottomPos && ballX < paddleBottomPos + PADDLE_WIDTH) {
			ballVy = -ballVy - (ballVy*0.1);
			var delX = ballX - (paddleBottomPos + PADDLE_WIDTH/2);
			ballVx = delX * 0.1;
            score++;
		}
		else {
			ballReset(); 
		}
	}
}

function ballReset() {
	ballX = canvas.width/2;
	ballY = canvas.height/2;
    ballVx = Math.random()*10;
    ballVy = Math.random()*10;
    score = 0;
}

function updateScoreBoard() {
    document.getElementById("scoreBoard").innerHTML = score;
    document.getElementById("scoreBest").innerHTML = best;
}

function updateRecord() {
    if (score >= best) {
        best = score;
    }
    else {
        best = best;
    }
}

function doALLtheThings() {
    drawALL();
    moveALL();
    updateScoreBoard();
    updateRecord();
    console.log(ballVx);
    console.log(ballVy);
}