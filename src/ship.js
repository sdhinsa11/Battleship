// creating a class

class Ship{

    constructor(color, length){
        this.color = color;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit(){
        this.hits+= 1;
    }

    isSunk(){
        if (this.length === this.hits){
            this.sunk = true;
        }
    }

}

export{
    Ship
}