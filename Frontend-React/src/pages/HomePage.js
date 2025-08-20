import React from 'react';
import Hero from '../components/Hero/Hero';
import KabarTerkini from '../components/KabarTerkini/KabarTerkini';
import Awarding from '../components/Awarding/Awarding';
import Galeri from '../components/Galeri/Galeri';
import Kalender from '../components/Kalender/Kalender';
import OprecSection from '../components/Rekrutmen/OprecSection';


const HomePage = () => {
  return (
    <>
      <Hero />
      <OprecSection />
      <KabarTerkini />
      <Awarding />
      <Galeri />
      <Kalender />
    </>
  );
};

export default HomePage;