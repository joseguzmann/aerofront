import React from "react";
import Head from "next/head";
import config from "../config/index.json";
import Header from "../components/other/Header";

const LoginPage = () => {
  const { login } = config;
  return (
    <div>
      <Head>
        <title>{login.title}</title>
      </Head>
      <Header />
    </div>
  );
};

export default LoginPage;
