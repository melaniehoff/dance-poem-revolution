const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");


///////////////
let controllerIndex = null;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
///////////////

console.log("hello")

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setupCanvas();
window.addEventListener("resize", setupCanvas);


///////////////
window.addEventListener("gamepadconnected", (event) => {
  controllerIndex = event.gamepad.index;
  console.log("connected");
  // console.log(controllerIndex);
});

window.addEventListener("gamepaddisconnected", (event) => {
  console.log("disconnected");
  controllerIndex = null;
});

function controllerInput() {
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];
    // console.log(gamepad);

    const buttons = gamepad.buttons;
    upPressed = buttons[2].pressed;
    downPressed = buttons[3].pressed;
    leftPressed = buttons[0].pressed;
    rightPressed = buttons[1].pressed;
  }
}
///////////////


function checkButton() {
  if (upPressed) {
    console.log("UP")
  } else {
    
  }


  if (downPressed) {
    console.log("DOWN")
  } else {
    
  }


  if (leftPressed) {
    console.log("LEFT")
  } else {

  }


  if (rightPressed) {
    console.log("RIGHT")
  } else {
 
  }
}


function updatePlayer() {
  checkButton();
}

function gameLoop() {
  controllerInput();
  updatePlayer();
  requestAnimationFrame(gameLoop);
}

gameLoop();
