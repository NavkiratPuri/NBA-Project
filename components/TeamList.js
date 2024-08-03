import React, { useEffect, useState } from "react";
import { fetchPlayers } from "@/utils/fetchPlayers"; // Ensure the correct path to fetchPlayers.js
import { useRouter } from "next/navigation";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const players = await fetchPlayers();
        const teamNames = [...new Set(players.map((player) => player.Tm))];
        setTeams(teamNames);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
    loadTeams();
  }, []);

  const handleTeamClick = (team) => {
    router.push(`/teams/${team}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {teams.map((team, index) => (
        <div
          key={index}
          className="flex justify-center items-center bg-gray-100 rounded-lg shadow-md"
        >
          <button
            className={`${
              index % 2 === 0
                ? "bg-blue-900 hover:bg-gray-400"
                : "bg-gray-700 hover:bg-orange-400"
            } text-white w-full h-48 rounded-lg transition-colors duration-300 flex justify-center items-center`}
            onClick={() => handleTeamClick(team)}
          >
            {team}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
