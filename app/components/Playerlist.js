import React, { useState, useEffect } from 'react';
import Player from './Player';
import axios from 'axios';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/player');
            if (response.data) {
                setPlayers(response.data);
                setFilteredPlayers(response.data);
            }
            setError('');
        } catch (err) {
            setError('Failed to fetch players');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePlayer = (id, updatedPlayer) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.id === id ? { ...player, ...updatedPlayer } : player
            )
        );
    };

    const handleDeletePlayer = (id) => {
        setPlayers(prevPlayers =>
            prevPlayers.filter(player => player.id !== id)
        );
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        setSearchTerm(inputValue);
        const newFilteredPlayers = players.filter(player =>
            player.Player?.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredPlayers(newFilteredPlayers);
    };

    return (
        <div className="container mx-auto">
            <input
                type="text"
                placeholder="Search by player name..."
                value={inputValue}
                onChange={handleInputChange}
                className="p-2 my-2 w-full border border-gray-300 rounded-md"
            />

            <button onClick={handleSearch} className="p-2 mt-2 bg-blue-500 text-white w-full rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Search
            </button>
            <div className="max-h-screen overflow-y-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-center">
                            <th className="px-4 py-2">Rank</th>
                            <th className="px-4 py-2">Player</th>
                            <th className="px-4 py-2">Position</th>
                            <th className="px-4 py-2">Team</th>
                            <th className="px-4 py-2">Games Played</th>
                            <th className="px-4 py-2">Games Started</th>
                            <th className="px-4 py-2">Minutes Played</th>
                            <th className="px-4 py-2">Field Goals</th>
                            <th className="px-4 py-2">Field Goal Attempts</th>
                            <th className="px-4 py-2">Field Goal Percentage</th>
                            <th className="px-4 py-2">Three-Point Field Goals</th>
                            <th className="px-4 py-2">Three-Point Field Goal Attempts</th>
                            <th className="px-4 py-2">Three-Point Field Goal Percentage</th>
                            <th className="px-4 py-2">Two-Point Field Goals</th>
                            <th className="px-4 py-2">Two-Point Field Goal Attempts</th>
                            <th className="px-4 py-2">Two-Point Field Goal Percentage</th>
                            <th className="px-4 py-2">Effective Field Goal Percentage</th>
                            <th className="px-4 py-2">Free Throws</th>
                            <th className="px-4 py-2">Free Throw Attempts</th>
                            <th className="px-4 py-2">Free Throw Percentage</th>
                            <th className="px-4 py-2">Offensive Rebounds</th>
                            <th className="px-4 py-2">Defensive Rebounds</th>
                            <th className="px-4 py-2">Total Rebounds</th>
                            <th className="px-4 py-2">Assists</th>
                            <th className="px-4 py-2">Steals</th>
                            <th className="px-4 py-2">Blocks</th>
                            <th className="px-4 py-2">Turnovers</th>
                            <th className="px-4 py-2">Personal Fouls</th>
                            <th className="px-4 py-2">Points</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredPlayers.map(player => (
                            <Player
                                key={player.id}
                                player={player}
                                onPlayerUpdate={handleUpdatePlayer}
                                onPlayerDelete={handleDeletePlayer}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlayerList;
