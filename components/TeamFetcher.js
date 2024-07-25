
import React, { useState, useEffect } from 'react';
import { fetchTeams } from '@/utils/fetchTeams';

const TeamFetcher = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchTeams();
        setTeams(data);
        setError('');
      } catch (err) {
        setError('Failed to fetch teams');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {isLoading ? (
        <p>Loading teams...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        teams.map((team, index) => (
          <div key={team.tm} className="flex justify-center items-center bg-gray-100 rounded-lg shadow-md">
            <a
              href={`/teams/${team.tm}`}
              className={`${index % 2 === 0 ? 'bg-gray-500 hover:bg-gray-700' : 'bg-orange-300 hover:bg-orange-400'} text-white w-full h-48 rounded-lg transition-colors duration-300 flex justify-center items-center`}
            >
              {team.tm}
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default TeamFetcher;
