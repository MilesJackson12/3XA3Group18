/** @module Movement */

/**
 * A function used to move one of the players in the game. Also checks from collisions with walls and does not allow movement through walls.
 * @function
 * @param {int} playerID - ID of the player to be moved.
 * @param {String} dir - Direction to move the player.
 */
function movePlayer(PID, dir){
  if (PID == 1){
    P = player;
  } else if (PID == 2){
    P = player2;
  }

  let row = P.row;
  let col = P.col;

  if (dir == "left") {
    col--;
  }
  // up arrow key
  else if (dir == "up") {
    row--;
  }
  // right arrow key
  else if (dir == "right") {
    col++;
  }
  // down arrow key
  else if (dir == "down") {
    row++;
  }

  if (!cells[row][col]) {
    P.row = row;
    P.col = col;
  }
}