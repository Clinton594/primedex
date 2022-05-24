import React, { useState } from "react";

export default function RoadMap() {
  const [translate3d, setTranslate3d] = useState(0);
  const toleft = () => {
    translate3d >= -800 && setTranslate3d(translate3d - 100);
  };
  const toright = () => {
    translate3d <= 0 && setTranslate3d(translate3d + 100);
  };

  return (
    <section id="roadmap" className="block">
      <div className="block remove-top">
        <div className="container fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="roadmapsec color">
                <h3>Road Map</h3>
                <div className="container">
                  <ul className="roadmapNav">
                    <li>
                      <span onClick={toleft}>
                        <i className="fa fa-arrow-left"></i>
                      </span>
                    </li>
                    <li>
                      <span onClick={toright}>
                        <i className="fa fa-arrow-right"></i>
                      </span>
                    </li>
                  </ul>
                  <ul className="roadcontent slick-initialized slick-slider">
                    <div aria-live="polite" className="slick-list draggable">
                      <div
                        className="slick-track"
                        role="listbox"
                        style={{
                          opacity: 1,
                          width: "9457px",
                          transform: `translate3d(${translate3d}px, 0px, 0px)`,
                          transition: "0.4s all",
                        }}
                      >
                        <li
                          className="slick-slide"
                          data-slick-index="2"
                          aria-hidden="true"
                          aria-describedby="slick-slide02"
                          style={{ width: "1351px" }}
                        >
                          <div className="rmcontent">
                            <div
                              className="roadmap wow fadeInUp"
                              data-wow-delay="0s"
                              style={{ visibility: "visible", animationDelay: "0s", animationName: "fadeInUp" }}
                            >
                              <i className="cl1"></i>
                              <h3>(Q4, 2021)</h3>
                              <ul>
                                <li>Ideas developed</li>
                                <li>Team formed</li>
                              </ul>
                            </div>
                            <div
                              className="roadmap wow fadeInUp"
                              data-wow-delay="0.2s"
                              style={{ visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp" }}
                            >
                              <i className="cl2"></i>
                              <h3>(Q1, 2022)</h3>
                              <ul>
                                <li>Plans Begin</li>
                                <li>Platform Developed</li>
                              </ul>
                            </div>
                            <div
                              className="roadmap wow fadeInUp"
                              data-wow-delay="0.4s"
                              style={{ visibility: "visible", animationDelay: "0.4s", animationName: "fadeInUp" }}
                            >
                              <i className="cl3"></i>
                              <h3>(Q2, 2022)</h3>
                              <ul>
                                <li>Launching of GaraSwap Protocol</li>
                                <li>Adverts and Airdrop Campaign</li>
                                <li>Private Sale</li>
                                <li>Pre-Sale</li>
                              </ul>
                            </div>
                            <div
                              className="roadmap wow fadeInUp"
                              data-wow-delay="0.6s"
                              style={{ visibility: "visible", animationDelay: "0.6s", animationName: "fadeInUp" }}
                            >
                              <i className="cl4"></i>
                              <h3>(Q3, 2022)</h3>
                              <ul>
                                <li>Public Sales</li>
                                <li>DEX listing of $GASP</li>
                                <li>Coingecko and CoinMarketCap Listings</li>
                              </ul>
                            </div>
                            <div
                              className="roadmap wow fadeInUp"
                              data-wow-delay="0.8s"
                              style={{ visibility: "visible", animationDelay: "0.8s", animationName: "fadeInUp" }}
                            >
                              <i className="cl5"></i>
                              <h3>(Q4, 2022)</h3>
                              <ul>
                                <li>Gara Swap DEX starts</li>
                                <li>Launching of GaraSwap DEX web3.0 App</li>
                                <li>Community Airdrop Distributions</li>
                                <li>Listing of $GASP in 2nd Tier CEX Exchanges(e.g.Gate.io & Kucoin)</li>
                              </ul>
                            </div>
                            <div
                              className="roadmap wow fadeInUp"
                              data-wow-delay="0.8s"
                              style={{ visibility: "visible", animationDelay: "0.8s", animationName: "fadeInUp" }}
                            >
                              <i className="cl5"></i>
                              <h3>(Q1, 2023)</h3>
                              <ul>
                                <li>Releasing of Lending Protocol Architectural Lite Paper V2.0</li>
                                <li>GaraSwap Protocol Partnerships</li>
                                <li>Cross-Chain Bridge Integrations</li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        <li
                          className="slick-slide"
                          data-slick-index="2"
                          aria-hidden="true"
                          aria-describedby="slick-slide02"
                          style={{ width: "1351px" }}
                        >
                          <div className="rmcontent d-flex">
                            <div
                              className="roadmap wow fadeInUp"
                              data-wow-delay="0.8s"
                              style={{ visibility: "visible", animationDelay: "0.8s", animationName: "fadeInUp" }}
                            >
                              <i className="cl5"></i>
                              <h3>(Q2, 2023)</h3>
                              <ul>
                                <li>Metaverse NFT Games Partnerships</li>
                                <li>Distribution of GaraUtility Card (GUC) cards</li>
                              </ul>
                            </div>
                            <div
                              className="roadmap wow fadeInUp"
                              data-wow-delay="0.8s"
                              style={{ visibility: "visible", animationDelay: "0.8s", animationName: "fadeInUp" }}
                            >
                              <i className="cl5"></i>
                              <h3>(Q3, 2023)</h3>
                              <ul>
                                <li>Releasing of Gara-Walet</li>
                                <li>Lending Protocol Launching</li>
                                <li>Roadmap Updates (Roadmapv2)</li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
