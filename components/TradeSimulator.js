import React, { useState } from 'react';
import { calculatePlayerValue } from '@/utils/calculateValue';

const TradeSimulator = ({ player, onRemove }) => {
    const [showDetails, setShowDetails] = useState(false);
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
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md relative z-10">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onRemove}> x </button>
            <div onClick={() => setShowDetails(!showDetails)} className="cursor-pointer">
                <div className="flex items-center space-x-4">
                    <img src={player.image} alt={player.Player} className="w-24 h-24" />
                    <div className="flex-1">
                        <p className="font-semibold text-xl">{player.Player}</p>
                        <p className="font-bold">{player.Tm}</p>
                        <p className="font-bold">{player.Pos}</p>
                    </div>
                    <img src={player.teamLogo} alt={player.Tm} className="w-14 h-14 rounded-full" />
                </div>
                <p className={`mt-2 text-xl font-bold text-blue-500 text-center`}>
                    {totalValue.toFixed(2)}
                </p>
            </div>
            {showDetails && (
                <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-between">
                            <p className="font-semibold">Age:</p>{player.Age.toFixed(2)}
                            <p className="text-blue-600 font-bold">{ageValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">FG%:</p>{player.FGPercent.toFixed(2)}
                            <p className="text-blue-600 font-bold"></p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">PPG:</p>{player.PTS.toFixed(2)}
                            <p className="text-blue-600 font-bold"> {ppgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">3PT%:</p>{player.threePPercent.toFixed(2)}
                            <p className="text-blue-600 font-bold"></p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">APG:</p> {player.AST.toFixed(2)}
                            <p className="text-blue-600 font-bold">{apgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">EFG%:</p>{player.eFGPercent.toFixed(2)}
                            <p className="text-blue-600 font-bold">{efgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">RPG:</p> {player.TRB.toFixed(2)}
                            <p className="text-blue-600 font-bold">{rpgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">FT%:</p>{player.FTPercent.toFixed(2)}
                            <p className="text-blue-600 font-bold">{ftValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">SPG:</p>{player.STL.toFixed(2)}
                            <p className="text-blue-600 font-bold">{spgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">GP:</p>{player.G.toFixed(2)}
                            <p className="text-blue-600 font-bold">{gpValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">BPG:</p>{player.BLK.toFixed(2)}
                            <p className="text-blue-600 font-bold">{bpgValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">GS:</p>{player.GS.toFixed(2)}
                            <p className="text-blue-600 font-bold">{gsValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">TO:</p>{player.TOV.toFixed(2)}
                            <p className="text-blue-600 font-bold">{toValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">FPG:</p>{player.PF.toFixed(2)}
                            <p className="text-blue-600 font-bold">{pfValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">MPG:</p>{player.MP.toFixed(2)}
                            <p className="text-blue-600 font-bold">{mpValue.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TradeSimulator;