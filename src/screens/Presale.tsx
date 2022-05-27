import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ScrollAnimation from "react-animate-on-scroll";
import Countdown from "react-countdown";
import Footer from "../components/Footer";
import projectConfig from "../constants/project.config";
import Toaster from "../components/Toaster";
import { useSelector } from "react-redux";
import { IStore } from "../types";
import { debounce, num_format } from "../libraries/utils";
import { useWeb3React } from "@web3-react/core";
import { buyToken, getContractInstance, getTokenQty } from "../libraries/connectors";

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
      const contract = await getContractInstance(library, chainId, account);
      const response = await buyToken(formdata.token, contract, account);
      console.log(response);
    }
  };

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
                              <p>Swap your BNB for {projectConfig.ticker}</p>
                              <hr className="bg-secondary" />
                            </article>
                          </div>
                          <form onSubmit={sumbmitBuyToken} className="btns wow fadeIn swapbody" data-wow-delay="0.6s">
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
                          date={new Date(date[0], date[1], date[2])}
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
                      <span>Total Supply</span>
                      <p>100M Token</p>
                    </li>
                    <li className=" wow fadeIn" data-wow-delay="0.8s">
                      <span>Private Sale</span>
                      <p>1% (1M Token)</p>
                    </li>
                    <li className=" wow fadeIn" data-wow-delay="0.10s">
                      <span>Pre - Sale</span>
                      <p>46% (46M Token)</p>
                    </li>
                    <li className=" wow fadeIn" data-wow-delay="0.10s">
                      <span>Liquidity Staking</span>
                      <p>35% (35M Token)</p>
                    </li>
                  </ul>
                  <ul className="someblock">
                    <li className=" wow fadeIn" data-wow-delay="0.6s">
                      <span>Marketing Promotion</span>
                      <p>10% (10M Token)</p>
                    </li>
                    <li className=" wow fadeIn" data-wow-delay="0.8s">
                      <span>Buy Back</span>
                      <p>3% (3M Token)</p>
                    </li>
                    <li className=" wow fadeIn" data-wow-delay="0.10s">
                      <span>Community Airdrop</span>
                      <p>5% (5M Token)</p>
                    </li>
                  </ul>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
