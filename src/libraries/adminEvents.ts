import {
  getContractInstance,
  toggleContractStatus,
  getPresaleStatus,
  setContractRate,
  getRate,
  setEnddate,
  toTimestamp,
  getEndDate,
  toWei,
} from "./connectors";
import projectConfig from "../constants/project.config";
import { Itoast } from "../types";
export const defaultState = { status: false, rate: false, withdraw: false, enddate: false, minmax: false };

const errocode: Itoast = {
  loading: false,
  show: true,
  status: false,
  message: "",
  title: "",
};

export const toggleStatus = async (web3: any, callback: Function) => {
  const { library, chainId, account } = web3;
  try {
    const contractInstance = await getContractInstance(library, chainId, account);
    const response = await toggleContractStatus(contractInstance, account);
    response.wait().then(async () => {
      const status = await getPresaleStatus(contractInstance);
      const toggle: any = projectConfig.status;
      callback({
        status,
        toast: {
          ...errocode,
          message: `Successfuly turned ${toggle[status ? "ON" : "OFF"]}`,
          title: "Presale Status",
          status,
        },
      });
    });
  } catch ({ message, code }) {
    callback({
      status: false,
      toast: { ...errocode, message, title: code },
    });
  }
};

export const submitTokenRate = async (web3: any, rate: string, callback: Function) => {
  // const weiValue = tokenToWei(rate);
  const { library, chainId, account } = web3;
  if (!rate) {
    callback({
      status: false,
      toast: { ...errocode, message: "Invalid rate value", status: false, title: "Presale Rate" },
    });
    return;
  }
  try {
    const contractInstance = await getContractInstance(library, chainId, account);
    const response = await setContractRate(contractInstance, account, rate);
    response.wait().then(async () => {
      const data = await getRate(contractInstance);
      callback({
        status: true,
        data,
        toast: {
          ...errocode,
          message: `Presale rate updated`,
          title: "Presale Rate",
          status: true,
        },
      });
    });
  } catch ({ message, code }) {
    callback({
      status: false,
      toast: { ...errocode, message, title: code },
    });
  }
};

export const submitEndDate = async (web3: any, date: string, callback: Function) => {
  if (!date) {
    callback({
      status: false,
      toast: { ...errocode, message: "Invalid date value", status: false, title: "Presale End Date" },
    });
    return;
  }
  const timestamp = toTimestamp(date);

  const { library, chainId, account } = web3;
  try {
    const contractInstance = await getContractInstance(library, chainId, account);
    const response = await setEnddate(contractInstance, account, timestamp);
    response.wait().then(async () => {
      const data = await getEndDate(contractInstance);
      callback({
        status: true,
        data,
        toast: {
          ...errocode,
          message: `Presale end date updated`,
          title: "Presale End Date",
          status: true,
        },
      });
    });
  } catch ({ message, code }) {
    callback({
      status: false,
      toast: { ...errocode, message, title: code },
    });
  }
};

export const setMinMax = async (web3: any, minmax: string[], callback: Function) => {
  const { library, chainId, account } = web3;
  const x = minmax.map((x) => toWei(+x));
  if (x.filter((y: number) => y < 1).length) {
    callback({
      status: false,
      toast: { ...errocode, message: "Invalid Limit values", status: false, title: "Presale Limits" },
    });
    return false;
  }
  try {
    const contractInstance = await getContractInstance(library, chainId, account);
    const xx = x.map((x) => x.toString());
    const result = await contractInstance.setMinMax(xx[0], xx[1], { from: account });
    return result.wait().then(() => {
      callback({
        status: true,
        data: minmax,
        toast: {
          ...errocode,
          message: `Min & Max purchase successfuly updated`,
          title: "Min & Max purchase",
          status: true,
        },
      });
    });
  } catch ({ message, code }) {
    callback({
      status: false,
      toast: { ...errocode, message, title: code },
    });
  }
};

export const buyToken = async (amount: number, web3: any, callback: Function) => {
  const { library, chainId, account } = web3;
  if (!amount) {
    callback({ status: false });
  }

  try {
    const value = toWei(amount).toString();

    const contractInstance = await getContractInstance(library, chainId, account);
    const result = await contractInstance.buyToken({ from: account, value });
    result.wait().then((response: any) => {
      callback(response);
    });
  } catch ({ data }: any) {
    return data;
  }
};
