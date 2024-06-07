import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Utility function to shuffle an array
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Fetch player data from the API
const fetchPlayer = async () => {
    try {
        const response = await axios.get('/api/player');
        return response.data;
    } catch (error) {
        console.error('Error fetching player:', error);
    }
};

const RandomCategory = () => {
    const [players, setPlayers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [comparisonResult, setComparisonResult] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [displayCategory, setDisplayCategory] = useState("");

    const categories = [
        { value: "MP", label: "Minutes Per Game (MPG)" },
        { value: "PTS", label: "Points Per Game (PPG)" },
        { value: "TRB", label: "Rebounds Per Game (RPG)" },
        { value: "AST", label: "Assists Per Game (APG)" },
        { value: "STL", label: "Steals Per Game (SPG)" },
        { value: "BLK", label: "Blocks Per Game (BPG)" },
        { value: "FG", label: "Field Goals Made (FGM)" },
        { value: "FGA", label: "Field Goals Attempted (FGA)" },
        { value: "FGPercent", label: "Field Goal Percentage (FG%)" },
        { value: "threeP", label: "Three-Point Field Goals Made (3PM)" },
        { value: "threePA", label: "Three-Point Field Goals Attempted (3PA)" },
        { value: "threePPercent", label: "Three-Point Field Goal Percentage (3P%)" },
        { value: "twoP", label: "Two-Point Field Goals Made (2PM)" },
        { value: "twoPA", label: "Two-Point Field Goals Attempted (2PA)" },
        { value: "twoPPercent", label: "Two-Point Field Goal Percentage (2P%)" },
        { value: "eFGPercent", label: "Effective Field Goal Percentage (eFG%)" },
        { value: "FT", label: "Free Throws Made (FTM)" },
        { value: "FTA", label: "Free Throws Attempted (FTA)" },
        { value: "FTPercent", label: "Free Throw Percentage (FT%)" },
        { value: "ORB", label: "Offensive Rebounds (ORB)" },
        { value: "DRB", label: "Defensive Rebounds (DRB)" },
        { value: "TOV", label: "Turnovers (TOV)" },
        { value: "PF", label: "Personal Fouls (PF)" },
    ];

    const handleButtonClick = async () => {
        setSelectedPlayer(null);
        const shuffledCategories = shuffle([...categories]);
        const randomCategory = shuffledCategories[0];
        setSelectedCategory(randomCategory);
        setDisplayCategory(randomCategory.label);

        const playerData = await fetchPlayer();
        if (playerData && playerData.length >= 2) {
            const shuffledPlayers = shuffle(playerData).slice(0, 2);
            setPlayers(shuffledPlayers);
            setComparisonResult("");
        }
    };

    const comparePlayers = (player1, player2) => {
        if (!selectedCategory) {
            setComparisonResult("Please select a category.");
            return;
        }

        const statPlayer1 = player1[selectedCategory.value];
        const statPlayer2 = player2[selectedCategory.value];

        let higherPlayer;
        if (statPlayer1 > statPlayer2) {
            higherPlayer = player1.Player;
        } else if (statPlayer1 < statPlayer2) {
            higherPlayer = player2.Player;
        } else {
            setComparisonResult("Stats are equal.");
            return;
        }

        setComparisonResult(`${higherPlayer} has a higher ${selectedCategory.label}.`);
    };

    const handlePlayerButtonClick = (playerIndex) => {
        setSelectedPlayer(playerIndex);
        setComparisonResult("");
    };

    useEffect(() => {
        if (selectedPlayer !== null && players.length > 0 && selectedCategory) {
            const otherPlayerIndex = selectedPlayer === 0 ? 1 : 0;
            comparePlayers(players[selectedPlayer], players[otherPlayerIndex]);
        }
    }, [selectedPlayer, players, selectedCategory]);

    return (
        <div className="p-4">
            <button 
                onClick={handleButtonClick} 
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
                Get Random Players
            </button>

            <div className="mt-4">
                <h2>Who has a higher {displayCategory}?</h2>
            </div>

            {players.length > 0 && selectedCategory && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Random Player Data:</h3>
                    <div className="mt-4 flex">
                        {players.map((player, index) => (
                            <div key={index} className="w-1/2 p-4 border rounded shadow">
                                <button 
                                    onClick={() => handlePlayerButtonClick(index)} 
                                    className={`w-full py-2 px-4 rounded ${selectedPlayer === index ? 'bg-green-500 text-white' : ''}`}
                                >
                                    <p><strong>Name:</strong> {player.Player}</p>
                                    <p><strong>Team:</strong> {player.Tm}</p>
                                    <p><strong>Position:</strong> {player.Pos}</p>
                                    <p><strong>{selectedCategory.label}:</strong> {player[selectedCategory.value]}</p>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <p>{comparisonResult}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RandomCategory;
