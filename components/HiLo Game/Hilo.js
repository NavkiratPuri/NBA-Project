import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { shuffle } from '@/utils/shuffle';
import categories from '@/utils/categories';
import GameInfo from './GameInfo';
import PlayerCard from './PlayerCard';
import GameOver from './GameOver';
import playerData from '@/utils/playerData';
import fetchPlayerImage from '@/utils/fetchPlayerImage';

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
    const [player1Image, setPlayer1Image] = useState("");
    const [player2Image, setPlayer2Image] = useState("");

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

        // Clear the current images
        setPlayer1Image("");
        setPlayer2Image("");

        setTimeout(async () => {
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

                // Fetch and set images
                const [image1, image2] = await Promise.all([
                    fetchPlayerImage(shuffledPlayers[0].Player),
                    fetchPlayerImage(shuffledPlayers[1].Player)
                ]);

                setPlayer1Image(image1);
                setPlayer2Image(image2);
            }
        }, 500); // Delay to clear the images before fetching new ones
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

            comparePlayers(players[playerIndex], players[otherPlayerIndex]);

            if (comparisonResult.startsWith("Both players have the same")) {
                setTimeout(() => {
                    startNewTurn();
                }, 2000); // 2-second delay before starting a new turn
            } else {
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
            setLives(prevLives => {
                const newLives = prevLives - 1;
                if (newLives === 0) {
                    setGameStatus("ended");
                }
                return newLives;
            });
            setCorrectPlayerIndex(otherPlayerIndex);
        }

        if (lives > 0) {
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
                        <GameInfo
                            displayCategory={displayCategory}
                            lives={lives}
                            points={points}
                            comparisonResult={comparisonResult}
                            hint={hint}
                        />

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
                                        image={index === 0 ? player1Image : player2Image}
                                    />
                                ))}
                            </div>
                        )}
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
