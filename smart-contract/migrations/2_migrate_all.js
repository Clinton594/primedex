const TestToken = artifacts.require("TestToken");
const Presale = artifacts.require("Presale");

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(TestToken, "PrimDexSwap", "PrimDex", "100000000000000000000000000"); // 100 million tokens
  const token = await TestToken.deployed();

  // Deploy presale
  await deployer.deploy(Presale, "10000", accounts[0], token.address);
  const presale = await Presale.deployed();

  const tenPercent = "1000000000000000000000000";
  token.transfer(presale.address, tenPercent);

  console.log("Contract deployed", tenPercent, presale.address);
};
