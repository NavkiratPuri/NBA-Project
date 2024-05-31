import React, { useState, useEffect } from 'react';
import { calculatePlayerValue } from '@/utils/calculateValue'; // import player value logic


// function to compare two players
const TradeSimulator = ({ player}) => {
    return(
        <div className="compare">
            {player && 
            (
                <div>
                    <div className="compare2">
                        <div>
                            <p>Team: {player.Tm}</p>
                            <p>Points Per Game: {player.PTS}</p>
                            <p>Assists Per Game: {player.AST}</p>
                            <p>Blocks Per Game: {player.BLK}</p>
                            <p>Steals Per Game: {player.STL}</p>
                            <p>Rebounds Per Game: {(player.TRB)}</p>
                            <p>Value: {calculatePlayerValue(player)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TradeSimulator;
