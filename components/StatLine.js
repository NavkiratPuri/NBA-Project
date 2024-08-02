import React from "react";

const StatLine = ({ player }) => {
  return (
    <tr>
      <td className="px-4 py-2">{player.Player}</td>
      <td className="px-4 py-2">{player.Pos}</td>
      <td className="px-4 py-2">{player.Tm}</td>
      <td className="px-4 py-2">{player.G}</td>
      <td className="px-4 py-2">{player.GS}</td>
      <td className="px-4 py-2">{player.MP}</td>
      <td className="px-4 py-2">{player.FG}</td>
      <td className="px-4 py-2">{player.FGA}</td>
      <td className="px-4 py-2">{player.FGPercent}</td>
      <td className="px-4 py-2">{player.threeP}</td>
      <td className="px-4 py-2">{player.threePA}</td>
      <td className="px-4 py-2">{player.threePPercent}</td>
      <td className="px-4 py-2">{player.twoP}</td>
      <td className="px-4 py-2">{player.twoPA}</td>
      <td className="px-4 py-2">{player.twoPPercent}</td>
      <td className="px-4 py-2">{player.eFGPercent}</td>
      <td className="px-4 py-2">{player.FT}</td>
      <td className="px-4 py-2">{player.FTA}</td>
      <td className="px-4 py-2">{player.FTPercent}</td>
      <td className="px-4 py-2">{player.ORB}</td>
      <td className="px-4 py-2">{player.DRB}</td>
      <td className="px-4 py-2">{player.TRB}</td>
      <td className="px-4 py-2">{player.AST}</td>
      <td className="px-4 py-2">{player.STL}</td>
      <td className="px-4 py-2">{player.BLK}</td>
      <td className="px-4 py-2">{player.TOV}</td>
      <td className="px-4 py-2">{player.PF}</td>
      <td className="px-4 py-2">{player.PTS}</td>
    </tr>
  );
};

export default StatLine;
