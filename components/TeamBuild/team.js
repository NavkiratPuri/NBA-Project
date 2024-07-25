'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import PlayerSelector from '@/components/PlayerSelector';
import fetchCSV from '@/utils/fetchCsv';
import { calculatePlayerValue } from '@/utils/calculateValue'; // Adjust the import path

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

const positionLabels = {
    'C': 'Center',
    'PF': 'Power Forward',
    'SF': 'Small Forward',
    'PG': 'Point Guard',
    'SG': 'Shooting Guard'
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
    const [totalValue, setTotalValue] = useState(0);

    const [isNewHighScore, setIsNewHighScore] = useState(false);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get('/api/user');
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUser();
    }, []);
  
    useEffect(() => {
      const updateHighScore = async () => {
        if (user) {
          try {
            if (totalValue > (user.highScoreT || 0)) {
              setIsNewHighScore(true);
              await axios.patch('/api/updateHighscore', {
                newHighScore: totalValue,
                gameType: 'teambuilder',
              });
            }
          } catch (error) {
            console.error("Error updating high score:", error);
          }
        }
      };
  
      updateHighScore();
    }, [totalValue, user]);

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
                    Age: player.Age,
                    PTS: player.PTS,
                    AST: player.AST,
                    BLK: player.BLK,
                    STL: player.STL,
                    TOV: player.TOV,
                    FTPercent: player.FTPercent,
                    eFGPercent: player.eFGPercent,
                    G: player.G,
                    GS: player.GS,
                    ORB: player.ORB,
                    DRB: player.DRB,
                    PF: player.PF,
                    MP: player.MP
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

        setAvailableTeams(prevTeams => prevTeams.filter(team => team !== player.Tm));
        setUsedPositions(prevState => [...prevState, position]);
    };

    const handleDeselectPlayer = (position) => {
        const player = selectedPlayers[position];
        if (player) {
            setAvailableTeams(prevTeams => [...prevTeams, player.Tm]);
            setSelectedPlayers(prevState => ({
                ...prevState,
                [position]: null
            }));
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
                Age: player.Age,
                PTS: player.PTS,
                AST: player.AST,
                BLK: player.BLK,
                STL: player.STL,
                TOV: player.TOV,
                FTPercent: player.FTPercent,
                eFGPercent: player.eFGPercent,
                G: player.G,
                GS: player.GS,
                ORB: player.ORB,
                DRB: player.DRB,
                PF: player.PF,
                MP: player.MP
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
            setTotalValue(0); // Reset the total value
        } catch (error) {
            console.error('Error resetting data:', error);
        }
    };

    const handleSubmit = () => {
        const values = Object.values(selectedPlayers);
        const calculatedValues = values.reduce((acc, player) => {
            if (player) {
                const playerValue = calculatePlayerValue(player);
                acc.totalValue += playerValue.totalValue;
            }
            return acc;
        }, { totalValue: 0 });
        setTotalValue(calculatedValues.totalValue);
    };

    const filteredPlayersByPosition = (position) => {
        return categorizedPlayers[position]?.filter(player => availableTeams.includes(player.Tm)) || [];
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex">
                {/* Left Section: Player Selection and Buttons */}
                <div className="flex flex-col w-1/2 pr-4 border-r border-gray-300">
                    <div className="flex flex-col mb-4">
                        {/* Player Selection */}
                        <div className="selected-players mb-8 p-4 border-t border-gray-300 flex flex-col mb-8">
                            <h2 className="text-lg font-bold mb-4">Player Selection</h2>
                            {Object.keys(categorizedPlayers).map(position => (
                                !usedPositions.includes(position) && (
                                    <div key={position} className="flex items-center mb-4">
                                        <div className="w-1/3 font-semibold text-lg">
                                            {positionLabels[position]}
                                        </div>
                                        <div className="w-2/3">
                                            <PlayerSelector
                                                players={filteredPlayersByPosition(position)}
                                                onSelectPlayer={(player) => handleSelectPlayer(position, player)}
                                                label={position}
                                                teams={availableTeams} // Pass available teams here
                                            />
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                        
                        {/* Total Value */}
                        <div className="total-value p-4 border-t border-gray-300 flex flex-col items-center">
                            <h2 className="text-lg font-bold mb-4">Total Score</h2>
                            <p className="text-xl font-semibold mb-4">{totalValue.toFixed(2)}</p>
                            <button
                                onClick={handleSubmit}
                                className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section: Selected Players and Available Teams */}
                <div className="w-1/2 flex flex-col pl-4">
                    <div className="flex flex-col mb-4">
                        {/* Selected Players */}
                        <div className="selected-players p-4 border-t border-gray-300 flex flex-col mb-8">
                            <h2 className="text-lg font-bold mb-4">Selected Players</h2>
                            {Object.keys(selectedPlayers).map(position => (
                                selectedPlayers[position] && (
                                    <div key={position} className="flex items-center mb-4">
                                        <div className="w-1/3 font-semibold text-lg">
                                            {positionLabels[position]}
                                        </div>
                                        <div className="w-2/3 flex items-center">
                                            <p className="mr-4">{selectedPlayers[position].Player}</p>
                                            <button
                                                onClick={() => handleDeselectPlayer(position)}
                                                className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
                                            >
                                                Deselect
                                            </button>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        {/* Available Teams */}
                        <div className="available-teams p-4 border-t border-gray-300 flex flex-col">
                            <h2 className="text-lg font-bold mb-4">Available Teams</h2>
                            <ul>
                                {availableTeams.map(team => (
                                    <li key={team} className="mb-2">
                                        {team}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button
                        onClick={handleReset}
                        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamBuilder;
