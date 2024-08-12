import{
  Ship
} from './ship';


test("hit method increases property", () =>{

  const myShip = new Ship(3);

  expect(myShip.hits).toBe(0);

  myShip.hit();

  expect(myShip.hits).toBe(1);

  myShip.hit();

  expect(myShip.hits).toBe(2);

  });


test("sunk method checks if ship is sunken", () =>{

  const myShip = new Ship(3);

  myShip.hit();
  myShip.isSunk();
  
  expect(myShip.sunk).toEqual(false);

  myShip.hit();
  myShip.hit();

  myShip.isSunk();

  expect(myShip.sunk).toBe(true);

  });
  


