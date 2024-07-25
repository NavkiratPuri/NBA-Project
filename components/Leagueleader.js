"use client";
import React, { useState, useEffect } from "react";

const LeadersList = () => {
    const [players, setPlayers] = useState([]);
    const [category, setCategory] = useState(""); // Initialize category as an empty string
    const [year, setYear] = useState(""); // Initialize year as an empty string

    useEffect(() => {
        if (year === "" || category === "") return; // Don't fetch data if year or category is not selected

        const fetchData = async () => {
            try {
                const apiUrl = `/api/yearlyplayer?year=${year}`;
                console.log(`Fetching data from: ${apiUrl}`);
                const res = await fetch(apiUrl, { cache: "no-cache" });
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                console.log(`Fetched player data for year ${year}:`, data);
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [year, category]); // Add category as a dependency to refetch data when category changes

    const sortPlayersByCategory = (category) => {
        const sortedPlayers = players.sort((a, b) => b[category] - a[category]);
        return sortedPlayers.slice(0, 10);
    };

    const renderPlayers = (category) => {
        if (year === "" || category === "") {
            return <p className="text-gray-600">Please select both a year and a category to view the data.</p>;
        }

        const sortedPlayers = sortPlayersByCategory(category);
        console.log(`Rendering top 10 players for category ${category}:`, sortedPlayers);
        return (
            <div className="mt-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Top 10 Players in {category} for {year}
                </h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-blue-900 text-white">
                        <tr className="text-left">
                            <th className="py-2 px-4 border-b">Rank</th>
                            <th className="py-2 px-4 border-b">Player</th>
                            <th className="py-2 px-4 border-b">{category}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPlayers.map((player, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b text-blue-500">{player.Player}</td>
                                <td className="py-2 px-4 border-b">{player[category]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center text-blue-900 mt-4 mb-4">League Leaders</h1>
            <div className="max-w-md mx-auto">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Select Category:</label>
                <select
                    id="category"
                    className="form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                >
                    <option value="" disabled>Select a category</option>
                    <option value="MP">Minutes Per Game (MP)</option>
                    <option value="PTS">Points Per Game (PTS)</option>
                    <option value="TRB">Rebounds Per Game (TRB)</option>
                    <option value="AST">Assists Per Game (AST)</option>
                    <option value="STL">Steals Per Game (STL)</option>
                    <option value="BLK">Blocks Per Game (BLK)</option>
                    <option value="FG">Field Goals Made (FG)</option>
                    <option value="FGA">Field Goals Attempted (FGA)</option>
                    <option value="FGPercent">Field Goal Percentage (FG%)</option>
                    <option value="threeP">Three-Point Field Goals Made (3P)</option>
                    <option value="threePA">Three-Point Field Goals Attempted (3PA)</option>
                    <option value="threePPercent">Three-Point Field Goal Percentage (3P%)</option>
                    <option value="twoP">Two-Point Field Goals Made (2P)</option>
                    <option value="twoPA">Two-Point Field Goals Attempted (2PA)</option>
                    <option value="twoPPercent">Two-Point Field Goal Percentage (2P%)</option>
                    <option value="eFGPercent">Effective Field Goal Percentage (eFG%)</option>
                    <option value="FT">Free Throws Made (FT)</option>
                    <option value="FTA">Free Throws Attempted (FTA)</option>
                    <option value="FTPercent">Free Throw Percentage (FT%)</option>
                    <option value="ORB">Offensive Rebounds (ORB)</option>
                    <option value="DRB">Defensive Rebounds (DRB)</option>
                    <option value="TOV">Turnovers (TOV)</option>
                    <option value="PF">Personal Fouls (PF)</option>
                </select>
            </div>
            <div className="max-w-md mx-auto mt-4">
                <label htmlFor="year" className="block text-gray-700 font-medium mb-2">Select Year:</label>
                <select
                    id="year"
                    className="form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    value={year}
                >
                    <option value="" disabled>Select a year</option>
                    {Array.from({ length: new Date().getFullYear() - 1992 }, (_, i) => 1993 + i).map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            {renderPlayers(category)}
        </div>
    );
};

export default LeadersList;
