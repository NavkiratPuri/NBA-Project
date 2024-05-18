import React from 'react';

const PlayerSelector = ({ players, onSelectPlayer, label }) => {
    return (
        <div className="player-selector">
            <label htmlFor={label.replace(/\s+/g, '').toLowerCase()}>{label}:</label>
            <select
                id={label.replace(/\s+/g, '').toLowerCase()}
                onChange={(e) => onSelectPlayer(players.find(p => p.id === e.target.value))}
                defaultValue=""
            >
                <option value="" disabled>Select a player</option>
                {players.map(player => (
                    <option key={player.id} value={player.id}>
                        {player.name} - {player.team}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PlayerSelector;
