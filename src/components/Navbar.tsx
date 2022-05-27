import $ from "jquery";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "./Spinner";
import { IStore } from "../types";
import { Button } from "./Fieldset";
import Metamask from "./icons/Metamask";
import routes from "../constants/routes";
import WalletConnect from "./WalletConnect";
import projectConfig from "../constants/project.config";
import {
  connectToWallet,
  getContractInstance,
  getEndDate,
  getPresaleStatus,
  getRate,
  getTokenSold,
  getTotalContributors,
  injectProvider,
  toEther,
} from "../libraries/connectors";
import { setBalance, setConnection, setIsAdmin, setWallet, setWalletVisibility } from "../redux/presaleReducer";
import { setAll } from "../redux/contractReducer";

export default function Navbar() {
  const dispatch = useDispatch();
  const { presale } = useSelector((store: IStore) => store);
  const { active, deactivate, activate, account, chainId, library, connector } = useWeb3React();
  const [showWallet, toggleWallet] = useState(false);
  const toggleNav = () => {
    $("nav").toggleClass("show");
  };
  const toggleBalanceVisibility = () => {
    dispatch(setWalletVisibility(!presale.walletIsVisible));
  };

  // Get the wallet owner
  useEffect(() => {
    dispatch(setConnection(active));
    dispatch(setWallet(account));

    if (library !== undefined) {
      library.getBalance(account).then((balance: number) => {
        const formattedBalance: number = toEther(balance);
        dispatch(setBalance(formattedBalance));
      });
    } else {
      dispatch(setBalance(0));
    }

    if (active) {
      (async () => {
        const contract = await getContractInstance(library, chainId, account);
        const owner = await contract.getOwner();
        dispatch(setIsAdmin(owner === account));
      })();
    } else {
      dispatch(setIsAdmin(false));
    }
  }, [active, account, dispatch, chainId, library]);

  useEffect(() => {
    $(window).on("scroll", function () {
      const scroll = $(window).scrollTop() || 0;
      if (scroll && scroll >= 50) {
        $("header").addClass("sticky");
      } else {
        $("header").removeClass("sticky");
      }
    });
  }, []);

  // Autoconnect
  useEffect(() => {
    let persist = localStorage.getItem("persist");
    if (persist !== null) {
      persist = JSON.parse(persist);
      if (persist) connectToWallet(activate, injectProvider, connector, () => {});
    }
  }, [activate, connector]);

  // Update the redux state
  useEffect(() => {
    (async () => {
      if (!active) dispatch(setIsAdmin(false));

      let contractInstance = await getContractInstance(library, chainId, account);
      const owner = await contractInstance.getOwner();
      const card = {
        tokenSold: await getTokenSold(contractInstance),
        totalContributors: await getTotalContributors(contractInstance),
        enddate: await getEndDate(contractInstance),
        status: await getPresaleStatus(contractInstance),
        rate: await getRate(contractInstance),
      };

      dispatch(setAll(card));
      dispatch(setIsAdmin(account === owner));
    })();
  }, [active, account, chainId, library, dispatch]);
  return (
    <header className="sticktop">
      <div className="menusec">
        <div className="logo">
          <Link to={routes.home}>
            <img className="hidec" src="img/logo/logo.png" alt="" />
            <img className="showc" src="img/logo/logo.png" alt="" />
            <span>
              <span>PrimeDEx</span>
            </span>
          </Link>
        </div>
        <div className="apps-btns  d-flex align-items-center">
          {window.location.pathname === routes.home && (
            <>
              <a
                style={{ background: "#ffc107" }}
                href="/GASP-Whitepaper.pdf"
                className="g1 d-none d-lg-block"
                title=""
                target="_blank"
              >
                Whitepaper
              </a>
              <Link style={{ background: "#8500ff" }} to={routes.presale} className="g2 d-none d-lg-block">
                PRESALE
              </Link>
            </>
          )}
          {/* DISPLAY ONLY ON PRESALE AND ADMIN PAGES */}
          {(window.location.pathname === routes.presale || window.location.pathname === routes.admin) && (
            <>
              {presale.balance > 0 && (
                <div className="d-none d-lg-block">
                  <Button type="button" className="mb-0" onClick={toggleBalanceVisibility} variant="success">
                    <>
                      {presale.walletIsVisible === true && (
                        <>
                          <small>
                            {presale.balance} {projectConfig.blockChainTokan}
                          </small>
                          <i className="fas fa-eye-slash ms-2"></i>
                        </>
                      )}
                      {!presale.walletIsVisible && <i className="fas fa-eye ms-2"></i>}
                    </>
                  </Button>
                </div>
              )}
              <div className="vr bg-white"></div>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  if (!presale.isConnected) {
                    toggleWallet(!showWallet);
                  } else {
                    deactivate();
                    localStorage.setItem("persist", "false");
                  }
                }}
                href="!#"
                className={`${presale.isConnected ? `bg-danger` : `bg-info`} text-white d-flex align-items-center`}
              >
                {presale.isConnected ? (
                  <i className="fas fa-ban mr-2"></i>
                ) : presale.isConnecting ? (
                  <Spinner variant="info" size="sm" className="mr-2" animation="grow" />
                ) : (
                  <Metamask width={20} />
                )}
                {presale.isConnected ? "Disconnect" : "Connect"} <span className="ml-2 d-none d-lg-block">Wallet</span>
              </a>
            </>
          )}
        </div>
        {window.location.pathname === routes.home && (
          <>
            <div className="open-minimal-menu resopen" onClick={toggleNav}>
              <div id="hamburger-two">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <nav id="navsc">
              <ul>
                <li>
                  <a className="smooth" href="#distribution" title="">
                    DISTRIBUTION
                  </a>
                </li>
                <li>
                  <a className="smooth" href="#two" title="">
                    TOKEN SALE
                  </a>
                </li>
                <li>
                  <a className="smooth" href="#roadmap" title="">
                    ROAD MAP
                  </a>
                </li>
                <li>
                  <a className="smooth" href="#six" title="">
                    FAQ
                  </a>
                </li>
              </ul>

              <div className="apps-btns mobilap">
                <Link to={routes.presale} className="g2 float-left" title="">
                  Presale
                </Link>
              </div>
            </nav>
          </>
        )}
      </div>
      {showWallet && <WalletConnect showWallet={showWallet} toggleWallet={toggleWallet} />}
    </header>
  );
}
