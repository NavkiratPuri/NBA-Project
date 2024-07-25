"use client";
import React, { useState, useEffect } from "react";

const LeadersList = () => {
    const [players, setPlayers] = useState([]);
    const [category, setCategory] = useState("MP");
    const [year, setYear] = useState(new Date().getFullYear());
    const [view, setView] = useState("top");

    useEffect(() => {
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
    }, [year]);

    const sortPlayersByCategory = (category) => {
        const sortedPlayers = players.sort((a, b) => b[category] - a[category]);
        return view === "top" ? sortedPlayers.slice(0, 10) : sortedPlayers.slice(-10).reverse();
    };

    const renderPlayers = (category) => {
        const sortedPlayers = sortPlayersByCategory(category);
        console.log(`Rendering ${view} 10 players for category ${category}:`, sortedPlayers);
        return (
            <div className="mt-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {view === "top" ? "Top" : "Bottom"} 10 Players in {category} for {year}
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
                >
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
                >
                    {Array.from({ length: new Date().getFullYear() - 1992 }, (_, i) => 1993 + i).map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center mt-4 mb-6 space-x-4">
                <button
                    className={`px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none ${view === "top" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-700"}`}
                    onClick={() => setView("top")}
                >
                    Top 10
                </button>
                <button
                    className={`px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none ${view === "bottom" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-700"}`}
                    onClick={() => setView("bottom")}
                >
                    Bottom 10
                </button>
            </div>
            {renderPlayers(category)}
        </div>
    );
};

export default LeadersList;
