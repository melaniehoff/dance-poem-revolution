const poem = [];
const wordPool = ["the", "let", "yet", "animal", "softly", "stomps", "piglet", "furry", "articulated", "a", "my", "your", "their", "our", "we", "do", "dance", "swing", "leap", "kiss", "running", "crashing", "crushing", "smashing", "bloodlet", "muscles", "rushing", "overflowing", "ocean", "song", "choir", "prayer", "praying", "cast", "a", "spell", "a", "the", "doctor", "help", "helping", "burying", "you"];
const roomForPoem = 400;
const bg = 248;
const text_size = 38;

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
let leftArrowY;
let Lw;
let Dw;
let Uw;
let Rw;
let Larrow, Darrow, Uarrow, Rarrow;


console.log("DANCE POEM REVOLUTION");

window.addEventListener("gamepadconnected", (event) => {
    controllerIndex = event.gamepad.index;
    console.log("connected");
    console.log(controllerIndex);
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("disconnected");
    controllerIndex = null;
});

// turns page shifting off when keys are pressed
window.addEventListener("keydown", function(e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


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

var addWordToPoem = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            poem.push(Lword);

            let poemDiv = document.getElementById("poem-area");
            poemDiv.innerHTML += ("<br />" + Lword); 



            // let p = createP(poem);
            // p.position(5, 0);
            
            console.log("CURRENT POEM: " + poem);
            setTimeout(function() {
                executed = false;
            }, 100);
        }
    };
})();


function preload() {
    Larrow = createImg("images/Larrow.gif");
    Darrow = createImg("images/Darrow.gif");
    Uarrow = createImg("images/Uarrow.gif");
    Rarrow = createImg("images/Rarrow.gif");
    Rstomp = createImg('images/Rstomp.png');
        Dstomp = createImg('images/Dstomp.png');
            Lstomp = createImg('images/Lstomp.png');
                Ustomp = createImg('images/Ustomp.png');
}


function setup() {
    // put setup code here
    createCanvas((windowWidth - roomForPoem), displayHeight);
    background(bg);
    leftArrowY = displayHeight;
    textSize(text_size);
    strokeWeight(0.5);
    textAlign(CENTER);
}


function draw() {
    background(bg);
    let gameSpace = (windowWidth - roomForPoem);
    Lw = (.125 * gameSpace);
    Dw = (.325 * gameSpace);
    Uw = (.525 * gameSpace);
    Rw = (.725 * gameSpace);


    leftArrowY -= wordSpeed;
    text(Lword, Lw, leftArrowY);

    if (leftArrowY < 0) {
        leftArrowY = displayHeight;
        Lword = wordPool[Math.floor(Math.random() * wordPool.length)];
    }


    if (leftArrowY > 100 && leftArrowY < 200) {
        // console.log(Lword + " is in range");
        LwithinRange = true;
    } else {
        LwithinRange = false;
    }


    if (LwithinRange == true && leftPressed == true) {
        console.log("ADD WORD TO POEM: " + Lword)
        addWordToPoem();
    }


    //  ARROW GIFS
    Larrow.position(Lw, 100);
    Larrow.size(100, 100)
    Darrow.position(Dw, 100);
    Darrow.size(100, 100)
    Uarrow.position(Uw, 100);
    Uarrow.size(100, 100)
    Rarrow.position(Rw, 100);
    Rarrow.size(100, 100)



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
        image(Lstomp, Lw, 100, 100, 100);
        Larrow.size(0, 0)
        console.log("LEFT")
    } 

    if (downPressed) {
        image(Dstomp, Dw, 100, 100, 100);
        Darrow.size(0, 0)
        console.log("DOWN")
    } 

    if (upPressed) {
        image(Ustomp, Uw, 100, 100, 100);
        Uarrow.size(0, 0)
        console.log("UP")
    } 


    if (rightPressed) {
        image(Rstomp, Rw, 100, 100, 100);
        Rarrow.size(0, 0)
        console.log("RIGHT")
    } 

}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    console.log("resized")
    background('white');
}