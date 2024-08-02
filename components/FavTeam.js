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
        console.error('Error fetching data:', error);
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
      console.log('response:', response);
    } catch (error) {
      console.error('Error updating favTeam:', error);
      console.log('Error response:', error.response);
    }
  }
  
  const handleSave = () => {
    if (favTeamId) {
      updateFavTeam(favTeamId);
      alert('Favorite Team Saved!');
    } else {
      alert('No team selected');
    }
  }
  

  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-6 mt-4">
      {error && <p className="text-red-500 bg-white">{error}</p>}
      <FavTeamDisplay team={favTeam} />
      <div className='p-2 rounded-lg mt-4'>
        <h2 className="mt-2 text-2xl font-semibold text-white">Select Your Favorite Team:</h2>
        <TeamSelector teams={teams} onSelectTeam={handleSelectTeam} />
        <button onClick={handleSave} className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
          Save    
        </button>
      </div>
    </div>
  );
};

export default FavTeam;
