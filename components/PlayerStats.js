import React from "react";

const PlayerStats = ({ player }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{player.name}</h2>
      <p>Position: {player.position}</p>
      <p>Age: {player.age}</p>
      <p>PPG: {player.ppg}</p>
      <p>APG: {player.apg}</p>a<p>BPG: {player.bpg}</p>
      <p>SPG: {player.spg}</p>
      <p>TO: {player.to}</p>
      <p>FT%: {player.ft}</p>
      <p>eFG%: {player.efg}</p>
      <p>GP: {player.gp}</p>
      <p>GS: {player.gs}</p>
      <p>OR: {player.or}</p>
      <p>DR: {player.dr}</p>
      <p>PF: {player.pf}</p>
      <p>MP: {player.mp}</p>
    </div>
  );
};

export default PlayerStats;
