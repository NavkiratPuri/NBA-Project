import React, { useState, useEffect } from 'react';
import { calculatePlayerValue } from '@/utils/calculateValue'; // import player value logic


// component to display selected players stats
// if player object is provided renders player stats
// and calls calculatePlayerValue to display players calculated value
const TradeSimulator = ({ player, valueColor }) => {
    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
            {player &&
                (
                    <div className="space-y-2">
                        <div>
                            <p>Team: {player.Tm}</p>
                            <p>Points Per Game: {player.PTS}</p>
                            <p>Assists Per Game: {player.AST}</p>
                            <p>Blocks Per Game: {player.BLK}</p>
                            <p>Steals Per Game: {player.STL}</p>
                            <p>Rebounds Per Game: {(player.TRB)}</p>
                            <p className={`text-2xl font-bold ${valueColor}`}>Value: {calculatePlayerValue(player)}</p>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default TradeSimulator;
