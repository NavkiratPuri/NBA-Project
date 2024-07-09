import React from 'react';

const GameOver = ({ points, onRestart }) => {
    return (
        <div className="h-screen inset-0 flex flex-col items-center justify-center z-10 text-center">
            <div className="bg-gray-500 bg-opacity-50 border rounded shadow p-4">
                <h2 className="text-3xl">Game Over!</h2>
                <p className="text-2xl">Your final score: {points}</p>
                <button onClick={onRestart} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
                    Restart
                </button>
            </div>
        </div>
    );
};

export default GameOver;
