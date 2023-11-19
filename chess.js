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

    board.white = {};
    board.black = {};

    let wPawns = [];
    let bPawns = [];

    //set up the pawns
    for (let i = 0; i < 8; i++) {
        let coord = columns[i];
        wCoord = coord.concat('2')
        bCoord = coord.concat('7')
        wPawns.push(wCoord);
        bPawns.push(bCoord);
    }

    board.white.pawn = wPawns;
    board.black.pawn = bPawns;

    //setup the rooks
    board.white.rook = ['a1', 'h1'];
    board.black.rook = ['a8', 'h8'];

    //setup the knights
    board.white.knight = ['b1', 'g1'];
    board.black.knight = ['b8', 'g8'];

    //setup the bishops
    board.white.bishop = ['c1', 'f1'];
    board.black.bishop = ['c8', 'f8'];

    //setup the queens
    board.white.queen = ['d1'];
    board.black.queen = ['d8'];

    //setup the kings
    board.white.king = 'e1';
    board.black.king = 'e8';

    //remove and add eventlisteners
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.removeEventListener('click', clickHandler);
        box.addEventListener('click', (event) => {
            clickHandler(event);
        });
    })

    //reset move list
    document.getElementById('move_list').innerHTML = "";

    //reset active player to white
    document.getElementById('active_player').innerHTML = "ACTIVE PLAYER: WHITE"

    updatePieces();
}

/**
 * Function updatePieces
 * Input: None
 * 
 * Function that updates the positions of the pieces.
 * Called after every move that changs the pieces, such as moves and captures, or pawn promotion
 */
var updatePieces = () => {
    //clear board
    for (let i = 0; i < 8; i++) {
        for (j = 1; j < 9; j++) {
            let column = columns[i];
            let coord = column.concat(j);

            document.getElementById(coord).innerHTML = "";
            document.getElementById(coord).classList.remove('highlighted');
            document.getElementById(coord).classList.remove('selected');
            document.getElementById(coord).classList.remove('check');
        }
    }

    //set up pawns
    for (let i = 0; i < board.white.pawn.length; i++) {
        document.getElementById(board.white.pawn[i]).innerHTML = '<img src="./src/wp.png">';
    }
    for (let i = 0; i < board.black.pawn.length; i++) {
        document.getElementById(board.black.pawn[i]).innerHTML = '<img src="./src/bp.png">';
    }

    //set up rooks
    for (let i = 0; i < board.white.rook.length; i++) {
        document.getElementById(board.white.rook[i]).innerHTML = '<img src="./src/wr.png">';
    }
    for (let i = 0; i < board.black.rook.length; i++) {
        document.getElementById(board.black.rook[i]).innerHTML = '<img src="./src/br.png">';
    }

    //set up knights
    for (let i = 0; i < board.white.knight.length; i++) {
        document.getElementById(board.white.knight[i]).innerHTML = '<img src="./src/wn.png">';
    }
    for (let i = 0; i < board.black.knight.length; i++) {
        document.getElementById(board.black.knight[i]).innerHTML = '<img src="./src/bn.png">';
    }

    //set up bishops
    for (let i = 0; i < board.white.bishop.length; i++) {
        document.getElementById(board.white.bishop[i]).innerHTML = '<img src="./src/wb.png">';
    }
    for (let i = 0; i < board.black.bishop.length; i++) {
        document.getElementById(board.black.bishop[i]).innerHTML = '<img src="./src/bb.png">';
    }

    //set up queens
    for (let i = 0; i < board.white.queen.length; i++) {
        document.getElementById(board.white.queen[i]).innerHTML = '<img src="./src/wq.png">';
    }
    for (let i = 0; i < board.black.queen.length; i++) {
        document.getElementById(board.black.queen[i]).innerHTML = '<img src="./src/bq.png">';
    }

    //set up kings
    document.getElementById(board.white.king).innerHTML = '<img src="./src/wk.png">';
    document.getElementById(board.black.king).innerHTML = '<img src="./src/bk.png">';
}

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
        moves = filterCheck(moves);

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

//=================STATE/GAME FUNCTIONS=================

