class Game {
  constructor(firstPlayer) {
    this.boardData = new BoardData();
    this.currentPlayer = firstPlayer;
    this.winner = undefined
  }
  //attempts to move
  tryMove(piece, row, col) {
    const possibleMoves = this.getPossibleMoves(piece);

    for (const possibleMove of possibleMoves) {
      if (possibleMove[0] === row && possibleMove[1] === col) {
      
        const removedPiece = this.boardData.removePiece(row, col);     
        piece.col = col;
        piece.row = row;
        if(removedPiece !== undefined && removedPiece.type === KING){
        this.winner = piece.player;
      }
        this.currentPlayer = piece.getOpponent();
        return true;
      }
    }
    return false;
  }


  getPossibleMoves(piece) {
    if (this.currentPlayer !== piece.player || this.winner !== undefined) {
      return [];

    }
    return piece.getPossibleMoves(this.boardData)
  }
}