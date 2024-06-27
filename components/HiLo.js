import React, { useState } from 'react';
import RandomCategory from './RandomCategory';
import Header from '../components/header';
import Footer from '../components/footer';

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
            {/* <Header/> */}
            {!gameStarted && !gameEnded ? (
                <div className="flex flex-col items-center justify-center h-screen">
                    <button 
                        onClick={handleStartGame} 
                        className="text-3xl bg-gray-500 text-white font-bold py-4 px-5 rounded hover:bg-opacity-70"
                    >
                        Start Game
                    </button>
                </div>
            ) : gameEnded ? (
                
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h2 className="text-4xl mb-4">Game Over</h2>
                        <button 
                            onClick={handlePlayAgain} 
                            className="text-3xl bg-green-500 text-white font-bold py-2 px-4 rounded mr-4"
                        >
                            Play Again
                        </button>
                        <button 
                            onClick={handleReturnToStart} 
                            className="text-3xl bg-gray-500 text-white font-bold py-2 px-4 rounded"
                        >
                            Return to Start
                        </button>
                    </div>
                </div>   
            ) : (
                <RandomCategory onGameEnd={handleGameEnd} />
            )}
        </div>
        
    );
};

export default GameStarter;
