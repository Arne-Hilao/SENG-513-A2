/* Course: SENG 513 */
/* Date: OCT 16, 2023 */
/* Assignment 1 */
/* Name: Arne Jarred Michael Hilao */
/* UCID: 30069573 */

//handles board logic, and move logic.
class Board {
    constructor() {
        this.whitePieces = {};
        this.blackPieces = {};
    }

    //gets all pieces
    getAllPieces = () => {
        return this.whitePieces.concat(this.blackPieces);
    }

    //get all white pieces
    getWhitePieces = () => {
        return this.whitePieces;
    }

    //get all black pieces
    getBlackPieces = () => {
        return this.blackPieces;
    }

    //Resets the board and moves pieces back to their proper places.
    setUpBoard = () => {
        
    }

    checkState = () => {
        //first, check if the active king is in check
    
            //if so, check if there are any legal moves for the active player
                //if not, trigger win
                //if there are, disallow every other move
    
        //if the king isn't in check, check for stalemate
            //check if there are any legal moves for the active player
                //if not, trigger stalemate
                //if so, do nothing
    
        //check the move list for the past few moves. If the past 50 are king moves, draw


    }

    getMoves = (coord) => {
        //checks the coordinate for a piece. Checks the piece color
        //if it doesn't match the active player's color, do nothing

        //checks the piece type, and returns legal moves

        return {
            
        }
    }
}