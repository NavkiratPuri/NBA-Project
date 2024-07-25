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

    const [availableTeams, setAvailableTeams] = useState([]);
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
                setAvailableTeams(initialTeams); // Initialize available teams
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
        setAvailableTeams(newTeams); // Update available teams
        const filteredPlayers = filterPlayersByTeams(playersData, newTeams);
        setCategorizedPlayers(categorizePlayersByPosition(filteredPlayers));
    };

    const handleSelectPlayer = (position, player) => {
        setSelectedPlayers(prevState => ({
            ...prevState,
            [position]: player
        }));

        // Remove selected team from available teams
        setAvailableTeams(prevTeams => prevTeams.filter(team => team !== player.Tm));
        setUsedPositions(prevState => [...prevState, position]);
    };

    const handleDeselectPlayer = (position) => {
        const player = selectedPlayers[position];
        if (player) {
            // Re-add the team to the available teams
            setAvailableTeams(prevTeams => [...prevTeams, player.Tm]);
            // Remove the player from the selected players
            setSelectedPlayers(prevState => ({
                ...prevState,
                [position]: null
            }));
            // Remove position from used positions
            setUsedPositions(prevState => prevState.filter(pos => pos !== position));
        }
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
            setUsedPositions([]);
            updateTeamsAndPlayers(playersData);
        } catch (error) {
            console.error('Error resetting data:', error);
        }
    };

    const filteredPlayersByPosition = (position) => {
        return categorizedPlayers[position]?.filter(player => availableTeams.includes(player.Tm)) || [];
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex space-x-8">
                <div className="w-1/2">
                    {Object.keys(categorizedPlayers).map(position => (
                        !usedPositions.includes(position) && (
                            <PlayerSelector
                                key={position}
                                players={filteredPlayersByPosition(position)}
                                onSelectPlayer={(player) => handleSelectPlayer(position, player)}
                                label={position}
                                teams={availableTeams} // Pass available teams here
                            />
                        )
                    ))}
                </div>
                <div className="w-1/2">
                    <div className="selected-players mb-8 p-4 border-t border-gray-300">
                        <h2 className="text-lg font-bold mb-4">Selected Players</h2>
                        {Object.entries(selectedPlayers).map(([position, player]) => (
                            player && (
                                <div key={position} className="mb-2 p-2 border border-gray-300 rounded flex justify-between items-center">
                                    <div>
                                        <h3 className="text-md font-semibold">{position}</h3>
                                        <p>{player.Player} - {player.Tm} - {player.Year}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeselectPlayer(position)}
                                        className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )
                        ))}
                    </div>

                    <div className="available-teams mb-8 p-4 border-t border-gray-300">
                        <h2 className="text-lg font-bold mb-4">Available Teams</h2>
                        <ul>
                            {availableTeams.map((team) => (
                                <li key={team} className="mb-2 p-2 border border-gray-300 rounded">
                                    {team}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="reset-button p-4">
                        <button
                            onClick={handleReset}
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamBuilder;
