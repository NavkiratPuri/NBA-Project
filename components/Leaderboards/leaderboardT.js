'use client';
import React from 'react';

const LeaderboardT = ({ highScores }) => {
  return (
    <div className="p-4 bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Team Builder</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">Rank</th>
              <th className="py-2 px-4 border-b border-gray-700">Name</th>
              <th className="py-2 px-4 border-b border-gray-700">High Score</th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((user, index) => {
              let rowClass = 'bg-gray-600'; // Default background color

              //Top 3
              if (index === 0) rowClass = 'bg-gradient-to-r from-orange-500 to-yellow-500';
              else if (index === 1) rowClass = 'bg-gradient-to-r from-orange-400 to-yellow-400';
              else if (index === 2) rowClass = 'bg-gradient-to-r from-orange-300 to-yellow-300';

              return (
                <tr key={index} className={`${rowClass} text-white`}>
                  <td className="py-2 px-4 border-b border-gray-700 text-center">{index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{user.name}</td>
                  <td className="py-2 px-4 border-b border-gray-700 text-center">{user.highScoreT}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardT;
