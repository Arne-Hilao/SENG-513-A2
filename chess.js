/* Course: SENG 513 */
/* Date: OCT 16, 2023 */
/* Assignment 1 */
/* Name: Arne Jarred Michael Hilao */
/* UCID: 30069573 */

//=================GLOBAL VARIABLES=================

let columns = 'abcdefgh'

//sets which player is white. Player 1 = 0, Player 2 = white
let whitePlayer = 0;

//sets the currently active player
let activePlayer = 0;

//board object that the game will reference.
const board = {
    //object of all white pieces with their corresponding position
    white: {},
    //object of all black pieces with their corresponding position
    black: {}

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
    //revert the board state to empty

    for (i = 0; i < 8; i++) {
        for (j = 1; j < 9; j++) {
            let coord = columns[i];
            coord = coord.concat(j);
            delete board.white[coord];
            delete board.black[coord];
        }    
    }

    //set up the pawns
    for (i = 0; i < 8; i++) {
        let coord = columns[i];
        whiteCoord = coord.concat('2')
        blackCoord = coord.concat('7')
        board.white[whiteCoord] = 'p';
        board.black[blackCoord] = 'p';
    }

    //setup the rooks
    board.white.a1 = 'r';
    board.white.h1 = 'r';
    board.black.a8 = 'r';
    board.black.h8 = 'r';

    //setup the knights
    board.white.b1 = 'n';
    board.white.g1 = 'n';
    board.black.b8 = 'n';
    board.black.g8 = 'n';

    //setup the bishops
    board.white.c1 = 'b';
    board.white.f1 = 'b';
    board.black.c8 = 'b';
    board.black.f8 = 'b';

    //setup the queens
    board.white.d1 = 'q';
    board.black.d8 = 'q';

    //setup the kings
    board.white.e1 = 'k';
    board.black.e8 = 'k';

    //add event listeners to all boxes
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('click', (event) => {
            clickHandler(event);
        })
    })
}

/**
 * Function updateBoard
 * Input: None
 * 
 * Function that updates the visual representation of the board.
 * Called after every modification to the game state, such as selecting pieces, or making moves
 */
var updateBoard = () => {
    //clear board
    for (i = 0; i < 8; i++) {
        for (j = 1; j < 9; j++) {
            let column = columns[i];
            let coord = column.concat(j);

            document.getElementById(coord).innerHTML = "";
            document.getElementById(coord).classList.remove('highlighted');
            document.getElementById(coord).classList.remove('selected');
            document.getElementById(coord).classList.remove('check');
        }
    }

    let whiteCoords = [];
    let blackCoords = [];
    
    for (var coord in board.white) {
        whiteCoords.push(coord);
    }
    for (var coord in board.black) {
        blackCoords.push(coord);
    }

    while (whiteCoords?.length) {
        //take every property in board.whiet and find the element id associated
        let coord = whiteCoords.pop();
        let piece = '<img ';
        if (board.white[coord] === 'p') {
            piece = piece.concat('src="./src/wp.png"');
        }
        else if (board.white[coord] === 'r'){
            piece = piece.concat('src="./src/wr.png"');
        }
        else if (board.white[coord] === 'n'){
            piece = piece.concat('src="./src/wn.png"');
        }
        else if (board.white[coord] === 'b'){
            piece = piece.concat('src="./src/wb.png"');
        }
        else if (board.white[coord] === 'q'){
            piece = piece.concat('src="./src/wq.png"');
        }
        else if (board.white[coord] === 'k'){
            piece = piece.concat('src="./src/wk.png"');
        }

        piece = piece.concat('>');
        document.getElementById(coord).innerHTML = piece;
    }

    while (blackCoords?.length) {
        //take every property in board.black and find the element id associated
        let coord = blackCoords.pop();
        let piece = '<img ';
        if (board.black[coord] === 'p') {
            piece = piece.concat('src="./src/bp.png"');
        }
        else if (board.black[coord] === 'r'){
            piece = piece.concat('src="./src/br.png"');
        }
        else if (board.black[coord] === 'n'){
            piece = piece.concat('src="./src/bn.png"');
        }
        else if (board.black[coord] === 'b'){
            piece = piece.concat('src="./src/bb.png"');
        }
        else if (board.black[coord] === 'q'){
            piece = piece.concat('src="./src/bq.png"');
        }
        else if (board.black[coord] === 'k'){
            piece = piece.concat('src="./src/bk.png"');
        }

        piece = piece.concat('>');
        document.getElementById(coord).innerHTML = piece;
    }
}

//click listener. handles game logic
var clickHandler = (event) => {
    let square, selected;
    if (event.target.nodeName === "IMG") {
        //clicking on a piece
        //get the id of the box it is in
        square = event.target.parentNode.id;
    }
    else {
        //clicking on an empty square
        square = event.target.id;
    }

    //check if a piece is already selected
    for (i = 0; i < 8; i++) {
        for (j = 1; j < 8; j++) {
            let column = columns[i];
            let coord = column.concat(j)
            if (document.getElementById(coord).classList.contains('selected')) {
                //a piece is selected
                selected = true;
            }
        }
    }

    if (board.white.hasOwnProperty(square)) {
        //white has it.
        if (document.getElementById(square).classList.contains('selected')) {
            //clicked element is already selected
            document.getElementById(square).classList.remove('selected');
            selected = false;
        }
        else {
            //clicked element is not selected
            if (selected) {
                document.getElementsByClassName('selected')[0].classList.remove('selected');
            }
            document.getElementById(square).classList.add('selected');
        }
    }
    else {
        selected = false;
        document.getElementsByClassName('selected')[0].classList.remove('selected');
    }
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

window.onload = setUpBoard();
window.onload = updateBoard();