const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
const poem = [];

let controllerIndex = null;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let LwithinRange = false;
let Lword = "entymology";
let pressedColor = "black";
let stompColor = "red"
let leftArrowY = 832;
let leftArrowX = 100;

console.log("hello")




function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  playerWidthAndHeight = canvas.width * 0.1;
  velocity = canvas.width * 0.01;

  // playerX = (canvas.width - playerWidthAndHeight) / 2;
  // playerY = (canvas.height - playerWidthAndHeight) / 2;
}

setupCanvas();



window.addEventListener("resize", setupCanvas);
window.addEventListener("gamepadconnected", (event) => {
  controllerIndex = event.gamepad.index;
  console.log("connected");
  console.log(controllerIndex);
});

window.addEventListener("gamepaddisconnected", (event) => {
  console.log("disconnected");
  controllerIndex = null;
});

function clearScreen() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  //left
  ctx.fillRect(100, 100, 100, 100);
  //up
  ctx.fillRect(250, 100, 100, 100);
  //down
  ctx.fillRect(400, 100, 100, 100);
  //right
  ctx.fillRect(550, 100, 100, 100);
  // console.log("cleared")
}


function drawPlayer() {
  ctx.fillStyle = pressedColor;
  ctx.fillRect(100, 100, 100, 100);
  ctx.font = "48px serif";
  leftArrowY -= 3;
  ctx.fillText(Lword, 75, leftArrowY);
  // console.log(leftPressed);
}


function controllerInput() {
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];

    // console.log(gamepad);


    const buttons = gamepad.buttons;
    upPressed = buttons[8].pressed;
    downPressed = buttons[9].pressed;
    leftPressed = buttons[6].pressed;
    rightPressed = buttons[7].pressed;
  }
}

function checkLWord() {
 // console.log(leftArrowY);
 if (leftArrowY > 100 && leftArrowY < 200) {
  console.log(Lword + " is in range");
  LwithinRange = true;
 } else {
  LwithinRange = false;
  }
  

  if (LwithinRange == true && leftPressed == true){
    console.log("ADD WORD TO POEM: " + Lword)
    poem.push(Lword);
    console.log("CURRENT POEM: " + poem);
  }


}

function checkButton() {

//dev mode for using arrow keys
  document.addEventListener("keydown", function(event) {
   if (event.key == "ArrowLeft"){
      leftPressed = true 
        setTimeout(function(){ 
        leftPressed = false; 
    }, 100);
    }

   if (event.key == "ArrowUp"){
      upPressed = true 
        setTimeout(function(){ 
        upPressed = false; 
    }, 100);
    }

       if (event.key == "ArrowDown"){
      downPressed = true 
        setTimeout(function(){ 
        downPressed = false; 
    }, 100);
    }

       if (event.key == "ArrowRight"){
      rightPressed = true 
        setTimeout(function(){ 
        rightPressed = false; 
    }, 100);
    }
});


  if (upPressed) {
    ctx.fillStyle = stompColor;
    ctx.fillRect(250, 100, 100, 100);
    console.log("UP")
  } else {
    pressedColor = "black"
  }


  if (downPressed) {
    ctx.fillStyle = stompColor;
    ctx.fillRect(400, 100, 100, 100);
    console.log("DOWN")
  } else {
    pressedColor = "black"
  }


  if (leftPressed) {
    ctx.fillStyle = stompColor;
    ctx.fillRect(100, 100, 100, 100);
    console.log("LEFT")
  } else {
    pressedColor = "black"
  }


  if (rightPressed) {
    ctx.fillStyle = stompColor;
    ctx.fillRect(550, 100, 100, 100);
    console.log("RIGHT")
  } else {
    pressedColor = "black"
  }
}

// turns page shifting off when keys are pressed
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


function updatePlayer() {
  checkButton();
}

function gameLoop() {
  clearScreen();
  drawPlayer();
  controllerInput();
  updatePlayer();
  checkLWord();
  requestAnimationFrame(gameLoop);
}

gameLoop();
