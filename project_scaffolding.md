### File to plan out Solidity Architecture for project

#### Project Overview: Simple 2d Game that uses a smart contract to:
- create and store users
- store their highest scores

// Data structure to hold information on player, for now it will hold 2 values but more will be added in the future ;) 
struct player {
    address: _addr,
    high_score: 0    
}

modifier checkIfUserDoesNotExists(address _addr) {
    // require that in order to add a user, they must not exist in the map already
    _
}

modifier checkIfUserExists(address _addr) {
    // require that in order to update a user's high score, they must exist in the map already
    _
}

modifier checkHighScore(uint score) {
    // require that the new score is higher than the user's current high score
    _
}

function addUser() checkIfUserDoesNotExist(msg.sender) {
    // adds a user to the user map by using msg.sender
}

function updateHighScore(uint score) checkIfUserExists(msg.sender) checkHighScore(score) {
    // updates msg.sender's highest score in map
}


