import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectToWallet, injectProvider } from "../libraries/connectors";
import { setConnecting } from "../redux/presaleReducer";
import { setToast } from "../redux/statusReducer";
import { Iresponse, IStore } from "../types";
import Binance from "./icons/Binance";
import Coinbase from "./icons/Coinbase";
import Metamask from "./icons/Metamask";
import TrustWallet from "./icons/TrustWallet";
import Spinner from "./Spinner";

interface IConnectToWallet {
  showWallet: boolean;
  toggleWallet: (a: boolean) => void;
}

export default function WalletConnect({ showWallet, toggleWallet }: IConnectToWallet) {
  const [slideShow, toggleSlide] = useState("");
  const { presale } = useSelector((store: IStore) => store);
  // Connect wallet modal
  const dispatch = useDispatch();
  useEffect(() => {
    const showing: "show" | "" = showWallet ? "show" : "";
    toggleSlide(showing);
  }, [showWallet]);

  const { activate, connector } = useWeb3React();

  return (
    <>
      <div
        onClick={() => {
          toggleWallet(!showWallet);
        }}
        className="fade modal-backdrop show"
      ></div>
      <div className={`wallect-connect ${slideShow}`}>
        <div className="fcount s2 wow fadeIn">
          <div className="sc-e15886e2-0 sc-5d615fee-0 hesdMU krnGVC">
            <div className="sc-e15886e2-0 sc-f411e064-0 hXDauz itOzA-d">
              <div className="sc-e15886e2-0 hXDauz">
                <button
                  onClick={() => {
                    dispatch(setConnecting(true));
                    connectToWallet(activate, injectProvider, connector, (response: Iresponse) => {
                      dispatch(setToast({ ...response, show: true }));
                      dispatch(setConnecting(false));
                      if (response.status) toggleWallet(false);
                    });
                  }}
                  disabled={presale.isConnecting}
                  className="sc-e72add9e-0 dVLKgc sc-4a6a2b7-0 eIETMV"
                >
                  {presale.isConnecting ? (
                    <Spinner variant="info" size="md" animation="grow" />
                  ) : (
                    <Metamask width={40} />
                  )}

                  <div color="text" className="sc-bee979ae-0 hUBBoK">
                    Metamask
                  </div>
                </button>
              </div>
              <div className="sc-e15886e2-0 hXDauz">
                <button className="sc-e72add9e-0 dVLKgc sc-4a6a2b7-0 eIETMV">
                  <Binance width={40} />
                  <div color="text" className="sc-bee979ae-0 hUBBoK">
                    Binance Wallet
                  </div>
                </button>
              </div>
              <div className="sc-e15886e2-0 hXDauz">
                <button disabled={true} className="sc-e72add9e-0 dVLKgc sc-4a6a2b7-0 eIETMV">
                  <Coinbase width={40} />
                  <div color="text" className="sc-bee979ae-0 hUBBoK">
                    Coinbase Wallet
                  </div>
                </button>
              </div>
              <div className="sc-e15886e2-0 hXDauz">
                <button disabled={true} className="sc-e72add9e-0 dVLKgc sc-4a6a2b7-0 eIETMV">
                  <TrustWallet width={40} />
                  <div color="text" className="sc-bee979ae-0 hUBBoK">
                    Trust Wallet
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
