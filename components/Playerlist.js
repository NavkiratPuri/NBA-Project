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
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

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

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedPlayers = [...filteredPlayers].sort((a, b) => {
            const aValue = isNaN(a[key]) ? a[key] : parseFloat(a[key]);
            const bValue = isNaN(b[key]) ? b[key] : parseFloat(b[key]);

            if (aValue < bValue) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setFilteredPlayers(sortedPlayers);
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
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('Rk')}>Rank</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('Player')}>Player</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('Pos')}>Position</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('Tm')}>Team</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('G')}>Games Played</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('GS')}>Games Started</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('MP')}>Minutes Played</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('FG')}>Field Goals</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('FGA')}>Field Goal Attempts</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('FGPercent')}>Field Goal Percentage</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('threeP')}>Three-Point Field Goals</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('threePA')}>Three-Point Field Goal Attempts</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('threePPercent')}>Three-Point Field Goal Percentage</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('twoP')}>Two-Point Field Goals</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('twoPA')}>Two-Point Field Goal Attempts</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('twoPPercent')}>Two-Point Field Goal Percentage</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('eFGPercent')}>Effective Field Goal Percentage</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('FT')}>Free Throws</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('FTA')}>Free Throw Attempts</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('FTPercent')}>Free Throw Percentage</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('ORB')}>Offensive Rebounds</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('DRB')}>Defensive Rebounds</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('TRB')}>Total Rebounds</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('AST')}>Assists</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('STL')}>Steals</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('BLK')}>Blocks</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('TOV')}>Turnovers</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('PF')}>Personal Fouls</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('PTS')}>Points</th>
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
