import { configureStore } from "@reduxjs/toolkit";
import presale from "./presaleReducer";
import status from "./toastReducer";
import contract from "./contractReducer";
import { IStore } from "../types";

const reducer: IStore = {
  presale,
  status,
  contract,
};

const store = configureStore({ reducer });

export default store;
