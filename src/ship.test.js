import{
  Ship
} from './ship';


test("hit method increases property", () =>{

  const ship = new Ship("red", 3);

  expect(ship.hits).toBe(0);

  ship.hit();

  expect(ship.hits).toBe(1);

  ship.hit();

  expect(ship.hits).toBe(2);

  });


test("sunk method checks if ship is sunken", () =>{

  const ship = new Ship("red", 3);

  ship.hit();
  ship.isSunk();
  
  expect(ship.sunk).toBe(false);

  ship.hit();
  ship.hit();

  ship.isSunk();

  expect(ship.sunk).toBe(true);

  });
  


