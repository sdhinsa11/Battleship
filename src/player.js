import{
    Gameboard
} from './gameboard';


class Player{

    constructor(name){
        this.name = name;
        this.gameboard = Gameboard(); 
    }
}

export{
    Player
};