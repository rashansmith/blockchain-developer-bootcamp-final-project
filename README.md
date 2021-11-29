# blockchain-developer-bootcamp-final-project

## Final Project Overview
DodgerBox: A 2D Game that uses an Ethereum smart contract to maintain a directory of players and their high scores. You are a square box at the center of the game. Your job is to use your arrow keys to shield yourself from the enemies! Metamask transactions are required to update and retrieve the player's high score.

### Game Logic
Enemies are flying towards you from all directions. To survive the game you must use your arrow keys (up, down, left, right) to toggle the shields on each side of your player. If you are hit by an enemy, you lose a life, of which you have 3. You get a point for each enemy you block with your shield. 

### Directory Structure
- ```build``` contains the contract ABI's in JSON format
- ```client``` contains the front-end code
- ```contracts``` contains the Solidity Smart Contracts
- ```migrations``` contains migration information
- ```test``` contains the truffle tests

### Screencast Demo:
- https://youtu.be/Wcn3ecPMgxs


### Project Hosted URL - Running on Ethereum Ropsten Testnet
- https://dodgerbox.netlify.app/ 
- You will need a test account in Metamask on the Ropsten Network

## Local Testing Instructions:
### 1. Initiate Local testnet
- ``` ganache-cli ```

### 2. Compile Contracts
- ``` truffle migrate --reset ```

### 3. Run Tests
- ```truffle test```

### 4. Run front end on local server (optional)
- You will need a test account in Metamask on the Ropsten Network
- ```cd client```
- ```npm install```
- ```node server.js```
- navigate to localhost:3000
