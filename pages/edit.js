import React, { useState, useEffect } from 'react';
import PlayerList from '../components/Playerlist';
import Addplayer from '../components/Addplayer';
import Header from '../components/header';
import '../app/globals.css';
import Footer from '../components/footer';

// Modify Player Page
const Add = () => {
    const [Player, setPlayer] = useState([]);

    // useEffect hook to fetch data from the server
    // In your Add component or wherever PlayerList is being rendered
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/Player', { cache: "no-cache" });
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                console.log('Data received:', data); // Verify the structure here
                setPlayer(data); // Assuming setPlayer is the state setter for players
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <p>dsadda</p>
            <h1 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-4">Modify Player</h1>
            <div className="flex-grow">
                <PlayerList players={Player} />
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
