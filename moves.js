/* Course: SENG 513 */
/* Date: OCT 16, 2023 */
/* Assignment 1 */
/* Name: Arne Jarred Michael Hilao */
/* UCID: 30069573 */

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

    //check for checkmate
    checkState();
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