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
  const [favPlayer, setFavPlayer] = useState(null);
  const [favPlayerId, setFavPlayerId] = useState(playerId);
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode

  useEffect(() => {
    const getFavPlayerData = async () => {
      try {
        const data = await fetchPlayer(playerId);
        setFavPlayer(data);
        const imgData = await fetchPlayerImage(data.Player);
        if (imgData) {
          setImgSrc(imgData.ImageSource);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (playerId) {
      getFavPlayerData();
    }
  }, [playerId]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await currentPlayers();
        setPlayers(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPlayers();
  }, []);

  const handleSelectPlayer = async (player) => {
    setFavPlayer(player);
    setFavPlayerId(player.id);

    try {
      const imgData = await fetchPlayerImage(player.Player);
      if (imgData && imgData.ImageSource) {
        setImgSrc(imgData.ImageSource);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const updateFavPlayer = async (playerId) => {
    try {
      const response = await axios.patch('/api/user', {
        favPlayerId: playerId
      });
      if (response.status === 200) {
        alert('Favorite Player Updated');
        setIsEditing(false); // Hide editor after saving
      }
    } catch (error) {
      setError('Error updating favorite player');
    }
  };

  const handleSave = () => {
    updateFavPlayer(favPlayerId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {error && <div className="text-red-500">{error}</div>}
      <FavPlayerDisplay player={favPlayer} imgsrc={imgSrc} />
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-2 py-1 bg-indigo-700 text-white rounded-lg hover:bg-indigo-900 transition duration-200"
        >
          {isEditing ? 'Cancel' : 'Edit Favorite Player'}
        </button>
      </div>
      {isEditing && (
        <div className='mt-4 text-center'>
          <FavPlayerSelector
            players={players}
            onSelectPlayer={handleSelectPlayer}
            label="Change Favorite Player:"
          />
          <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default FavPlayer;
