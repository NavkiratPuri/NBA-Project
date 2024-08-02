// TeamDetails.js
"use client";
import React, { useEffect, useState } from "react";
import { fetchPlayerTeam } from "@/utils/fetchPlayerTeam";
import PlayerStats from "./PlayerStats"; // Update the import to PlayerStats

const TeamDetails = ({ team }) => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTeamDetails = async () => {
      setIsLoading(true);
      try {
        const teamPlayers = await fetchPlayerTeam(team);
        setPlayers(teamPlayers);
        setError("");
      } catch (err) {
        setError("Failed to fetch team details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (team) {
      loadTeamDetails();
    }
  }, [team]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Team: {team}</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {players.map((player) => (
          <PlayerStats key={player.id} player={player} /> // Use PlayerStats here
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;
