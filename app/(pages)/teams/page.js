
'use client'

import React from 'react';
import Header from '@/components/header';
import TeamList from '@/components/TeamList';
import Footer from '@/components/footer';

const TeamsPage = () => {
  return (
    <div>
      <Header />
      <main className='min-h-screen'>
        <TeamList />
      </main>
      <Footer />
    </div>
  );
};

export default TeamsPage;
