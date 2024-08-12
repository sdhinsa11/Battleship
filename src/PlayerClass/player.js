import{
    Gameboard
} from '../Board/gameboard';


class Player{

    constructor(name){
        this.name = name;
        this.gameboard = Gameboard(); 
    }
}

export{
    Player
};