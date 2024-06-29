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
    const [teamAPlayers, setTeamAPlayers] = useState([]); 
    const [teamBPlayers, setTeamBPlayers] = useState([]); 

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
    const handleSelectPlayer = (player, team, index) => {
        const updatePlayers = (players) => {
            const updatedPlayers = [...players];
            updatedPlayers[index] = player;
            return updatedPlayers;
        };

        if (team === 'A') {
            setTeamAPlayers(updatePlayers(teamAPlayers));
        } else if (team === 'B') {
            setTeamBPlayers(updatePlayers(teamBPlayers));
        }
    };

    const removeLastPlayer = (team) => {
        const updatePlayers = (players) => {
            const updatedPlayers = [...players];
            updatedPlayers.pop();
            return updatedPlayers;
        };
    
        if (team === 'A') {
            setTeamAPlayers(updatePlayers(teamAPlayers));
        } else if (team === 'B') {
            setTeamBPlayers(updatePlayers(teamBPlayers));
        }
    };
    

    // function to determine the color of players calculated value
    // does this by getting the player value of both players
    // then uses if else statement to apply approriate color
    const playerRedGreen = (player, otherPlayer) => {
        if (player == null || otherPlayer == null) return 'text-gray-500';
        const playerValue = calculatePlayerValue(player).totalValue;
        const otherPlayerValue = calculatePlayerValue(otherPlayer).totalValue;

        if (playerValue > otherPlayerValue) {
            return 'text-green-500'
        } else {
            return 'text-red-500'
        }
    };

    // function to add a new player slot
    const addPlayerSlot = (team) => {
        if (team === 'A') {
            setTeamAPlayers([...teamAPlayers, null]);
        } else if (team === 'B') {
            setTeamBPlayers([...teamBPlayers, null]);
        }
    };

    const getTotalValue = (players) => {
        return players.reduce((total, player) => {
            if (player) {
                return total + calculatePlayerValue(player).totalValue;
            }
            return total;
        }, 0);
    };

    const teamATotalValue = getTotalValue(teamAPlayers);
    const teamBTotalValue = getTotalValue(teamBPlayers);

    // render logic
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">

            <Header />

            <main className="flex-grow p-8">
                <h1 className="text-center text-4xl font-bold text-blue-700 mb-6">Trade Simulator</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


                    {/* team a */}
                    <div className="bg-white rounded-lg shadow-md p-6 space-x-2">

                        <h2 className="text-2xl font-bold mb-4">Team A</h2>

                        {teamAPlayers.map((player, index) => (
                            <div key={index} className="mb-4">

                                <PlayerSelector
                                    players={players}
                                    onSelectPlayer={(player) => handleSelectPlayer(player, 'A', index)}
                                    label={`Player ${index + 1}`}
                                />

                                {player && (

                                    <TradeSimulator
                                        player={player}
                                        valueColor="text-blue-500"
                                    />
                                )}
                            </div>
                        ))}
                        <button onClick={() => addPlayerSlot('A')} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
                            Add Player
                        </button>
                
                            <button onClick={() => removeLastPlayer('A')} className="mt-2 p-2 bg-red-500 text-white rounded-md">
                                Remove Player
                            </button>
                    </div>

                        {/* team b */}
                    <div className="bg-white rounded-lg shadow-md p-6 space-x-2">
                        <h2 className="text-2xl font-bold mb-4">Team B</h2>
                        
                        {teamBPlayers.map((player, index) => (
                            <div key={index} className="mb-4">
                                <PlayerSelector
                                    players={players}
                                    onSelectPlayer={(player) => handleSelectPlayer(player, 'B', index)}
                                    label={`Player ${index + 1}`}
                                />
                                {player && (
                                    <TradeSimulator
                                        player={player}
                                        valueColor="text-blue-500"
                                    />
                                )}
                            </div>
                        ))}


                        <button onClick={() => addPlayerSlot('B')} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
                            Add Player
                        </button>

                        <button onClick={() => removeLastPlayer('B')} className="mt-2 p-2 bg-red-500 text-white rounded-md">
                            Remove Player
                        </button>
                        
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-center">Trade Summary</h2>
                    <p className="text-center text-xl font-bold mt-4">Team A Total Value: <span className={teamATotalValue >= teamBTotalValue ? 'text-green-500' : 'text-red-500'}>{teamATotalValue.toFixed(2)}</span></p>
                    <p className="text-center text-xl font-bold mt-4">Team B Total Value: <span className={teamBTotalValue >= teamATotalValue ? 'text-green-500' : 'text-red-500'}>{teamBTotalValue.toFixed(2)}</span></p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Trade;
