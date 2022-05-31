const { ethers, BigNumber } = require("ethers");
const { expect } = require("expect");
const Token = artifacts.require("TestToken");
const Presale = artifacts.require("Presale");

const formatEther = (bignumber) => {
  const res = ethers.utils.formatEther(bignumber.toString());
  return (Math.round(res * 1e4) / 1e4).toString();
};

const toWei = (etherValue) => {
  return ethers.utils.parseEther(etherValue).toString();
};

contract("Testing Two Contracts", (accounts) => {
  describe("TestToken Block", () => {
    let token, presale, provider;
    const sendEtherInWei = toWei("0.5");
    before(async () => {
      token = await Token.new("TestToken", "TTk", toWei("100000000")); //Mint 100 Milion
      presale = await Presale.new("10000", accounts[5], token.address);
      await token.transfer(presale.address, toWei("1000000")); //Transfer 1million to presale contract

      provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:9545/");
    });

    it("Should have 100m piceces", async () => {
      const totalSupply = await token.totalSupply();
      expect(formatEther(totalSupply)).toBe("100000000"); // 100m
    });

    it("Rate should be 10000", async () => {
      const rate = await presale.getTokenRate();
      expect(rate.toString()).toBe("10000"); // 10,000
    });

    it("Presale is paused", async () => {
      const presaleStatus = await presale.getStatus();
      expect(presaleStatus).toBe(false);
    });

    it("Presale Should be toggled on", async () => {
      await presale.togglePause({ from: accounts[0] });
      const presaleStatus = await presale.getStatus();
      expect(presaleStatus).toBe(true);
    });

    it("Get min and max purchase value", async () => {
      const ethValue = await presale.getMinMax();
      expect(ethValue.map((x) => formatEther(x)).toString()).toBe("0.1,100"); //1 & 10
    });

    it("Confirm 0.5 ether gives 5000 tokens", async () => {
      const quantity = await presale.getTokensPerEth(sendEtherInWei);
      expect(formatEther(quantity)).toBe("5000");
    });

    it("should get the quantity of token in the contract", async () => {
      const balance = await token.balanceOf(presale.address);
      expect(formatEther(balance)).toBe("1000000"); //1 million
    });

    it("Is Remaning 995,000 tokens in the smart contract", async () => {
      await presale.buyToken({ from: accounts[2], value: sendEtherInWei });
      const balance = await token.balanceOf(presale.address);
      expect(formatEther(balance)).toBe("995000"); //995,000 after transfering to the sender
    });

    // it.skip("Confirm the amount of Ether in the recepient's address is 100.5", async () => {
    //   provider.getBalance(accounts[5]).then((balance) => {
    //     expect(formatEther(balance)).toBe("101");
    //   });
    // });

    it("Confirm the amount of Ether in the presale contract", async () => {
      provider.getBalance(presale.address).then((balance) => {
        expect(formatEther(balance)).toBe("0");
      });
    });

    it("Confirm the amount of token recieved in the sender's wallet", async () => {
      const balance = await token.balanceOf(accounts[2]);
      expect(formatEther(balance)).toBe("5000");
    });

    it("Should transfer all token to address 4", async () => {
      await presale.getUnsoldTokens(accounts[4]);
      const balance = await token.balanceOf(presale.address);
      expect(formatEther(balance)).toBe("0"); //0
    });

    it("Confirm account 4 has gotten the 100,000 tokens", async () => {
      const balance = await token.balanceOf(accounts[4]);
      expect(formatEther(balance)).toBe("995000"); //995,000 after transfering to the sender
    });
  });
});
