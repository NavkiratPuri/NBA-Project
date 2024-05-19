import React from 'react';

const PlayerSelector = ({ players, onSelectPlayer, label }) => {
    return (
        <div className="player-selector-container">
            <label htmlFor="player-select">{label}</label>
            <select id="player-select" onChange={e => onSelectPlayer(players.find(p => p.id === e.target.value))}>
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
