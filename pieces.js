/* Course: SENG 513 */
/* Date: OCT 16, 2023 */
/* Assignment 1 */
/* Name: Arne Jarred Michael Hilao */
/* UCID: 30069573 */


//Handles Piece Logic.
class Piece {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.position = null;
        this.blocked = [];
    }
}

class Pawn extends Piece {
    constructor(type, color) {
        super(type, color);
    }   
}

class Rook extends Piece {
    constructor(type, color) {
        super(type, color);
    }   
}

class Knight extends Piece {
    constructor(type, color) {
        super(type, color);
    }
}

class Bishop extends Piece {
    constructor(type, color) {
        super(type, color);
    }   
}

class Queen extends Piece {
    constructor(type, color) {
        super(type, color);
    }   
}

class King extends Piece {
    constructor(type, color) {
        super(type, color);
    }   
}