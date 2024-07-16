import React, { useState } from 'react';
import { calculatePlayerValue } from '@/utils/calculateValue';

const TradeSimulator = ({ player, onRemove }) => {
    const [showDetails, setShowDetails] = useState();
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
        <div className="mt-4 p-2 bg-gray-50 rounded-lg shadow-md relative z-10 max-w-xs">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onRemove}> x </button>
            <div onClick={() => setShowDetails(!showDetails)} className="cursor-pointer">
                <div className="flex items-center space-x-2">
                    <img src={player.image} alt={player.Player} className="w-16 h-16 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{player.Player}</p>
                        <p className="font-bold text-sm">{player.Tm}</p>
                        <p className="font-bold text-sm">{player.Pos}</p>
                    </div>
                </div>
                <div className="flex items-center mt-2">
                    <img src={player.teamLogo} alt={player.Tm} className="w-10 h-10 rounded-full flex-shrink-0" />
                    <p className={`ml-2 text-sm font-bold text-center`}>
                        Total Value: {totalValue}
                    </p>
                </div>
            </div>
            {showDetails && (
                <div className="">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col">
                            <p className="text-xs">Age: {player.Age}</p>
                            <p className="text-blue-600 text-xs">{ageValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">FG%: {player.FGPercent}</p>
                            <p className="text-blue-600 text-xs"></p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">PPG: {player.PTS}</p>
                            <p className="text-blue-600 text-xs">{ppgValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">3PT%: {player.threePPercent}</p>
                            <p className="text-blue-600 text-xs"></p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">APG: {player.AST}</p>
                            <p className="text-blue-600 text-xs">{apgValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">EFG%: {player.eFGPercent}</p>
                            <p className="text-blue-600 text-xs">{efgValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">RPG: {player.TRB}</p>
                            <p className="text-blue-600 text-xs">{rpgValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">FT%: {player.FTPercent}</p>
                            <p className="text-blue-600 text-xs">{ftValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">SPG: {player.STL}</p>
                            <p className="text-blue-600 text-xs">{spgValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">GP: {player.G}</p>
                            <p className="text-blue-600 text-xs">{gpValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">BPG: {player.BLK}</p>
                            <p className="text-blue-600 text-xs">{bpgValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">GS: {player.GS}</p>
                            <p className="text-blue-600 text-xs">{gsValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">TO: {player.TOV}</p>
                            <p className="text-blue-600 text-xs">{toValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">FPG: {player.PF}</p>
                            <p className="text-blue-600 text-xs">{pfValue}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">MPG: {player.MP}</p>
                            <p className="text-blue-600 text-xs">{mpValue}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TradeSimulator;