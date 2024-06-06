import React, { useState, useEffect } from 'react';
import PlayerList from '../components/Playerlist';
import Addplayer from '../components/Addplayer';
import Header from '../components/header';
import '../app/globals.css';
import Footer from '../components/footer';

// Modify Player Page
const Add = () => {


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <h1 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-4">Modify Player</h1>
            <div className="flex-grow">
                <PlayerList />
                <div className="py-8 ml-4">
                    <Addplayer />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Add;
