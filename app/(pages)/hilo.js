'use client'
import React from 'react';
import HiLo from '../../components/HiLo';
import Header from '../../components/header';
import Footer from '../../components/footer';

const hilo = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow">
      {/* <main className="flex-grow justify-content content-center"> */}
        <HiLo />
      </main>
      <Footer />
    </div>
  );
};

export default hilo;
