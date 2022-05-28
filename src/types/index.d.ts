declare global {
  interface Array<> {
    asyncForEach(callback: CallableFunction);
    chunk(a: number);
  }
  // interface IOptions {}
  // interface Window{
  //   ethereum?: any
  // }
}

interface Itoast {
  title: string | unknown;
  message: string | unknown;
  status: boolean | unknown;
  loading: boolean;
  show: boolean;
}

interface Iresponse {
  status: boolean;
  data: any | undefined;
  toast: Itoast;
}
interface BlockchainErrorResponse {
  code: number;
  data: { message: string; hash: null | string; reason: string; programCounter: number; result: string };
  name: string;
  stack: string;
}

// Initial state for Presale
interface IinitialState {
  wallet: string;
  loading: boolean;
  balance: number;
  isConnected: boolean;
  isConnecting: boolean;
  walletIsVisible: boolean;
  chainId: number;
  isAdmin: boolean;
}

// Admin contract
interface IContract {
  status: boolean;
  rate: number;
  totalContributors: number;
  tokenSold: number;
  minPurchase: string;
  maxPurchase: string;
  contractBalance: number;
  enddate: string;
  contributorsList: object[];
}

interface Icard {
  value: number | string;
  name: string;
  key: string;
  icon: string;
  variant: string;
}

interface IStore {
  presale: any;
  status: any;
  contract: any;
}

interface IconWidth {
  width: number;
}
interface IFieldSet {
  title: string;
  children: JSX.Element;
  value: any;
  isLoading: boolean;
}

interface IFormElements {
  className?: string;
  name: string;
  type: "text" | "number" | "checkbox" | "switch" | "date" | "input";
  placeholder?: string;
  disabled: boolean;
  required?: boolean;
  checked?: boolean;
  value: string;
  label: string;
  min?: number;
  step?: number | "any";
  onChange?: ChangeEventHandler;
}

type emptyableString = string | null | undefined;

export type {
  emptyableString,
  Iresponse,
  Itoast,
  IinitialState,
  IContract,
  Icard,
  IStore,
  IconWidth,
  IToggle,
  IFieldSet,
  IFormElements,
  BlockchainErrorResponse,
};
