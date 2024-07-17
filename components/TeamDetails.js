'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchTeamDetails } from '../utils/fetchTeamDetails';
import Player from './Player';

const TeamDetails = () => {
  const router = useRouter();
  const { teamId } = router.query;
  const [team, setTeam] = useState({});
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (teamId) {
      const loadTeamDetails = async () => {
        setIsLoading(true);
        try {
          const data = await fetchTeamDetails(teamId);
          setTeam(data.team);
          setPlayers(data.players);
          setError('');
        } catch (err) {
          setError('Failed to fetch team details');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      loadTeamDetails();
    }
  }, [teamId]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">{team.name}</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {players.map(player => (
          <Player key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;
