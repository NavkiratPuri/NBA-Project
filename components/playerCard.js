import React from "react";

const PlayerCard = ({ playerName }) => {
  return (
    <div className="p-3 flex justify-center ml-10">
      <h2 className="font-bold">{playerName}</h2>
    </div>
  );
};

export default PlayerCard;
