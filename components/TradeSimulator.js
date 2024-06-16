import React from 'react';
import { calculatePlayerValue } from '@/utils/calculateValue'; // import player value logic

// trade component
const TradeSimulator = ({ player, valueColor }) => {
    const {
        totalValue,
        ppgValue,
        apgValue,
        bpgValue,
        spgValue,
        toValue,
        ftValue,
        efgValue,
        gpValue,
        gsValue,
        orValue,
        drValue,
        pfValue,
        mpValue,
        ageValue,
    } = calculatePlayerValue(player);
    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
            {player &&
                (
                    <div className="space-y-2">
                        <div>
                            <p>Team: {player.Tm}</p>
                            <p>Postion: {player.Pos}</p>
                            <p>Age: {player.Age} Value: {ageValue}</p>
                            <p>Points Per Game: {player.PTS} Value: {ppgValue}</p>
                            <p>Assists Per Game: {player.AST} Value: {apgValue}</p>
                            <p>Blocks Per Game: {player.BLK} Value: {bpgValue}</p>
                            <p>Steals Per Game: {player.STL} Value: {spgValue}</p>
                            <p>Rebounds Per Game: {(player.TRB)} Value: </p>
                            <p>Turnover Per Game: {(player.TOV)} Value: {toValue}</p>
                            <p>3PT%: {player.threePPercent}</p>
                            <p>FG%: {player.FGPercent}</p>
                            <p>FT% {player.FTPercent} Value: {ftValue}</p>
                            <p>Games Played: {player.G} Value: {gpValue}</p>
                            <p>Games Started: {player.GS} Value: {gsValue}</p>
                            <p>Personal Fouls Per Game: {player.PF} Value: {pfValue}</p>
                            <p>Minutes Per Game: {player.MP} Value: {mpValue}</p>
                            
                            <p className={`text-2xl font-bold ${valueColor}`}>Value: {totalValue}</p>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default TradeSimulator;


