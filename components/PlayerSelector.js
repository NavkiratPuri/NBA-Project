import React, { useState, useEffect, useRef } from "react";

const PlayerSelector = ({
  players,
  onSelectPlayer,
  label,
  teams,
  multiSelect = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
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

  const handleCheckboxChange = (player) => {
    setSelectedPlayers((prevSelected) => {
      if (prevSelected.includes(player)) {
        return prevSelected.filter((p) => p !== player);
      } else {
        return [...prevSelected, player];
      }
    });
  };

  const handleSelectPlayers = () => {
    onSelectPlayer(selectedPlayers);
    setSelectedPlayers([]);
    setFilteredPlayers([]);
    setInputValue("");
  };

  const selectPlayer = (player) => {
    if (multiSelect) {
      handleCheckboxChange(player);
    } else {
      onSelectPlayer(player);
      setInputValue("");
      setFilteredPlayers([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && filteredPlayers.length > 0) {
      selectPlayer(filteredPlayers[0]);
    }
  };

  const dropdownF = (e) => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setFilteredPlayers([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", dropdownF);
    return () => {
      document.removeEventListener("click", dropdownF);
    };
  }, []);

  const uniqueYears = [...new Set(players.map((player) => player.Year))];
  const uniqueTeams = [...new Set(players.map((player) => player.Tm))];

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
        <div className="flex-1">
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
              onFocus={() =>
                filterPlayers(inputValue, selectedYear, selectedTeam)
              }
              onKeyDown={handleKeyPress}
            />
            {filteredPlayers.length > 0 && (
              <ul className="absolute z-10 w-full max-h-40 overflow-auto bg-white border border-gray-300 rounded mt-1">
                {filteredPlayers.map((player) => (
                  <li
                    key={player.id}
                    className="p-2 flex items-center cursor-pointer hover:bg-blue-100"
                    onClick={() => selectPlayer(player)}
                  >
                    {multiSelect && (
                      <input
                        type="checkbox"
                        checked={selectedPlayers.includes(player)}
                        onChange={() => handleCheckboxChange(player)}
                        className="mr-2"
                      />
                    )}
                    {player.Player} - {player.Tm} - {player.Year}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {multiSelect && (
          <button
            className="bg-orange-500 text-white py-2 px-4 hover:bg-orange-600 rounded"
            onClick={handleSelectPlayers}
            disabled={selectedPlayers.length === 0}
          >
            Select Players
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerSelector;
