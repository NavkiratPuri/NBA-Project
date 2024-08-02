'use client'
import React, { useState, useEffect } from 'react';
import TeamSelector from '@/components/TeamSelector';
import teamsData from '@/utils/teamsData';
import axios from 'axios';
import FavTeamDisplay from './FavTeamDisplay';
import fetchTeam from '@/utils/fetchTeam';

const FavTeam = ({ teamId }) => {
  const [teams, setTeams] = useState([]);
  const [favTeam, setFavTeam] = useState(null);
  const [favTeamId, setFavTeamId] = useState(teamId);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode

  useEffect(() => {
    const getFavTeamData = async () => {
      try {
        const data = await fetchTeam(teamId);
        console.log('data:', data);
        setFavTeam(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (teamId) {
      getFavTeamData();
      console.log('teamId:', teamId);
    }
  }, [teamId]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await teamsData();
        setTeams(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    console.log('Updated favTeamId:', favTeamId);
  }, [favTeamId]);

  const handleSelectTeam = (team) => {
    setFavTeam(team);
    setFavTeamId(team.id);
  };

  const updateFavTeam = async (teamId) => {
    try {
      console.log('Updating favorite team with ID:', teamId);
      const response = await axios.patch('/api/user', {
        favTeamId: teamId
      });
      if (response.status === 200) {
        alert('Favorite Team Updated');
        setIsEditing(false); // Hide editor after saving
      }
    } catch (error) {
      setError('Error updating favorite team');
    }
  }

  const handleSave = () => {
    if (favTeamId) {
      updateFavTeam(favTeamId);
    } else {
      alert('No team selected');
    }
  }

  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-6">
      {error && <div className="text-red-500">{error}</div>}
      <FavTeamDisplay team={favTeam} />
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-2 py-1 bg-indigo-700 text-white text-sm rounded-lg hover:bg-indigo-900 transition duration-200"
        >
          {isEditing ? 'Cancel' : 'Edit Favorite Team'}
        </button>
      </div>
      {isEditing && (
        <div className='mt-4 text-center text-white'>
          <TeamSelector
            teams={teams}
            onSelectTeam={handleSelectTeam}
            label="Change Favorite Team:"
          />
          <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-indigo-800 transition duration-200">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default FavTeam;
