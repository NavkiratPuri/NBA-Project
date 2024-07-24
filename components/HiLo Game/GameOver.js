import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameOver = ({ points, onRestart }) => {
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    const updateHighScore = async () => {
      try {
        const response = await axios.get('/api/user');
        const user = response.data;

        if (points > user.highScore) {
          setIsNewHighScore(true);
          await axios.patch('/api/updateHighScore', { score: points });
        }
      } catch (error) {
        console.error("Error updating high score:", error);
      }
    };

    updateHighScore();
  }, [points]);

  return (
    <div className="h-screen inset-0 flex flex-col items-center justify-center z-10 text-center">
      <div className="bg-gray-500 bg-opacity-50 border rounded shadow p-4">
      {isNewHighScore && <p className="text-2xl text-red-500 rainbow-text">NEW HIGHSCORE!!!</p>}
        <h2 className="text-2xl animate-bounce">Game Over!</h2>     
        <p className="text-2xl">Your Final Score: {points}</p>
        <button onClick={onRestart} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameOver;
