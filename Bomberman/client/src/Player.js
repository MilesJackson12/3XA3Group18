/**
 * Represents a Player.
 */
class Player {
  /**
  * Constructor of Player object.
  * @constructs
  * @param {int} id - The id of the player.
  */
  constructor(id) 
  { 
    this.id = id;
    this.shield = false;
    if (id == 1){ this.row = 1; this.col = 1; }
    else if (id == 2){ this.row = 1; this.col = 13; }
    this.numBombs = 0;
    this.bombSize = 3;
    this.alive = true;
    this.radius = grid * 0.35;
    this.bombLimit = 1;
    // this.powerType = type;
  }
  /**
  * Visually draws the player on the board.
  */
  render(){
    const x = (this.col + 0.5) * grid;
    const y = (this.row + 0.5) * grid;
  
    context.save();
    if (this.id == 1){ context.fillStyle = 'white'; }
    else if (this.id == 2){ context.fillStyle = 'red'; }
    context.beginPath();
    context.arc(x, y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }

  /**
  * Set the number of bombs a player can place at the same time.
  * @param {int} num - The new number of bombs the player can place.
  */
  setNumBombs(num){
    this.numBombs = num;
  }
  /**
  * Set the radius of explosions produced by player's bombs.
  * @param {int} size - The new size of explosion.
  */
  setBombSize(size){
    this.bombSize = size;
  }

  placedBomb() {
    this.numBombs = this.numBombs + 1;
  }

  bombExploded() {
    this.numBombs = this.numBombs - 1;
  }

  killPlayer() {
    this.alive = false;
  }

  copyPlayer(player){
    this.row = player.row;
    this.col = player.col;
    this.bombSize = player.bombSize;
    this.numBombs = player.numBombs;
    this.alive = player.alive;
    this.bombLimit = player.bombLimit;
  }
}