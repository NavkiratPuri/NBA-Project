import React, { useState, useEffect, useRef } from 'react';

const PlayerSelector = ({ players, onSelectPlayer, label }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const dropdown = useRef(null);

    const filterPlayers = () => {
        let value = inputValue.toLowerCase();

        let filtered = players.filter(player => {
            const fullName = player.Player.toLowerCase();
            const [firstName, lastName] = fullName.split(' ').map(name => name.toLowerCase());
            return fullName.startsWith(value) || (firstName && firstName.startsWith(value)) || (lastName && lastName.startsWith(value));
        });

        if (selectedYear) {
            filtered = filtered.filter(player => player.Year === selectedYear);
        }

        if (selectedTeam) {
            filtered = filtered.filter(player => player.Tm === selectedTeam);
        }

        setFilteredPlayers(filtered);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        filterPlayers();
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        filterPlayers();
    };

    const handleTeamChange = (e) => {
        setSelectedTeam(e.target.value);
        filterPlayers();
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

    const uniqueYears = [...new Set(players.map(player => player.Year))];
    const uniqueTeams = [...new Set(players.map(player => player.Tm))];

    return (
        <div className="player-selector-container mb-4 relative" ref={dropdown}>
            <div className="flex space-x-4 mb-4 items-end">
                <div>
                    <label htmlFor="year-filter" className="block mb-2 font-medium">Year:</label>
                    <select
                        id="year-filter"
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Years</option>
                        {uniqueYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="team-filter" className="block mb-2 font-medium">Team:</label>
                    <select
                        id="team-filter"
                        value={selectedTeam}
                        onChange={handleTeamChange}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Teams</option>
                        {uniqueTeams.map(team => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-grow">
                    <label htmlFor="player-input" className="block mb-2 font-medium">{label}</label>
                    <input
                        id="player-input"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter Player"
                        onFocus={filterPlayers}
                        onKeyDown={dropdownF}
                    />
                </div>
            </div>
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