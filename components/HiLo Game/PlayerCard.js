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
  image, // Add image prop here
}) => {
  const isSelected = selectedPlayer === index;
  const isCorrect = index === correctPlayerIndex;

  return (
    <div className="w-1/2 flex items-center justify-center p-4">
      <button
        onClick={() => handlePlayerButtonClick(index)}
        className={`relative w-full h-screen py-2 px-4 rounded overflow-hidden ${
          isSelected
            ? isCorrect
              ? 'bg-green-500 hover:bg-green-500'
              : 'bg-red-500 hover:bg-red-500'
            : isCorrect
            ? 'bg-green-500 hover:bg-green-500'
            : 'bg-gray-200 hover:bg-blue-400'
        } text-black`}
        disabled={selectedPlayer !== null}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${image}), linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 0.3s ease',
            opacity: '0.8',
          }}
        />
        <div
          className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-gray-900"
          style={{
            opacity: '0.7',
            transition: 'opacity 0.3s ease',
          }}
        ></div>
        <div className="relative z-10 text-white rounded p-4 text-center">
          <p className="text-xl"><strong>Name:</strong> {player.Player}</p>
          <p className="text-xl"><strong>Team:</strong> {player.Tm}</p>
          <p className="text-xl"><strong>Position:</strong> {player.Pos}</p>
        </div>
      </button>
      {!hintUsed && (
        <button
          onClick={() => handleHintButtonClick(index)}
          className="absolute bottom-10 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Hint
        </button>
      )}
    </div>
  );
};

export default PlayerCard;
