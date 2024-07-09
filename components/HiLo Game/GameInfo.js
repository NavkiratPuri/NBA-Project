import React from 'react';

const GameInfo = ({ displayCategory, lives, points, comparisonResult, hint }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center">
            <div className="bg-gray-500 border rounded shadow p-4">
                <h2 className="text-xl">Who has a higher</h2>
                <h2 className="text-xl">{displayCategory}?</h2>
                <p className="text-l font-bold">Lives: {lives}</p>
                <p className="text-l font-bold">Points: {points}</p>
                <div className="mt-4 text-center">
                    <p>{comparisonResult}</p>
                    <p>{hint}</p>
                </div>
            </div>
        </div>
    );
};

export default GameInfo;
