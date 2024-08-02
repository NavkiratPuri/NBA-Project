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
  const [imgSrc, setImgSrc] = useState("/default-headshot.webp"); // Set default image here
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode

  useEffect(() => {
    const getFavPlayerData = async () => {
      try {
        const data = await fetchPlayer(playerId);
        setFavPlayer(data);
        const imgData = await fetchPlayerImage(data.Player);
        if (imgData && imgData.ImageSource) {
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
      } else {
        setImgSrc("/default-headshot.webp"); // Reset to default image if no image found
      }
    } catch (error) {
      setError(error.message);
      setImgSrc("/default-headshot.webp"); // Reset to default image on error
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
    <div className="bg-gray-700 rounded-lg shadow-md p-6">
      {error && <div className="text-red-500 bg-white">{error}</div>}
      <FavPlayerDisplay player={favPlayer} imgsrc={imgSrc} />
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-2 py-1 bg-indigo-700 text-white  text-sm rounded-lg hover:bg-indigo-900 transition duration-200"
        >
          {isEditing ? 'Cancel' : 'Edit Favorite Player'}
        </button>
      </div>
      {isEditing && (
        <div className='mt-4 text-center text-white'>
          <FavPlayerSelector
            players={players}
            onSelectPlayer={handleSelectPlayer}
            label="Change Favorite Player:"
          />
          <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-indigo-800 transition duration-200">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default FavPlayer;
