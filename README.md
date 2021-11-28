# blockchain-developer-bootcamp-final-project

## Final Project Overview
<<<<<<< HEAD
A 2D Game that uses an Ethereum smart contract to maintain a directory of players and their high scores. You are a square box at the center of the game. Your job is to use your arrow keys to shield yourself from the enemies!
=======
A Simple 2D Game that uses an Ethereum smart contract to maintain a directory of players and their high scores. 
Metamask transactions are required to update and retrieve the player's high score.

### Game Logic
Enemies are flying towards you from all directions. To survive the game you must use your arrow keys (up, down, left, right) to toggle the shields on each side of your player. If you are hit by an enemy, you lose a life, of which you have 3. You get a point for each enemy you block with your shield. 

### Main Game Screen
![Screen Shot 2021-11-21 at 6 00 49 PM](https://user-images.githubusercontent.com/6632748/142782520-01b60ed1-2ff1-4ff8-90dc-5ba17b6ae54c.png)


### In Game Screen 
<img width="793" alt="game_screen_shot" src="https://user-images.githubusercontent.com/6632748/142782572-f06fcf31-cfe0-4587-b8a1-356ae534d5af.png">

>>>>>>> 45430e3fd9d866a47e56c391749266249e7ee287

### Directory Structure
- ```build``` contains the contract ABI's in JSON format
- ```client``` contains the front-end code
- ```contracts``` contains the Solidity Smart Contracts
- ```migrations``` contains migration information
- ```test``` contains the truffle tests

### Project Hosted URL
- https://dodgerbox.netlify.app/ 


## Local Testing Instructions:
### 1. Initiate Local testnet
- ``` ganache-cli ```

### 2. Compile Contracts
- ``` truffle migrate --reset ```

### 3. Run Tests
- ```truffle test```
