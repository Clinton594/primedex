import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const getLibrary = (provider) => {
  return Web3Provider(provider);
};

const root = createRoot(document.getElementById("root"));

root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <App />
    </Provider>
  </Web3ReactProvider>
);
