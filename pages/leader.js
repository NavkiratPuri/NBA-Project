import React, { useState, useEffect } from 'react';
import LeadersList from '../components/Leagueleader';
import Header from '../components/header';
import '../app/globals.css';
import Footer from '../components/footer';

// Leaders Page for best performing players

const Leaders = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-8 pb-20">
                <LeadersList />
            </main>
            <Footer />
        </div>
    );
};

export default Leaders;
