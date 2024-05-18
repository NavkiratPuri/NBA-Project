import React, { useState, useEffect } from 'react';
import PlayerSelector from '../components/PlayerSelector';  // Assuming you have a component for player selection
import Header from '../components/header';
import Footer from '../components/footer';
import '../app/globals.css';

// Trade Simulator Page for comparing and trading players

const TradeSimulator = () => {
    const [players, setPlayers] = useState([]);
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [tradeResult, setTradeResult] = useState('');

    // Fetch all players from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/post', { cache: "no-cache" });
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

    // Function to simulate the trade based on selected players
    const simulateTrade = () => {
        if (!player1 || !player2) {
            setTradeResult('Please select both players to simulate the trade.');
            return;
        }

        // Example trade logic: simply comparing points
        if (Math.abs(player1.PPG - player2.PPG) > 5) {
            setTradeResult('Trade is unfair due to a significant point gap.');
        } else {
            setTradeResult('Trade is fair.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-8 pb-20">
                <h1 className="text-center mb-6">Trade Simulator</h1>
                <div className="flex justify-around">
                    <PlayerSelector players={players} onSelectPlayer={setPlayer1} label="Player 1" />
                    <PlayerSelector players={players} onSelectPlayer={setPlayer2} label="Player 2" />
                </div>
                <button onClick={simulateTrade} className="mt-4 bg-blue-500 text-white p-2">
                    Simulate Trade
                </button>
                {tradeResult && <p className="mt-4 text-center">{tradeResult}</p>}
            </main>
            <Footer />
        </div>
    );
};

export default TradeSimulator;
