import React from "react";
import { useRouter } from "next/router";
import config from "../config/index.json";
import Head from "next/head";
import Header from "../components/other/Header";
import Footer from "../components/other/Footer";
import RegisterAuth from "../components/authentication/RegisterAuth";

const Register = () => {
  const { register } = config;
  const router = useRouter();
  const { flight }: any = router.query;
  const parsedFlight = flight ? JSON.parse(flight) : null;

  return (
    <div>
      <Head>
        <title>{register.title}</title>
        <Header noSvg={true} />
        <RegisterAuth />
        <Footer />
      </Head>
    </div>
  );
};

export default Register;
