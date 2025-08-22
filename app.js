let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let scoreXDisplay = document.querySelector("#score-x");
let scoreODisplay = document.querySelector("#score-o");


let turnX = true; //playerX, playerO
let scoreX = 0; //score of X from Starting
let scoreO = 0;//score of O from Starting
let moves = 0; //to track draw

const winPatterns = [ //winning patterns of the game boxes
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


boxes.forEach(function (box) { //to apply turn for each box
    box.addEventListener("click", function () {
        if (turnX) {
            //playerX
            box.innerText = "X";
            box.style.color = "Green";//Color of X while clicking
            turnX = false;
        } else {
            //playerO
            box.innerText = "O";//Color of O while clicking
            box.style.color = "Red";
            turnX = true;
        }
        box.disabled = true; //It disables the box so next time it won't be clicked again

        let isWin = checkWinner(); // CheckWinner to see if someone has won or not
        if (moves == 9 && !isWin) {
            gameDraw();
        }
    });
});

const gameDraw = function () { //Used when the game was draw
    msg.innerText = "Game was a Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = function () { //used to disable the box buttons for no more moves
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        box.disabled = true;
    }
}

const enableBoxes = function () { // used to enable the box button after reset the game and clears the text
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = function (winner) { //function to show the winner to show the message disables remaining boxes
    msg.innerText = "Congratulations, Winner is " + winner;
    msgContainer.classList.remove("hide");
    disableBoxes();
    if (winner === "X") {// to give the output of the score of X and O
        scoreX++;
        scoreXDisplay.innerText = scoreX;
    } else if (winner === "O") {
        scoreO++;
        scoreODisplay.innerText = scoreO;
    }
};

const checkWinner = function () { //method to check the winner
    for (let i = 0; i < winPatterns.length; i++) {
        let pattern = winPatterns[i];
        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if (pos1value != "" && pos2value != "" && pos3value != "") { //when position's not equal
            if (pos1value === pos2value && pos2value === pos3value) { //output visible when 3 positions are equal
                showWinner(pos1value);
            }
        }
    }
}

const resetGame = function () { //to reset the game
    turnX = true;
    moves = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click", resetGame) //to start the new game 
resetBtn.addEventListener("click", resetGame) //to reset the game