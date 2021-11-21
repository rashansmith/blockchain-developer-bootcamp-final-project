# blockchain-developer-bootcamp-final-project

## Final Project Overview
A Simple 2D Game that uses an Ethereum smart contract to maintain a directory of players and their high scores. 
Metamask transactions are required to update and retrieve the pplayer's high score

### Game Logic
To survive the game you must use your arrow keys (up, down, left, right) to toggle the shields on each side of your player. If you are hit by
an enemy, you lose a life, of which you have 3. You get a point for each enemy you block with your shield. 

## Deployment Instructions:
### 1. Initiate Local testnet
- ``` ganache-cli ```

### 2. Compile Contracts
- ``` truffle migrate --reset ```

### 3. Update local contract address
- In dapp.js, update line 4 with the contract address provided in the console after running truffle migrate

### 4. Run Tests
- ```truffle test```

### 5. Launch Front End
- ``` cd client ```
- ``` npm install ```
- ``` node server.js ```
- ``` navigate to localhost:3000 ```

### 6. Connect to MetaMask
- In the browser you will be asked to connect to MetaMask
- Use `Ropsten Test Network`


