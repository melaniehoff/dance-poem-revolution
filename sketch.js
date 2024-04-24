const poem = [];
const wordPool1 = [
    "skip", "to", "main", "content", "search", "sign", "up", "log", "in", "video", "audio", "sign", "up", "for", "free", "log", "in", "search", "search", "text", "contents", "search", "news", "search", "radio", "search", "web", "advanced", "search", "about", "help", "donate", "contact", "volunteer", "people", "full", "text", "of", "the", "only", "way", "out", "is", "always", "through", "the", "police", "a", "history", "of", "the", "new", "york", "see", "other", "the", "only", "way", "out", "is", "always", "through", "the", "police", "a", "history", "of", "the", "new", "york", "with", "no", "nor", "as", "it", "to", "the", "matter", "of", "the", "unending", "police", "violence", "and", "all", "the", "of", "those", "who", "have", "wished", "to", "end", "it", "but", "have", "not", "done", "so", "for", "whatever", "reason", "the", "only", "way", "out", "is", "always", "through", "the", "police", "a", "of", "the", "new", "york", "with", "no", "nor", "as", "it", "to", "the", "matter", "of", "the", "unending", "police", "violence", "and", "all", "the", "of", "those", "who", "have", "wished", "to", "end", "it", "but", "have", "not", "done", "so", "for", "whatever", "reason", "s", "y", "here", "is", "a", "cop", "inside", "our", "society", "is", "a", "power", "plant", "that", "on", "unwept", "a", "new", "world", "is", "in", "our", "hearts", "which", "is", "a", "muscle", "the", "size", "of", "a", "fist", "build", "the", "commune", "sabotage", "a", "railroad", "distribute", "food", "not", "canvass", "for", "or", "weep", "without", "while", "dumping", "your", "into", "the", "ocean", "and", "planting", "a", "radical", "urban", "gar", "den", "but", "know", "that", "these", "fantastic", "are", "happening", "de", "spite", "yourself", "on", "a", "beach", "beneath", "a", "world", "ruined", "and", "with", "all", "of", "our", "past", "dead", "from", "carry", "heavy", "in", "the", "hearts", "of", "those", "with", "the", "and", "to", "cast", "aside", "real", "worldly", "as", "they", "sit", "and", "take", "their", "time", "to", "work", "out", "within", "themselves", "they", "murder", "imaginary", "inside", "their", "while", "real", "kick", "down", "real", "and", "smash", "real", "into", "everyone", "else", "s", "real", "drawing", "real", "blood", "and", "actually", "wept", "racism", "and", "problematic", "feminist", "transnational", "praxis", "all", "disappear", "in", "the", "path", "of", "an", "officer", "s", "night", "stick", "whose", "blow", "is", "fast", "approaching", "maybe", "our", "hearts", "and", "are", "good", "enough", "for", "the", "time", "being", "despite", "the", "unfinished", "work", "maybe", "the", "reason", "no", "one", "ever", "the", "work", "is", "because", "we", "been", "internal", "a", "struggle", "that", "was", "always", "meant", "to", "be", "external", "we", "interrogate", "ourselves", "into", "a", "deep", "slouch", "as", "our", "en", "dure", "the", "same", "of", "suffering", "the", "let", "yet", "animal", "softly", "stomps", "piglet", "furry", "articulated", "a", "my", "your", "their", "our", "we", "do", "dance", "swing", "leap", "kiss", "running", "crashing", "crushing", "smashing", "bloodlet", "muscles", "rushing", "overflowing", "ocean", "song", "choir", "prayer", "praying", "cast", "a", "spell", "a", "the", "doctor", "help", "helping", "burying", "you"
]
const wordPool = wordPool1.sort((a, b) => 0.5 - Math.random());
const roomForPoem = 420;
const bg = 248;
const text_size = 40;
const soundFiles = ["1.wav", "2.mp3", "3.mp3", "4.mp3", "6.mp3", "7.mp3", "8.mp3"];

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

// fetch("texts/2020-RAD.txt").then( data => {});

// closure/function that creates a scope that returns other functions
// makeArrow takes as an argument all the things are particular to that arrow
// it also has local vars that can be accessed by the draw function it returns


console.log("DANCE POEM REVOLUTION");

const keyController = {
    "ArrowUp": {
        pressed: false, 
        // func: callArrowUp
    },
    "ArrowDown": {
        pressed: false, 
        // func: callArrowDown
    },
    "ArrowLeft": {
        pressed: false, 
        // func: callArrowLeft
    },
    "ArrowRight": {
        pressed: false, 
        // func: callArrowRight
    }
}
// let noKeysPressed = true;

// TODO: combine with other keydown listeners
document.addEventListener("keydown", e => {
    if (keyController[e.key]) {
        keyController[e.key].pressed = true;
    }
    // noKeysPressed = false;
})

document.addEventListener("keyup", e => {
    if (keyController[e.key]) {
        keyController[e.key].pressed = false;
    }

    // if (Object.keys(keyController).every(key => !keyController[key].pressed)) {
    //     noKeysPressed = true;
    //     console.log('no keys pressed')
    // }
})

const executeMoves = () => {
    Object.keys(keyController).forEach(key => {
        keyController[key].pressed 
        // && keyController[key].func()
    })
}

// function callArrowUp () {
//     // console.log('up arrow')
// }
// function callArrowDown () {
//     // console.log('down arrow')
// }
// function callArrowLeft () {
//     // console.log('left arrow')
// }
// function callArrowRight () {
//     // console.log('right arrow')
// }

