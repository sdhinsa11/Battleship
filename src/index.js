import './style.css';

import{
    Player
} from '/Users/sohanadhinsa/Documents/odin-projects/Javascript_practice/Battleship/src/PlayerClass/player.js'


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
            button.textContent = cell;
            button.style.border = '1px solid black';
            button.style.borderRadius = '3px';
            // button.style.height = '50px';
            // button.style.width = '50px';
            button.style.fontSize= '5px';
            button.style.fontWeight = 'bold';

            // add colour here for the object 

            pBoardDisplay.appendChild(button);

            button.dataset.row = rowIndex;
            button.dataset.column = colIndex;

        
        })
    })
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", ()=>{
    const pOneName = document.getElementById("player1").value;

    const playerOne = new Player(pOneName);
    const computer = new Player("computer");

    const starting = document.querySelector(".startScreen");
    starting.style.display = 'none';

    renderBoards(playerOne);
    renderBoards(computer);

    
})
// Step 1. When press start button, it should render the boards and display whose turn 
// things needed: render board, event listener on start button, create new instances of people, create the gameboards and place ships properly/randomly

//Step 2. After step 1 is done, put in logic for clicking on cell, this is when you add function to buttons that click the cell and see if hit
// things needed: render board after each turn, function for clicking cell, making sure the same cell wasnt picked twice, making sure that its on the board, making sure that the game functions are called properly, handling how the computer takes turns, showing the items/misplaced, computer AI for taking turns

