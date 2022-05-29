import { createSlice, Slice } from "@reduxjs/toolkit";
import { IinitialState } from "../types";

const initialState: IinitialState = {
  loading: false,
  walletIsVisible: true,
  balance: 0,
  chainId: 0,
  wallet: "",
  isConnected: true,
  isConnecting: false,
  isAdmin: false,
  activeSale: "preSale",
};

const presaleSlice: Slice = createSlice({
  name: "presale",
  initialState,
  reducers: {
    setWalletVisibility: (state: IinitialState, { payload }) => {
      state.walletIsVisible = payload;
    },
    setWallet: (state: IinitialState, { payload }) => {
      state.wallet = payload;
    },
    setConnection: (state: IinitialState, { payload }) => {
      state.isConnected = payload;
    },
    setConnecting: (state: IinitialState, { payload }) => {
      state.isConnecting = payload;
    },
    setBalance: (state: IinitialState, { payload }) => {
      state.balance = payload;
    },
    setChainId: (state: IinitialState, { payload }) => {
      state.chainId = payload;
    },
    setIsAdmin: (state: IinitialState, { payload }) => {
      state.isAdmin = payload;
    },
  },
});

export const { setWallet, setConnection, setBalance, setChainId, setWalletVisibility, setIsAdmin, setConnecting } =
  presaleSlice.actions;
export default presaleSlice.reducer;
