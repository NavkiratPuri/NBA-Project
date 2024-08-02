import React from "react";

const FavTeamDisplay = ({ team }) => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md border border-indigo-800">
      {team ? (
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-indigo-900">Favorite Team</h2>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-lg font-medium text-gray-700">{team.team}</h1>
            <p className="text-lg font-medium text-gray-700">Wins: {team.wins}</p>
            <p className="text-lg font-medium text-gray-700">Losses: {team.losses}</p>
            <p className="text-lg font-medium text-gray-700">Conference: {team.conference}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No favorite team selected.</p>
      )}
    </div>
  );
};

export default FavTeamDisplay;
