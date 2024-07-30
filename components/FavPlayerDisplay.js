import React from "react";
import Image from "next/image"; 

const FavPlayerDisplay = ({ player }) => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
      {player && (
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold">Favorite Player:</h2>
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={player.image}
              alt={player.Player}
              className="w-16 h-16 rounded-full border-2 border-gray-600"
            />
            <p>Player: {player.Player}</p>
            <p>Team: {player.Tm}</p>
            <p>Points Per Game: {player.PTS}</p>
            <p>Assists Per Game: {player.AST}</p>
            <p>Blocks Per Game: {player.BLK}</p>
            <p>Steals Per Game: {player.STL}</p>
            <p>Rebounds Per Game: {player.TRB}</p>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default FavPlayerDisplay;