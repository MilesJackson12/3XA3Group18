/** @module Collisions */

/**
 * A function to be called if 
 * @function
 * @param {Array<int>} cells - Current cells of the board.
 * @param {Array<Player>} playerList - list of players.
 */
 function collisions(row,col, playerList){
    playerList.forEach((p) => {
        if (p.row === row && p.col === col){
            p.killPlayer();
        }
    });
}