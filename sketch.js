const poem = [];
const wordPool = ["the", "let", "yet", "animal", "softly", "stomps", "piglet", "furry", "articulated", "a", "my", "your", "their", "our", "we", "do", "dance", "swing", "leap", "kiss", "running", "crashing", "crushing", "smashing", "bloodlet", "muscles", "rushing", "overflowing", "ocean", "song", "choir", "prayer", "praying", "cast", "a", "spell", "a", "the", "doctor", "help", "helping", "burying", "you"];
const roomForPoem = 400;
const bg = 248;
const text_size = 38;

//GAMEPAD VARS
let controllerIndex = null;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

let LwithinRange = false;
let wordSpeed = 5;
let Lword = wordPool[Math.floor(Math.random() * wordPool.length)];

let leftArrowY;
let Lw;
let Dw;
let Uw;
let Rw;
let Larrow, Darrow, Uarrow, Rarrow;

let arrowObjects;

// closure/function that creates a scope that returns other functions
// makeArrow takes as an argument all the things are particular to that arrow
// it also has local vars that can be accessed by the draw function it returns


console.log("DANCE POEM REVOLUTION");

function makeArrow(info) {
    let wordY = displayHeight;
    let wordInRange;
    let buttonPressed;
    let word = wordPool[Math.floor(Math.random() * wordPool.length)];
    let wordAdded = false;


    //dev mode for using arrow keys
    document.addEventListener("keydown", function(event) {
        if (event.key == info.key) {
            buttonPressed = true
            setTimeout(function() {
                buttonPressed = false;
            }, 100);
        }
    });



    return {
        drawArrow() {
            let gameSpace = (windowWidth - roomForPoem);
            let width = (info.width * gameSpace);

            if (wordY < 0) {
                wordY = displayHeight;
                word = wordPool[Math.floor(Math.random() * wordPool.length)];
            };

            if (!wordAdded) {

                let wordWithinRange = false;

                if (wordY > 100 && wordY < 200) {
                    // console.log(Lword + " is in range");
                    wordWithinRange = true;
                } else {
                    wordWithinRange = false;
                }


                if (wordWithinRange == true && buttonPressed == true) {
                    console.log("ADD WORD TO POEM: " + word)
                    addWordToPoem(word);
                    wordAdded = true;
                    setTimeout(function() {
                        wordAdded = false;
                    }, 200);

                }


            }


            wordY -= wordSpeed;
            text(word, width, wordY);
            // image(Lstomp, Lw, 100, 100, 100);
            if (buttonPressed) {
                image(info.stompGif, width, 100, 100, 100);
                info.arrowGif.size(0, 0);
            } else {
                info.arrowGif.position(width, 100);
                info.arrowGif.size(100, 100);
            }

            // if (LwithinRange == true && leftPressed == true) {
            //     console.log("ADD WORD TO POEM: " + Lword)
            //     addWordToPoem();
            // }

        },
    };
}


window.addEventListener("gamepadconnected", (event) => {
    controllerIndex = event.gamepad.index;
    console.log("connected");
    // console.log(controllerIndex);
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
        upPressed = buttons[2].pressed;
        downPressed = buttons[3].pressed;
        leftPressed = buttons[0].pressed;
        rightPressed = buttons[1].pressed;
    }
}

var addWordToPoem = function(word) {

            poem.push(word);

            let poemDiv = document.getElementById("poem-area");
            poemDiv.innerHTML += ("<br />" + word);

            console.log("CURRENT POEM: " + poem);
        };


function preload() {
    Larrow = createImg("images/Larrow.gif");
    Lstomp = createImg('images/Lstomp.png');

    arrowObjects = [
        makeArrow({
            arrowGif: createImg("images/Uarrow.gif"),
            stompGif: createImg('images/Ustomp.png'),
            width: (.525),
            key: "ArrowUp",
        }),
        makeArrow({
            arrowGif: createImg("images/Darrow.gif"),
            stompGif: createImg('images/Dstomp.png'),
            width: (.325),
            key: "ArrowDown",
        }),
        makeArrow({
            arrowGif: createImg("images/Rarrow.gif"),
            stompGif: createImg('images/Rstomp.png'),
            width: (.725),
            key: "ArrowRight",
        })
    ];

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

    // if (leftArrowY < 0) {
    //     leftArrowY = displayHeight;
    //     Lword = wordPool[Math.floor(Math.random() * wordPool.length)];
    // }


    // if (leftArrowY > 100 && leftArrowY < 200) {
    //     // console.log(Lword + " is in range");
    //     LwithinRange = true;
    // } else {
    //     LwithinRange = false;
    // }


    // if (LwithinRange == true && leftPressed == true) {
    //     console.log("ADD WORD TO POEM: " + Lword)
    //     addWordToPoem();
    // }


    // //  ARROW GIFS
    // Larrow.position(Lw, 100);
    // Larrow.size(100, 100)
    // Darrow.position(Dw, 100);
    // Darrow.size(100, 100)
    // Uarrow.position(Uw, 100);
    // Uarrow.size(100, 100)
    // Rarrow.position(Rw, 100);
    // Rarrow.size(100, 100)


    for (arrow of arrowObjects) {
        arrow.drawArrow();
    }

}

// function checkButton() {

//     if (leftPressed) {
//         image(Lstomp, Lw, 100, 100, 100);

//         Larrow.size(0, 0)
//         console.log("LEFT")
//     }

//     if (downPressed) {
//         image(Dstomp, Dw, 100, 100, 100);
//         Darrow.size(0, 0)
//         console.log("DOWN")
//     }

//     if (upPressed) {
//         image(Ustomp, Uw, 100, 100, 100);
//         Uarrow.size(0, 0)
//         console.log("UP")
//     }


//     if (rightPressed) {
//         image(Rstomp, Rw, 100, 100, 100);
//         Rarrow.size(0, 0)
//         console.log("RIGHT")
//     }
// }


function updatePlayer() {
    // checkButton();
}

function gameLoop() {
    controllerInput();
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    console.log("resized")
    background('white');
}