import React from 'react';

const PlayerCard = ({ player, index, selectedPlayer, correctPlayerIndex, hintUsed, hint, handlePlayerButtonClick, handleHintButtonClick }) => {
    return (
        <div className="w-1/2 flex items-center justify-center">
            <button
                onClick={() => handlePlayerButtonClick(index)}
                className={`relative w-full h-screen py-2 px-4 rounded bg-gray-200 hover:bg-blue-400  ${
                    selectedPlayer !== null && index === selectedPlayer
                        ? (index === correctPlayerIndex ? 'bg-green-500 hover:bg-green-500' : 'bg-red-500 hover:bg-red-500')
                        : selectedPlayer !== null && index === correctPlayerIndex
                            ? 'bg-green-500 hover:bg-green-500'
                            : ''
                } text-black`}
                disabled={selectedPlayer !== null}
            >
                <p className="text-xl"><strong>Name:</strong> {player.Player}</p>
                <p className="text-xl"><strong>Team:</strong> {player.Tm}</p>
                <p className="text-xl"><strong>Position:</strong> {player.Pos}</p>
                {hintUsed && hint && index === (hint.includes(player.Player) ? 0 : 1) && (
                    <p className="text-xl font-bold"><strong>{selectedCategory.label}:</strong> {player[selectedCategory.value]}</p>
                )}
            </button>
            {!hintUsed && (
                <button
                    onClick={() => handleHintButtonClick(index)}
                    className="absolute bottom-10 bg-black hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-4"
                >
                    Hint
                </button>
            )}
        </div>
    );
};

export default PlayerCard;
