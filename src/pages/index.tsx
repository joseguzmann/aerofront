import React from 'react';

import About from '../components/other/About';
import Canvas from '../components/other/Canvas';
import Header from '../components/other/Header';
import LazyShow from '../components/other/LazyShow';
import MainHero from '../components/other/MainHero';
import MainHeroImage from '../components/other/MainHeroImage';
import Divider from "../components/other/Divider";
import Dashboard from "../components/dashboard/Dashboard";


const App = () => {
  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header />
            <MainHero />
          </div>
        </div>
        <MainHeroImage />
      </div>
        <Divider />
      <LazyShow>
        <>
          <Dashboard />
        </>
      </LazyShow>
      <LazyShow>
        <>
            <Canvas />
          <About />
        </>
      </LazyShow>
    </div>
  );
};

export default App;
