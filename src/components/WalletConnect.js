import React, { useEffect, useState } from "react";
import Binance from "./icons/Binance";
import Coinbase from "./icons/Coinbase";
import Metamask from "./icons/Metamask";
import TrustWallet from "./icons/TrustWallet";

export default function WalletConnect({ showWallet, toggleWallet }) {
  const [slideShow, toggleSlide] = useState("");
  useEffect(() => {
    toggleSlide(showWallet && "show");
  }, [showWallet]);
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
                  className="sc-e72add9e-0 dVLKgc sc-4a6a2b7-0 eIETMV"
                  id="wallet-connect-metamask"
                  width="100%"
                  scale="md"
                >
                  <Metamask width={40} />
                  <div fontSize="14px" color="text" className="sc-bee979ae-0 hUBBoK">
                    Metamask
                  </div>
                </button>
              </div>
              <div className="sc-e15886e2-0 hXDauz">
                <button
                  className="sc-e72add9e-0 dVLKgc sc-4a6a2b7-0 eIETMV"
                  id="wallet-connect-binance wallet"
                  width="100%"
                  scale="md"
                >
                  <Binance width={40} />
                  <div fontSize="14px" color="text" className="sc-bee979ae-0 hUBBoK">
                    Binance Wallet
                  </div>
                </button>
              </div>
              <div className="sc-e15886e2-0 hXDauz">
                <button
                  disabled={true}
                  className="sc-e72add9e-0 dVLKgc sc-4a6a2b7-0 eIETMV"
                  id="wallet-connect-coinbase wallet"
                  width="100%"
                  scale="md"
                >
                  <Coinbase width={40} />
                  <div fontSize="14px" color="text" className="sc-bee979ae-0 hUBBoK">
                    Coinbase Wallet
                  </div>
                </button>
              </div>
              <div className="sc-e15886e2-0 hXDauz">
                <button
                  disabled={true}
                  className="sc-e72add9e-0 dVLKgc sc-4a6a2b7-0 eIETMV"
                  id="wallet-connect-trust wallet"
                  width="100%"
                  scale="md"
                >
                  <TrustWallet width={40} />
                  <div fontSize="14px" color="text" className="sc-bee979ae-0 hUBBoK">
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
