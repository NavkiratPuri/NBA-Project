'use client';
import React, { useEffect, useState } from 'react';
import Player from './Player';

const TeamDetails = ({ team, players }) => {
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeamDetails = () => {
      setIsLoading(true);
      try {
        const filteredPlayers = players.filter(player => player.Tm === team);
        console.log('Fetched Players for Team:', team, filteredPlayers); // Debugging
        setTeamPlayers(filteredPlayers);
        setError('');
      } catch (err) {
        setError('Failed to fetch team details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (team) {
      loadTeamDetails();
    }
  }, [team, players]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Team: {team}</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamPlayers.map(player => (
          <Player key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;
