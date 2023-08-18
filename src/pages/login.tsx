import React from "react";
import Head from "next/head";
import config from "../config/index.json";
import Header from "../components/other/Header";
import LoginAuth from "../components/authentication/LoginAuth";
import PrimaryHeading from "../components/other/PrimaryHeading";
import Footer from "../components/other/Footer";

const LoginPage = () => {
  const { login } = config;
  return (
    <div>
      <Head>
        <title>{login.title}</title>
      </Head>
      <Header noSvg={true} />

      <LoginAuth />
      <Footer />
    </div>
  );
};

export default LoginPage;