var filterCheck = () => {
    
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

var endGame = (arg) => {
    //check if argument is 0.
    //if zero, add 0.5 to both scores
    if (arg === 0) {
        p1Score, p2Score += 0.5;
    }

    else if (arg === 1) {
        //ended in resignation or time-out.
        if (activePlayer === 0) {
            p1Score += 1;
        }
        else {
            p1Score += 2;
        }
    }

    //if not, 
    //add 1 to active player's score
    else {
        if (activePlayer === 0) {
            p1Score += 1;
        }
        else {
            p1Score += 2;
        }
    }

    //then
    //set active player to white
    
    //make whitePlayer be the inverse of its value
}

var checkOccupied = (coord, pawn) => {
    //checks the board and returns true if the coordinate given has a piece on it
    let found = false;
    for (const piece in board[activePlayer]) {
        let arr = board[activePlayer][piece];
        if (piece !== 'king') {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === coord) {
                    found = true;
                }
            }
        }
        else {
            if (arr === coord) {
                found = true;
            }
        }
    }
    if (pawn) {
        //check non activePlayer board as well
        if (activePlayer === 'white') {
            for (const piece in board.black) {
                let arr = board.black[piece];
                if (piece !== 'king') {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === coord) {
                            found = true;
                        }
                    }
                }
                else {
                    if (arr === coord) {
                        found = true;
                    }
                }
            }
        }
        else {
            for (const piece in board.white) {
                let arr = board.white[piece];
                if (piece !== 'king') {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === coord) {
                            found = true;
                        }
                    }
                }
                else {
                    if (arr === coord) {
                        found = true;
                    }
                }
            }
        }
    }
    return found;
}

//=================MOVE FUNCTIONS=================

var makeMove = (original, clicked, type) => {
    //add new item to clicked
    console.log("Making move:\n original: " + original + "\n clicked: " + clicked + "\n type: " + type);

    //remove clicked position from entire board
    for (let p in board[activePlayer]) {
        if (p !== 'king') {
            board.white[p] = board.white[p].filter((pos) => {
                return pos !== clicked;
            })
            board.black[p] = board.black[p].filter((pos) => {
                return pos !== clicked;
            })
        }
    }

    //place moved piece
    if (type === 'king') {
        board[activePlayer][type] = clicked;
    }
    else {
        board[activePlayer][type] = board[activePlayer][type].filter((pos) => {
            return pos !== original;
        })
        board[activePlayer][type].push(clicked);
    }

    //remove old piece

    //swap activePlayer
    if (activePlayer === 'white') {
        activePlayer = 'black';
        document.getElementById('active_player').innerHTML = "ACTIVE PLAYER: BLACK"
    }
    else {
        activePlayer = 'white';
        document.getElementById('active_player').innerHTML = "ACTIVE PLAYER: WHITE"
    }
    
    //update Move List
    let ul = document.getElementById("move_list");
    let li = document.createElement("li");
    
    if (type === 'rook') {
        li.innerHTML = "R" + clicked;
    }
    else if (type === 'knight') {
        li.innerHTML = "N" + clicked;
    }
    else if (type === 'bishop') {
        li.innerHTML = "B" + clicked;
    }
    else if (type === 'queen') {
        li.innerHTML = "Q" + clicked;
    }
    else if (type === 'king') {
        li.innerHTML = "K" + clicked;
    }
    else {
        li.innerHTML = clicked;
    }
    ul.appendChild(li);

    //update board
    updatePieces();
}

