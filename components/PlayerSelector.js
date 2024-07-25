import React, { useState, useEffect, useRef } from "react";

const PlayerSelector = ({ players, onSelectPlayer, label, teams }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const dropdown = useRef(null);

  const filterPlayers = (value, year, team) => {
    let filtered = players.filter((player) => {
      const fullName = player.Player.toLowerCase();
      const [firstName, lastName] = fullName
        .split(" ")
        .map((name) => name.toLowerCase());
      return (
        fullName.startsWith(value) ||
        (firstName && firstName.startsWith(value)) ||
        (lastName && lastName.startsWith(value))
      );
    });

    if (year) {
      filtered = filtered.filter((player) => player.Year === year);
    }

    if (team) {
      filtered = filtered.filter((player) => player.Tm === team);
    }

    setFilteredPlayers(filtered);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    filterPlayers(value, selectedYear, selectedTeam);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    filterPlayers(inputValue, year, selectedTeam);
  };

  const handleTeamChange = (e) => {
    const team = e.target.value;
    setSelectedTeam(team);
    filterPlayers(inputValue, selectedYear, team);
  };

  const selectPlayer = (player) => {
    setInputValue("");
    setFilteredPlayers([]);
    onSelectPlayer(player);
  };

  const dropdownF = (e) => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setFilteredPlayers([]);
    }
    if (e.key === "Enter" && filteredPlayers.length > 0) {
      selectPlayer(filteredPlayers[0]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", dropdownF);
    return () => {
      document.removeEventListener("click", dropdownF);
    };
  }, []);

  const uniqueYears = [...new Set(players.map((player) => player.Year))];
  const uniqueTeams = [...new Set(players.map((player) => player.Tm))]; // Changed to use unique teams from players

  return (
    <div className="player-selector-container" ref={dropdown}>
      <div className="flex space-x-4 mb-4 items-end">
        <div>
          <select
            id="year-filter"
            value={selectedYear}
            onChange={handleYearChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Years</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="team-filter"
            value={selectedTeam}
            onChange={handleTeamChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Teams</option>
            {uniqueTeams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-grow">
          <label htmlFor="player-input" className="block mb-2 font-medium">
            {label}
          </label>
          <div className="relative w-full">
            <input
              id="player-input"
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter Player"
              onFocus={() => filterPlayers(inputValue, selectedYear, selectedTeam)}
              onKeyDown={dropdownF}
            />

            {filteredPlayers.length > 0 && (
              <ul className="absolute z-10 w-full max-h-40 overflow-auto bg-white border border-gray-300 rounded mt-1">
                {filteredPlayers.map((player) => (
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
        </div>
      </div>
    </div>
  );
};

export default PlayerSelector;
