const canvas = document.getElementById("game-area");
const ctx = canvas.getContext("2d");
const poem = [];
const wordPool = ["the", "let", "yet", "animal", "softly", "stomps", "piglet", "furry", "articulated", "a", "my", "your", "their", "our", "we", "do", "dance", "swing", "leap", "kiss", "running", "crashing", "crushing", "smashing", "bloodlet", "muscles", "rushing", "overflowing", "ocean", "song", "choir", "prayer", "praying", "cast", "a", "spell", "a", "the", "doctor", "help", "helping", "burying", "you"]
const poemDiv = document.getElementById("poem-area");


let controllerIndex = null;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let LwithinRange = false;

let wordSpeed = 5;
let Lword = wordPool[Math.floor(Math.random() * wordPool.length)];

let pressedColor = "black";
let stompColor = "red"
let leftArrowY = 832;
let screenBottom = 832;
let Lw;
let Dw;
let Uw;
let Rw;





console.log("DANCE POEM REVOLUTION");


var addWordToPoem = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            poem.push(Lword);
            poemDiv.innerHTML += ("<br />" + Lword); 
            console.log("CURRENT POEM: " + poem);
            setTimeout(function() {
                executed = false;
            }, 100);
        }
    };
})();


function setupCanvas() {
    canvas.width = (window.innerWidth - 400);
    canvas.height = window.innerHeight;
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
    Lw = (.125 * canvas.width);
    Dw = (.525 * canvas.width);
    Uw = (.325 * canvas.width);
    Rw = (.725 * canvas.width);

    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    //  ARROW SHAPES
    //left
    ctx.fillRect(Lw, 100, 100, 100);
    //down
    ctx.fillRect(Dw, 100, 100, 100);
    //up
    ctx.fillRect(Uw, 100, 100, 100);
    //right
    ctx.fillRect(Rw, 100, 100, 100);
    // console.log(Rw);


    // const img = document.getElementById("arrow");
    // ctx.drawImage(img, 10, 10);

}


function drawLWord() {
    ctx.fillStyle = pressedColor;

    ctx.font = "48px serif";
    leftArrowY -= wordSpeed;
    //positioning Lw roughly in the middle of the L section
    ctx.fillText(Lword, (Lw - 50), leftArrowY);
    // console.log(leftPressed);

    if (leftArrowY < 0) {
        leftArrowY = screenBottom;
        Lword = wordPool[Math.floor(Math.random() * wordPool.length)];
    }

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
        // console.log(Lword + " is in range");
        LwithinRange = true;
    } else {
        LwithinRange = false;
    }


    if (LwithinRange == true && leftPressed == true) {
        console.log("ADD WORD TO POEM: " + Lword)
            // poem.push(Lword);
        addWordToPoem();
    }


}

function checkButton() {

    //dev mode for using arrow keys
    document.addEventListener("keydown", function(event) {
        if (event.key == "ArrowLeft") {
            leftPressed = true
            setTimeout(function() {
                leftPressed = false;
            }, 100);
        }

        if (event.key == "ArrowDown") {
            downPressed = true
            setTimeout(function() {
                downPressed = false;
            }, 100);
        }

        if (event.key == "ArrowUp") {
            upPressed = true
            setTimeout(function() {
                upPressed = false;
            }, 100);
        }

        if (event.key == "ArrowRight") {
            rightPressed = true
            setTimeout(function() {
                rightPressed = false;
            }, 100);
        }
    });

    if (leftPressed) {
        ctx.fillStyle = stompColor;
        ctx.fillRect(Lw, 100, 100, 100);
        console.log("LEFT")
    } else {
        pressedColor = "black"
    }

    if (downPressed) {
        ctx.fillStyle = stompColor;
        ctx.fillRect(Dw, 100, 100, 100);
        console.log("DOWN")
    } else {
        pressedColor = "black"
    }

    if (upPressed) {
        ctx.fillStyle = stompColor;
        ctx.fillRect(Uw, 100, 100, 100);
        console.log("UP")
    } else {
        pressedColor = "black"
    }


    if (rightPressed) {
        ctx.fillStyle = stompColor;
        ctx.fillRect(Rw, 100, 100, 100);
        console.log("RIGHT")
    } else {
        pressedColor = "black"
    }
}

// turns page shifting off when keys are pressed
window.addEventListener("keydown", function(e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


function updatePlayer() {
    checkButton();
}

function gameLoop() {
    clearScreen();
    drawLWord();
    controllerInput();
    updatePlayer();
    checkLWord();
    requestAnimationFrame(gameLoop);
}

gameLoop();