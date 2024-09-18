import Header from '@component/Header';
import Hero from '@component/Hero';

import { motion } from 'framer-motion';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
};

export default Home;
