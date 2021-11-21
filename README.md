# blockchain-developer-bootcamp-final-project

## Final Project Overview
A Simple 2D Game that uses an Ethereum smart contract to maintain a directory of players and their high scores

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
- ``` node server.js ```

### 6. Connect to MetaMask
- In the ganache-cli copy a private key from an account and use to import an account into MetaMask


