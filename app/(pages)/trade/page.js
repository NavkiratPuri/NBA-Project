'use client'
import React, { useState, useEffect } from 'react';
import PlayerSelector from '@/components/PlayerSelector';
import TradeSimulator from '@/components/TradeSimulator';
import Header from '@/components/header';
import Footer from '@/components/footer';
//import '../app/globals.css';
import playerData from '@/utils/playerData';
import { calculatePlayerValue } from '@/utils/calculateValue';


const Trade = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([null]);

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


    // function to update the state of selected player
    // when player is chosen from dropdown menu replaces previous player in slot
    const handleSelectPlayer = (player, slot) => {
        setSelectedPlayers(prevState => ({
            ...prevState,
            [slot]: player
        }));
    };

    // function to determine the color of players calculated value
    // does this by getting the player value of both players
    // then uses if else statement to apply approriate color
    const playerRedGreen = (player, otherPlayer) => {
        if (player == null || otherPlayer == null) return 'text-gray-700';
        const playerValue = calculatePlayerValue(player);
        const otherPlayerValue = calculatePlayerValue(otherPlayer);

        if (playerValue > otherPlayerValue) {
            return 'text-green-500'
        } else {
            return 'text-red-500'
        }
    };



    // render logic
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">

            <Header />

            <main className="flex-grow p-8">

                <h1 className="text-center text-4xl font-bold text-blue-700 mb-6">Trade Simulator</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <PlayerSelector
                            players={players}
                            onSelectPlayer={(player) => handleSelectPlayer(player, 'player1')}
                            label="Player 1"
                        />
                        {selectedPlayers.player1 && (
                            <TradeSimulator player={selectedPlayers.player1}
                                valueColor={playerRedGreen(selectedPlayers.player1, selectedPlayers.player2)}
                            />
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <PlayerSelector
                            players={players}
                            onSelectPlayer={(player) => handleSelectPlayer(player, 'player2')}
                            label="Player 2"
                        />
                        {selectedPlayers.player2 && (
                            <TradeSimulator player={selectedPlayers.player2}
                                valueColor={playerRedGreen(selectedPlayers.player2, selectedPlayers.player1)} />
                        )}
                    </div>

                </div>

            </main>

            <Footer />

        </div>
    );
};

export default Trade;
