import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toaster from "../components/Toaster";
import { buyToken } from "../libraries/adminEvents";
import { ISale, IStore, keyOfISale } from "../types";
import { getTokenQty } from "../libraries/connectors";
import projectConfig from "../constants/project.config";
import { debounce, num_format } from "../libraries/utils";

export default function Presale() {
  const [formdata, setFormdata] = useState({ token: 0.0, crypto: 0.0 });
  const { presale, contract } = useSelector((store: IStore) => store);
  const { active, library, chainId, account } = useWeb3React();

  const date = contract.enddate.split("-").map((x: string) => +x);

  const getTokenQuantity = debounce(async (e: any) => {
    const response = await getTokenQty(library, chainId, account, e.target.value);
    const token = response.toString();

    setFormdata({ token, crypto: e.target.value });
  });

  const sumbmitBuyToken = async (e: any) => {
    e.preventDefault();
    if (typeof account === "string") {
      buyToken(formdata.crypto, { active, library, chainId, account }, (response: any) => {
        console.log(response);
      });
    }
  };

  const saleProperties: ISale = projectConfig.sale;
  const iSale: keyOfISale = presale.activeSale;
  const activeSale = saleProperties[iSale];

  return (
    <>
      <Navbar />
      <Toaster />
      <section>
        <div className="block sliceimg">
          <div
            style={{
              position: "fixed",
              background: "url(img/bg/p3.png) #212529",
              transition: "0.9s all",
            }}
            className="parallax no-parallax scrolly-invisible breathing"
          ></div>
          <div className="container">
            {contract.status && (
              <>
                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    <div className="row">
                      <ScrollAnimation
                        className="d-flex align-items-center justify-content-center col-sm-12"
                        delay={1000}
                        animateIn="fadeIn"
                        style={{ minHeight: "75vh" }}
                      >
                        <div className="shadow-lg fcount s2">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="swaphead">
                                <article className="header">
                                  <p>
                                    Swap your BNB for {projectConfig.ticker} ({presale.activeSale.toUpperCase()})
                                  </p>
                                  <hr className="bg-secondary" />
                                </article>
                              </div>
                              <form
                                onSubmit={sumbmitBuyToken}
                                className="btns wow fadeIn swapbody"
                                data-wow-delay="0.6s"
                              >
                                <article>
                                  <figure>
                                    <img width={30} className="mr-2" src="/img/icons/bnb.png" alt="" />
                                    <b>BNB</b>
                                  </figure>
                                  <input
                                    type="number"
                                    step="0.05"
                                    className="me-auto mt-3 dcfVCh"
                                    placeholder={`Swap how many BNB ?`}
                                    defaultValue={formdata.crypto}
                                    onChange={getTokenQuantity}
                                  />
                                </article>
                                <article className="d-flex">
                                  <img
                                    width={50}
                                    className="ml-auto mr-auto"
                                    src="/img/icons/down-svgrepo-com.svg"
                                    alt=""
                                  />
                                </article>
                                <article>
                                  <figure>
                                    <img width={50} src="/img/logo/logo.png" alt="" />
                                    <b>$GASP</b>
                                  </figure>
                                  <input
                                    style={{ fontSize: `small` }}
                                    type="input"
                                    className="me-auto mt-1 dcfVCh"
                                    value={num_format(formdata.token)}
                                    readOnly={true}
                                    placeholder={`${num_format(formdata.token)}`}
                                  />
                                  <hr className="bg-secondary" />
                                </article>
                                {presale.isConnected && (
                                  <article>
                                    <button className="btn rounded w-100 btn-warning" title="">
                                      Purchase
                                    </button>
                                    <small className="badge mt-2 w-100 text-center">
                                      <small>Connected to : {presale.wallet}</small>
                                    </small>
                                  </article>
                                )}
                              </form>
                            </div>
                          </div>
                        </div>
                      </ScrollAnimation>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <hr className="bg-secondary" />
                  </div>
                  <div className="col-lg-6">
                    <div className="fcount s2 border-secondary b w-100 bg-transparent">
                      <div className="row">
                        <div className="col-sm-12 col-lg-12">
                          <ScrollAnimation animateIn="slideInLeft">
                            <Countdown
                              date={new Date(date[0], date[1] - 1, date[2])}
                              renderer={({ hours, minutes, seconds, days }) => (
                                <>
                                  <p>{contract.enddate}</p>
                                  <ul className="countdown-soon wow fadeIn" data-wow-delay="0.4s">
                                    <li className="days-soon">
                                      <span className="days">{days}</span>
                                      <p className="days_ref">days</p>
                                    </li>
                                    <li className="hours-soon">
                                      <span className="hours">{hours}</span>
                                      <p className="hours_ref">hours</p>
                                    </li>
                                    <li className="minutes-soon">
                                      <span className="minutes">{minutes}</span>
                                      <p className="minutes_ref">minutes</p>
                                    </li>
                                    <li className="seconds-soon">
                                      <span className="seconds">{seconds}</span>
                                      <p className="seconds_ref">seconds</p>
                                    </li>
                                    <hr />
                                  </ul>
                                </>
                              )}
                            />
                            <div className="">
                              <ul className="costb">
                                <li>
                                  <h3>$58,458,478</h3>
                                  <span>Worth of tokens</span>
                                </li>
                                <li>
                                  <h3>5,896</h3>
                                  <span>BTC Raised</span>
                                </li>
                              </ul>
                              <div className="prosec">
                                <span className="pull-left">$5m</span>
                                <span className="pull-right">$85m</span>
                                <div className="progresssec">
                                  <div className="rpogressbar" style={{ width: 50 }}></div>
                                </div>
                                <p className="pull-left">Softcap in 2458 days</p>
                                <p className="pull-right">Hardcap</p>
                              </div>
                            </div>
                          </ScrollAnimation>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <ScrollAnimation animateIn="slideInRight">
                      <ul className="someblock">
                        <li className=" wow fadeIn" data-wow-delay="0.6s">
                          <span>Rate</span>
                          <p>
                            {num_format(contract.rate)} {projectConfig.ticker} per {projectConfig.blockChainTokan}
                          </p>
                        </li>
                        <li className=" wow fadeIn" data-wow-delay="0.6s">
                          <span>Total Supply</span>
                          <p>{num_format(activeSale.totalSupply)} Token</p>
                        </li>
                        <li className=" wow fadeIn" data-wow-delay="0.8s">
                          <span>Minimum Purchase</span>
                          <p>
                            {contract.minPurchase} {projectConfig.blockChainTokan}
                          </p>
                        </li>
                        <li className=" wow fadeIn" data-wow-delay="0.8s">
                          <span>Maximum Purchase</span>
                          <p>
                            {contract.maxPurchase} {projectConfig.blockChainTokan}
                          </p>
                        </li>
                        {projectConfig.sale.all.map((x) => (
                          <li key={x.name} className=" wow fadeIn" data-wow-delay="0.8s">
                            <span>{x.name}</span>
                            <p>{x.value}</p>
                          </li>
                        ))}
                      </ul>
                      <p className="text-white">
                        All raised funds will be utilized for projects, liquidity, listing fees on the exchange
                        Bi-weekly Buy-Back Strategy, and expand the community.
                        <br /> NOTE: If soft cap not reach, the funds will be returned to all investors wallet address.
                      </p>
                    </ScrollAnimation>
                  </div>
                </div>
              </>
            )}
            {contract.status === false && (
              <>
                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    <div className="row">
                      <ScrollAnimation
                        className="d-flex align-items-center justify-content-center col-sm-12"
                        delay={1000}
                        animateIn="fadeIn"
                        style={{ minHeight: "75vh" }}
                      >
                        <img src="/img/bg/unavailable-cuate.svg" alt="" />
                      </ScrollAnimation>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
