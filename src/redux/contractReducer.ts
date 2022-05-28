import { createSlice } from "@reduxjs/toolkit";
import { IContract } from "../types";

const initialState: IContract = {
  status: false,
  rate: 0,
  totalContributors: 0,
  tokenSold: 0,
  minPurchase: "0",
  maxPurchase: "0",
  contractBalance: 0,
  enddate: "2022-02-12",
  contributorsList: [],
};

const contractReducer = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setStatus: (state: IContract, { payload }) => {
      state.status = payload;
    },
    setRate: (state: IContract, { payload }) => {
      state.rate = payload;
    },
    setTokenSold: (state: IContract, { payload }) => {
      state.tokenSold = payload;
    },
    setContractBalance: (state: IContract, { payload }) => {
      state.contractBalance = payload;
    },
    setEnddate: (state: IContract, { payload }) => {
      state.enddate = payload;
    },
    setMinMaxState: (state: IContract, { payload: loads }) => {
      state.minPurchase = loads[0];
      state.maxPurchase = loads[1];
    },
    setContributors: (state: IContract, { payload }) => {
      state.contributorsList = payload;
    },
    setAll: (state: IContract, { payload }) => {
      state.status = payload.status;
      state.rate = payload.rate;
      state.tokenSold = payload.tokenSold;
      // state.contractBalance = payload.contractBalance;
      state.enddate = payload.enddate;
      state.totalContributors = payload.totalContributors;
    },
  },
});

export const {
  setStatus,
  setRate,
  setContractBalance,
  setEnddate,
  setContributors,
  setAll,
  setTokenSold,
  setMinMaxState,
} = contractReducer.actions;
export default contractReducer.reducer;
