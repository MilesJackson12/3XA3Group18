/** @module Client */

/**
 * Creates a new list item in the chat box and adds the text recieved server.
 * @constant
 * @param {String} text - Text to be sent into the chat box.
 */
 const writeEvent = (text) => {
    const parent = document.querySelector('#events')

    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);

};

/**
 * Takes a movement event from the server and calls a function to move the player.
 * @constant
 * @param {int} playerID - ID of the player to be moved.
 * @param {String} dir - Direction to move the player.
 */
const moveEvent = (signal) => {
    //movePlayers(dir,1);
    console.log(signal);
    tempArr = signal.split(",");
    sockID = tempArr[0]
    dir = signal.split(",")[1];
    PID = checkPlayer(sockID);
    console.log(PID);
    // console.log(sockID);
    if (PID == 1 || PID == 2){
        movePlayer(PID, dir);
    }
};

/**
 * Takes a place bomb event from the server and calls a function to place the bomb.
 * @constant
 * @param {int} playerID - ID of the player to be moved.
 */
const placeBombEvent = (sockID) => {
    
    PID = checkPlayer(sockID);
    console.log(PID);
    // console.log(sockID);
    if (PID == 1 || PID == 2){
        placeBomb(PID);
        console.log(PID + "Place the bomb");
    }
};

const addPlayerEvent = (sockID) => {
    addPlayer(sockID);
}

const sendPlayerInfo = (requestFrom) => {
    console.log("sock comparison " + sock.id + "  " + requestFrom);
    if (sock.id !== requestFrom){
        console.log("sent player info");
        tempArr = [P1, P2, waitList];
        sock.emit("playerList", tempArr);
    }
}

const updatePlayerList = (playerInfo) => {
    console.log("received player list");
    P1 = playerInfo[0];
    P2 = playerInfo[1];
    waitList = playerInfo[2];
}

const removePlayerEvent = (disconnectedSock) => {
    console.log("removed player event called");
    removePlayer(disconnectedSock);
}

const sendGameState = (requestFrom) => {
    if (sock.id !== requestFrom){
        tempArr = [cells, player, player2];
        sock.emit("updateGameState", tempArr);
        console.log("sent game state");
    }
}

const updateGameStateEvent = (gameState) => {
    console.log("Game State Updating");
    cells = gameState[0];
    player.copyPlayer(gameState[1]);
    player2.copyPlayer(gameState[2]);
    console.log("Game State Updated");
}

/**
 * Takes a generate new level event from the server and calls a function to generate the level.
 * @constant
 */
const generate = () => {
    generateLevel();
};

/**
 * Handles a from submition by sending the text in the input field to the server and clearing the input field.
 * @constant
 *
 */
const onFormSubmitted = (e) => {
    e.preventDefault();

    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);
};

/**
 * Listens for keypresses and if valid game key, sends the coresponding signal to the server.
 * @constant
 */
const keyPressListener = () => {
    ['up', 'down', 'left', 'right'].forEach((id) => {
        const button = document.getElementById(id);
        button.addEventListener('click', () => {
        //   sock.emit('message', id);
          sock.emit('movement', id);
        });
      });
};

const keyPressListener2 = () => {
    document.addEventListener('keydown', function(e) {
        // left arrow key
        if (e.which === 65) {
            // sock.emit('message', sock.id + "left");
            sock.emit('movement', sock.id + ",left");
        }
        // up arrow key
        else if (e.which === 87) {
            sock.emit('movement', sock.id + ",up");
        }
        // right arrow key
        else if (e.which === 68) {
            sock.emit('movement', sock.id + ",right");
        }
        // down arrow key
        else if (e.which === 83) {
            sock.emit('movement', sock.id + ",down");
        }
        // spacebar key
        else if (e.which === 32) {
            sock.emit('placeBomb', sock.id);
        }
        
    });
};



/**
 * Listens for the start game button to be pressed, and sends a signal to the server to generate the level.
 * @constant
 */
const generateListener = () => {

    const button = document.getElementById('generate');
    button.addEventListener('click', () => {
        sock.emit('message', id);
        sock.emit('generate');
    });
};

writeEvent("Welcome to RPS");

const sock = io();
sock.on('message', writeEvent);
sock.on('movement', moveEvent);
sock.on('generate', generateLevel);
sock.on('placeBomb', placeBombEvent);
sock.on('addPlayer', addPlayerEvent);
sock.on('requestPlayerList', sendPlayerInfo);
sock.on('playerList', updatePlayerList);
sock.on('removePlayer', removePlayerEvent);
sock.on('requestGameState', sendGameState);
sock.on('updateGameState', updateGameStateEvent);

document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);
keyPressListener();
keyPressListener2();