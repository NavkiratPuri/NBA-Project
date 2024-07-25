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
                            {['Rk', 'Player', 'Pos', 'Tm', 'G', 'GS', 'MP', 'FG', 'FGA', 'FGPercent', 'threeP', 'threePA', 'threePPercent', 'twoP', 'twoPA', 'twoPPercent', 'eFGPercent', 'FT', 'FTA', 'FTPercent', 'ORB', 'DRB', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF', 'PTS'].map((key) => (
                                <th
                                    key={key}
                                    className={`px-4 py-2 cursor-pointer ${sortConfig.key === key ? 'bg-gray-200 text-gray-800' : ''}`}
                                    onClick={() => handleSort(key)}
                                >
                                    {key}
                                </th>
                            ))}
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