//gets an unfiltered set of moves
var getMoves = (piece, pos) => {
    //Look at the indicated square
    let column = pos[0];
    let row = Number(pos[1]);
    let coord;
    let moves = [];

    //check current active player's piece list
    //if no piece is found, it's an invalid piece
    if (piece === undefined) {
        return moves;
    }
    
    //if a piece is found, return all possible moves
    else if (piece === 'pawn') {
        let c = columns.indexOf(column);
        if (activePlayer === 'white') {
            //only allow a pawn to move twice if it's on its starting square
            if (!checkOccupied(column.concat(row + 1), true)) {
                coord = column.concat(row + 1);
                moves.push(coord);
            }
            if (row === 2) {
                if (!checkOccupied(column.concat(row + 2), true)) {
                    coord = column.concat(row + 2);
                    moves.push(coord);
                }
            }

            //check upper left and upper right diagonals
            if (c > 0 && row < 8) {
                coord = columns[c-1].concat(row+1);
                if (checkOccupied(coord, true)) {
                    moves.push(coord);
                }
            }
            if (c < 7 && row < 8) {
                coord = columns[c+1].concat(row+1);
                if (checkOccupied(coord, true)) {
                    moves.push(coord);
                }
            }
        }
        else {
            //only allow a pawn to move twice if it's on its starting square
            if (!checkOccupied(column.concat(row - 1), true)) {
                coord = column.concat(row - 1);
                moves.push(coord);
            }
            if (row === 7) {
                if (!checkOccupied(column.concat(row - 2), true)) {
                    coord = column.concat(row - 2);
                    moves.push(coord);
                }
            }
            //check lower left and lower right diagonals
            if (c > 0 && row > 1) {
                coord = columns[c-1].concat(row-1);
                if (checkOccupied(coord, true)) {
                    moves.push(coord);
                }
            }
            if (c < 7 && row > 1) {
                coord = columns[c+1].concat(row-1);
                if (checkOccupied(coord, true)) {
                    moves.push(coord);
                }
            }
        }
    }

    else if (piece === 'rook') {
        //highlight along the columns
        for (let i = row+1; i < 9; i++) {
            coord = column.concat(i);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
        }
        for (let i = row-1; i > 1; i--) {
            coord = column.concat(i);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
        }
        //highlight along the row
        for (let i = columns.indexOf(column)+1; i < 8; i++) {
            coord = columns[i].concat(row);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
        }
        for (let i = columns.indexOf(column)-1; i > 0; i--) {
            coord = columns[i].concat(row);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
        }
    }

    else if (piece === 'knight') {
        let c = columns.indexOf(column);

        if (c < 6) {
            coord = columns[c+2];
            if (row < 8) {
                moves.push(coord.concat(row + 1));
            }
            if (row > 1) {
                moves.push(coord.concat(row - 1));
            }
        }
        if (c > 1) {
            coord = columns[c-2];
            if (row < 8) {
                moves.push(coord.concat(row + 1));
            }
            if (row > 1) {
                moves.push(coord.concat(row - 1));
            }
        }
        if (c < 7) {
            coord = columns[c+1];
            if (row < 7) {
                moves.push(coord.concat(row + 2));
            }
            if (row > 2) {
                moves.push(coord.concat(row - 2));
            }
        }
        if (c > 0) {
            coord = columns[c-1];
            if (row < 7) {
                moves.push(coord.concat(row + 2));
            }
            if (row > 2) {
                moves.push(coord.concat(row - 2));
            }
        }

        moves = moves.filter((move) => !checkOccupied(move));
    }

    else if (piece === 'bishop') {
        let c = columns.indexOf(column);
        //highlight along the diagonals
        //top left
        let i = c-1;
        let j = row + 1;
        while(i >= 0 && j <= 8) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
            i--;
            j++;
        }

        //top right
        i = c+1;
        j = row + 1;
        while(i <= 7 && j <= 8) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
            i++;
            j++;
        }

        //bottom left
        i = c-1;
        j = row - 1;
        while(i >= 0 && j >= 1) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
            i--;
            j--;
        }

        //bottom right
        i = c+1;
        j = row - 1;
        while(i <= 7 && j >= 1) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
            i++;
            j--;
        }
    }

    else if (piece === 'queen') {
        //highlight along the columns
        for (let i = row+1; i < 9; i++) {
            coord = column.concat(i);
            if (checkOccupied(coord)) {
                break;
            }
            moves.push(coord);
        }
        for (let i = row-1; i > 1; i--) {
            coord = column.concat(i);
            if (checkOccupied(coord)) {
                break;
            }
            moves.push(coord);
        }
        for (let i = columns.indexOf(column)+1; i < 8; i++) {
            coord = columns[i].concat(row);
            if (checkOccupied(coord)) {
                break;
            }
            moves.push(coord);
        }
        for (let i = columns.indexOf(column)-1; i > 0; i--) {
            coord = columns[i].concat(row);
            if (checkOccupied(coord)) {
                break;
            }
            moves.push(coord);
        }

        let c = columns.indexOf(column);
        //highlight along the diagonals
        //top left
        let i = c-1;
        let j = row + 1;
        while(i >= 0 && j <= 8) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
            i--;
            j++;
        }

        //top right
        i = c+1;
        j = row + 1;
        while(i <= 7 && j <= 8) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
            i++;
            j++;
        }

        //bottom left
        i = c-1;
        j = row - 1;
        while(i >= 0 && j >= 1) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
            i--;
            j--;
        }

        //bottom right
        i = c+1;
        j = row - 1;
        while(i <= 7 && j >= 1) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, activePlayer)) {
                break;
            }
            moves.push(coord);
            i++;
            j--;
        }
    }

    else if (piece === 'king') {
        let c = columns.indexOf(column);
        //check column
        if (row < 8) {
            coord = columns[c].concat(row + 1);
            moves.push(coord);
        }
        if (row > 1) {
            coord = columns[c].concat(row - 1);
            moves.push(coord);
        }

        //check row
        if (c > 0) {
            coord = columns[c-1].concat(row);
            moves.push(coord);
        }
        if (c < 7) {
            coord = columns[c+1].concat(row);
            moves.push(coord);
        }

        //check diagonals
        if (c > 0 && row < 8) {
            coord = columns[c-1].concat(row+1);
            moves.push(coord);
        }
        if (c < 7 && row < 8) {
            coord = columns[c+1].concat(row+1);
            moves.push(coord);
        }
        if (c > 0 && row > 1) {
            coord = columns[c-1].concat(row-1);
            moves.push(coord);
        }
        if (c < 7 && row > 1) {
            coord = columns[c+1].concat(row-1);
            moves.push(coord);
        }

        moves = moves.filter((move) => !checkOccupied(move));
    }

    console.log(moves);
    return moves;
}

var highlightMoves = ( moveArray ) => {
    //highlight the squares for the moves given
    for (var move in moveArray) {
        document.getElementById(moveArray[move]).classList.add('highlighted');
    }
}

window.onload = setUpBoard();