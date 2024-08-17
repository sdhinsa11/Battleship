import{
    Ship
} from '/Users/sohanadhinsa/Documents/odin-projects/Javascript_practice/Battleship/src/Ships/ship.js';
  
import{
    Gameboard
} from './gameboard';


  
test("places ship on board horizontally", () =>{

    const ship = new Ship(4);
    const gboard = new Gameboard();

    //mistake last tine was not positions arguments in function properly
    gboard.placeShips(3, 4, ship, "horizontal");

    expect(gboard.board[3][4].s).toEqual(ship);
    expect(gboard.board[3][5].s).toEqual(ship);
    expect(gboard.board[3][6].s).toEqual(ship);
    expect(gboard.board[3][7].s).toEqual(ship);

    expect(ship.coord).toEqual([{x:3, y:4}, {x:3, y:5}, {x:3, y:6}, {x:3, y:7}]);

});


test("places ship on board vertically", () =>{

    const ship = new Ship(4);
    const gboard = new Gameboard();

    gboard.placeShips(1, 2, ship, "vertical");
    
    expect(gboard.board[1][2].s).toEqual(ship);
    expect(gboard.board[2][2].s).toEqual(ship);
    expect(gboard.board[3][2].s).toEqual(ship);
    expect(gboard.board[4][2].s).toEqual(ship);

    expect(ship.coord).toEqual([{x:1, y:2}, {x:2, y:2}, {x:3, y:2}, {x:4, y:2}]);
    
});


test("recieve attack - h", () =>{
  
    const ship = new Ship(3);
    const gboard = new Gameboard();

    gboard.placeShips(3, 4, ship, "horizontal");

    gboard.recieveAttack(3,5);
    gboard.recieveAttack(3,6);
    gboard.recieveAttack(1,2);

    expect(ship.hits).toEqual(2);
    expect(gboard.missedAttacks).toEqual([{x:1, y:2}]);
  
});


test("recieve attack -v ", () =>{
  
    const ship = new Ship(3);
    const gboard = new Gameboard();

    gboard.placeShips(3, 4, ship, "vertical");

    gboard.recieveAttack(3,4);
    gboard.recieveAttack(4,4);
    gboard.recieveAttack(1,2);

    expect(ship.hits).toEqual(2);
    expect(gboard.missedAttacks).toEqual([{x:1, y:2}]);
  
});

test("ships sunken", () =>{

    const gboard = new Gameboard();

    gboard.placeShips(gboard.ships[1], "horizontal", 3, 4);
    gboard.placeShips(gboard.ships[0], "vertical", 1, 2);

    gboard.recieveAttack(3,4);
    gboard.recieveAttack(3,5);
    gboard.recieveAttack(3,6);
    

    gboard.recieveAttack(1,2);
    gboard.recieveAttack(2,2);

    expect(gboard.shipsSunk()).toBe(true);
  
});





