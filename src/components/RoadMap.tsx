import React, { useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";

export default function RoadMap() {
  return (
    <section id="roadmap">
      <div className="block remove-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="whyussec">
                <div className="row">
                  <div className="col-lg-12">
                    <h3 className="t">Road Map</h3>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <ScrollAnimation className="ybox" animateIn="slideInLeft">
                      <img width={50} src="/img/icons/idea-svgrepo-com.svg" alt="" />
                      <h3>Q1 2022</h3>
                      <ul>
                        <li>Idea and team formed</li>
                        <li>Platform developed</li>
                      </ul>
                    </ScrollAnimation>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <ScrollAnimation className="ybox" animateIn="slideInRight">
                      <img width={50} src="/img/icons/launch-svgrepo-com.svg" alt="" />
                      <h3>Q2 2022</h3>
                      <ul>
                        <li>Launch PrimeDex Project</li>
                        <li>Build the PrimeDex Community</li>
                      </ul>
                    </ScrollAnimation>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <ScrollAnimation className="ybox" animateIn="slideInLeft">
                      <img width={50} src="/img/icons/rain-svgrepo-com.svg" alt="" />
                      <h3>Q3 2022</h3>
                      <ul>
                        <li>Launch the airdrop</li>
                        <li>PrimeDex Starts</li>
                      </ul>
                    </ScrollAnimation>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <ScrollAnimation className="ybox" animateIn="slideInRight">
                      <img width={50} src="/img/icons/exchange-svgrepo-com.svg" alt="" />
                      <h3>Q4 2022</h3>
                      <ul>
                        <li>List on Pancakeswap, Coin marketCap, Coingecko</li>
                        <li>PrimeDex Application Launch</li>
                      </ul>
                    </ScrollAnimation>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <ScrollAnimation className="ybox" animateIn="slideInLeft">
                      <img width={50} src="/img/icons/nft-investiment-sign-non-token-svgrepo-com.svg" alt="" />
                      <h3>Q1 2023</h3>
                      <ul>
                        <li>List PrimeDex Token on 4 big exchanges</li>
                        <li>Vip Card distribution (NFTs)</li>
                        <li>Bi-weekly Buy-Back Strategy Starts</li>
                      </ul>
                    </ScrollAnimation>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <ScrollAnimation className="ybox" animateIn="slideInRight">
                      <img width={50} src="/img/icons/deal-done-partnership-agreement-svgrepo-com.svg" alt="" />
                      <h3>Q2 2023</h3>
                      <ul>
                        <li>PrimeDex partnership program</li>
                        <li>Enable primeDex CARD (NFT)</li>
                        <li>Airdrop for primeDex CARD holders</li>
                      </ul>
                    </ScrollAnimation>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <ScrollAnimation className="ybox" animateIn="slideInLeft">
                      <img width={50} src="/img/icons/puzzle-game-svgrepo-com.svg" alt="" />
                      <h3>Q3 2023</h3>
                      <ul>
                        <li>PrimeDex Game Launch</li>
                        <li>PrimeDex Trading Competition</li>
                        <li>Cross Chain Wallet Network Launch</li>
                      </ul>
                    </ScrollAnimation>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
