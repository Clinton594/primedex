import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import presale from "../contracts/Presale.json";
import networks from "../constants/networks";
import projectConfig from "../constants/project.config";
import { emptyableString } from "../types";

export const getContractInstance = async (provider: any, chainID: number | undefined, account: emptyableString) => {
  // If connected to a wallet
  let signer: any;
  if (typeof account === "string") {
    signer = provider.getSigner(account);
  } else {
    // Not connected to any wallet
    chainID = 42;
    if (process.env.NODE_ENV === "development") {
      if (projectConfig.deployed) {
        signer = new ethers.providers.InfuraProvider("kovan", process.env.REACT_APP_INFURA_PROJECT_ID);
      } else {
        chainID = 1337;
        signer = new ethers.providers.JsonRpcProvider("http://127.0.0.1:9545/");
      }
    } else signer = new ethers.providers.InfuraProvider("kovan", process.env.REACT_APP_INFURA_PROJECT_ID);
  }

  return new ethers.Contract(networks.filter(({ chainId }) => chainID === chainId)[0].address, presale.abi, signer);
};

export const connectToWallet = async (activate: Function, provider: any, connector: any, callback: Function) => {
  if (connector === undefined) {
    try {
      activate(provider);
      localStorage.setItem("persist", "true");
      callback({ status: true, title: "Connected", message: "App has been connected to Metamask" });
    } catch (error) {
      callback(error);
    }
  } else {
    callback({ status: false, title: "Wallet Not Found", message: "Please Install Metamask" });
  }
};

export const injectProvider = new InjectedConnector({ supportedChainIds: networks.map((x) => x.chainId) });

export const toTimestamp = (strDate: string): number => Date.parse(strDate) / 1000;

export const toEther = (wei: number): number => {
  const res: any = ethers.utils.formatEther(wei);
  return Math.round(res * 1e4) / 1e4;
};

export const toWei = (ether: number) => {
  return ether * 10 ** projectConfig.decimal;
};

// export const weiToToken = (wei: string) => {
//   const bigint = BigInt(10 ** projectConfig.decimal);
//   return ethers.BigNumber.from(bigint).div(wei).toString();
// };

export const getTokenSold = async (contract: any) => {
  const result = await contract.getTotalReceived();
  return result.toString();
};

export const getTotalContributors = async (contract: any) => {
  const result = await contract.getTotalContributors();
  return result.toString();
};

export const getPresaleStatus = (contract: any) => {
  return contract.getStatus();
};

export const getRate = async (contract: any) => {
  const result = await contract.getTokenRate();
  return result.toString();
};

export const getMinMax = async (contract: any) => {
  const result = await contract.getMinMax();
  const loads = result
    .toString()
    .split(",")
    .map((x: string) => ethers.utils.formatEther(x.trim()));
  return loads;
};

export const toggleContractStatus = async (contract: any, account: string) => {
  const result = await contract.togglePause({ from: account });
  return result;
};

export const setContractRate = async (contract: any, account: string, rate: string) => {
  const result = await contract.setTokenRate(rate, { from: account });
  return result;
};

export const setEnddate = async (contract: any, account: string, timestamp: number) => {
  const result = await contract.setEndate(timestamp, { from: account });
  return result;
};

export const getEndDate = async (contract: any) => {
  const enddate = await contract.getEndate();
  const date = new Date(enddate.toString() * 1000);
  return date.toISOString().substr(0, 10);
};

export const getTokenQty = async (
  provider: any,
  chainId: number | undefined,
  account: string | null | undefined,
  eth: string
) => {
  const contractInstance = await getContractInstance(provider, chainId, account);
  const wei = BigInt(parseFloat(eth) * 10 ** projectConfig.decimal);
  return await contractInstance.getTokensPerEth(wei);
};
