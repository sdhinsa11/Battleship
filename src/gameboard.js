class Gameboard{

    constructor(){
        this.board = [["","","","","","","","","",""],
                      ["","","","","","","","","",""],
                      ["","","","","","","","","",""],
                      ["","","","","","","","","",""],
                      ["","","","","","","","","",""],
                      ["","","","","","","","","",""],
                      ["","","","","","","","","",""],
                      ["","","","","","","","","",""],
                      ["","","","","","","","","",""],
                      ["","","","","","","","","",""]];

        this.missedAttacks = [];
        this.ships = []; // all ship objects in here 
    }

    placeShips(x, y, ship, direction){
        if (direction === "horizontal"){

            for(let i = 0; i<ship.length;i++){
                this.board[x][y+i] = ship;
                ship.coord.push({x: x, y: y+i});

            }
        }

        // need to make sure that no one else puts there ship therel
        else if (direction === "vertical"){
            for(let i = 0; i<ship.length;i++){
                this.board[x+i][y] = ship;
                ship.coord.push({x: x+i, y: y});

            }
        }

        this.ships.push(ship);
        
    }

    recieveAttack(x, y){
        //hits this gameboard ships
        if (this.ships.some(ship => ship.coord.some(c => c.x === x && c.y === y))){ // there is a ship that contains the coordinates that are hit 
            const hitShip = this.ships.find(ship => ship.coord.some(c => c.x === x && c.y === y)); // getting the ship that is hit
            hitShip.hit();
        }

        else{
            this.missedAttacks.push({x: x, y: y});
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

export{
    Gameboard
};