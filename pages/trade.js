import React, { useState, useEffect } from 'react';
import PlayerSelector from '../components/PlayerSelector';
import TradeSimulator from '@/components/TradeSimulator';
import Header from '../components/header';
import Footer from '../components/footer';
import '../app/globals.css';
import playerData from '../utils/playerData'; 


const Trade = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([null]);

    //fetch player data from util playerdata function
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await playerData();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchPlayers();
    }, []);

    // handle player selection
    const handleSelectPlayer = (player, slot) => {
        setSelectedPlayers(prevState => ({
            ...prevState,
            [slot]: player
        }));
    };




    return (
        <div className="flex flex-col min-h-screen">

            <Header />

            <main className="flex-grow p-8">

                <h1 className="text-center text-3xl font-bold mb-6">Trade Simulator</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">

                    <PlayerSelector 
                    players={players}
                     onSelectPlayer = {(player) => handleSelectPlayer (player, 'player1')}
                     label="Player 1" />

                    <PlayerSelector 
                    players={players} 
                    onSelectPlayer= {(player) => handleSelectPlayer (player, 'player2')} 
                    label="Player 2" />

                    <TradeSimulator player1={selectedPlayers.player1} player2={selectedPlayers.player2}></TradeSimulator>

                </div>

            </main>

            <Footer />

        </div>
    );
};

export default Trade;
