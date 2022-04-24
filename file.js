const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'dark';

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

let selectedCell;
let boardData;
let table;

class Piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }

    getOpponent(){
        if (this.player === WHITE_PLAYER){
            return BLACK_PLAYER;
        }
        return WHITE_PLAYER;
    }
    
    getPossibleMoves(boardData) {
        let moves;
        if (this.type === PAWN) {
            moves = this.getPawnMoves(boardData);
        } else if (this.type === ROOK) {
            moves = this.getRookMoves(boardData);
        } else if (this.type === KNIGHT) {
            moves = this.getKnightMoves(boardData);
        } else if (this.type === BISHOP) {
            moves = this.getBishopMoves(boardData);
        } else if (this.type === KING) {
            moves = this.getKingMoves(boardData);
        } else if (this.type === QUEEN) {
            moves = this.getQueenMoves(boardData);
        } else {
            console.log("Unknown type", type)
        }
        console.log('Moves', moves);

       //let absoluteMoves = [];
       //for (let relativeMove of relativeMoves) {
        // const absoluteRow = this.row + relativeMove[0];
        // const absoluteCol = this.col + relativeMove[1];
        //  absoluteMoves.push([absoluteRow, absoluteCol]);
        // }
        let filteredMoves = [];
        for (let absoluteMove of moves) {
            const absoluteRow = absoluteMove[0];
            const absoluteCol = absoluteMove[1];
            if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
                filteredMoves.push(absoluteMove);
            }
        }
        console.log('filteredMoves', filteredMoves);
        return filteredMoves;
    }

    getMovesInDirection(directionRow, directionCol, boardData){
        let result= [];
        for(let i= 1; i<BOARD_SIZE; i++){
            let row = this.row + directionRow * i;
            let col = this.col + directionCol * i;
            if(boardData.isEmpty(row, col)) {
                result.push([row, col]);
            }else if (boardData.isPlayer(row, col, this.getOpponent())){
                result.push([row, col]);
                return result;
            }else if (boardData.isPlayer(row, col, this.player)){
                return result;
            }
        }
        return result;
    }

    getPawnMoves(boardData) {
     let result= [];
     let direction = 1; 
     if (this.player === BLACK_PLAYER) {
    direction = -1;
    }
    let position = [this.row + direction, this.col];
    if(boardData.isEmpty(position[0], position[1])) {
        result.push(position)
    }
    position = [[this.row + direction, this.col - direction]];
    if(boardData.isPlayer(position[0], position[1], this.getOpponent())){
    result.push(position)
    }
    position = [[this.row + direction, this.col - direction]];
    if(boardData.isPlayer(position[0], position[1], this.getOpponent())){
    result.push(position)
    }
    return result;
    }

    getRookMoves(boardData) {
        let result = [];
        result = result.concat(this.getMovesInDirection(-1, 0, boardData));
        result = result.concat(this.getMovesInDirection(1, 0, boardData));
        result = result.concat(this.getMovesInDirection(0, -1, boardData));
        result = result.concat(this.getMovesInDirection(0, 1, boardData));
        return result;
    }

    

    getKnightMoves(boardData) {
        let result = [];
       const relativeMoves = [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [1,-2], [-1,2], [-1,-2]];
       for( let relativeMove of relativeMoves){
           let row = this.row + relativeMove[0];
           let col = this.col + relativeMove[1];
           if (!boardData.isPlayer(row, col, this.player)){
               result.push([row, col]);
           }
       }
        return result;
    }
    
    getBishopMoves(boardData) {
        let result = [];
        result = result.concat(this.getMovesInDirection(-1, 1, boardData));
        result = result.concat(this.getMovesInDirection(1, 1, boardData));
        result = result.concat(this.getMovesInDirection(-1, -1, boardData));
        result = result.concat(this.getMovesInDirection(1, -1, boardData));
        return result; 
    }
    
    getKingMoves(boardData) {
        let result = [];
       const relativeMoves = [[-1,-1], [-1,0], [-1,1], [0,1], [0,1], [1,-1], [1,0], [1,1]];
       for( let relativeMove of relativeMoves){
           let row = this.row + relativeMove[0];
           let col = this.col + relativeMove[1];
           if (!boardData.isPlayer(row, col, this.player)){
               result.push([row, col]);
           }
       }
        return result;
    }

    getQueenMoves(boardData) {
        let result = this.getBishopMoves(boardData);
        result = result.concat(this.getRookMoves(boardData));
        return result;
    }
}


class BoardData {
    constructor(pieces) {
        this.pieces = pieces;
    }

    // Returns piece in row, col, or undefined if not exists.
    getPiece(row, col) {
        for (const piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece;
            }
        }
    }

    isEmpty(row, col){
        
        return this.getPiece(row, col) === undefined;
        
    }

    isPlayer(row, col, player){
        const piece = this.getPiece(row, col);
        return piece !== undefined && piece.player === player;
    }
}


function getInitialPieces() {
    let result = [];

   addFirstRowPieces(result, 0, WHITE_PLAYER);
    addFirstRowPieces(result, 7, BLACK_PLAYER);

    for (let i = 0; i < BOARD_SIZE; i++) {
     //   result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
         result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
    }
    return result;
}

function addFirstRowPieces(result, row, player) {
    result.push(new Piece(row, 0, ROOK, player));
    result.push(new Piece(row, 1, KNIGHT, player));
    result.push(new Piece(row, 2, BISHOP, player));
    result.push(new Piece(row, 3, KING, player));
    result.push(new Piece(row, 4, QUEEN, player));
    result.push(new Piece(row, 5, BISHOP, player));
    result.push(new Piece(row, 6, KNIGHT, player));
    result.push(new Piece(row, 7, ROOK, player));
}

//addressing the image file individually
function addImage(cell, type, name) {
    const image = document.createElement('img');
    image.src = 'images/' + type + '/' + name + '.png';
    cell.appendChild(image);
}

function onCellClick(event, row, col) {
    // Clear all previous possible moves
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove('possible-move');
        }
    }

    const piece = boardData.getPiece(row, col);
    if (piece !== undefined) {
        let possibleMoves = piece.getPossibleMoves(boardData);
        for (let possibleMove of possibleMoves) {
            const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
            cell.classList.add('possible-move');
        }
    }

    if (selectedCell !== undefined) {
        selectedCell.classList.remove('selected');
    }
    // Show selected cell
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
}

//function that creates the Chess Board 
function createChessBoard() {
    // Create empty chess board HTML:
    table = document.createElement('table');
    document.body.appendChild(table);
    for (let row = 0; row < BOARD_SIZE; row++) {
        const rowElement = table.insertRow();
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = rowElement.insertCell();

            //function to declare each cell's id 1-8 a-h
            function nextChar(c) {
                return String.fromCharCode(c.charCodeAt(0) + col);
            }
            let idshow = cell.id = (8 - row) + nextChar('a');
            //var that shows the id of a cell inside it as text
            const idInnerText = document.getElementById(idshow).innerText = idshow;
            if ((row + col) % 2 === 0) {
                cell.className = 'light-cell';
            } else {
                cell.className = 'dark-cell';
            }
            cell.addEventListener('click', (event) => onCellClick(event, row, col));
        }
    }

    // Create list of pieces (32 total)
    boardData = new BoardData(getInitialPieces());
    // pieces = getInitialPieces();

    // Add pieces images to board
    for (let piece of boardData.pieces) {
        const cell = table.rows[piece.row].cells[piece.col];
        addImage(cell, piece.player, piece.type);
    }
}


//DOM and load - Chess Board
window.addEventListener("load", createChessBoard);