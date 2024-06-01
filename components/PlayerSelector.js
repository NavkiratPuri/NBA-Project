import React from 'react';

const PlayerSelector = ({ players, onSelectPlayer, label }) => {
    return (
        <div className="player-selector-container mb-4">
            <label htmlFor="player-select" className="block mb-2 font-medium">{label}</label>
            <select id="player-select"
            className='w-full p-2 border border-gray-300 rounded' onChange={e => onSelectPlayer(players.find(p => p.id === e.target.value))}>
                <option value="">Select a Player</option>
                {players.map(player => (
                    <option key={player.id} value={player.id}>
                        {player.Player} - {player.Pos}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PlayerSelector;
