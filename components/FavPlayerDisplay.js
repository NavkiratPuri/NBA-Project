import React from "react";
import Image from "next/image";

const FavPlayerDisplay = ({ player, imgsrc }) => {
  return (
    <div className="mt-4 p-4 bg-gray-600 rounded-lg shadow-md border border-indigo-800">
      {player ? (
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-orange-500">Favorite Player</h2>
          <div className="flex flex-col items-center space-y-2">
            {imgsrc ? (
              <Image
                src={imgsrc}
                alt={`Image of ${player.Player}`}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-2 border-gray-600 bg-white"
              />
            ) : (
              <div className="w-16 h-16 rounded-full border-2 border-gray-600 flex items-center justify-center">
                <span className="text-sm text-white">No Image</span>
              </div>
            )}
            <p className="text-lg font-medium text-white">{player.Player}</p>
            <p className="text-lg font-medium text-white">Team: {player.Tm}</p>
            <p className="text-lg font-medium text-white">Points Per Game: {player.PTS}</p>
            <p className="text-lg font-medium text-white">Assists Per Game: {player.AST}</p>
            <p className="text-lg font-medium text-white">Blocks Per Game: {player.BLK}</p>
            <p className="text-lg font-medium text-white">Steals Per Game: {player.STL}</p>
            <p className="text-lg font-medium text-white">Rebounds Per Game: {player.TRB}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-white">No Favorite Player Selected.</p>
      )}
    </div>
  );
};

export default FavPlayerDisplay;
