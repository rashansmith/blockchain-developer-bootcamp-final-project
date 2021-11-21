const DodgerBox = artifacts.require("DodgerBox");

contract("DodgerBox", function (accounts) {
  it("should assert true", async function () {
    await DodgerBox.deployed();
    return assert.isTrue(true);
  });

  describe("Functionality", () => {
    it("Should create a new Player", async() => {
      const dbInstance = await DodgerBox.deployed();
      await dbInstance.createNewPlayer({from: accounts[0]});
      const highScore = await dbInstance.getHighScore({from: accounts[0]});
      assert.equal(highScore, 0,  `${highScore} was no 0!`);
    });

    it("Should update the high score", async() => {
      const dbInstance = await DodgerBox.deployed();
      await dbInstance.createNewPlayer({from: accounts[0]});
      await dbInstance.updateHighScore(42, {from: accounts[0]});
      const updatedHighScore = await dbInstance.getHighScore({from: accounts[0]})
      assert.equal(updatedHighScore, 42,  `${updatedHighScore} was not updated to 42!`);
    });

    it("Should not update the high score", async() => {
      const dbInstance = await DodgerBox.deployed();
      await dbInstance.createNewPlayer({from: accounts[0]});
      await dbInstance.updateHighScore(50, {from: accounts[0]});
      try {
        await dbInstance.updateHighScore(30, {from: accounts[0]});
      } catch(err) {
        const highScore = await dbInstance.getHighScore({from: accounts[0]})
        assert.equal(highScore, 50, "This high score was not changed");
      }
    });

    it("Should get the correct high score", async() => {
      const dbInstance = await DodgerBox.deployed();
      await dbInstance.createNewPlayer({from: accounts[0]});
      await dbInstance.updateHighScore(60, {from: accounts[0]});
      try {
        await dbInstance.updateHighScore(60, {from: accounts[0]});
      } catch(err) {
        const highScore = await dbInstance.getHighScore({from: accounts[0]})
        assert.equal(highScore, 60, "The correct high score was not retrieved");
      }
    });

        
    it("Should not let someone else update their high score", async() => {
      const dbInstance = await DodgerBox.deployed();
      await dbInstance.createNewPlayer({from: accounts[0]});
      try {
        await dbInstance.updateHighScore(20, {from: accounts[0]});
        await dbInstance.updateHighScore(60, {from: accounts[1]});
      } catch(err) {
        const highScore = await dbInstance.getHighScore({from: accounts[0]})
        assert.equal(highScore, 20, "The high score was not changed by other account");
      }
    });

    it("Should create a player and set their score to 0 and their status to New", async() => {
      const dbInstance = await DodgerBox.deployed();
      await dbInstance.createNewPlayer({from: accounts[0]});
      try {
      } catch(err) {
        const score = await dbInstance.getHighScore({from: accounts[0]})
        const status = await dbInstance.getStatus({from: accounts[0]})
        assert.equal(score, 0, "The initial high score was set properly");
        assert.equal(status, "New", "The initial status was set properly");
      }
    });

    it("Should update player's status to Active once their high score has been changed", async() => {
      const dbInstance = await DodgerBox.deployed();
      await dbInstance.createNewPlayer({from: accounts[0]});
      try {
      } catch(err) {
        const high_score = await dbInstance.updateHighScore(60, {from: accounts[1]});
        const status = await dbInstance.getStatus({from: accounts[0]})
        assert.equal(high_score, 60, "The high score was updated");
        assert.equal(status, "Active", "The player's status was udpated");
      }
    });
  })
});

