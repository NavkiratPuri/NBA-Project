import React, { useState, useEffect, useRef } from 'react';

const PlayerSelector = ({ players, onSelectPlayer, label }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const dropdown = useRef(null);

    const filterPlayers = (e) => {
        let value = e.target.value.toLowerCase();
        setInputValue(value);

        if (value) {
            setFilteredPlayers(
                players.filter(player => {
                    const fullName = player.Player.toLowerCase();
                    const [firstName, lastName] = fullName.split(' ').map(name => name.toLowerCase());
                    return fullName.startsWith(value) || (firstName && firstName.startsWith(value)) || (lastName && lastName.startsWith(value));
                })
            );
        } else {
            setFilteredPlayers([]);
        }
    };

    const selectPlayer = (player) => {
        setInputValue('');
        setFilteredPlayers([]);
        onSelectPlayer(player);
    };

    const dropdownF = (e) => {
        if (dropdown.current && !dropdown.current.contains(e.target)) {
            setFilteredPlayers([]);
        }
        if (e.key === 'Enter' && filteredPlayers.length > 0) {
            selectPlayer(filteredPlayers[0]);
        }
    };

    useEffect(() => {
        document.addEventListener('click', dropdownF);
        return () => {
            document.removeEventListener('click', dropdownF);
        };
    }, []);

    return (
        <div className="player-selector-container mb-4 relative" ref={dropdown}>
            <label htmlFor="player-input" className="block mb-2 font-medium">{label}</label>
            <input
                id="player-input"
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={inputValue}
                onChange={filterPlayers}
                placeholder="Enter Player"
                onFocus={filterPlayers}
                onKeyDown={dropdownF}
            />
            {filteredPlayers.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded w-full max-h-40 overflow-auto z-50">
                    {filteredPlayers.map(player => (
                        <li
                            key={player.id}
                            className="p-2 cursor-pointer hover:bg-blue-100"
                            onClick={() => selectPlayer(player)}
                        >
                            {player.Player} - {player.Tm} - {player.Year}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlayerSelector;