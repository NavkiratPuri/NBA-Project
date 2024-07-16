'use client'
import React, { useState, useEffect } from 'react';
import PlayerSelector from '@/components/PlayerSelector';
import TradeSimulator from '@/components/TradeSimulator';
import Header from '@/components/header';
import Footer from '@/components/footer';
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

    const handleSelectPlayer = (player, team) => {
        if (team === 'A') {
            setTeamAPlayers([...teamAPlayers, player]);
        } else if (team === 'B') {
            setTeamBPlayers([...teamBPlayers, player]);
        }
    };

    const handleRemovePlayer = (index, team) => {
        if (team === 'A') {
            setTeamAPlayers(teamAPlayers.filter((_, i) => i !== index));
        } else if (team === 'B') {
            setTeamBPlayers(teamBPlayers.filter((_, i) => i !== index));
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

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg shadow-md p-2">
                        <PlayerSelector
                            players={players}
                            onSelectPlayer={(player) => handleSelectPlayer(player, 'A')}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {teamAPlayers.map((player, index) => (
                                <TradeSimulator
                                    key={index}
                                    player={player}
                                    onRemove={() => handleRemovePlayer(index, 'A')}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="">
                        <PlayerSelector
                            players={players}
                            onSelectPlayer={(player) => handleSelectPlayer(player, 'B')}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {teamBPlayers.map((player, index) => (
                                <TradeSimulator
                                    key={index}
                                    player={player}
                                    onRemove={() => handleRemovePlayer(index, 'B')}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex justify-center items-center gap-8 mt-2">
                        <div className="bg-white rounded-lg shadow-md p-2 text-center">
                            <p className={`text-2xl font-bold ${teamATotalValue >= teamBTotalValue ? 'text-green-500' : 'text-red-500'}`}>
                                {teamATotalValue.toFixed(2)}
                            </p>
                        </div><p className='font-bold text-2xl'>VS</p>
                        <div className="bg-white rounded-lg shadow-md p-2 text-center">
                            <p className={`text-2xl font-bold ${teamBTotalValue >= teamATotalValue ? 'text-green-500' : 'text-red-500'}`}>
                                {teamBTotalValue.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Trade; 