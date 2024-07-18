import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { shuffle } from '@/utils/shuffle';
import categories from '@/utils/categories';
import GameInfo from './GameInfo';
import PlayerCard from './PlayerCard';
import GameOver from './GameOver';
import playerData from '@/utils/playerData';

// Fetch player data from the API
const fetchPlayer = async () => {
    try {
        const data = await playerData();
        return data;
    } catch (error) {
        console.error('Error fetching player:', error);
        throw error;
    }
};

const HiLo = ({ onGameEnd }) => {
    const [players, setPlayers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [comparisonResult, setComparisonResult] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [displayCategory, setDisplayCategory] = useState("");
    const [lives, setLives] = useState(3);
    const [points, setPoints] = useState(0);
    const [correctPlayerIndex, setCorrectPlayerIndex] = useState(null);
    const [gameStatus, setGameStatus] = useState("ongoing");
    const [hint, setHint] = useState(null);
    const [hintUsed, setHintUsed] = useState(false);
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");

    useEffect(() => {
        startNewTurn();
    }, []);

    const startNewTurn = async () => {
        setSelectedPlayer(null);
        setCorrectPlayerIndex(null);
        setHint(null);
        setHintUsed(false); // Reset hintUsed state

        // Reset lives and points for a new game
        if (gameStatus === 'ended') {
            setLives(3);
            setPoints(0);
        }

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

    const handlePlayerButtonClick = (playerIndex) => {
        setSelectedPlayer(playerIndex);
        setComparisonResult("");
        comparePlayersAndUpdate(playerIndex);
    };

    const comparePlayers = (player1, player2) => {
        if (!selectedCategory) {
            setComparisonResult("Please select a category.");
            return;
        }
    
        const statPlayer1 = player1[selectedCategory.value];
        const statPlayer2 = player2[selectedCategory.value];
        
        // //Testing Equals
        // const statPlayer1 = 2;
        // const statPlayer2 = 2;
    
        let higherPlayer;
        if (statPlayer1 === statPlayer2) {
            setComparisonResult(`Both players have the same ${selectedCategory.label} of ${statPlayer1}.`);
            // Gain a point when stats are equal
            setPoints(points + 1);
            setCorrectPlayerIndex(player1.Player === player1Name ? 0 : 1);
        } else if (statPlayer1 > statPlayer2) {
            higherPlayer = player1.Player;
            setCorrectPlayerIndex(0);
            setComparisonResult(`${player1.Player} has a higher ${selectedCategory.label} with ${statPlayer1}.`);
        } else {
            higherPlayer = player2.Player;
            setCorrectPlayerIndex(1);
            setComparisonResult(`${player2.Player} has a higher ${selectedCategory.label} with ${statPlayer2}.`);
        }
    };
    
    const comparePlayersAndUpdate = (playerIndex) => {
        if (players.length > 0 && selectedCategory) {
            const otherPlayerIndex = playerIndex === 0 ? 1 : 0;
            const player1Stat = players[playerIndex][selectedCategory.value];
            const player2Stat = players[otherPlayerIndex][selectedCategory.value];
            
            // //Testing Equals
            // const player1Stat = 2;
            // const player2Stat = 2;
    
            comparePlayers(players[playerIndex], players[otherPlayerIndex]);
    
            if (comparisonResult.startsWith("Both players have the same")) {
                // Handle the equal stats case here
                // No additional update needed, as points are already updated in comparePlayers
                // You can still call startNewTurn() to proceed to the next turn
                setTimeout(() => {
                    startNewTurn();
                }, 2000); // 2-second delay before starting a new turn
            } else {
                // Update lives and points based on the comparison result
                updateLivesAndPoints(player1Stat, player2Stat, playerIndex, otherPlayerIndex);
            }
        }
    };
    
    const updateLivesAndPoints = (player1Stat, player2Stat, playerIndex, otherPlayerIndex) => {
        const correctPlayer = player1Stat >= player2Stat;
    
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
    };
    
    

    const handleHintButtonClick = (playerIndex) => {
        if (hintUsed || players.length === 0 || !selectedCategory) return;

        const player = players[playerIndex];
        const stat = player[selectedCategory.value];
        const playerName = playerIndex === 0 ? player1Name : player2Name;
        setHint(`${playerName}'s ${selectedCategory.label}: ${stat}`);
        setHintUsed(true);
    };

    const handleRestart = () => {
        setGameStatus("ongoing");
        startNewTurn();
    };

    return (
        <div className="flex flex-col flex-grow">
            <div className="relative flex-grow">
                {gameStatus === "ongoing" ? (
                    <>
                        

                        {players.length > 0 && selectedCategory && (
                            <div className="flex">
                                {players.slice(0, 2).map((player, index) => (
                                    <PlayerCard
                                        key={index}
                                        player={player}
                                        index={index}
                                        selectedPlayer={selectedPlayer}
                                        correctPlayerIndex={correctPlayerIndex}
                                        hintUsed={hintUsed}
                                        hint={hint}
                                        selectedCategory={selectedCategory} // Pass selectedCategory to PlayerCard
                                        handlePlayerButtonClick={handlePlayerButtonClick}
                                        handleHintButtonClick={handleHintButtonClick}
                                    />
                                ))}
                            </div>
                        )}

                        <GameInfo
                            displayCategory={displayCategory}
                            lives={lives}
                            points={points}
                            comparisonResult={comparisonResult}
                            hint={hint}
                        />
                    </>
                ) : (
                    <GameOver
                        points={points}
                        onRestart={handleRestart}
                    />
                )}
            </div>
        </div>
    );
};

export default HiLo;
