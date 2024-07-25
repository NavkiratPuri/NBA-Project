'use client';
import React from 'react';

const LeaderboardT = ({ highScores }) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Team Builder</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Rank</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">High Score</th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b text-center">{user.highScoreT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardT;
