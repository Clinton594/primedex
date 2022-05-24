import { Link } from "react-router-dom";
import { useState } from "react";
import WalletConnect from "./WalletConnect";

import routes from "../constants/routes";
import Metamask from "./icons/Metamask";

export default function Navbar() {
  const [showWallet, toggleWallet] = useState(false);
  const toggleNav = () => {
    $("nav").toggleClass("show");
  };

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
        <div className="apps-btns">
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
          {(window.location.pathname === routes.presale || window.location.pathname === routes.admin) && (
            <a
              onClick={(e) => {
                e.preventDefault();
                toggleWallet(!showWallet);
              }}
              href="!#"
              className="g2 bg-danger text-white d-flex"
            >
              <Metamask width={20} />
              Connect <span className="ml-2 d-none d-lg-block">Wallet</span>
            </a>
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
