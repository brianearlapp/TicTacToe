
// array of all the game box elements
let ticTacToeCells = Array.from(document.getElementsByClassName("tic_tac_toe_cell"));

// for tracking which character (i.e. X or O) to place in the box
let xo = "";

// Game status message element
let gameStatusMessageBox = document.getElementById("gameStatus");

// function that sets the border and/or text color of the elements in an array of table cell elements to the specified color
// default behaviour is to set all of the colors to black; passing null for either colors leaves that attribute unchanged
let changeBoardColor = (cellsToChange = ticTacToeCells, newBorderColor = "black", newTextColor = "black") => {
    cellsToChange.forEach((cellToChange) => {
        if (newBorderColor != null) {cellToChange.style.borderColor = newBorderColor};
        if (newTextColor != null) {cellToChange.style.color = newTextColor};
    });
};

let setGameStatusMessage = (statusMessage) => {
    gameStatusMessageBox.innerHTML = statusMessage;
}

// ----starting a new game with the New Game button---- //

let resetGame = () => {
    //console.log("resetting board");
    
    // clear all the Xs and Os
    ticTacToeCells.forEach((ticTacToeCell) => {
        ticTacToeCell.textContent = "";
    });

    // Reset the game message
    setGameStatusMessage("Enjoy playing tic tac toe!");

    // reset the variable that tracks which character to place (i.e. X or O)
    xo = "";
    
    // reset all the event listeners for the game
    removeGameEventlisteners();
    addGameEventListeners();

    // Set the board to its default border color
    changeBoardColor();
};

document.getElementById("newGameButton").addEventListener("click", resetGame);


// ----Playing the game---- //

let setXO = () => {
    switch (xo) {
        case "X":
            xo = "O";
            break;
        case "O":
            xo = "X";
            break;
        case "":
            xo = "X";
            break;
    };
    return xo;
};

let gameStartedMessage = () => {
    setGameStatusMessage("Click New Game to cancel the current game and start a new one.");
};

let markTheBox = (event) => {

    //console.log("Event was triggered");

    if (event.target.textContent === "") {
        //console.log("set xo");
        event.target.textContent = setXO();
    }
    else {
        //console.log("did NOT set xo");
    };
};

// ----check if there is a winner and setting the game to the 'win state'---- //

const waysToWin = [
    "top",
    "middleVertical",
    "bottom",
    "left",
    "middleHorizontal",
    "right",
    "diagonalDownRight",
    "diagonalUpRight"
];

let getWaysToWinCells = (wayToWin) => {
    let wayToWinCells = Array.from(document.getElementsByClassName(wayToWin));
    return wayToWinCells;
};

let waysToWinCells = waysToWin.map(getWaysToWinCells);

let cellsAreAllXorO = (cellsToCheck) => {
    
    if (cellsToCheck[0].textContent == "") {return false};

    let compareValue = cellsToCheck[0].textContent;
    let compareResult = true;

    cellsToCheck.forEach((element) => {if (element.textContent != compareValue) {compareResult = false}});

    return compareResult;
};

let checkforWinner = () => {
    
    // get an array of the winning cells if there is a winning set
    let winningCells = Array.from(waysToWinCells.filter(cellsAreAllXorO))[0];

    // if there is a winning set of sells, set the game to winning conditions
    if (winningCells.length === 3) {
        thereIsAWinner(winningCells);
    };
};


let freezeBoard = () => {
    // stop the user from marking new cells
    removeGameEventlisteners();

    // visually indicate the board cannot be edited
    changeBoardColor(undefined, "gray");
};

let highlightWinner = (winningCells) => {
    // visually indicate which cells were the winning cells
    changeBoardColor(winningCells, null, "red");
};

let thereIsAWinner = (winningCells) => {
    // set game status message to winner message
    setGameStatusMessage("<span class = 'winner'>There is a winner!</span></br>Click New Game to start playing a new game.");

    // Stop the players from playing the current game further; this work must be done before indicating who wins with highlightWinner.
    freezeBoard();

    // Indicate who won
    highlightWinner(winningCells);
};



// ----Functions for managing event listeners for the game---- //

let addGameEventListeners = () => {
    ticTacToeCells.forEach((ticTacToeCell) => {
        ticTacToeCell.addEventListener('click', markTheBox);
        ticTacToeCell.addEventListener('click', gameStartedMessage);
        ticTacToeCell.addEventListener('click', checkforWinner);
    });
};

let removeGameEventlisteners = () => {
    ticTacToeCells.forEach((ticTacToeCell) => {
        ticTacToeCell.removeEventListener('click', markTheBox);
        ticTacToeCell.removeEventListener('click', gameStartedMessage);
        ticTacToeCell.removeEventListener('click', checkforWinner);
    });
};


