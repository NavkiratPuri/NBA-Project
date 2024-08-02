import React, { useState, useEffect, useRef } from 'react';

const TeamSelector = ({ teams, onSelectTeam, label }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredTeams, setFilteredTeams] = useState([]);
  const dropdown = useRef(null);

  const filterTeams = (e) => {
    let value = e ? e.target.value.toLowerCase() : inputValue;
    setInputValue(value);

    if (value) {
      setFilteredTeams(
        teams.filter(team => {
          const fullName = team.team.toLowerCase();
          const [firstName, lastName] = fullName.split(' ');
          return fullName.startsWith(value) || firstName.startsWith(value) || lastName.startsWith(value);
        })
      );
    } else {
      setFilteredTeams([]);
    }
  };

  const selectTeam = (team) => {
    setInputValue(team.team);
    setFilteredTeams([]);
    onSelectTeam(team);
  };

  const dropdownF = (e) => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setFilteredTeams([]);
    }
    if (e.key === 'Enter' && filteredTeams.length > 0) {
      selectTeam(filteredTeams[0]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', dropdownF);
    return () => {
      document.removeEventListener('click', dropdownF);
    };
  }, []);

  return (
    <div className="team-selector-container mb-4 relative" ref={dropdown}>
      <label htmlFor="team-select" className="block mb-2 font-medium">{label}</label>
      <div className="relative">
        <input
          id="team-input"
          type="text"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-center"
          value={inputValue}
          onChange={filterTeams}
          placeholder="Enter Team"
          onFocus={filterTeams}
          onKeyDown={dropdownF}
          style={{ textAlign: 'center' }}
        />
        {filteredTeams.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded w-full max-h-40 overflow-auto z-10 mt-1">
            {filteredTeams.map(team => (
              <li
                key={team.id}
                className="p-2 cursor-pointer hover:bg-blue-100"
                onClick={() => selectTeam(team)}
              >
                {team.team}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeamSelector;
