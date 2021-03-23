/**
 * Represents the Bombs.
 */
class Bomb {
  /** 
   * @constructor
   * @param {int} row - The row of the bomb being dropped
   * @param {int} col - The column of the bomb being dropped
   * @param {int} size - The size of the bomb being dropped
   * @param {Player} ownerID - The ID of tje player that drops the bomb 
   */
  constructor(owner){
    this.owner = owner;
    this.row = owner.row;
    this.col = owner.col;
    this.radius = grid * 0.4;
    this.size = owner.bombSize;    // the size of the explosion
    this.ownerID = owner.id;  // which player placed this bomb
    this.alive = true;
    this.type = types.bomb
    this.timer = 3000;
  }
  /**
   * Visually draws the bomb on the board
   */
  render(){
    const x = (this.col + 0.5) * grid;
    const y = (this.row + 0.5) * grid;

    // draw bomb
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(x, y, this.radius, 0, 2 * Math.PI);
    context.fill();

    // draw bomb fuse moving up and down with the bomb size
    const fuseY = (this.radius === grid * 0.5 ? grid * 0.15 : 0);
    context.strokeStyle = 'white';
    context.lineWidth = 5;
    context.beginPath();
    context.arc(
      (this.col + 0.75) * grid,
      (this.row + 0.25) * grid - fuseY,
      10, Math.PI, -Math.PI / 2
    );
    context.stroke();
  }

  /**
   * Updates the bomb in each frame
   * @param {timestamp} timeDifference - difference between current and last timestamp.
   */
  update(timeDifference){
    this.timer -= timeDifference;

    // blow up bomb if timer is done
    if (this.timer <= 0) {
      this.owner.bombExploded();
      return this.blowUpBomb(this);
    }

    // change the size of the bomb every half second. we can determine the size
    // by dividing by 500 (half a second) and taking the ceiling of the result.
    // then we can check if the result is even or odd and change the size
    const interval = Math.ceil(this.timer / 500);
    if (interval % 2 === 0) {
      this.radius = grid * 0.4;
    }
    else {
      this.radius = grid * 0.5;
    }
  }
  /**
   * Blows up a bomb and it's surrounding tiles.
   * @param {Bomb} bomb - bomb object 
   */
  blowUpBomb(bomb){
    
    // bomb has already exploded so don't blow up again
    if (!bomb.alive) return;
  
    bomb.alive = false;
  
    // remove bomb from grid
    cells[bomb.row][bomb.col] = null;
  
    // explode bomb outward by size
    const dirs = [{
      // up
      row: -1,
      col: 0
    }, {
      // down
      row: 1,
      col: 0
    }, {
      // left
      row: 0,
      col: -1
    }, {
      // right
      row: 0,
      col: 1
    }];
    dirs.forEach((dir) => {
      for (let i = 0; i < bomb.size; i++) {
        const row = bomb.row + dir.row * i;
        const col = bomb.col + dir.col * i;
        const cell = cells[row][col];
  
        // stop the explosion if it hit a wall
        if (cell === types.wall) {
          return;
        }
  
        // center of the explosion is the first iteration of the loop
        entities.push(new Explosion(row, col, dir, i === 0 ? true : false));
        collisions(row, col, playerList);
        cells[row][col] = null;
  
        // // bomb hit another bomb so blow that one up too
        // if (cell === types.bomb) {
  
        //   // find the bomb that was hit by comparing positions
        //   const nextBomb = entities.find((entity) => {
        //     return (
        //       entity.type === types.bomb &&
        //       entity.row === row && entity.col === col
        //     );
        //   });
        //   blowUpBomb(nextBomb);
        // }
  
        // stop the explosion if hit anything
        if (cell) {
          return;
        }
      }
    });
  }
  
}
  