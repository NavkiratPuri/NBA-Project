import React, { useState, useEffect } from 'react';
import PlayerSelector from '@/components/PlayerSelector';
import fetchCSV from '@/utils/fetchCsv';

const getRandomTeams = (players, numTeams = 5) => {
    const teams = [...new Set(players.map(player => player.Tm))];
    const shuffledTeams = teams.sort(() => 0.5 - Math.random());
    return shuffledTeams.slice(0, numTeams);
};

const filterPlayersByTeams = (players, teams) => {
    return players.filter(player => teams.includes(player.Tm));
};

const categorizePlayersByPosition = (players) => {
    const positions = ['C', 'PF', 'SF', 'PG', 'SG'];
    const categorized = {};

    positions.forEach(position => {
        categorized[position] = players.filter(player => player.Pos.includes(position));
    });

    return categorized;
};

const TeamBuilder = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [categorizedPlayers, setCategorizedPlayers] = useState({});
    const [selectedPlayers, setSelectedPlayers] = useState({
        'C': null,
        'PF': null,
        'SF': null,
        'PG': null,
        'SG': null
    });

    const [usedTeams, setUsedTeams] = useState([]);
    const [usedPositions, setUsedPositions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCSV();
                const playersData = data.map(player => ({
                    id: player.Rk,
                    Player: player.Player,
                    Pos: player.Pos.split('-')[0], // Assuming position is separated by dash
                    Tm: player.Tm,
                    Year: player.Year,
                }));

                setPlayers(playersData);
                const initialTeams = getRandomTeams(playersData);
                setTeams(initialTeams);
                const filteredPlayers = filterPlayersByTeams(playersData, initialTeams);
                setCategorizedPlayers(categorizePlayersByPosition(filteredPlayers));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const updateTeamsAndPlayers = (playersData) => {
        const newTeams = getRandomTeams(playersData);
        setTeams(newTeams);
        const filteredPlayers = filterPlayersByTeams(playersData, newTeams);
        setCategorizedPlayers(categorizePlayersByPosition(filteredPlayers));
    };

    const handleSelectPlayer = (position, player) => {
        setSelectedPlayers(prevState => ({
            ...prevState,
            [position]: player
        }));

        setUsedTeams(prevState => [...prevState, player.Tm]);
        setUsedPositions(prevState => [...prevState, position]);
    };

    const handleReset = async () => {
        try {
            const data = await fetchCSV();
            const playersData = data.map(player => ({
                id: player.Rk,
                Player: player.Player,
                Pos: player.Pos.split('-')[0], // Assuming position is separated by dash
                Tm: player.Tm,
                Year: player.Year,
            }));

            setSelectedPlayers({
                'C': null,
                'PF': null,
                'SF': null,
                'PG': null,
                'SG': null
            });
            setUsedTeams([]);
            setUsedPositions([]);
            updateTeamsAndPlayers(playersData);
        } catch (error) {
            console.error('Error resetting data:', error);
        }
    };

    const filteredPlayersByPosition = (position) => {
        return categorizedPlayers[position]?.filter(player => !usedTeams.includes(player.Tm)) || [];
    };

    return (
        <div>
            {Object.keys(categorizedPlayers).map(position => (
                !usedPositions.includes(position) && (
                    <PlayerSelector
                        key={position}
                        players={filteredPlayersByPosition(position)}
                        onSelectPlayer={(player) => handleSelectPlayer(position, player)}
                        label={position}
                        teams={teams} // Pass teams here
                    />
                )
            ))}

            <div className="selected-players mt-8 p-4 border-t border-gray-300">
                <h2 className="text-lg font-bold mb-4">Selected Players</h2>
                {Object.entries(selectedPlayers).map(([position, player]) => (
                    player && (
                        <div key={position} className="mb-2 p-2 border border-gray-300 rounded">
                            <h3 className="text-md font-semibold">{position}</h3>
                            <p>{player.Player} - {player.Tm} - {player.Year}</p>
                        </div>
                    )
                ))}
            </div>

            <div className="available-teams mt-8 p-4 border-t border-gray-300">
                <h2 className="text-lg font-bold mb-4">Available Teams</h2>
                <ul>
                    {teams.map((team) => (
                        !usedTeams.includes(team) && (
                            <li key={team} className="mb-2 p-2 border border-gray-300 rounded">
                                {team}
                            </li>
                        )
                    ))}
                </ul>
            </div>

            <div className="reset-button mt-8 p-4">
                <button
                    onClick={handleReset}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default TeamBuilder;
