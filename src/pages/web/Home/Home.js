import React from 'react';
import { WebHeader } from '../../../components/web/Header/WebHeader';
import { Footer } from '../../../components/web/Footer/Footer';
import { HomeHero } from '../HomeHero/HomeHero';
import { NewsCard } from '../News/NewsCard';
import { EventSlider } from '../EventSlider/EventSlider';

export const Home = () => {
  return (
    <>
      <WebHeader />
      <HomeHero />
      <NewsCard limit={3} /> {/* Only 3 News Cards */}
      <EventSlider />
      <Footer />
    </>
  );
};
