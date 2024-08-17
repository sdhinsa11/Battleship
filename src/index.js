import './style.css';

import{
    Player
} from '/Users/sohanadhinsa/Documents/odin-projects/Javascript_practice/Battleship/src/PlayerClass/player.js';


let currentPlayer;
let playerOne;
let computer;
let isPlayersTurn = true;



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
            button.className = "cell";
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

        
        });
    });

    pBoardDisplay.querySelectorAll('button').forEach(button =>{
        button.addEventListener('click', handleClick);
    });
}

function displayTurn(player){
    const display = document.querySelector(".displayTurns");
    display.innerHTML=`${player.name}'s turn`;
}

function displayEnd(p){
    const dialog = document.querySelector("dialog");

    const result = document.querySelector(".result");
    result.textContent = `${p.name} Wins!`;
    dialog.showModal();
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

function handleClick(cellOrEvent, computerIsGoing = false){
    let oppositePlayer = (currentPlayer === playerOne) ? computer : playerOne;
    let cell;
    
    if (currentPlayer !== playerOne && !computerIsGoing) {
        return; // Ignore clicks if it's not Player 1's turn (or the computer's turn)
    }

    //get the indexes of the cell we hit

    // grabbing proper cell
    if (computerIsGoing ){
        cell = cellOrEvent
    }
    else {
        cell = cellOrEvent.target
    }


    let rowIndex = parseInt(cell.dataset.row);
    let colIndex = parseInt(cell.dataset.column);

    if (oppositePlayer.gameboard.recieveAttack(rowIndex, colIndex)){
        renderBoards(playerOne);
        renderBoards(computer);

        if (oppositePlayer.gameboard.shipsSunk()){
            displayEnd(currentPlayer);
        }

        // switch player 
        switchPlayer();
        displayTurn(oppositePlayer);

        if (!computerIsGoing) {
            handleComputerTurn();
        }
        
    }

    

    
}

function handleComputerTurn(){

    //picks random cell and "clicks it" to the handle click then once its done it goes back to the other player 
    // as all buttons have this so once a player picks one button it goes to computer then it swicthed to the players turn again

    const playerBoard = document.querySelector(".pOneBoard");

    // filtering out cells
    const availableCells = Array.from(playerBoard.querySelectorAll('.cell')).filter(cell => {
        let rowIndex = parseInt(cell.dataset.row);
        let colIndex = parseInt(cell.dataset.column);
        return !playerOne.gameboard.board[rowIndex][colIndex].touched;
    });

    

    if (availableCells.length === 0) return; // no cells

    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];

    handleClick(randomCell, true);
    
}




function switchPlayer(){
    currentPlayer = (currentPlayer === playerOne) ? computer : playerOne;
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", ()=>{
    const pOneName = document.getElementById("player1").value;

    playerOne = new Player(pOneName);
    computer = new Player("computer");
    
    currentPlayer = playerOne;

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
// things needed: render board - CHECK , event listener on start button - CHECK, create new instances of people -CHECK , create the gameboards - CHECK  and place ships properly - CHECK /randomly - CHECK

//Step 2. After step 1 is done, put in logic for clicking on cell, this is when you add function to buttons that click the cell and see if hit
// things needed: render board after each turn - CHECK , function for clicking cell -CHECK, making sure the same cell wasnt picked twice - need for player , making sure that its on the board - cHECK, making sure that the game functions are called properly- CHECK, handling how the computer takes turns - CHECK, showing the items/misplaced - CHECK, computer AI for taking turns - cHECK

