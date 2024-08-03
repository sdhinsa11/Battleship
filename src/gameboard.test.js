import{
    Gameboard
} from './gameboard';

import{
    Ship
} from './ship';
  
  
test("places ship on board horizontally", () =>{

    const ship = new Ship("green", 4);
    const gboard = new Gameboard();

    //mistake last tine was not positions arguments in function properly
    gboard.placeShips(3, 4, ship, "horizontal");

    expect(gboard.board[3][4]).toEqual(ship);
    expect(gboard.board[3][5]).toEqual(ship);
    expect(gboard.board[3][6]).toEqual(ship);
    expect(gboard.board[3][7]).toEqual(ship);

    expect(ship.coord).toEqual([{x:3, y:4}, {x:3, y:5}, {x:3, y:6}, {x:3, y:7}]);

});


test("places ship on board vertically", () =>{

    const ship = new Ship("green", 4);
    const gboard = new Gameboard();

    gboard.placeShips(1, 2, ship, "vertical");
    
    expect(gboard.board[1][2]).toEqual(ship);
    expect(gboard.board[2][2]).toEqual(ship);
    expect(gboard.board[3][2]).toEqual(ship);
    expect(gboard.board[4][2]).toEqual(ship);

    expect(ship.coord).toEqual([{x:1, y:2}, {x:2, y:2}, {x:3, y:2}, {x:4, y:2}]);
    
});


test("recieve attack", () =>{
  
    const ship = new Ship("green", 3);
    const gboard = new Gameboard();

    gboard.placeShips(3, 4, ship, "horizontal");

    gboard.recieveAttack(3,5);
    gboard.recieveAttack(3,6);
    gboard.recieveAttack(1,2);

    expect(ship.hits).toEqual(2);
    expect(gboard.missedAttacks).toEqual([{x:1, y:2}]);
  
});


test("recieve attack", () =>{
  
    const ship = new Ship("green", 3);
    const gboard = new Gameboard();

    gboard.placeShips(3, 4, ship, "horizontal");

    gboard.recieveAttack(3,5);
    gboard.recieveAttack(3,6);
    gboard.recieveAttack(1,2);

    expect(ship.hits).toEqual(2);
    expect(gboard.missedAttacks).toEqual([{x:1, y:2}]);
  
});

test("ships sunken", () =>{
    const shipOne = new Ship("green", 3);
    const shipTwo = new Ship("red", 2);

    const gboard = new Gameboard();

    gboard.placeShips(3, 4, shipOne, "horizontal");
    gboard.placeShips(1, 2, shipTwo, "vertical");

    gboard.recieveAttack(3,4);
    gboard.recieveAttack(3,5);
    gboard.recieveAttack(3,6);
    

    gboard.recieveAttack(1,2);
    gboard.recieveAttack(2,2);

    expect(gboard.shipsSunk()).toBe(true);
  
});





