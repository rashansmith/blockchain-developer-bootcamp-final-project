// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import '@openzeppelin/contracts/utils/Address.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';


/// @title DodgerBoxGame Interface
/// @author Rashan Smith
/// @notice interface for DodgerBox main contracy
interface DodgerBoxGame {
  function createNewPlayer(uint256 score) external returns(bool);
  function getStatus() external view returns(string memory);
  function updateHighScore(uint256 score) external returns (bool) ;
  function getHighScore() external view returns(uint256);
}

/// @title A highscore keep for dodgerbox, a 2D game
/// @author Rashan Smith
/// @notice You can use this contract only with the 2d game defined in the front end folder
/// @dev The player's information is stored in a struct
contract DodgerBox is DodgerBoxGame, ReentrancyGuard {
  using Address for address;

  /// @notice A mapper to store all players and their high scores
  mapping (address => Player) internal highScores;

  /// @notice Owner of the contract
  address owner = msg.sender;

  /// @notice A struct that defines whether a user is an active player or new
  enum Status {
    New, Active
  }

  /// @notice The struct that contains the high score and status of the player
  struct Player {
    uint256 highScore;
    Status status;
  }

  /// @notice A modifier that checks to see if the score passed in is greater than the players current high score
  modifier checkHighScore(uint256 score) {
    require ((highScores[msg.sender].highScore < score), "This score is not higher than the current high score");
    _;
  }

  /// @notice Checks if a player's status is New or Active
  modifier udpateStatus(address _addr) {
    require ((highScores[msg.sender].status == Status.New || highScores[msg.sender].status == Status.Active), "Cannot Update Status");
    _;
  }

  /// @notice This creates a new player with the Player Struct
  function createNewPlayer(uint256 score) external returns(bool) {
    highScores[msg.sender] = Player({
      highScore: score,
      status: Status.New
    });
    return true;
  }

  /// @notice This gets the status of the current player, returns the status
  function getStatus() external view returns(string memory){
    if(highScores[msg.sender].status == Status.New) {
      return "New";
    } else {
      if(highScores[msg.sender].status == Status.Active) {
        return "Active";
      }
    }
  }

  /// @notice Updates the player's high score
  function updateHighScore(uint256 score) external udpateStatus(msg.sender) checkHighScore(score) returns(bool) {
    if(highScores[msg.sender].highScore == 0){
      highScores[msg.sender].status = Status.Active;
    }
    highScores[msg.sender].highScore = score;
    return true;
  }

  /// @notice Returns the player's high score
  function getHighScore() external view returns(uint256) {
    return highScores[msg.sender].highScore;
  }

}
