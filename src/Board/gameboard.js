import{
    Ship
} from '/Users/sohanadhinsa/Documents/odin-projects/Javascript_practice/Battleship/src/Ships/ship.js';


class Gameboard{

    constructor(){
        this.board = this.creatingBoard();
        this.missedAttacks = [];
        this.ships = [new Ship(2), new Ship(3), new Ship(4), new Ship(4), new Ship(5)]; // all ship objects in here 
    }

    creatingBoard(){
        const gboard = [];
        for (let i=0; i<=9; i++){
            gboard[i] = [];
            for(let j=0; j<=9; j++){
                gboard[i][j] = { x: i, y: j, hit: false, touched: false, s: null};
            }
        }
        return gboard;
    }

    placeShips(x, y, ship, direction){
        if (direction === "horizontal"){

            for(let i = 0; i<ship.length;i++){

                if (this.canPlaceShips(x,y+i)){
                    console.log(ship instanceof Ship);
                    this.board[x][y+i].s = ship; // switch it so that it takes the color and displays that
                    ship.coord.push({x: x, y: y+i});
                }

                else{
                    // need to get to repick it
                }

            }
        }

        // need to make sure that no one else puts there ship therel
        else if (direction === "vertical"){
            for(let i = 0; i<ship.length;i++){

                if (this.canPlaceShips(x+i,y)){
                    this.board[x+i][y].s = ship;
                    ship.coord.push({x: x+i, y: y});
                }
                else{
                    // need to get to repick it
                }
            }
        }

        this.ships.push(ship);
        
    }

    // alert that you cannot place ship here
    canPlaceShips(x, y){
        if (this.board[x] && this.board[x][y]){
            if (this.board[x][y].s != null){
                return false;
                // alert error that you cannot place ship here
            }

        }
        return true;
    }

    recieveAttack(x, y){

        this.board[x][y].touched = true;

        // add a functionality that displaye that colour as red/hit
        //hits this gameboard ships
        if (this.ships.some(ship => ship.coord.some(c => c.x === x && c.y === y))){ // there is a ship that contains the coordinates that are hit 
            const hitShip = this.ships.find(ship => ship.coord.some(c => c.x === x && c.y === y)); // getting the ship that is hit
            this.board[x][y].hit = true;
            hitShip.hit();
            // return this.board.hit;
        }

        else{
            this.missedAttacks.push({x: x, y: y});
            // return false;
        }
        
    }

    shipsSunk(){

        for (let ship of this.ships){
            ship.isSunk();
            if (!ship.sunk){ // ships are still not all hit 
                return false;
            }
        }
        return true;

    }

}

export{ Gameboard };