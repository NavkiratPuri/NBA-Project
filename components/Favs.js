'use client'
import React, { useState, useEffect } from 'react';
import PlayerSelector from '@/components/PlayerSelector';
import playerData from '@/utils/playerData';
import axios from 'axios';
import FavDisplay from './FavDisplay';
import fetchPlayer from '@/utils/fetchPlayer';


const Favs = ({email, playerId, teamId}) => {
    
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([null]);
    const [favPlayer, setFavPlayer] = useState(null);
    const [favPlayerId, setFavplayerId] = useState(playerId);
    
    useEffect(() => {

        
        const getFavPlayerData = async () => {
            try {
                const data = await fetchPlayer(playerId);
                console.log('data:', data);
                setFavPlayer(data);
            } catch (err) {
                setError(err.message);
            }
        };

        if (playerId) {
        getFavPlayerData();
        console.log('playerId:', playerId);
    }
    }, [playerId]);


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

    useEffect(() => {
        console.log('Updated favPlayerId:', favPlayerId);
      }, [favPlayerId]);
    
    const handleSelectPlayer = (player) => {
        setFavPlayer(player);
        setFavplayerId(player.id);
        updateFavPlayer(player.id);
        
    };

    const updateFavPlayer = async (playerId) => {
        try {
            const response = await axios.patch('/api/user', {
                favPlayerId: playerId
            });
            console.log('response:', response);
        }
        catch (error) {
            console.error('Error updating favPlayer:', error);
        }
    }



    return (
        <div className="bg-white rounded-lg shadow-md p-6">

            {/* <p>debug email: {email}</p>
            <p>debug favplayerId: {playerId}</p>
            <p>debug favteamId: {teamId}</p>
            <p>debug favPlayerid realtime: {favPlayerId}</p> */}

            
            {/* <p>debug favPlayer: {favPlayer?.name}</p> */}

             <FavDisplay player={favPlayer}/>
                      
            <h2 className="text-2xl font-semibold mt-4">Change Your Favorite Player:</h2>
            <PlayerSelector
                            players={players}
                            onSelectPlayer={(player) => handleSelectPlayer(player)}
                            label="Favorite Player"
                        />


        </div>
    );
};

export default Favs;
