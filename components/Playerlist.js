"use client"
import React, { useState, useEffect } from 'react';
import Player from './Player';
import axios from 'axios';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // Adding searchTerm state
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
                setFilteredPlayers(response.data); // Initially set filteredPlayers to all players
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

    // Function to handle search
    const handleSearch = () => {
        setSearchTerm(inputValue);
        const newFilteredPlayers = players.filter(player =>
            player.Player?.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredPlayers(newFilteredPlayers); // Update the filteredPlayers state
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by player name..."
                value={inputValue}
                onChange={handleInputChange}
                className="p-2 my-2 w-full" // Ensuring the input field uses full width
            />

            <button onClick={handleSearch} className="p-2 mt-2 bg-blue-500 text-white w-full">
                Search
            </button>
            <ul>
                {filteredPlayers.map(player => (
                    <Player
                        key={player.id}
                        player={player}
                        onPlayerUpdate={handleUpdatePlayer}
                        onPlayerDelete={handleDeletePlayer}
                    />
                ))}
            </ul>
        </div>
    );
};

export default PlayerList;
