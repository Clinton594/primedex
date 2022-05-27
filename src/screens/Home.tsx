import React from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Body from "../components/Body";
import FAQ from "../components/FAQ";
import RoadMap from "../components/RoadMap";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Body />
      {/* <RoadMap />
      <FAQ /> */}
      <Footer />
    </>
  );
}
