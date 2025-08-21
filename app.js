let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let scoreXDisplay = document.querySelector("#score-x");
let scoreODisplay = document.querySelector("#score-o");


let turnX = true; //playerX, playerO
let scoreX = 0;
let scoreO = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = function () {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach(function (box) {
    box.addEventListener("click", function () {
        if (turnX) {
            //playerX
            box.innerText = "X";
            turnX = false;
        } else {
            //playerO
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = function () {
    for (let box of boxes) {
        box.close = true;
    }
}

const enableBoxes = function () {
    for (let box of boxes) {
        box.close = false;
        box.innerText = "";
    }
}

const showWinner = function (winner) {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    if (winner === "X") {
        scoreX++;
        scoreXDisplay.innerText = scoreX;
    } else if (winner === "O") {
        scoreO++;
        scoreODisplay.innerText = scoreO;
    }
};


const checkWinner = function () {
    for (let pattern of winPatterns) {
        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if (pos1value != "" && pos2value != "" && pos3value != "") {
            if (pos1value === pos2value && pos2value === pos3value) {
                showWinner(pos1value);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)