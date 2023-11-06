/* Course: SENG 513 */
/* Date: OCT 16, 2023 */
/* Assignment 1 */
/* Name: Arne Jarred Michael Hilao */
/* UCID: 30069573 */

//Runs the logic, and contains all the global variables

//sets which player is white. Player 1 = 0, Player 2 = 1
let whitePlayer = 0;

//sets the currently active player. Default: white
let activePlayer = 'WHITE';

//gameboard object
let gameBoard = new Board();

//scoreboard object
let scoreBoard = new scoreBoard();


//set up the board on the window loading
window.onload = gameBoard.setUpBoard();

//create listeners

var handleClick = async () => {
    //handles click logic
}

endGame(arg) = {
    //check if argument is 0.
    //if zero, add 0.5 to both scores
    //if not zero, check for resign.
    //if resign, add 1 to non-active player score
    //otherwise add 1 to active player score
}

switchActivePlayer() = {

}