'use client'
import React from 'react';
import Header from '@/components/header';
//import '../app/globals.css';
import Footer from '@/components/footer';
import StandingsDisplay from '@/components/StandingsDisplay';
const Standings = () => {
    return (
        <div>
            <Header />
            <StandingsDisplay />
            <Footer />
        </div>
    );
};

export default Standings;
