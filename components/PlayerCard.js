import React, { useState } from 'react';
import { calculatePlayerValue } from '@/utils/calculateValue';

const PlayerCard = ({ player, onRemove }) => {
    const [view, setView] = useState(0);
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

    const cardClick = () => {
        setView((prevView) => (prevView + 1) % 3);
    };

    const formatDecimal = (number) => {
        if (isNaN(number)) {
            return number;
        }
        return parseFloat(number).toFixed(2);
    };

    return (
        <div className='mt-2 p-2 bg-gray-300 rounded-lg shadow-lg relative max-w-xs hover:bg-gray-200'>
            <button className='absolute top-2 right-2 text-gray-400 hover:text-white' onClick={onRemove}>x</button>
            <div onClick={cardClick} className='cursor-pointer'>
                {view === 0 && (
                    <div>
                        <div className='flex items-center space-x-4'>
                            <img src={player.image} alt={player.Player} className='w-16 h-16 rounded-full border-2 border-gray-600' />
                            <div className='flex-1 min-w-0'>
                                <p className='font-semibold text-s truncate'>{firstName}</p>
                                <p className='font-semibold text-lg truncate'>{lastName}</p>
                                <p className='text-gray-500'>{player.Tm} - {player.Year}</p>
                                <p className='text-gray-500'>{player.Pos}</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <img src={player.teamLogo} alt={player.Tm} className='w-11 h-11 rounded-full border-1 border-gray-600' />
                            <p className='ml-3 text-md font-semibold'>Total Value: {totalValue}</p>
                        </div>
                    </div>
                )}
                {view === 1 && (
                    <div className='text-base'>
                        <div className=''>
                            <p className='font-semibold'>{player.Player} - {player.Year}</p>
                            <p className='font-semibold text-sm'>Stats</p>
                        </div>
                        <div className='grid grid-cols-3 text-xs mt-'>
                            <p>Age: {player.Age}</p>
                            <p>FG%: {formatDecimal(player.FGPercent)}</p>
                            <p>PPG: {formatDecimal(player.PTS)}</p>
                            <p>3PT%: {formatDecimal(player.threePPercent)}</p>
                            <p>APG: {formatDecimal(player.AST)}</p>
                            <p>EFG%: {formatDecimal(player.eFGPercent)}</p>
                            <p>RPG: {formatDecimal(player.TRB)}</p>
                            <p>FT%: {formatDecimal(player.FTPercent)}</p>
                            <p>SPG: {formatDecimal(player.STL)}</p>
                            <p>GP: {formatDecimal(player.G)}</p>
                            <p>BPG: {formatDecimal(player.BLK)}</p>
                            <p>GS: {formatDecimal(player.GS)}</p>
                            <p>TO: {formatDecimal(player.TOV)}</p>
                            <p>FPG: {formatDecimal(player.PF)}</p>
                            <p>MPG: {formatDecimal(player.MP)}</p>
                        </div>
                    </div>
                )}
                {view === 2 && (
                    <div className='text-sm'>
                        <div className=''>
                            <p className='font-semibold'>{player.Player} - {player.Year}</p>
                            <p className='font-semibold text-sm'>Values</p>
                        </div>
                        <div className='grid grid-cols-3 text-xs '>
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
                            <p>PFG: {pfValue}</p>
                            <p>MPG: {mpValue}</p>
                            <p></p>
                            <p className='text-blue-500 font-bold text-base text-right'>{totalValue}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerCard;
