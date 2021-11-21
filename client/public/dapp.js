
/***************** Blockchain Web3 things  ******************/
// Contract address on Local Testnet, received after running `truffle migrate --reset` 
const dodgerBoxAddress = '0x0B6f5497fe1fFA6B1a6475B3776fAF72cEc7a8c4'

// ABI Variable
let dodgerBoxABI
let currentScore
let highScore
let web3

// Contract ABI from Remix
const abi = [
	{
		"inputs": [],
		"name": "createNewPlayer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHighScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStatus",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			}
		],
		"name": "updateHighScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
// 1. Detect Web3
window.addEventListener('load', function() {
    if(typeof window.ethereum !== 'undefined') {
        console.log('Metamask detected!')
        //let mmDetected = document.getElementById('mm-detected')
        let mmDetected = document.getElementById("mm-connect")
        mmDetected.innerHTML = "Connected to Metamask"
        mmDetected.className = "btn btn-success"
    }
    else {
        console.log('There is not wallet available!')
        this.alert("You need to install MetaMask!")
    }
})

// 2. Connect to MetaMask
const mmEnable = document.getElementById('mm-connect')
// async - send it off and wait for something to come back
mmEnable.onclick = async () => {
    await ethereum.request({method: 
    'eth_requestAccounts'})

    // In the browser console, type ethereum. to see the list of options
    const mmCurrentAccount = document.getElementById('mm-current-account')
}

// 3. Update The high score in the contract, creating a new player if it doesnt exist yet in the contract as well
async function updateHighScore(some_score) {
    console.log(some_score)
    web3 = new Web3(window.ethereum)
    const dodgerBox = new web3.eth.Contract(abi, '0x0f54Aa4De31a83668ED2dd814675E2D2a03E6f50')
    const lScore =  await dodgerBox.methods.getHighScore().call({from: ethereum.selectedAddress})
    if(lScore == 0) {
        dodgerBox.methods.createNewPlayer().send({from: ethereum.selectedAddress}).then(function(result) {
            return result
        }).catch(function(err) {
            console.log("There was an issue creating a new player");
        })
    }
    if(some_score > lScore) {
        await dodgerBox.methods.updateHighScore(some_score).send({from: ethereum.selectedAddress})
        .then(function(result){
            console.log("The new high score is: " + result)
        }).catch(function(err) {
            console.log("The high score could not be updated")
        })  
    }
    var new_high_score = await dodgerBox.methods.getHighScore().call({from: ethereum.selectedAddress});
    return new_high_score;
}


// 4. Get high score for current User
async function getHighScore() {
    web3 = new Web3(window.ethereum)
    const dodgerBox = new web3.eth.Contract(abi, '0x0f54Aa4De31a83668ED2dd814675E2D2a03E6f50')
    const lScore =  await dodgerBox.methods.getHighScore().call({from: ethereum.selectedAddress})
    return lScore
}

/************************** GAME LOGIC - PHASER.JS ******************/

// Config
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    parent: 'dodger-game',
    backgroundColor: '#CDD6DD',
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Initiate new game
var game = new Phaser.Game(config);

// Variables to be used throughout the game
var player; 
var cursors;
var grey_box_enemy;
var red_box_enemy;
var triangle_enemy;
var shield;
var top_shield;
var left_shield;
var right_shield;
var bottom_shield;
var shield_upright;
var play_button;
var instructions_button;
var end_game;
var randomNumber;
var lives = 3;
var gameOver = false;
var spawn;
var points;
var life_1;
var life_2;
var life_3;
var timed_event;
var startGame;
var endGame;
var score = 0;
var scoreText;
var high_score;
var high_score_text;

// Preload Game Assets
function preload() {
    this.load.image('play_button', './assets/play_button.png');
    this.load.image('instructions_button', './assets/instructions_button.png');
    this.load.image('end_game', './assets/end_game.png');
    this.load.image('life', './assets/life.png');
    this.load.image('player', './assets/main_player.png');
    this.load.image('shield', './assets/shield.png');
    this.load.image('shield_upright', './assets/shield_upright.png');
    this.load.image('enemy_grey_box', './assets/enemy_player_1.png');
    this.load.image('enemy_red_box', './assets/enemy_player_2.png');
    this.load.image('enemy_triangle', './assets/enemy_player_3.png');
}

