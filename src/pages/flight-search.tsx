import React from "react";
import config from "../config/index.json";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import MainFlightSearch from "../components/fligthSearch/MainFlightSearch";
import Footer from "../components/other/Footer";

const FlightSearch = () => {
  const { search } = config;
  return (
    <div>
      <Head>
        <title>{search.title}</title>
      </Head>
      <PrimaryHeading />
      <MainFlightSearch />
      <Footer />
    </div>
  );
};

export default FlightSearch;
