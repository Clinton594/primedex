const projectConfig = {
  deployed: true,
  name: "PrimeDEX Presale",
  favicon: "/logo.png",
  logo: "/logo.png",
  keywords: "PrimeDEX, Presale",
  description:
    "PrimeDEX utilizes Treasury Reserves to enable long-term price consistency and scarcity within an infinite supply system",
  token: "PrimDexSwap",
  ticker: "$PrimeDEX",
  blockChainTokan: "ETH",
  decimal: 18,
  whitepaper: "/pdf/white-paper.pdf",
  sale: {
    privateSale: {
      totalSupply: 100000000,
    },
    preSale: {
      totalSupply: 50000000,
    },
    all: [
      { name: "Purchase Via", value: "Our Website" },
      { name: "Payment Accepted", value: "BNB Only" },
      { name: "Soft Cap", value: "300 BNB" },
      { name: "Hard Cap", value: "500 BNB" },
    ],
  },
  status: {
    ON: "ON",
    OFF: "OFF",
  },
};

export default projectConfig;
