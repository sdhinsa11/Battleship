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


    clearBoard(){
        this.board = this.creatingBoard();

        // Clear the coordinates on each ship
        this.ships.forEach(ship => {
            ship.clearCoordinates();
        });

        this.missedAttacks = [];

    }

    placeShips(ship, direction=undefined, rand = false, x=undefined, y=undefined){

        // random choice 
        if (rand){
            const rChoice = this.randomlyPlaceShips(ship);
            // console.log(`rand choice: ${rChoice}`)
            x = rChoice.x;
            y = rChoice.y;
            direction = rChoice.direction;
        }

        // console.log(`Coord after: x: ${x} and y: ${y}`);
        
        if (direction === "horizontal"){
            if (this.canPlaceShips(x,y, ship.length, "horizontal")){
                for(let i = 0; i<ship.length; i++){
                    // console.log(ship instanceof Ship);
                    this.board[x][y+i].s = ship; // switch it so that it takes the color and displays that
                    ship.coord.push({x: x, y: y+i});
                }
            }
            else{
                console.log("Repick Coordinates");
            }

        }
        // need to make sure that no one else puts there ship therel
        else if (direction === "vertical"){
            if (this.canPlaceShips(x,y, ship.length, "vertical")){
                for(let i = 0; i<ship.length;i++){
                    this.board[x+i][y].s = ship;
                    ship.coord.push({x: x+i, y: y});
                }
            }

            else{
                console.log("Repick coordinates");
            }
        }
    }


    // alert that you cannot place ship here
    canPlaceShips(x, y, length, dir){

        // use a simplified loop to place and run through if return false then do smth else 

        if (dir==="horizontal"){

            if (y + length > this.board[0].length) return false; // extra check to see if it fits on the board starting from that position


            for (let i =0; i < length; i++){
                if ((x <= 9) && ((y+i) <=9)){
                    if (this.board[x][y + i] === undefined|| this.board[x][y+i].s != null){
                        return false;
                    }
                }   
            }
            return true;
        }

        else if (dir==="vertical"){

            if (x + length > this.board[0].length) return false

            for (let i = 0; i < length; i++){
                if (((x+i) <= 9) && (y <= 9)){
                    if ( this.board[x + i] === undefined||this.board[x+i][y].s != null ){
                        return false; // cannot place 
                    }
                }
            }
            return true; // all pss
        }

        else{
            return false; // cannot place cuz no direction
        }
    }

    randomCoords(){
        return Math.floor(Math.random() * 10);
    }

    randomlyPlaceShips(ship){

        let x; 
        let y;
        let direction = Math.random() < 0.5 ? "horizontal" : "vertical";

        // goes until the conditions are not true 
        do{
            x = this.randomCoords();
            y = this.randomCoords();
        } while (this.ships.some(ship => ship.coord.some(c=> c.x === x && c.y === y)) || !this.canPlaceShips(x, y, ship.length, direction)) //opposite of can place ships because if it registers as false then you cannot so to make the loop true we have to change the value

        return { x, y, direction};

    }

    recieveAttack(x, y){

        if (this.board[x][y].touched){
            // cannot go here
            console.log("go somwhwere else");
            return false;
        } 

        this.board[x][y].touched = true;
        // need to add if it is a viable place to be hit (i.e. not placing ontop of other place)

        if (this.ships.some(ship => ship.coord.some(c => c.x === x && c.y === y))){ // there is a ship that contains the coordinates that are hit 
            const hitShip = this.ships.find(ship => ship.coord.some(c => c.x === x && c.y === y)); // getting the ship that is hit
            this.board[x][y].hit = true;
            hitShip.hit();
            // return this.board.hit;
        }

        else{
            this.missedAttacks.push({x: x, y: y});
        }

        //spot was viable
        return true;
        
    }

    shipsSunk(){

        for (let ship of this.ships){
            // ship.isSunk();
            if (!ship.sunk){ // ships are still not all hit 
                return false;
            }
        }
        return true;

    }

}

export{ Gameboard };