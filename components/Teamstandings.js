import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamStandings = () => {
    const [standings, setStandings] = useState([]);
    const [filteredStandings, setFilteredStandings] = useState([]);
    const [showConference, setShowConference] = useState(true);
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({});

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

    const handleEditClick = (index) => {
        setEditIndex(index);
        setEditData(filteredStandings[index]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value
        });
    };

    const handleSaveClick = async () => {
        try {
            // Make a PUT request to update team data on your API endpoint
            await axios.put(`/api/team/${editData.id}`, editData); // Update this URL to match your API endpoint
            const updatedStandings = [...filteredStandings];
            updatedStandings[editIndex] = editData;
            setFilteredStandings(updatedStandings);
            setEditIndex(null);
        } catch (error) {
            console.error('Error updating team data:', error);
        }
    };

    const handleCancelClick = () => {
        setEditIndex(null);
        setEditData({});
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Team Standings</h1>
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
                            {showConference && <th>Conference</th>}
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Eastern Conference Wins</th>
                            <th>Eastern Conference Losses</th>
                            <th>Western Conference Wins</th>
                            <th>Western Conference Losses</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredStandings.map((team, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2">{team.rk}</td>
                                <td className="px-4 py-2">
                                    {editIndex === index ? (
                                        <input
                                            type="text"
                                            name="team"
                                            value={editData.team}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        team.team
                                    )}
                                </td>
                                {showConference && <td className="px-4 py-2">{team.conference}</td>}
                                <td className="px-4 py-2">
                                    {editIndex === index ? (
                                        <input
                                            type="number"
                                            name="wins"
                                            value={editData.wins}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        team.wins
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editIndex === index ? (
                                        <input
                                            type="number"
                                            name="losses"
                                            value={editData.losses}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        team.losses
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editIndex === index ? (
                                        <input
                                            type="number"
                                            name="eastWins"
                                            value={editData.eastWins}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        team.eastWins
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editIndex === index ? (
                                        <input
                                            type="number"
                                            name="eastLosses"
                                            value={editData.eastLosses}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        team.eastLosses
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editIndex === index ? (
                                        <input
                                            type="number"
                                            name="westWins"
                                            value={editData.westWins}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        team.westWins
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editIndex === index ? (
                                        <input
                                            type="number"
                                            name="westLosses"
                                            value={editData.westLosses}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        team.westLosses
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editIndex === index ? (
                                        <>
                                            <button onClick={handleSaveClick} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                                            <button onClick={handleCancelClick} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEditClick(index)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamStandings;
