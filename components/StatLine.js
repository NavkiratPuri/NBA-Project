import React from "react";

const StatLine = ({ player }) => {
  return (
    <tr>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.Player}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.Pos}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.Tm}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.G}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.GS}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.MP}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FG}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FGA}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FGPercent}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.threeP}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.threePA}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.threePPercent}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.twoP}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.twoPA}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.twoPPercent}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.eFGPercent}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FT}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FTA}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FTPercent}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.ORB}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.DRB}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.TRB}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.AST}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.STL}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.BLK}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.TOV}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.PF}</td>
      <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.PTS}</td>
    </tr>
  );
};

export default StatLine;
