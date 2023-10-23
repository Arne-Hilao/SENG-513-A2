/* Course: SENG 513 */
/* Date: OCT 16, 2023 */
/* Assignment 1 */
/* Name: Arne Jarred Michael Hilao */
/* UCID: 30069573 */

//sets which player is white. Player 1 = 0, Player 2 = white
var board = {
    //object of all white pieces with their corresponding position
    white: {},
    //object of all black pieces with their corresponding position
    black: {}
};

let whitePlayer = 0;

var setUpBoard = () => {
    //Set up the board. Move pieces back to their proper places.
}

var getMoves = () => {
    //Look at current board state, and return all possible moves for chosen square
}

var boundCheck = (i, j) => {
    //check if position (i, j) is in the board
}

//Box click event

//on Check, highlight the king's square.

//Unhide the promotion menu, when piece reaches the end

//MAKE MOVE
//      -Important functions to implement for Make move
//      -Check Legal Move
//          -Check on Move
//          -Reveal moves on right click
//      -Check Capture
//          -Check on move to remove captured piece
//      -Add Move to Move List
//          -Add to li if bool:white is true. Add new li if false
//      -Check for Checkmate
//          -If checkmate, add 1 to active player score
//          -Switch Player Sides (Player 1 becomes player 2)
//              -Flip bool: active_player. so wins get added to the correct score
//      -Check for Stalemate
//          -If stalemate, add 0.5 to both scores
//              -Stalemate happens when a king can't move, but is not in check
//      -Check for Draw
//          -Happens when there are only two kings
//          -Also happens when there is only 1 bishop or 1 knight on one side (not implemented)
//          -Happens when 50 king moves in a row happen (not implemented)
//          -Happens when a position is reached 3 times (not implemented)
//          -Happens when the draw button is pressed and confirmed.
//      -Switch Active Player
//          -If all checks are passed, switch active player

//TIMER
//      -Check for end.
//          -If time is finished, consider win for non-active player

/**
 * Game flow:
 * 
 */