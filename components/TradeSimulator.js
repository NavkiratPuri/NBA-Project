import React, { useState, useEffect } from 'react';

// Components for UI elements
import PlayerSelector from '../components/PlayerSelector';


const TradeSimulator = () => {
    const [players, setPlayers] = useState([]);
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [tradeResult, setTradeResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch all players from the server
    useEffect(() => {
        setIsLoading(true);
        fetch('/api/player')
            .then(res => res.json())
            .then(data => {
                setPlayers(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Error fetching players:', err);
                setError('Failed to load players.');
                setIsLoading(false);
            });
    }, []);

    // Handle trade simulation
    const handleTrade = async () => {
        if (!player1 || !player2) {
            setTradeResult('Please select both players to simulate the trade.');
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch('/api/trade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ player1Id: player1.id, player2Id: player2.id })
            });
            const result = await res.json();
            setTradeResult(result.message);
            setIsLoading(false);
        } catch (error) {
            console.error('Error processing trade:', error);
            setTradeResult('Failed to process the trade.');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-8 pb-20">
                <h1 className="text-center mb-6">Trade Simulator</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="flex justify-around">
                    <PlayerSelector players={players} onSelectPlayer={setPlayer1} label="Player 1" />
                    <PlayerSelector players={players} onSelectPlayer={setPlayer2} label="Player 2" />
                </div>
                <button onClick={handleTrade} className="mt-4 bg-blue-500 text-white p-2" disabled={isLoading}>
                    Simulate Trade
                </button>
                {tradeResult && <p className="mt-4 text-center">{tradeResult}</p>}
                {isLoading && <p className="text-center">Processing trade...</p>}
            </main>
            <Footer />
        </div>
    );
};

export default TradeSimulator;
