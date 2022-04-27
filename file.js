//global scoped vars
const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'dark';

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

const CHESS_BOARD_ID = "chess-board";
const PIECES = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK]
let game;
let table;
let selectedPiece;




function tryUpdateSelectedPiece(row, col) {
  // Clear all previous possible moves
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }

  // Show possible moves
  const piece = game.boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = game.getPossibleMoves(piece);
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add('possible-move');
    }
  }
// adds the "selected" class to a clicked cell
  table.rows[row].cells[col].classList.add('selected');
  selectedPiece = piece;
}

//addressing the image file individually
function addImage(cell, type, name) {
  const image = document.createElement('img');
  image.src = 'images/' + type + '/' + name + '.png';
  image.draggable = false;
  cell.appendChild(image);
}

//function that defines all "on click" interactions
function onCellClick(row, col) {
  if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
    selectedPiece = undefined;
    createChessBoard(game.boardData);
  } else {
    tryUpdateSelectedPiece(row, col);
  }
}



//function that creates the Chess Board 
function createChessBoard(boardData) {
  table = document.getElementById(CHESS_BOARD_ID);
  if (table != null) {
    table.remove();
  }
  
   

  // Create empty chess board HTML:
  table = document.createElement('table');
  table.id = CHESS_BOARD_ID;
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
      cell.addEventListener('click', () => onCellClick(row, col));

      //Game Restart Button
      const btn = document.getElementById('restartGame')
      btn.addEventListener("click", initGame)

      //when concede button has been clicked
      const concede = document.getElementById('concede')
      //concede.addEventListener("click" , winnerDiv())
      
     
    }
  }
  

  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
  //when king gets remoed
  if (game.winner !== undefined) {
    winnerDiv(game.winner.charAt(0).toUpperCase() + game.winner.slice(1))
  }
  
}

//popup div function  that tells who wins
function winnerDiv(winner){
  const winnerPopup = document.createElement('div');
  winnerPopup.textContent = winner + "player wins!";
  winnerPopup.classList.add('winner-dialog')
//deletes the turns p element value
  let turns = document.getElementById('turns')
    turns.innerHTML=""
  table.appendChild(winnerPopup)
}

function initGame() {
  game = new Game(WHITE_PLAYER);
  createChessBoard(game.boardData);
}







//DOM and load - Chess Board.
window.addEventListener("load", initGame);






