import './style.css';

import{
    Player
} from '/Users/sohanadhinsa/Documents/odin-projects/Javascript_practice/Battleship/src/PlayerClass/player.js';


function renderBoards(player, show = true){
    
    let boardArray = player.gameboard.board;
    let pBoardDisplay;


    if (player.name != "computer"){
        pBoardDisplay = document.querySelector(".pOneBoard");
    }
    else{
        pBoardDisplay = document.querySelector(".compBoard");
    }

    pBoardDisplay.innerHTML ='';
    pBoardDisplay.style.display = 'grid';
    pBoardDisplay.style.gridTemplateColumns = 'repeat(10, 50px)';
    pBoardDisplay.style.gridTemplateRows = 'repeat(10, 50px)';
    pBoardDisplay.style.gap = '0px'; 

    boardArray.map((row, rowIndex) =>{
        return row.map((cell, colIndex)=>{
            let button = document.createElement('button');
            button.style.border = '1px solid black';
            button.style.borderRadius = '3px';
            button.style.fontSize= '5px';
            button.style.fontWeight = 'bold';

            if (player.gameboard.board[rowIndex][colIndex].hit){
                button.style.backgroundColor = "red";
            }
            else if (player.gameboard.board[rowIndex][colIndex].touched){
                button.style.backgroundColor = "dark grey";
            }

            else if (player.gameboard.board[rowIndex][colIndex].s != null){
                button.style.backgroundColor = "pink";
            }
            else{
                button.style.backgroundColor = "white";
            }

            pBoardDisplay.appendChild(button);

            button.dataset.row = rowIndex;
            button.dataset.column = colIndex;

        
        })
    })
}

function displayTurn(player){
    const display = document.querySelector(".displayTurns");
    display.innerHTML=`${player.name}'s turn`;
}

function puttingShips(player){
    const shipOne = player.gameboard.ships[0];
    const shipTwo = player.gameboard.ships[1];
    const shipThree = player.gameboard.ships[2];
    const shipFour = player.gameboard.ships[3];
    const shipFive = player.gameboard.ships[4];

    player.gameboard.placeShips(shipOne,"horizontal", player.name === "computer" ? true : false, 0,0);
    player.gameboard.placeShips(shipTwo,"horizontal", player.name === "computer" ? true : false, 1,3);
    player.gameboard.placeShips(shipThree,"horizontal", player.name === "computer" ? true : false, 2,0);
    player.gameboard.placeShips(shipFour,"horizontal", player.name === "computer" ? true : false, 3,0);
    player.gameboard.placeShips(shipFive,"horizontal", player.name === "computer" ? true : false, 9,0);


}

const startButton = document.getElementById("start");
startButton.addEventListener("click", ()=>{
    const pOneName = document.getElementById("player1").value;

    const playerOne = new Player(pOneName);
    const computer = new Player("computer");

    const starting = document.querySelector(".startScreen");
    starting.style.display = 'none';

    //placing ships
    puttingShips(playerOne);
    puttingShips(computer);

    // displaying board and turn
    renderBoards(playerOne);
    renderBoards(computer);
    displayTurn(playerOne);

    
})
// Step 1. When press start button, it should render the boards and display whose turn 
// things needed: render board - CHECK , event listener on start button - CHECK, create new instances of people -CHECK , create the gameboards - CHECK  and place ships properly - CHECK /randomly

//Step 2. After step 1 is done, put in logic for clicking on cell, this is when you add function to buttons that click the cell and see if hit
// things needed: render board after each turn, function for clicking cell, making sure the same cell wasnt picked twice, making sure that its on the board, making sure that the game functions are called properly, handling how the computer takes turns, showing the items/misplaced, computer AI for taking turns

