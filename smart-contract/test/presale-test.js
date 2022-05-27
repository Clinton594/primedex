const { expect } = require("expect");
const Token = artifacts.require("TestToken");
const Presale = artifacts.require("Presale");

contract("Testing Two Contracts", (accounts) => {
  describe("TestToken Block", () => {
    let token, presale;
    beforeEach(async () => {
      token = await Token.new("TestToken", "TTk", 100000000);
      presale = await Presale.new(10000, accounts[0], token.address);
    });

    it("Should have 3000 piceces", async () => {
      const totalSupply = await token.totalSupply();
      expect(totalSupply.toString()).toBe("100000000");
    });

    it("Rate should be 10000", async () => {
      const rate = await presale.getTokenRate();
      expect(rate.toString()).toBe("10000");
    });

    it("Presale is paused", async () => {
      const presaleStatus = await presale.getStatus();
      expect(presaleStatus).toBe(true);
    });

    it("Presale Should be toggled on", async () => {
      await presale.togglePause({ from: accounts[0] });
      const presaleStatus = await presale.getStatus();
      expect(presaleStatus).toBe(false);
    });

    it("Presale Should give me Correct eth Value", async () => {
      const ethValue = await presale.getTokensPerEth("1000000000000000000");
      expect(ethValue.toString()).toBe("10000");
    });

    it("Get min and max purchase value", async () => {
      const ethValue = await presale.getMinMax();
      expect(ethValue.toString()).toBe("100000000000000000,1000000000000000000");
    });
  });
});
