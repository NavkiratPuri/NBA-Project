"use client"
import React, { useState, useEffect } from "react";

const LeadersList = () => {
    const [players, setPlayers] = useState([]);
    const [category, setCategory] = useState("MP");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/player', { cache: "no-cache" });
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Sort players by category
    const sortPlayersByCategory = (category) => {
        return players.sort((a, b) => b[category] - a[category]).slice(0, 10);
    };
    // Render top players
    const renderTopPlayers = (category) => {
        const topPlayers = sortPlayersByCategory(category);
        return (
            <div className="mt-5">
                <h2 className="text-xl font-semibold text-gray-800">Top 5 Players in {category}</h2>
                <ul className="list-none pl-5">
                    {topPlayers.map((player, index) => (
                        <li key={index} className="py-1">
                            {player.Player} - {player[category]}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };


    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-4">League Leaders</h1>
            <div className="max-w-md mx-auto">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Select Category:</label>
                <select
                    id="category"
                    className="form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="MP">Minutes Per Game (MPG)</option>
                    <option value="PTS">Points Per Game (PPG)</option>
                    <option value="TRB">Rebounds Per Game (RPG)</option>
                    <option value="AST">Assists Per Game (APG)</option>
                    <option value="STL">Steals Per Game (SPG)</option>
                    <option value="BLK">Blocks Per Game (BPG)</option>
                    <option value="FG">Field Goals Made (FGM)</option>
                    <option value="FGA">Field Goals Attempted (FGA)</option>
                    <option value="FGPercent">Field Goal Percentage (FG%)</option>
                    <option value="threeP">Three-Point Field Goals Made (3PM)</option>
                    <option value="threePA">Three-Point Field Goals Attempted (3PA)</option>
                    <option value="threePPercent">Three-Point Field Goal Percentage (3P%)</option>
                    <option value="twoP">Two-Point Field Goals Made (2PM)</option>
                    <option value="twoPA">Two-Point Field Goals Attempted (2PA)</option>
                    <option value="twoPPercent">Two-Point Field Goal Percentage (2P%)</option>
                    <option value="eFGPercent">Effective Field Goal Percentage (eFG%)</option>
                    <option value="FT">Free Throws Made (FTM)</option>
                    <option value="FTA">Free Throws Attempted (FTA)</option>
                    <option value="FTPercent">Free Throw Percentage (FT%)</option>
                    <option value="ORB">Offensive Rebounds (ORB)</option>
                    <option value="DRB">Defensive Rebounds (DRB)</option>
                    <option value="TOV">Turnovers (TOV)</option>
                    <option value="PF">Personal Fouls (PF)</option>

                </select>
            </div>
            {renderTopPlayers(category)}
        </div>
    );
};

export default LeadersList;
