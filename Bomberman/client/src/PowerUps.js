/**
 * Represents a PowerUp.
 */
class PowerUP {
    /**
    * Constructor of PowerUp object.
    * @constructs
    * @param {int} id - The id of the player.
    */
    constructor(type){
        this.type = type;
    }

    /**
    * Increase number of bombs the player can place by 1.
    * @param {int} id - The id of the player aquiring the power up.
    */
    increaseNumOfBombs(playerId){

    }

    /**
    * Increase radius of bombs droped by the player by 1.
    * @param {int} id - The id of the player aquiring the power up.
    */
    enlargeBomb(playerId){

    }
    /**
    * Add shield to player allowing 1 extra collision with explosion before dying.
    * @param {int} id - The id of the player aquiring the power up.
    */
    shield(playerId){
        
    }

}