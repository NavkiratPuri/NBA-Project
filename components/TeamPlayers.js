import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const TeamPlayers = () => {
  const router = useRouter();
  const { team } = router.query;
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPlayers = async () => {
      if (!team) return;

      try {
        const response = await axios.get(`/api/teams/${team}`);
        setPlayers(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch players");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlayers();
  }, [team]);

  if (isLoading) {
    return <p>Loading players...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">{team} Players</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {players.map((player) => (
          <div key={player.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{player.name}</h2>
            <p>Position: {player.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPlayers;
