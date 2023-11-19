/* Course: SENG 513 */
/* Date: OCT 16, 2023 */
/* Assignment 1 */
/* Name: Arne Jarred Michael Hilao */
/* UCID: 30069573 */

//=================MOVE FUNCTIONS=================

//adjusts boardState based on given parameters
var makeMove = (original, clicked, type) => {
    
    boardMove(original, clicked, type, board);

    //swap activePlayer
    if (activePlayer === 'white') {
        activePlayer = 'black';
        inactivePlayer = 'white';
        document.getElementById('active_player').innerHTML = "ACTIVE PLAYER: BLACK"
    }
    else {
        activePlayer = 'white';
        inactivePlayer = 'black';
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

    //check for check
    if (checkState(board)) {
        //current king is in check
        document.getElementById(board[activePlayer].king).classList.add('check')

        //if in check, look for valid moves
        //if none are found, declare winner
    }
}

//updates a given board
var boardMove = (original, clicked, type, {white, black}) => {
    //add new item to clicked

    //remove clicked position from entire board
    if (activePlayer === 'white') {
        for (let p in white) {
            if (p !== 'king') {
                white[p] = white[p].filter((pos) => {
                    return pos !== clicked;
                })
                black[p] = black[p].filter((pos) => {
                    return pos !== clicked;
                })
            }
        }
    }
    else {
        for (let p in black) {
            if (p !== 'king') {
                black[p] = black[p].filter((pos) => {
                    return pos !== clicked;
                })
                black[p] = black[p].filter((pos) => {
                    return pos !== clicked;
                })
            }
        }
    }
    

    console.log('boardMove: ' + white);

    //place move piece
    if (activePlayer === 'white') {
        if (type === 'king') {
            console.log('moving king');
            white[type] = clicked;
        }
        else {
            white[type] = white[type].filter((pos) => {
                return pos !== original;
            })
            white[type].push(clicked);
        }
    }
    else {
        if (type === 'king') {
            black[type] = clicked;
        }
        else {
            black[type] = black[type].filter((pos) => {
                return pos !== original;
            })
            black[type].push(clicked);
        }
    }
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
            if (!checkOccupied(column.concat(row + 1), true, board)) {
                coord = column.concat(row + 1);
                moves.push(coord);
            }
            if (row === 2) {
                if (!checkOccupied(column.concat(row + 2), true, board)) {
                    coord = column.concat(row + 2);
                    moves.push(coord);
                }
            }

            //check upper left and upper right diagonals
            if (c > 0 && row < 8) {
                coord = columns[c-1].concat(row+1);
                if (checkOccupied(coord, true, board)) {
                    moves.push(coord);
                }
            }
            if (c < 7 && row < 8) {
                coord = columns[c+1].concat(row+1);
                if (checkOccupied(coord, true, board)) {
                    moves.push(coord);
                }
            }
        }
        else {
            //only allow a pawn to move twice if it's on its starting square
            if (!checkOccupied(column.concat(row - 1), true, board)) {
                coord = column.concat(row - 1);
                moves.push(coord);
            }
            if (row === 7) {
                if (!checkOccupied(column.concat(row - 2), true, board)) {
                    coord = column.concat(row - 2);
                    moves.push(coord);
                }
            }
            //check lower left and lower right diagonals
            if (c > 0 && row > 1) {
                coord = columns[c-1].concat(row-1);
                if (checkOccupied(coord, true, board)) {
                    moves.push(coord);
                }
            }
            if (c < 7 && row > 1) {
                coord = columns[c+1].concat(row-1);
                if (checkOccupied(coord, true, board)) {
                    moves.push(coord);
                }
            }
        }
    }

    else if (piece === 'rook') {
        //highlight along the columns
        for (let i = row+1; i < 9; i++) {
            coord = column.concat(i);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
        }
        for (let i = row-1; i >= 1; i--) {
            coord = column.concat(i);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
        }
        //highlight along the row
        for (let i = columns.indexOf(column)+1; i < 8; i++) {
            coord = columns[i].concat(row);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
        }
        for (let i = columns.indexOf(column)-1; i >= 0; i--) {
            coord = columns[i].concat(row);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
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

        moves = moves.filter((move) => !checkOccupied(move, false, board));
    }

    else if (piece === 'bishop') {
        let c = columns.indexOf(column);
        //highlight along the diagonals
        //top left
        let i = c-1;
        let j = row + 1;
        while(i >= 0 && j <= 8) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
            i--;
            j++;
        }

        //top right
        i = c+1;
        j = row + 1;
        while(i <= 7 && j <= 8) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
            i++;
            j++;
        }

        //bottom left
        i = c-1;
        j = row - 1;
        while(i >= 0 && j >= 1) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
            i--;
            j--;
        }

        //bottom right
        i = c+1;
        j = row - 1;
        while(i <= 7 && j >= 1) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
            i++;
            j--;
        }
    }

    else if (piece === 'queen') {
        //highlight along the columns
        for (let i = row+1; i < 9; i++) {
            coord = column.concat(i);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
        }
        for (let i = row-1; i > 1; i--) {
            coord = column.concat(i);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
        }
        for (let i = columns.indexOf(column)+1; i < 8; i++) {
            coord = columns[i].concat(row);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
        }
        for (let i = columns.indexOf(column)-1; i > 0; i--) {
            coord = columns[i].concat(row);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
        }

        let c = columns.indexOf(column);
        //highlight along the diagonals
        //top left
        let i = c-1;
        let j = row + 1;
        while(i >= 0 && j <= 8) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
            i--;
            j++;
        }

        //top right
        i = c+1;
        j = row + 1;
        while(i <= 7 && j <= 8) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
            i++;
            j++;
        }

        //bottom left
        i = c-1;
        j = row - 1;
        while(i >= 0 && j >= 1) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
            i--;
            j--;
        }

        //bottom right
        i = c+1;
        j = row - 1;
        while(i <= 7 && j >= 1) {
            coord = columns[i].concat(j);
            if (checkOccupied(coord, false, board)) {
                break;
            }
            moves.push(coord);
            if (checkOccupied(coord, true, board)) {
                break;
            }
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

        moves = moves.filter((move) => !checkOccupied(move, false, board));
        console.log(moves);
    }

    return moves;
}

var highlightMoves = ( moveArray ) => {
    //highlight the squares for the moves given
    for (var move in moveArray) {
        document.getElementById(moveArray[move]).classList.add('highlighted');
    }
}