// Create assets and add neccesary assets to game canvas
function create() { 
    // Life points in upper left corner
    life_1 = this.add.image(30, 25, 'life');
    life_2 = this.add.image(60, 25, 'life');
    life_3 = this.add.image(90, 25, 'life');

    // Play and Instruction Buttons, Game Over button
    end_game = this.add.image(400, 330, 'end_game');
    end_game.visible = false;
    play_button = this.add.image(400, 400, 'play_button');
    play_button.setInteractive();
    play_button.on('pointerdown', () => {
        score = 0;
        play_button.visible = false;
        end_game.visible = false;
        player.disableBody();
        left_shield.disableBody()
        right_shield.disableBody()
        top_shield.enableBody()
        bottom_shield.disableBody()
        high_score_text.visible = false;
        startGame();
    });

    // Display and set initial game score
    scoreText = this.add.text(680, 20, 'Score: 0', { fontSize: '20px', fill: '#000' });

    // Display overall high score
    high_score_text = this.add.text(170, 180, 'High Score: 0', { fontSize: '40px', fill: '#000' });
    getHighScore().then(function(result) {
        high_score_text.visible = true;
        high_score_text.setText("Your High Score: " + result)
    });


    // TODO: Add Instructions
    // instructions_button = this.add.image(500, 400, 'instructions_button');
    // instructions_button.visible = false;

    // Player
    player = this.physics.add.sprite(400, 250, 'player');
    player.setCollideWorldBounds(true);

    // Enemies and Shield
    red_box_enemy = this.physics.add.sprite(330, 400, 'enemy_red_box');
    red_box_enemy.visible = false;
    red_box_enemy.setCollideWorldBounds(true);

    top_shield = this.physics.add.sprite(400, 230, 'shield');
    top_shield.setCollideWorldBounds(true);
    top_shield.visible = false;
    top_shield.body.enable = false;

    left_shield = this.physics.add.sprite(380, 250, 'shield_upright');
    left_shield.setCollideWorldBounds(true);
    left_shield.visible = false;
    left_shield.disableBody();
    
    right_shield = this.physics.add.sprite(420, 250, 'shield_upright');
    right_shield.setCollideWorldBounds(true);
    right_shield.visible = false;
    right_shield.disableBody();

    bottom_shield = this.physics.add.sprite(400, 270, 'shield');
    bottom_shield.setCollideWorldBounds(true);
    bottom_shield.visible = false;
    bottom_shield.disableBody();

    // Colliders - so that sprites don't run over/through each other
    this.physics.add.overlap(player, red_box_enemy, playerHit, null, this);
    this.physics.add.overlap(red_box_enemy, left_shield, destroyEnemy, null, this);
    this.physics.add.overlap(red_box_enemy, right_shield, destroyEnemy, null, this);
    this.physics.add.overlap(red_box_enemy, top_shield, destroyEnemy, null, this);
    this.physics.add.overlap(red_box_enemy, bottom_shield, destroyEnemy, null, this);

    var randomSpeed1 = Phaser.Math.RND.integerInRange(50,150);
    var randomSpeed2 = Phaser.Math.RND.integerInRange(-50,-150);

    // Spawning the enemy from different directions
    // TODO: Randomize spawn timing better
    // TODO: Remove remianing enemies from game board once game is over
    spawn = (enemyName, x, y, velocity, direction, shield) => {
        var enemyPlayer = this.physics.add.sprite(x, y, enemyName);
        this.physics.add.overlap(player, enemyPlayer, playerHit, null, this);
        this.physics.add.overlap(enemyPlayer, shield, destroyEnemy, null, this);
        enemyPlayer.setCollideWorldBounds(true);
        enemyPlayer.enableBody();
        enemyPlayer.visible = true;
        if( direction == "X") { enemyPlayer.setVelocityX(velocity);}
        else if (direction == "Y") {enemyPlayer.setVelocityY(velocity);}
    }

    // Start the game and spawn enemies
    startGame = () => {
        timed_event = this.time.addEvent({
            delay: 5000,
            callback: function() {
                if(lives > 0) {
                    spawn('enemy_red_box', 150, 250, 100, "X", left_shield);
                    spawn('enemy_red_box', 600, 250, -150, "X", right_shield);
                    spawn('enemy_red_box', 400, 100, 40, "Y", top_shield);
                    spawn('enemy_red_box', 400, 400, -20, "Y", bottom_shield);
                }
            },
            callbackScope: this,
            loop: true
          });
    }
}

// Update - make changes during the game
function update() {
    // Main Player Keyboard Controls
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
       left_shield.enableBody();
       left_shield.visible = true;
       right_shield.disableBody();
       right_shield.visible = false;
       bottom_shield.disableBody();
       bottom_shield.visible = false;
       top_shield.disableBody();
       top_shield.visible = false;
    }
    else if (cursors.right.isDown) { 
        left_shield.disableBody();
        left_shield.visible = false;
        right_shield.enableBody();
        right_shield.visible = true;
        bottom_shield.disableBody();
        bottom_shield.visible = false;
        top_shield.disableBody();
        top_shield.visible = false;
    }
    if (cursors.up.isDown){
        left_shield.disableBody();
        left_shield.visible = false;
        right_shield.disableBody();
        right_shield.visible = false;
        bottom_shield.disableBody();
        bottom_shield.visible = false;
        top_shield.enableBody();
        top_shield.visible = true;
    }
    else if (cursors.down.isDown){
        left_shield.disableBody();
        left_shield.visible = false;
        right_shield.disableBody();
        right_shield.visible = false;
        bottom_shield.enableBody();
        bottom_shield.visible = true;
        top_shield.disableBody();
        top_shield.visible = false;
    }
}

function destroyEnemy(red_box_enemy, shield) {
    red_box_enemy.disableBody();
    red_box_enemy.visible = false;
    console.log("got one!");
    score = score + 1;
    scoreText.setText('Score: ' + score);
}

// When the game ends, call the contract to update the high score as needed
function playerHit(player, red_box_enemy) {
    red_box_enemy.disableBody(true, true);
    lives = lives - 1;
    if (lives == 2) {
        life_3.visible = false;
    }
    else if (lives == 1) {
        life_2.visible = false;
    }
    else if(lives <= 0) {
        life_1.visible = false;
        console.log("Game Over!");
        currentScore = score;
        end_game.visible = true;
        play_button.visible = true;
        timed_event.remove(true);
        player.disableBody();
        left_shield.disableBody();
        right_shield.disableBody();
        top_shield.disableBody();
        bottom_shield.disableBody();
        var s = score
        updateHighScore(s).then(function(result) {
            high_score_text.visible = true;
            high_score_text.setText("Your High Score: " + result)
        });
        // getHighScore().then(function(result) {
        //     high_score_text.visible = true;
        //     high_score_text.setText("High Score: " + result)
        // });
    }
}