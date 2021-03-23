/** @module GameLoop */

// game loop
let last;
let timeDifference;

let player = new Player(1);
let player2 = new Player(2);
let playerList = [player,player2];


/**
 * Loop is a constant loop that continously runs while the game is played an updates the visuals on the screen. It views all cells on the board and draws any
 * existing walls, along with rendering players, bombs, and explosions in their current position. Also removes dead entities from the board.
 * @function
 * @param {timestamp} timestamp - Current timestamp.
 */
function loop(timestamp) {
  requestAnimationFrame(loop);
  context.clearRect(0,0,canvas.width,canvas.height);

  // calculate the time difference since the last update. requestAnimationFrame
  // passes the current timestamp as a parameter to the loop
  if (!last) {
    last = timestamp;
  }
  timeDifference = timestamp - last;
  last = timestamp;

  // update and render everything in the grid
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      switch(cells[row][col]) {
        case types.wall:
          context.drawImage(wallCanvas, col * grid, row * grid);
          break;
        case types.softWall:
          context.drawImage(softWallCanvas, col * grid, row * grid);
          break;
      }
    }
  }

  // update and render all entities
  entities.forEach((entity) => {
    entity.update(timeDifference);
    entity.render();
  });

  // remove dead entities
  entities = entities.filter((entity) => entity.alive);
  playerList.forEach((p) => {
    if (p.alive){
      p.render();
    }
  });
}