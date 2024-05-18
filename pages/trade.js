import React, { useState, useEffect } from 'react';
import PlayerSelector from '../components/PlayerSelector';
import Header from '../components/header';
import Footer from '../components/footer';
import '../app/globals.css';

const TradeSimulator = () => {
    const [players, setPlayers] = useState([]);
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [tradeResult, setTradeResult] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/post', { cache: "no-cache" });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const simulateTrade = () => {
        if (!player1 || !player2) {
            setTradeResult('Please select both players to simulate the trade.');
            return;
        }
        if (Math.abs(player1.PPG - player2.PPG) > 5) {
            setTradeResult('Trade is unfair due to a significant point gap.');
        } else {
            setTradeResult('Trade is fair.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-8">
                <h1 className="text-center text-3xl font-bold mb-6">Trade Simulator</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                    <PlayerSelector players={players} onSelectPlayer={setPlayer1} label="Player 1" />
                    <PlayerSelector players={players} onSelectPlayer={setPlayer2} label="Player 2" />
                </div>
                <button onClick={simulateTrade} className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    Simulate Trade
                </button>
                {tradeResult && <p className="mt-4 text-center text-lg">{tradeResult}</p>}
            </main>
            <Footer />
        </div>
    );
};

export default TradeSimulator;
