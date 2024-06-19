'use client'
import React, { useState, useEffect } from 'react';
import LeadersList from '../../components/Leagueleader';
import Header from '../../components/header';
import '../app/globals.css';
import Footer from '../../components/footer';

// Leaders Page for best performing players

const Leaders = () => {
    const [players, setPlayers] = useState([]);

    // useEffect hook to fetch data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/player', { cache: "no-cache" });
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-8 pb-20">
                <LeadersList players={players} />
            </main>
            <Footer />
        </div>
    );
};

export default Leaders;
