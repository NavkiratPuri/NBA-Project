import React, { useState } from 'react';
import { calculatePlayerValue } from '@/utils/calculateValue';

const PlayerCard = ({ player, onRemove }) => {
    const [showDetails, setShowDetails] = useState();
    const [activeTab, setActiveTab] = useState('stats');
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

    const fullName = player.Player;
    const nameParts = fullName.split(' ');

    let firstName = nameParts[0];
    let lastName = nameParts.slice(1).join(' ');

    const suffixes = ['Jr', 'Sr', 'II', 'III', 'IV', 'V'];
    if (suffixes.includes(nameParts[nameParts.length - 1])) {
        lastName = nameParts.slice(1, nameParts.length - 1).join(' ');
        lastName += ` ${nameParts[nameParts.length - 1]}`;
    }
    

    return (
        <div className="mt-2 p-2 bg-gray-300  rounded-lg shadow-lg relative z-10 max-w-xs hover:bg-gray-200">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-white" onClick={onRemove}>x</button>
            <div onClick={() => setShowDetails(!showDetails)} className="cursor-pointer">
                <div className="flex items-center space-x-4">
                    <img src={player.image} alt={player.Player} className="w-16 h-16 rounded-full border-2 border-gray-600" />
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-s truncate">{firstName}</p>
                        <p className="font-semibold text-s truncate">{lastName}</p>
                        <p className="text-gray-500">{player.Tm} - {player.Year}</p>
                        <p className="text-gray-500">{player.Pos}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <img src={player.teamLogo} alt={player.Tm} className="w-12 h-12 rounded-full border-1 border-gray-600" />
                    <p className="ml-3 text-s font-semibold">Total Value: {totalValue}</p>
                </div>
            </div>
            {showDetails && (
                <div className="text-sm overflow-y-auto max-h-32">
                   
                    <div className="flex justify-evenly">
                        <button
                            className={`px-2 py-1 text-xs mt-2 rounded-lg mb-1 ${activeTab === 'stats' ? 'bg-gray-400' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('stats')}
                        >
                            Stats
                        </button>
                        <button
                            className={`px-2 py-1 mt-2 text-xs rounded-lg mb-1 ${activeTab === 'values' ? 'bg-gray-400' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('values')}
                        >
                            Values
                        </button>
                    </div>
                    {activeTab === 'stats' && (
                        <div className="grid grid-cols-2 mt-1 text-xs">
                            <p>Age: {player.Age}</p>
                            <p>FG%: {player.FGPercent}</p>
                            <p>PPG: {player.PTS}</p>
                            <p>3PT%: {player.threePPercent}</p>
                            <p>APG: {player.AST}</p>
                            <p>EFG%: {player.eFGPercent}</p>
                            <p>RPG: {player.TRB}</p>
                            <p>FT%: {player.FTPercent}</p>
                            <p>SPG: {player.STL}</p>
                            <p>GP: {player.G}</p>
                            <p>BPG: {player.BLK}</p>
                            <p>GS: {player.GS}</p>
                            <p>TO: {player.TOV}</p>
                            <p>FPG: {player.PF}</p>
                            <p>MPG: {player.MP}</p>
                        </div>
                    )}
                    {activeTab === 'values' && (
                        <div className="grid grid-cols-2 mt-1 text-xs">
                            <p>Age: {ageValue}</p>
                            <p>PPG: {ppgValue}</p>
                            <p>APG: {apgValue}</p>
                            <p>BPG: {bpgValue}</p>
                            <p>SPG: {spgValue}</p>
                            <p>TO: {toValue}</p>
                            <p>FT: {ftValue}</p>
                            <p>EFG: {efgValue}</p>
                            <p>GP: {gpValue}</p>
                            <p>GS: {gsValue}</p>
                            <p>RPG: {rpgValue}</p>
                            <p>PF: {pfValue}</p>
                            <p>MP: {mpValue}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PlayerCard;