import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

export default function FAQ() {
  return (
    <section id="six">
      <div className="block">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="faqsec">
                <h3>Frequently Asked Question</h3>
                <div id="toggle-widget" className="experties row">
                  <div className="col-md-6">
                    <ScrollAnimation animateIn="slideInLeft" animateOut="slideOutLeft">
                      <h2 className="wow fadeInUp text-primary" data-wow-delay="0s">
                        What is a cryptocurrency?
                      </h2>
                      <div className="content">
                        <p className="p-0">
                          At its core, cryptocurrency is typically decentralized digital money designed to be used over
                          the internet.
                        </p>
                      </div>
                    </ScrollAnimation>
                  </div>
                  <div className="col-md-6">
                    <ScrollAnimation animateIn="slideInRight" animateOut="slideOutRight">
                      <h2 className="wow fadeInUp text-warning" data-wow-delay="0s">
                        What is a crypto wallet?
                      </h2>
                      <div className="content">
                        <p className="p-0">
                          Crypto wallets store your private keys, keeping your crypto safe and accessible. They also
                          allow you to send, receive, and spend cryptocurrencies like Bitcoin and Ethereum.
                        </p>
                      </div>
                    </ScrollAnimation>
                  </div>
                  <div className="col-md-6">
                    <ScrollAnimation animateIn="slideInLeft" animateOut="slideOutLeft">
                      <h2 className="wow fadeInUp text-success" data-wow-delay="0s">
                        Why is an ICO ?
                      </h2>
                      <div className="content">
                        <p className="p-0">
                          An initial coin offering or initial currency offering is a type of funding using
                          cryptocurrencies. It is often a form of crowdfunding, although a private ICO which does not
                          seek public investment is also possible.
                        </p>
                      </div>
                    </ScrollAnimation>
                  </div>
                  <div className="col-md-6">
                    <ScrollAnimation animateIn="slideInRight" animateOut="slideOutRight">
                      <h2 className="wow fadeInUp text-info" data-wow-delay="0s">
                        What is a Token
                      </h2>
                      <div className="content">
                        <p className="p-0">
                          A Token is just another word for cryptocurrency, it often refers to any cryptocurrency besides
                          Bitcoin and Ethereum (even though they are also technically tokens). Because Bitcoin and
                          Ethereum are by far the biggest two cryptocurrencies, it’s useful to have a word to describe
                          the universe of other coins.
                        </p>
                      </div>
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
