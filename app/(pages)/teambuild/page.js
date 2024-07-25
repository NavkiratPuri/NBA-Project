'use client'
import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Team from '@/components/TeamBuild/team'

const teambuild = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow">
      <h1 className="text-3xl font-bold text-center mb-4">Team Builder</h1>
        <Team/>
      </main>
      <Footer />
    </div>
    
  );
};

export default teambuild;
