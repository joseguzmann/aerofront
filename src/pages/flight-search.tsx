import React from "react";
import config from "../config/index.json";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";


const FlightSearch = () => {
  const { search } = config;
  return (
    <div className="relative">
      <Head>
        <title>{search.title}</title>
      </Head>
      <PrimaryHeading />
    </div>
  );
};

export default FlightSearch;
