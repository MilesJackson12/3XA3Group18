/** @module PlaceBomb */
  /**
  * Creates the bomb object and places it in the current location of the player.
  * @function
  */
  function placeBomb(PID){
    console.log("placeBomb called");
    if (PID == 1){
      P = player;
    } else if (PID == 2){
      P = player2;
    }
    if (!cells[P.row][P.col] && P.numBombs < P.bombLimit){
      // place bomb
      
      const bomb = new Bomb(P);
      entities.push(bomb);
      cells[P.row][P.col] = types.bomb;
      P.placedBomb();
    }
}