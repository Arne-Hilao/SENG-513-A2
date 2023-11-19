/* Course: SENG 513 */
/* Date: OCT 16, 2023 */
/* Assignment 1 */
/* Name: Arne Jarred Michael Hilao */
/* UCID: 30069573 */

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

    //reset move list
    document.getElementById('move_list').innerHTML = "";

    //reset active player to white
    document.getElementById('active_player').innerHTML = "ACTIVE PLAYER: WHITE"

    updateScore();
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

var swapPlayers = () => {
    let p1 = document.getElementById('player1');
    let p2 = document.getElementById('player2');

    let t1 = p1.innerHTML;

    p1.innerHTML = p2.innerHTML;
    p2.innerHTML = t1;
}

var checkOccupied = (coord, opposing, gameBoard) => {
    //checks the board and returns true if the coordinate given has a piece on it
    let found = false;
    for (const piece in gameBoard[activePlayer]) {
        let arr = gameBoard[activePlayer][piece];
        if (piece !== 'king') {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === coord) {
                    found = true;
                    break;
                }
            }
        }
        else {
            if (arr === coord) {
                found = true;
            }
        }
        if (found) {
            break;
        }
    }
    if (opposing) {
        //check non activePlayer board as well
        for (const piece in gameBoard[inactivePlayer]) {
            let arr = gameBoard[inactivePlayer][piece];
            if (piece !== 'king') {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === coord) {
                        found = true;
                        break;
                    }
                }
            }
            else {
                if (arr === coord) {
                    found = true;
                }
            }
            if (found) {
                break;
            }
        }
    }
    return found;
}