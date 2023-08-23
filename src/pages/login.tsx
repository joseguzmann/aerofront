import React from "react";
import Head from "next/head";
import config from "../config/index.json";
import Header from "../components/other/Header";
import LoginAuth from "../components/authentication/LoginAuth";
import Footer from "../components/other/Footer";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const { flight }: any = router.query;
  const parsedFlight = flight ? JSON.parse(flight) : null;

  const { login } = config;
  return (
    <div>
      <Head>
        <title>{login.title}</title>
      </Head>
      <Header noSvg={true} />

      <LoginAuth flight={parsedFlight} />
      <Footer />
    </div>
  );
};

export default LoginPage;
