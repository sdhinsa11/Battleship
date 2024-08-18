// creating a class


class Ship{

    constructor(length){
        // this.color = color;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.coord = [];
    }

    hit(){
        this.hits+= 1;
        this.isSunk();
    }

    isSunk(){
        if (this.length === this.hits){
            this.sunk = true;
        }
    }

    
    clearCoordinates() {
        this.coordinates = [];
        this.hits = 0; // Reset hits as well, if necessary
    }

}

export{
    Ship
};