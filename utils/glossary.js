// utils/GlossaryModal.js
import React from "react";

export const Glossary = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-700 text-white rounded-lg shadow-md w-3/6 flex flex-col">
        <h2 className="text-center mt-2 font-bold text-2xl">Glossary</h2>
        <div className="flex flex-cols-2 p-4 justify-center">
          <div className="mr-2">
            <p>
              <strong>PPG:</strong> Points Per Game
            </p>
            <p>
              <strong>APG:</strong> Assists Per Game
            </p>
            <p>
              <strong>BPG:</strong> Blocks Per Game
            </p>
            <p>
              <strong>SPG:</strong> Steals Per Game
            </p>
            <p>
              <strong>RPG:</strong> Rebounds Per Game
            </p>
            <p>
              <strong>TO:</strong> Turnovers
            </p>
            <p>
              <strong>FPG:</strong> Fouls Per Game
            </p>
            <p>
              <strong>FT:</strong> Free Throw Percentage
            </p>
            <p>
              <strong>GP:</strong> Games Played
            </p>
            <strong>GS:</strong> Games Started
            <p></p>
            <p>
              <strong>EFG:</strong> Effective Field Goal Percentage
            </p>
            <p>
              <strong>OR:</strong> Offensive Rebounds
            </p>
            <p>
              <strong>DR:</strong> Defensive Rebounds
            </p>
            <p>
              <strong>PF:</strong> Personal Fouls
            </p>
            <p>
              <strong>MPG:</strong> Minutes Per Game
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p>
              <strong>UP-1R</strong> Unprotected First Round Pick
            </p>
            <p>
              <strong>P-1R</strong> Protected First Round Pick
            </p>
            <p>
              <strong>S-1R</strong> Swap First Round Picks
            </p>
            <p>
              <strong>F-1R</strong> Future First Round Pick
            </p>
            <p>
              <strong>UP-2R</strong> Unprotected Second Round Pick
            </p>
            <p>
              <strong>P-2R</strong> Protected Second Round Pick
            </p>
            <p>
              <strong>Con</strong> Conditional Pick
            </p>
            <p>
              <strong>S-2R</strong> Swap Second Round Pick
            </p>
            <p>
              <strong>F-2R</strong> Future Second Round Pick
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-2">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
