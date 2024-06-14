import React, { useState } from 'react';
import RandomCategory from './RandomCategory';

const GameStarter = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);

    const handleStartGame = () => {
        setGameStarted(true);
        setGameEnded(false);
    };

    const handleGameEnd = () => {
        setGameEnded(true);
        setGameStarted(false);
    };

    const handlePlayAgain = () => {
        setGameStarted(true);
        setGameEnded(false);
    };

    const handleReturnToStart = () => {
        setGameStarted(false);
        setGameEnded(false);
    };

    return (
        <div>
            {!gameStarted && !gameEnded ? (
                <button 
                    onClick={handleStartGame} 
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                    Start Game
                </button>
            ) : gameEnded ? (
                
                    <div className="text-center">
                    <h2 className="text-2xl mb-4">Game Over</h2>
                    <button 
                        onClick={handlePlayAgain} 
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-4"
                    >
                        Play Again
                    </button>
                    <button 
                        onClick={handleReturnToStart} 
                        className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                    >
                        Return to Start
                    </button>
                </div>
            ) : (
                <RandomCategory onGameEnd={handleGameEnd} />
            )}
        </div>
    );
};

export default GameStarter;
