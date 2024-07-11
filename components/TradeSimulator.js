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
        rpgValue,
        pfValue,
        mpValue,
        ageValue,
    } = calculatePlayerValue(player);

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
            {player && (

                <div className="">

                    <div className="flex space-x-5">
                        <img
                            src={player.image} 
                            className="w-24 h-24"
                        />
                        <div>
                            <p className="font-semibold text-xl">{player.Player}</p>
                            <p className="font-bold">{player.Tm}</p>
                            <p className="font-bold">{player.Pos}</p>
                        </div>
                    
                        <img
                            src={player.teamLogo} 
                            className="w-14 h-14 rounded-full"
                        />
                    </div>

                    <div className="mt-4">
                        <div className="grid grid-cols-2 gap-1">

                            <div className="flex justify-between">
                                <p className="font-semibold">Age: {player.Age}</p>
                                <p className="text-blue-600 font-bold">Value: {ageValue}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">FG%: {player.FGPercent.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">Points Per Game: {player.PTS}</p>
                                <p className="text-blue-600 font-bold">Value: {ppgValue.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">3PT%: {player.threePPercent.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">Assists Per Game: {player.AST}</p>
                                <p className="text-blue-600 font-bold">Value: {apgValue.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">EFG%: {player.eFGPercent}</p>
                                <p className="text-blue-600 font-bold">Value: {efgValue.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">Rebounds Per Game: {player.TRB}</p>
                                <p className="text-blue-600 font-bold">Value: {rpgValue.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">FT%: {player.FTPercent}</p>
                                <p className="text-blue-600 font-bold">Value: {ftValue.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">Steals Per Game: {player.STL}</p>
                                <p className="text-blue-600 font-bold">Value: {spgValue.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">Games Played: {player.G}</p>
                                <p className="text-blue-600 font-bold">Value: {gpValue.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">Blocks Per Game: {player.BLK}</p>
                                <p className="text-blue-600 font-bold">Value: {bpgValue.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">Games Started: {player.GS}</p>
                                <p className="text-blue-600 font-bold">Value: {gsValue.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">Turnover Per Game: {player.TOV}</p>
                                <p className="text-blue-600 font-bold">Value: {toValue.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">Fouls Per Game: {player.PF}</p>
                                <p className="text-blue-600 font-bold">Value: {pfValue.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold">Minutes Per Game: {player.MP}</p>
                                <p className="text-blue-600 font-bold">Value: {mpValue.toFixed(2)}</p>
                            </div>
                        </div>

                        
                        <p className={`mt-4 text-2xl font-bold ${valueColor}`}>Total Value: {totalValue}</p>
                    
                    </div>

                </div>
            )}
        </div>
    );
};

export default TradeSimulator;
