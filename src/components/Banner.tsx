import $ from "jquery";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../constants/routes";
import ScrollAnimation from "react-animate-on-scroll";

export default function Banner() {
  const [scroller, setScroll] = useState(0);

  useEffect(() => {
    $(window).on("scroll", function () {
      const scroll = $(window).scrollTop() || 0;
      setScroll(scroll / 10);
    });
  }, [scroller]);

  return (
    <section>
      <div className="block split remove-top lines ophalf">
        <div
          style={{ position: "fixed", backgroundImage: "url(/img/bg/527891.jpg)" }}
          className="parallax no-parallax scrolly-invisible"
        >
          <div className="overlay"></div>
        </div>
        <img
          src="img/bg/p3.png"
          className="vx"
          alt=""
          data-enllax-ratio="-0.1"
          data-enllax-type="foreground"
          style={{ transform: `translateY(${scroller}px)`, transition: "0.4s all" }}
        />

        <div className="container fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="fsec s3">
                <div className="finfos wow fadeIn" data-wow-delay="0s">
                  <h3>
                    The word's reliable
                    <br /> top quality<strong> DEX</strong>
                  </h3>
                  <p>
                    Our company specializes on decentralized exchange for instance swap of Bep - 20 token
                    <br />
                    with unique features of limit orders, stop-losses, sniper, staking, yielding.
                  </p>
                  <ul className="btns">
                    <li>
                      <Link className="theme-btn gradient" to={routes.presale}>
                        Join Presale
                      </Link>
                    </li>
                    <li>
                      <Link to="#" download={true} className="theme-btn blank">
                        Download White Paper
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="fimg">
                  <ScrollAnimation delay={600} animateIn="slideInUp" animateOut="fadeOut">
                    <img src="img/bg/metamask.svg" className="breathing" alt="" />
                  </ScrollAnimation>
                </div>
              </div>
              <div className="scrolldown">
                <a href="#scrolldown" title="">
                  Scroll Down
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
