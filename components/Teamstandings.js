import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamStandings = () => {
    const [standings, setStandings] = useState([]);
    const [filteredStandings, setFilteredStandings] = useState([]);
    const [showConference, setShowConference] = useState(true);

    useEffect(() => {
        // Fetch team standings data from your API endpoint when component mounts
        fetchStandings();
    }, []);

    const fetchStandings = async () => {
        try {
            // Make a GET request to your API endpoint to fetch team standings data
            const response = await axios.get('/api/team'); // Update this URL to match your API endpoint
            setStandings(response.data);
            setFilteredStandings(response.data); // Initialize filtered standings with all standings
        } catch (error) {
            console.error('Error fetching standings:', error);
        }
    };

    const handleConferenceFilter = (conference) => {
        // Filter standings based on the selected conference
        let filtered;
        let rankCounter = 1; // Initialize rank counter

        if (conference === 'E' || conference === 'W') {
            // Filter teams of the selected conference
            const conferenceTeams = standings.filter(team => team.conference === conference);

            // Sort the teams within the conference by rank
            const sortedConferenceTeams = conferenceTeams.sort((a, b) => a.rk - b.rk);

            // Update ranks for teams within the conference
            filtered = sortedConferenceTeams.map(team => ({ ...team, rk: rankCounter++ }));
        } else if (conference === '') {
            // Show all teams in the league, reorder them by rank
            filtered = standings.sort((a, b) => a.rk - b.rk);
        } else {
            filtered = []; // If no conference selected, show no teams
        }

        // Set the filtered standings and determine whether to show the conference column
        setFilteredStandings(filtered);
        setShowConference(conference === '');
    };

    return (
        <div>
            <h1 className="text-center">Team Standings</h1>
            <div className="flex space-x-4 mb-4 justify-center">
                <button onClick={() => handleConferenceFilter('E')} className="px-4 py-2 bg-blue-500 text-white rounded-md">Eastern Conference</button>
                <button onClick={() => handleConferenceFilter('W')} className="px-4 py-2 bg-green-500 text-white rounded-md">Western Conference</button>
                <button onClick={() => handleConferenceFilter('')} className="px-4 py-2 bg-gray-500 text-white rounded-md">League</button>
            </div>

            <div className="max-h-screen overflow-y-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-center">
                            <th>Rank</th>
                            <th>Team</th>
                            {showConference && <th >Conference</th>}
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Eastern Conference Wins</th>
                            <th>Eastern Conference Losses</th>
                            <th>Western Conference Wins</th>
                            <th>Western Conference Losses</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredStandings.map((team, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2">{team.rk}</td>
                                <td className="px-4 py-2">{team.team}</td>
                                {showConference && <td>{team.conference}</td>}
                                <td className="px-4 py-2">{team.wins}</td>
                                <td className="px-4 py-2">{team.losses}</td>
                                <td className="px-4 py-2">{team.eastWins}</td>
                                <td className="px-4 py-2">{team.eastLosses}</td>
                                <td className="px-4 py-2">{team.westWins}</td>
                                <td className="px-4 py-2">{team.westLosses}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamStandings;
