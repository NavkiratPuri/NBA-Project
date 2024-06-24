import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { shuffle } from '@/utils/shuffle';
import Header from '../components/header';
import Footer from '../components/footer';

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

    // New state variables to store player names
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");

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
            
            // Update player names
            setPlayer1Name(shuffledPlayers[0].Player);
            setPlayer2Name(shuffledPlayers[1].Player);
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
            if (comparisonResult === "Stats are equal.") {
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

    const images = () =>{
        // Use the player names here
        console.log("Player 1: ", player1Name);
        console.log("Player 2: ", player2Name);
    }

    return (
        <div className="flex flex-col flex-grow">
          <div className="relative flex-grow">
            {/* <Header/> */}
            {gameStatus === "ongoing" ? (
              <>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center">
                    <div className="bg-gray-500 bg-opacity-50 border rounded shadow p-4">
                        <h2 className="text-xl">Who has a higher </h2>
                        <h2 className="text-xl">{displayCategory}?</h2>
                        <p className="text-l font-bold">Lives: {lives}</p>
                        <p className="text-l font-bold">Points: {points}</p>
                        <div className="mt-4 text-center">
                        <p>{comparisonResult}</p>
                        {images()}
                        </div>
                    </div>
                </div>
    
                {players.length > 0 && selectedCategory && (
                  <div className="flex">
                    {players.slice(0, 2).map((player, index) => (
                      <div key={index} className="w-1/2 flex items-center justify-center">
                        <button 
                          onClick={() => handlePlayerButtonClick(index)}
                          className={`relative w-full h-screen py-2 px-4 rounded bg-gray-200 hover:bg-blue-400  ${
                            selectedPlayer !== null && index === selectedPlayer
                              ? (index === correctPlayerIndex ? 'bg-green-500 hover:bg-green-500' : 'bg-red-500 hover:bg-red-500')
                              : selectedPlayer !== null && index === correctPlayerIndex
                                ? 'bg-green-500 hover:bg-green-500'
                                : ''
                          } text-black`}
                          disabled={selectedPlayer !== null} 
                        > 
                          <p className="text-xl"><strong>Name:</strong> {player.Player}</p>
                          <p className="text-xl"><strong>Team:</strong> {player.Tm}</p>
                          <p className="text-xl"><strong>Position:</strong> {player.Pos}</p>
                          {/* <p className="text-xl font-bold"><strong>{selectedCategory.label}:</strong> {player[selectedCategory.value]}</p> */}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
    
               
              </>
            ) : (
                <div className="h-screen inset-0 flex flex-col items-center justify-center z-10 text-center">
                    <div className="bg-gray-500 bg-opacity-50 border rounded shadow p-4">
                        <h2 className="text-3xl">Game Over!</h2>
                        <p className="text-2xl">Your final score: {points}</p>
                        <button onClick={onGameEnd} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
                        Next
                        </button>
                    </div>
                </div>
            )}
            
          </div>   
        </div>
      );
    };

export default RandomCategory;
