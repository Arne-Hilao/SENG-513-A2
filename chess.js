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
let activePlayer = 'white';

let wKingMoved = false;
let bKingMoved = false;

let p1Score = 0;
let p2Score = 0;

//board object that the game will reference.
const board = {
    //object of all white pieces with their corresponding position
    white: {},
    //object of all black pieces with their corresponding position
    black: {}

    //format:
    //REVISED FORMAT:
        //k : e1
        //p : [a2, b2, ...]

        //object property is the pieces, the values are their positions on the board
};

//=================STATE/GAME FUNCTIONS=================

//click listener for the board. handles game logic
var clickHandler = (event) => {
    let clicked;
    if (event.target.nodeName === "IMG") {
        //clicking on a piece
        //get the id of the box it is in
        clicked = event.target.parentNode.id;
    }
    else {
        //clicking on an empty square
        clicked = event.target.id;
    }

    //get the selected square (if it exists)
    //get the highlighted moves if they exist
    let element = document.getElementById(clicked);
    let selectedSquares = document.getElementsByClassName('selected');
    let highlightedSquares = document.getElementsByClassName('highlighted');
    let type = null;
    let found = false;

    //check type of square clicked
    let classes = element.classList;

    for (piece in board[activePlayer]) {
        if (piece === 'king') {
            if (board[activePlayer][piece] === clicked) {
                found = true;
                type = piece;
            }
        }

        else {
            for (let i = 0; i < board[activePlayer][piece].length; i++) {
                if (board[activePlayer][piece][i] === clicked) {
                    type = piece;
                    found = true;
                    break;
                }
            }
        }

        if (found) {
            break;
        }
    }

    if (found && !classes.contains('selected')) {
        //player is selecting a piece not actively selected
        while(highlightedSquares.length > 0) {
            highlightedSquares[0].classList.remove('highlighted');
        }
        if (selectedSquares.length > 0) {
            selectedSquares[0].classList.remove('selected');
        }

        //get all possible moves
        let moves = getMoves(type, clicked);

        //fitler based off state (read: check)
        //moves = filterCheck(clicked, moves, type);

        highlightMoves(moves);
        element.classList.add('selected');
        //select the selected piece
    }
    else if (classes.contains('highlighted')) {
        //player is clicking a highlighted square => a legal move
        
        //get original piece
        for (piece in board[activePlayer]) {
            if (piece === 'king') {
                if (board[activePlayer][piece] === selectedSquares[0].id) {
                    type = piece;
                }
            }
    
            else {
                for (let i = 0; i < board[activePlayer][piece].length; i++) {
                    if (board[activePlayer][piece][i] === selectedSquares[0].id) {
                        type = piece;
                        found = true;
                        break;
                    }
                }
            }
    
            if (found) {
                break;
            }
        }

        //start moving piece.
        makeMove(selectedSquares[0].id, clicked, type);
    }
    else {
        //player is clicking an already selected piece, 
        //or a non-consequential piece to movement
        while(highlightedSquares.length > 0) {
            highlightedSquares[0].classList.remove('highlighted');
        }
        if (selectedSquares.length > 0) {
            selectedSquares[0].classList.remove('selected');
        }
    }
}

var filterCheck = (original, moves, piece) => {
    console.log(original);
    console.log(moves);
    console.log(piece);
    for (move in moves) {
        let tBoard = board;

    }
}

var checkState = () => {
    //first, check if the active king is in check

    //find the king's position in the active player's board

        //if so, check if there are any legal moves for the active player
            //if not, trigger win
            //if there are, disallow every other move

    //if the king isn't in check, check for stalemate
        //check if there are any legal moves for the active player
            //if not, trigger stalemate
            //if so, do nothing
}

var updateScore = () => {
    document.getElementById('p1Score').innerHTML = p1Score;
    document.getElementById('p2Score').innerHTML = p2Score;
}

var endGame = (arg) => {
    //check if argument is 0.
    //if zero, add 0.5 to both scores
    if (arg === 0) {
        p1Score += 0.5;
        p2Score += 0.5;
    }

    else if (arg === 1) {
        //ended in resignation or time-out.
        if (activePlayer === 'white') {
            if (whitePlayer === 0) {
                p2Score += 1;
            }
            else {
                p1Score += 1;
            }
        }
        else {
            if(whitePlayer === 0) {
                p1Score += 1;
            }
            else {
                p2Score += 1;
            }
        }
    }

    //if not, 
    //add 1 to active player's score
    else {
        if (activePlayer === 'white') {
            if (whitePlayer === 0) {
                p1Score += 1;
            }
            else {
                p2Score += 1;
            }
        }
        else {
            if(whitePlayer === 0) {
                p1Score += 1;
            }
            else {
                p2Score += 1;
            }
        }
    }

    //then
    //set active player to white
    activePlayer = 'white'
    
    //make whitePlayer be the inverse of its value
    if (whitePlayer) {
        whitePlayer = 0;
    }
    else {
        whitePlayer = 1;
    }

    //reset board
    setUpBoard();
    swapPlayers();
    updateScore();
}

window.onload = setUpBoard();

//remove and add eventlisteners
let boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
    box.removeEventListener('click', clickHandler);
    box.addEventListener('click', (event) => {
        clickHandler(event);
    });
})

document.getElementById('draw').addEventListener('click', function() {
    endGame(0);
});
document.getElementById('resign').addEventListener('click', function() {
    endGame(1);
});