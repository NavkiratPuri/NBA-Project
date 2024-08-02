import React from "react";
import Image from "next/image";

const FavTeamDisplay = ({ team }) => {
  return (
    <div className="mt-4 p-4 bg-gray-600 rounded-lg shadow-md border border-indigo-800">
      {team ? (
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-indigo-900">Favorite Team</h2>
          <div className="flex flex-col items-center space-y-2">
            <Image
                  src={team.logo}
                  alt={`Image of ${team.team} logo`}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-md border-2 border-gray-600 text-white"
                />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-lg font-medium text-white">{team.team}</h1>
            <p className="text-lg font-medium text-white">Wins: {team.wins}</p>
            <p className="text-lg font-medium text-white">Losses: {team.losses}</p>
            <p className="text-lg font-medium text-white">Conference: {team.conference}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No favorite team selected.</p>
      )}
    </div>
  );
};

export default FavTeamDisplay;
