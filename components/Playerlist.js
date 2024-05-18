"use client"
import React, { useState, useEffect } from 'react';
import Player from './Player';
import axios from 'axios';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPlayers();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            setFilteredPlayers(players.filter(player =>
                player.name && player.name.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } else {
            setFilteredPlayers(players);
        }
    }, [players, searchTerm]);

    const fetchPlayers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/Player');
            if (response.data) {
                setPlayers(response.data);
                setFilteredPlayers(response.data);  // Initially set filteredPlayers to all players
            }
            setError('');
        } catch (err) {
            setError('Failed to fetch players');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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

    if (error) return <div>Error: {error}</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="p-2 mb-4 w-full"
            />
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
