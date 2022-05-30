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
    name: "Kovan Testnet",
    url: `wss://kovan.infura.io/ws/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    chainId: 42,
    networkId: 42,
    address: "0xFF040e8F90096406d3D68753AD3a08B471fD50bE",
  },
];
// Kovan token address = 0xaB2Ecb0C304BC0609e75bdB46435C57b48b60A57
// Kovan presale address = 0xFF040e8F90096406d3D68753AD3a08B471fD50bE
export default networks;
