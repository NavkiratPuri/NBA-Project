import React from 'react';

const PlayerCard = ({
  player,
  index,
  selectedPlayer,
  correctPlayerIndex,
  hintUsed,
  hint,
  selectedCategory,
  handlePlayerButtonClick,
  handleHintButtonClick,
}) => {
  const isSelected = selectedPlayer === index;
  const isCorrect = index === correctPlayerIndex;

  return (
    <div className="w-1/2 flex items-center justify-center">
      <button
        onClick={() => handlePlayerButtonClick(index)}
        className={`relative w-full h-screen py-2 px-4 rounded bg-gray-200 hover:bg-blue-400  ${
          isSelected
            ? isCorrect
              ? 'bg-green-500 hover:bg-green-500'
              : 'bg-red-500 hover:bg-red-500'
            : isCorrect
            ? 'bg-green-500 hover:bg-green-500'
            : ''
        } text-black`}
        disabled={selectedPlayer !== null}
      >
        <img src={player.image} className='h-50 w-50 rounded-full mx-auto'></img>
        <p className="text-xl"><strong>Name:</strong> {player.Player}</p>
        <p className="text-xl"><strong>Team:</strong> {player.Tm}</p>
        <p className="text-xl"><strong>Position:</strong> {player.Pos}</p>
      </button>
      {!hintUsed && (
        <button
          onClick={() => handleHintButtonClick(index)}
          className="absolute bottom-10 bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Hint
        </button>
      )}
    </div>
  );
};

export default PlayerCard;
