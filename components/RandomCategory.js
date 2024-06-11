import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { shuffle } from '@/utils/shuffle';

// Fetch player data from the API
const fetchPlayer = async () => {
    try {
        const response = await axios.get('/api/player');
        return response.data;
    } catch (error) {
        console.error('Error fetching player:', error);
        throw error;
    }
};


const RandomCategory = ({ onGameEnd }) => {
    const [players, setPlayers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [comparisonResult, setComparisonResult] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [displayCategory, setDisplayCategory] = useState("");
    const [lives, setLives] = useState(3);
    const [points, setPoints] = useState(0);
    const [correctPlayerIndex, setCorrectPlayerIndex] = useState(null);
    const [gameStatus, setGameStatus] = useState("ongoing");

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

    useEffect(() => {
        startNewTurn()
    }, []);

    const startNewTurn = async () => {
        setSelectedPlayer(null);
        setCorrectPlayerIndex(null);
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
            setCorrectPlayerIndex(0);
        } else if (statPlayer1 < statPlayer2) {
            higherPlayer = player2.Player;
            setCorrectPlayerIndex(1);
        } else {
            setComparisonResult("Stats are equal.");
            return;
        }

        setComparisonResult(`${higherPlayer} has a higher ${selectedCategory.label}.`);
    };

    const handlePlayerButtonClick = (playerIndex) => {
        setSelectedPlayer(playerIndex);
        setComparisonResult("");
    
        if (players.length > 0 && selectedCategory) {
            const otherPlayerIndex = playerIndex === 0 ? 1 : 0;
            const player1Stat = players[playerIndex][selectedCategory.value];
            const player2Stat = players[otherPlayerIndex][selectedCategory.value];

            comparePlayers(players[playerIndex], players[otherPlayerIndex]);
            
            // Check if the stats are equal
            if (player1Stat === player2Stat) {
                // User gets a point
                setPoints(points + 1);
                setCorrectPlayerIndex(playerIndex);
            } else {
                // Check if the selected player's stat is higher than the other player's stat
                const correctPlayer = player1Stat > player2Stat;
    
                if (correctPlayer) {
                    setPoints(points + 1);
                    setCorrectPlayerIndex(playerIndex);
                } else {
                    setLives(lives - 1);
                    setCorrectPlayerIndex(otherPlayerIndex);
                }  
    
                if (lives - 1 === 0) {
                    setGameStatus("ended");
                } else {
                    setTimeout(() => {
                        startNewTurn();
                    }, 2000); // 2-second delay before starting a new turn
                }
            }
        }
    };
    

    return (
        <div className="p-4">
            {gameStatus === "ongoing" ? (
                <>
                    <div className="mt-4 text-center">
                        <h2>Who has a higher {displayCategory}?</h2>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-2xl font-bold mb-2">Lives: {lives}</p>
                        <p className="text-2xl font-bold mb-2">Points: {points}</p>
                    </div>

                    {players.length > 0 && selectedCategory && (
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold mb-2 text-center">Random Player Data:</h3>
                            <div className="mt-4 flex justify-center">
                                {players.map((player, index) => (
                                    <div key={index} className="w-half h-full inset-0 p-4 border rounded shadow m-2 hover:bg-blue-500 flex items-center justify-center">
                                    <button 
                                        onClick={() => handlePlayerButtonClick(index)} 
                                        className={`w-full py-2 px-50% rounded ${
                                            selectedPlayer !== null && index === selectedPlayer
                                                ? (index === correctPlayerIndex ? 'bg-green-500' : 'bg-red-500')
                                                : selectedPlayer !== null && index === correctPlayerIndex
                                                    ? 'bg-green-500'
                                                    : ''
                                        } text-black`}
                                        disabled={selectedPlayer !== null}
                                    >
                                        <p><strong>Name:</strong> {player.Player}</p>
                                        <p><strong>Team:</strong> {player.Tm}</p>
                                        <p><strong>Position:</strong> {player.Pos}</p>
                                        <p><strong>{selectedCategory.label}:</strong> {player[selectedCategory.value]}</p>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <p>{comparisonResult}</p>
                        </div>
                    </div>
                )}
            </>
        ) : (
            <div className="text-center">
                <h2>Game Over!</h2>
                <p>Your final score: {points}</p>
                <button onClick={onGameEnd} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
                    Next
                </button>
            </div>
        )}
    </div>
);
};

export default RandomCategory;
