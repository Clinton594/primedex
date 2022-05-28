import presale from "../contracts/Presale.json";
const networks = [
  {
    name: "Development",
    chainId: 1337,
    networkId: 5777,
    url: "http://127.0.0.1:9545/",
    address: presale.networks["5777"].address,
  },
  {
    name: "Mainnet",
    url: "INFURA_LINK",
    chainId: 1,
    networkId: 1,
    address: "",
  },
  {
    name: "Rinkeby Testnet",
    url: "INFURA_LINK",
    chainId: 4,
    networkId: 4,
    address: "",
  },
];

export default networks;