function makeArrow(info) {
    let wordY = displayHeight;
    let wordY2 = (displayHeight - 500);
    let word = wordPool[Math.floor(Math.random() * wordPool.length)];
    let word2 = wordPool[Math.floor(Math.random() * wordPool.length)];
    let buttonPressed;
    let wordAdded = false;
    let wordAdded2 = false;



    //dev mode for using arrow keys
    // document.addEventListener("keydown", function(event) {
    //     if (event.key == info.key) {
    //         buttonPressed = true
    //         setTimeout(function() {
    //             buttonPressed = false;
    //         }, 100);
    //     }
    // });



    return {
        drawArrow() {
            let gameSpace = (windowWidth - roomForPoem);
            let width = (info.width * gameSpace);




            if (wordY < 0) {
                wordY = displayHeight;
                word = wordPool[Math.floor(Math.random() * wordPool.length)];
            };

            if (wordY2 < 0) {
                wordY2 = displayHeight;
                word2 = wordPool[Math.floor(Math.random() * wordPool.length)];
            };

            if (!wordAdded) {

                let wordWithinRange = false;

                if (wordY > 100 && wordY < 200) {
                    // console.log(Lword + " is in range");
                    wordWithinRange = true;
                } else {
                    wordWithinRange = false;
                }

                if (wordWithinRange == true && keyController[info.key].pressed) {
                // if (wordWithinRange == true && buttonPressed) {
                    // console.log("ADD WORD TO POEM: " + word)
                    addWordToPoem(word, info.key);
                    wordAdded = true;
                    setTimeout(function() {
                        wordAdded = false;
                        newLine();
                    }, 400);

                    

                }


            }

            if (!wordAdded2) {

                let wordWithinRange2 = false;

                if (wordY2 > 100 && wordY2 < 200) {
                    // console.log(Lword + " is in range");
                    wordWithinRange2 = true;
                } else {
                    wordWithinRange2 = false;
                }


                if (wordWithinRange2 == true && keyController[info.key].pressed == true) {
                // if (wordWithinRange2 == true && buttonPressed == true) {
                    // console.log("ADD WORD TO POEM: " + word2)
                    addWordToPoem(word2, info.key);
                    wordAdded2 = true;
                    setTimeout(function() {
                        wordAdded2 = false;
                        newLine();
                    }, 400);

                }


            }

            // // Alignment lines for arrows & words:
            // stroke(240, 0, 0)
            // line(width + 50, 0, width + 50, windowHeight)

            wordY -= wordSpeed;
            wordY2 -= wordSpeed;
            text(word, width + 50, wordY); 
            text(word2, width + 50, wordY2); 
            // image(Lstomp, Lw, 100, 100, 100);
            if (keyController[info.key].pressed) {
            // if (buttonPressed) {
                image(info.stompGif, width, 100, 100, 100);
                info.arrowGif.size(0, 0);
            } else {
                info.arrowGif.position(width, 100);
                info.arrowGif.size(100, 100);
                info.stompGif.hide();
            }


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

var addWordToPoem = function(word, key) {

    poem.push(word);
    const random = Math.floor(Math.random() * soundFiles.length);
    // console.log(soundFiles[random]);
    const randomSound = soundFiles[random];

    var audio = new Audio('sounds/' + randomSound);
    audio.play();

    let className = "";
    if (key == "ArrowLeft") className = "word-left"
    if (key == "ArrowDown") className = "word-down"
    if (key == "ArrowUp") className = "word-up"
    if (key == "ArrowRight") className = "word-right"

    // let poemDiv = document.getElementById("poem-area");
    let currentLine = document.querySelector('.current-line')
    currentLine.innerHTML += (`<span class="${className}"> ${word}</span>`);

    // console.log("CURRENT POEM: " + poem);

    // TODO: Optimize poemDiv, currentLine, objDiv, etc.
    var objDiv = document.getElementById("poem-area");
    objDiv.scrollTop = objDiv.scrollHeight;

};

function newLine() {
    let poemDiv = document.getElementById("poem-area");
    let currentLine = document.querySelector('.current-line')

    currentLine.classList.remove('current-line');

    const div = document.createElement('div');
    div.className = 'current-line';
    poemDiv.appendChild(div);

    // console.log('added new line');
}

function preload() {
    // bg_gif = createImg("images/water.gif");

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
        }),
        makeArrow({
            arrowGif: createImg("images/Larrow.gif"),
            stompGif: createImg('images/Lstomp.png'),
            width: (.125),
            key: "ArrowLeft",
        })
    ];

}


function setup() {
    // put setup code here
    createCanvas((windowWidth - roomForPoem), displayHeight);
    // background(bg);
    leftArrowY = displayHeight;
    textSize(text_size);
    strokeWeight(0.5);
    textAlign(CENTER);


}


function draw() {
    background(bg);

    // let gameSpace = (windowWidth - roomForPoem);


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


document.addEventListener('keydown', function(event) {
    //PRINT
    if (event.key === 'p') {
        printPageArea('poem-area-container');
        location.reload();
    }

    //RELOAD GAME/REFRESH PAGE
    if (event.key === 'r') {
        location.reload();
    }
});


function printPageArea(areaID) {
    console.log("printing " + areaID);


    // var el = document.createElement("p");
    // el.innerHTML = "School for Poetic Computation @NYABF <br>";
    // var div = document.getElementById("poem-area");
    // insertAfter(div, el);

    var printContent = document.getElementById(areaID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}


function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function updatePlayer() {
    // checkButton();
}

function gameLoop() {
    executeMoves();
    controllerInput();
    // updatePlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();

function windowResized() {
    resizeCanvas(window.innerWidth - roomForPoem, window.innerHeight);
    background(bg);
}