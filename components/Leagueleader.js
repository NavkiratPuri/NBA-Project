import React, { useState, useEffect } from "react";

const LeadersList = () => {
    const [players, setPlayers] = useState([]);
    const [category, setCategory] = useState("PTS");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=PerGame&Scope=S&Season=2023-24&SeasonType=Regular%20Season&StatCategory=PTS', { 
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Origin': 'https://stats.nba.com'
                    },
                    cache: "no-cache"
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                const playersData = data.resultSet.rowSet.map(player => {
                    return {
                        name: player[2],
                        MPG: player[6],
                        PPG: player[24],
                        RPG: player[18],
                        APG: player[19],
                        SPG: player[20],
                        BPG: player[21],
                    };
                });
                setPlayers(playersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const sortPlayersByCategory = (category) => {
        return players.sort((a, b) => b[category] - a[category]).slice(0, 10);
    };

    const renderTopPlayers = (category) => {
        const topPlayers = sortPlayersByCategory(category);
        return (
            <div className="mt-5">
                <h2 className="text-xl font-semibold text-gray-800">Top 5 Players in {category}</h2>
                <ul className="list-none pl-5">
                    {topPlayers.map((player, index) => (
                        <li key={index} className="py-1">
                            {player.name} - {player[category]}
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
                    <option value="MPG">MPG</option>
                    <option value="PPG">PPG</option>
                    <option value="RPG">RPG</option>
                    <option value="APG">APG</option>
                    <option value="SPG">SPG</option>
                    <option value="BPG">BPG</option>
                </select>
            </div>
            {renderTopPlayers(category)}
        </div>
    );
};

export default LeadersList;
