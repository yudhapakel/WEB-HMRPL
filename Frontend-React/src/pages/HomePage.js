import React from 'react';
import Hero from '../components/Hero/Hero';
import KabarTerkini from '../components/KabarTerkini/KabarTerkini';
import Awarding from '../components/Awarding/Awarding';
import Galeri from '../components/Galeri/Galeri';
import Kalender from '../components/Kalender/Kalender';

const HomePage = () => {
  return (
    <>
      <Hero />
      <KabarTerkini />
      <Awarding />
      <Galeri />
      <Kalender />
    </>
  );
};

export default HomePage;