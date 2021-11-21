// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DodgerBox {
  mapping (address => Player) internal highScores;

  enum Status {
    New, Active
  }

  struct Player {
    uint highScore;
    Status status;
  }

  modifier checkHighScore(uint score) {
    require ((highScores[msg.sender].highScore < score), "This score is not higher than the current high score");
    _;
  }

  modifier udpateStatus(address _addr) {
    require ((highScores[msg.sender].status == Status.New || highScores[msg.sender].status == Status.Active), "Cannot Update Status");
    _;
  }

  // modifier doesNotExist(address _addr) {
  //   require ((highScores[msg.sender]), "Cannot Update Status");
  //   _;
  // }

  function createNewPlayer() public returns(bool) {
    highScores[msg.sender] = Player({
      highScore: 0,
      status: Status.New
    });
    return true;
  }

  function getStatus()  public view returns(string memory){
    if(highScores[msg.sender].status == Status.New) {
      return "New";
    } else {
      if(highScores[msg.sender].status == Status.Active) {
        return "Active";
      }
    }
  }

  function updateHighScore(uint score) public udpateStatus(msg.sender) checkHighScore(score) returns(bool) {
    if(highScores[msg.sender].highScore == 0){
      highScores[msg.sender].status = Status.Active;
    }
    highScores[msg.sender].highScore = score;
    return true;
  }

  function getHighScore() public view returns(uint) {
    return highScores[msg.sender].highScore;
  }
    
}
