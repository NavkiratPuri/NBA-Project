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
            <h1>Team Standings</h1>
            <div>
                <button onClick={() => handleConferenceFilter('E')}>Eastern Conference</button>
                <button onClick={() => handleConferenceFilter('W')}>Western Conference</button>
                <button onClick={() => handleConferenceFilter('')}>League</button> {/* Add League button */}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        {showConference && <th>Conference</th>}
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Eastern Conference Wins</th>
                        <th>Eastern Conference Losses</th>
                        <th>Western Conference Wins</th>
                        <th>Western Conference Losses</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStandings.map((team, index) => (
                        <tr key={index}>
                            <td>{team.rk}</td>
                            <td>{team.team}</td>
                            {showConference && <td>{team.conference}</td>}
                            <td>{team.wins}</td>
                            <td>{team.losses}</td>
                            <td>{team.eastWins}</td>
                            <td>{team.eastLosses}</td>
                            <td>{team.westWins}</td>
                            <td>{team.westLosses}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamStandings;

