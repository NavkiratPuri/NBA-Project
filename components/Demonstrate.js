// components/DemonstrateButton.js
import React from "react";

const Demonstrate = ({ onDemonstrate, allPlayers }) => {
  const handleDemo = () => {
    if (!Array.isArray(allPlayers)) {
      console.error("allPlayers is not an array");
      return;
    }

    const teamAPlayers = [
      allPlayers.find(
        (player) => player.Player === "Larry Bird" && player.Year === 1992
      ),
      // Add more players for Team A if needed
    ].filter(Boolean); // Filter out undefined values in case players are not found

    const teamBPlayers = [
      allPlayers.find(
        (player) => player.Player === "Michael Jordan" && player.Year === 1992
      ),
      // Add more players for Team B if needed
    ].filter(Boolean); // Filter out undefined values in case players are not found

    if (teamAPlayers.length === 0 || teamBPlayers.length === 0) {
      console.error("One or more players were not found");
      return;
    }

    onDemonstrate(teamAPlayers, teamBPlayers);
  };

  return (
    <button
      className="bg-orange-500 text-white py-2 px-4 hover:bg-orange-600 rounded w-1/5 m-2"
      onClick={handleDemo}
    >
      Demonstrate
    </button>
  );
};

export default Demonstrate;
