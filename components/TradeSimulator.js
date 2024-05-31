import React, { useState, useEffect } from 'react';
import { calculatePlayerValue } from '@/utils/calculateValue'; // import player value logic


// function to compare two players
const TradeSimulator = ({ player1, player2}) => {
    return(
        <div className="compare">
            {player1 && player2 && 
            (
                <div>
                    <div className="compare2">
                        <div>
                            <h3>{player1.Player}</h3>
                            <p>Position: {player1.Pos}</p>
                            <p>Team: {player1.Tm}</p>
                            <p>Points Per Game: {player1.PTS}</p>
                            <p>Assists Per Game: {player1.AST}</p>
                            <p>Blocks Per Game: {player1.BLK}</p>
                            <p>Steals Per Game: {player1.STL}</p>
                            <p>Rebounds Per Game: {(player1.TRB)}</p>
                            <p>Value: {calculatePlayerValue(player1)}</p>
                        </div>
                        <div>
                            <h3>{player2.Player}</h3>
                            <p>Position: {player2.Pos}</p>
                            <p>Team: {player2.Tm}</p>
                            <p>Points Per Game: {player2.PTS}</p>
                            <p>Assists Per Game: {player2.AST}</p>
                            <p>Blocks Per Game: {player2.BLK}</p>
                            <p>Steals Per Game: {player2.STL}</p>
                            <p>Rebounds Per Game: {(player2.TRB)}</p>
                            <p>Value: {calculatePlayerValue(player2)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TradeSimulator;
