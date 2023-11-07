/* Course: SENG 513 */
/* Date: OCT 16, 2023 */
/* Assignment 1 */
/* Name: Arne Jarred Michael Hilao */
/* UCID: 30069573 */


//Handles Piece Logic.
class Piece {
    constructor(type, color, coords) {
        this.type = type;
        this.color = color;
        this.position = coords;
        this.possibleMoves = [];
    }

    move(coords) {
        if (this.possibleMoves.includes(coords)) {
            //this is a legal move. Update piece's position
            this.position = coords;

            //each subclass handles updating possibleMoves on its own
        }
    }
}

class Pawn extends Piece {
    constructor(type, color, coords) {
        super(type, color, coords);

        //check for legal moves
    }

    findLegalMoves() {
        
    }
}

class Rook extends Piece {
    constructor(type, color, coords) {
        super(type, color, coords);
    }   
}

class Knight extends Piece {
    constructor(type, color, coords) {
        super(type, color, coords);
    }
}

class Bishop extends Piece {
    constructor(type, color, coords) {
        super(type, color, coords);
    }   
}

class Queen extends Piece {
    constructor(type, color, coords) {
        super(type, color, coords);
    }   
}

class King extends Piece {
    constructor(type, color, coords) {
        super(type, color, coords);
    }   
}