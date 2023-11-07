/* Course: SENG 513 */
/* Date: OCT 16, 2023 */
/* Assignment 1 */
/* Name: Arne Jarred Michael Hilao */
/* UCID: 30069573 */

//=================GLOBAL VARIABLES=================

//sets which player is white. Player 1 = 0, Player 2 = white
let whitePlayer = 0;

//sets the currently active player
let activePlayer = 0;

//board object that the game will reference.
const board = {
    //object of all white pieces with their corresponding position
    //white: {},
    //object of all black pieces with their corresponding position
    //black: {}

    //format:
    //e4: wp
        //wp means 'white pawn'. First letter denotes color, second denotes piece
        //w = white, b = black
        //p = pawn, r = rook, n = knight, b = bishop, q = queen, k = king
};

//=================TIMER FUNCTIONS=================

const whiteTimer = {
    //chess timer
    //minutes: the number of minutes the player has
    //seconds: the number of
}

const blackTimer = {
    //chess timer
    //minutes: the number of minutes the player has
    //seconds: the number of
}

var startTimer = () => {
    //starts the timer for the current active player
}

var stopTimer = () => {
    //stops the both timers
}

var resetTimer = () => {
    //resets the timer to its default 10 mins each
}

//=================SETUP FUNCTIONS=================

var setUpBoard = () => {
    //Set up the board. Move pieces back to their proper places.
    //revert the board state to the default
}

//=================STATE/GAME FUNCTIONS=================

var checkState = () => {
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

var endGame = () => {
    //check if argument is 0.
    //if zero, add 0.5 to both scores

    //if not, 
    //add 1 to active player's score

    //then
    //set active player to white
    //make whitePlayer be the inverse of its value
}

//=================MOVE FUNCTIONS=================

var getMoves = (i, j) => {
    //Look at the indicated square
    //check current active player's piece list
    //if no piece is found, it's an invalid piece

    //if a piece is found, check board state.
    //If board state doesn't return a check, 
        //then return all possible moves for chosen piece
    //If board state returns a check, check all possible moves for chosen piece,
        //and return list of moves that prevent the check.

    //If move is legal, add to move list
}

var boundCheck = (i, j) => {
    //check if position (i, j) is in the board
}

var highlightMoves = ( moveArray ) => {
    //highlight the squares for the moves given
}

var addToList = (activePlayer) => {
    //add move to the move list

    //if the activePlayer is white, add a new entry on move

    //if the activePlayer is black, take the previous move entry, and append ' | (move)'
}