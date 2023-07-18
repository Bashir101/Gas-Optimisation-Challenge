const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Deploy Gas Challenge Contract", () => {
  let gasChallenge;

  beforeEach(async () => {
    const GasChallenge = await ethers.getContractFactory("gasChallenge");
    gasChallenge = await GasChallenge.deploy();
    await gasChallenge.deployed();
  });

  describe("Compute Gas", () => {
    it("Should return lower gas", async () => {
      const notOptimizedTx = await gasChallenge.notOptimizedFunction();
      const optimizedTx = await gasChallenge.optimizedFunction();

      const notOptimizedGas = (await notOptimizedTx.wait()).gasUsed;
      const optimizedGas = (await optimizedTx.wait()).gasUsed;

      console.log("Gas Consumption:");
      console.log("Not Optimized:", notOptimizedGas.toString());
      console.log("Optimized:", optimizedGas.toString());

      expect(optimizedGas).to.be.lessThan(notOptimizedGas);
    });
  });

  describe("Check Sum Of Array", () => {
    it("Should return 0", async () => {
      await gasChallenge.optimizedFunction();

      const sum = await gasChallenge.getSumOfArray();
      expect(sum).to.equal(0);
    });
  });
});
