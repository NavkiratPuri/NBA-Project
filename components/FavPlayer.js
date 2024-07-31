'use client'
import React, { useState, useEffect } from 'react';
import FavPlayerSelector from '@/components/FavPlayerSelector';
import currentPlayers from '@/utils/currentPlayers';
import axios from 'axios';
import FavPlayerDisplay from './FavPlayerDisplay';
import fetchPlayer from '@/utils/fetchPlayer';
import fetchPlayerImage from '@/utils/fetchPlayerImage';

const FavPlayer = ({ playerId }) => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [favPlayer, setFavPlayer] = useState(null);
  const [favPlayerId, setFavplayerId] = useState(playerId);
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFavPlayerData = async () => {
      try {
        const data = await fetchPlayer(playerId);
        console.log('data:', data);
        setFavPlayer(data);
        console.log('favPlayer:', data.Player);

        const imgData = await fetchPlayerImage(data.Player);
        console.log('imgData:', imgData);
        if (imgData) {
          setImgSrc(imgData.ImageSource);
        }
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
        const data = await currentPlayers();
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

  const handleSelectPlayer = async (player) => {
    setFavPlayer(player);
    setFavplayerId(player.id);

    try {
      const imgData = await fetchPlayerImage(player.Player);
      if (imgData && imgData.ImageSource) {
        setImgSrc(imgData.ImageSource);
      }
    } catch (error) {
      console.error('Error fetching player image:', error);
    }
  };

  const updateFavPlayer = async (playerId) => {
    try {
      const response = await axios.patch('/api/user', {
        favPlayerId: playerId
      });
      console.log('response:', response);
    } catch (error) {
      console.error('Error updating favPlayer:', error);
    }
  };

  const handleSave = () => {
    updateFavPlayer(favPlayerId);
    alert('Favorite Player Updated');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <FavPlayerDisplay player={favPlayer} imgsrc={imgSrc} />
      <h2 className="text-2xl font-semibold mt-4">Edit Favorite Player:</h2>
      <FavPlayerSelector
        players={players}
        onSelectPlayer={handleSelectPlayer}
        label="Change Favorite Player:"
      />
      <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Save
      </button>
    </div>
  );
};

export default FavPlayer;
