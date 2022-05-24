import React from "react";
import Navbar from "../components/Navbar";
import ScrollAnimation from "react-animate-on-scroll";
import Countdown from "react-countdown";
import Footer from "../components/Footer";

export default function Presale() {
  const date = "2022-06-09".split("-");
  return (
    <>
      <Navbar />
      <section>
        <div className="block sliceimg">
          <div style={{ position: "fixed" }} className="parallax no-parallax scrolly-invisible">
            <div className="overlay"></div>
            <video autoPlay="autoplay" loop="loop" muted="muted">
              <source src="/vid/blue-motion-background.mp4" type="video/mp4"></source>
            </video>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  {/* <ScrollAnimation className="col-sm-12" animateIn="slideInLeft">
                    <h3>
                      Powering Data for the new equity<strong> blockchain</strong>
                    </h3>
                    <p>
                      Our company specializes on Blockchain Technologies, Smart Contracts, Initial Coin Offering (ICO)
                      and Digital Currencies Investments
                    </p>
                  </ScrollAnimation> */}
                  <ScrollAnimation
                    className="d-flex align-items-center justify-content-center col-sm-12"
                    delay={1000}
                    animateIn="slideInRight"
                    style={{ minHeight: "85vh" }}
                  >
                    <div className="shadow-lg rounded fcount s2">
                      <div className="row">
                        <div className="col-sm-12 col-lg-7">
                          <Countdown
                            date={new Date(date[0], date[1], date[2])}
                            renderer={({ hours, minutes, seconds, days }) => (
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
                            )}
                          />
                          <div className="btns wow fadeIn swapbody" data-wow-delay="0.6s">
                            <article>
                              <figure>
                                <img width={30} src="/img/bnb.png" alt="" />
                                <b>BNB</b>
                              </figure>
                              <input type="number" className="me-auto" placeholder={`Swap how many BNB ?`} />
                            </article>
                            <article className="d-flex">
                              <img width={50} className="ml-auto mr-auto" src="/img/down-svgrepo-com.svg" alt="" />
                            </article>
                            <article>
                              <figure>
                                <img width={30} src="/img/logo.png" alt="" />
                                <b>$GASP</b>
                              </figure>
                              <input
                                type="text"
                                className="me-auto"
                                defaultValue="0.00"
                                readOnly={true}
                                placeholder={`You'll recieve Tokens`}
                              />
                            </article>
                            <article>
                              <a className="gradient theme-btn ml-auto mr-auto" href="!#" title="">
                                Join & Buy Token Now
                              </a>
                            </article>
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg-5">
                          <div className="v-align">
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
                                <div className="rpogressbar" style={{ width: "50%" }}></div>
                              </div>
                              <p className="pull-left">Softcap in 2458 days</p>
                              <p className="pull-right">Hardcap</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
