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
                        Total Value: {totalValue.toFixed(2)}
                    </p>
                </div>
            </div>
            {showDetails && (
                <div className="">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col">
                            <p className="text-xs">Age: {player.Age}</p>
                            <p className="text-blue-600 text-xs">{ageValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">FG%: {player.FGPercent.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs"></p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">PPG: {player.PTS.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{ppgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">3PT%: {player.threePPercent.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs"></p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">APG: {player.AST.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{apgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">EFG%: {player.eFGPercent.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{efgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">RPG: {player.TRB.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{rpgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">FT%: {player.FTPercent.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{ftValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">SPG: {player.STL.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{spgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">GP: {player.G.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{gpValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">BPG: {player.BLK.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{bpgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">GS: {player.GS.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{gsValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">TO: {player.TOV.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{toValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">FPG: {player.PF.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{pfValue.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">MPG: {player.MP.toFixed(2)}</p>
                            <p className="text-blue-600 text-xs">{mpValue.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TradeSimulator;