/* Course: SENG 513 */
/* Date: OCT 16, 2023 */
/* Assignment 1 */
/* Name: Arne Jarred Michael Hilao */
/* UCID: 30069573 */

class MoveList {
    //move list functions.

    constructor() {
        this.whiteMoves = [];
        this.blackMoves = [];
    }

    addToList(piece, coord) {
        //formats a move to add to the list according to piece, and coordinates
        //assumes sequential adding. That is, after a white move, a black move will follow
        let li = document.createElement("li");
        let move;
        if (piece === "Rook") {
            move = "R";
        }
        else if (piece === "Knight") {
            move = "N";
        }
        else if (piece === "Bishop") {
            move = "B";
        }
        else if (piece === "Queen") {
            move = "Q";
        }
        else if (piece === "King") {
            move = "K"
        }
        else {
            move = "P"
        }

        move = move.concat(coord);
        li.appendChild(document.createTextNode(move));
        document.getElementsById("movelist").appendChild(li);
    }
}