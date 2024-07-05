'use client'
import React, { useState, useEffect } from 'react';
import PlayerSelector from '@/components/PlayerSelector';
import TradeSimulator from '@/components/TradeSimulator';
import Header from '@/components/header';
import Footer from '@/components/footer';
//import '../app/globals.css';
import playerData from '@/utils/playerData';
import { calculatePlayerValue } from '@/utils/calculateValue';
import axios from 'axios';
import FavDisplay from './FavDisplay';


const Favs = ({email, playerId, teamId}) => {
    
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([null]);
    const [favPlayer, setFavPlayer] = useState(null);
    const [favPlayerId, setFavplayerId] = useState(playerId);
    


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

    // useEffect(() => {
    //     if (favPlayerId) {
    //         updateFavPlayer(favPlayerId);
    //     }
    // }
    // , [favPlayerId]);

    

    return (
        <div className="bg-white rounded-lg shadow-md p-6">

            <p>debug email: {email}</p>
            <p>debug favplayerId: {playerId}</p>
            <p>debug favteamId: {teamId}</p>
            <p>debug favPlayerid realtime: {favPlayerId}</p>

            <PlayerSelector
                            players={players}
                            onSelectPlayer={(player) => handleSelectPlayer(player)}
                            label="Favorite Player"
                        />

            
             <FavDisplay player={favPlayer}/>
                      
            
        </div>
    );
};

export default Favs;
