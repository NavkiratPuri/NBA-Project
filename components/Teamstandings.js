import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Ensure the path is correct

const TeamStandings = () => {
    const [standings, setStandings] = useState([]);
    const [filteredStandings, setFilteredStandings] = useState([]);
    const [showConference, setShowConference] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [teamToEdit, setTeamToEdit] = useState({});
    const [selectedButton, setSelectedButton] = useState(''); // Track selected button

    useEffect(() => {
        fetchStandings();
    }, []);

    const fetchStandings = async () => {
        try {
            const response = await axios.get('/api/team');
            setStandings(response.data);
            setFilteredStandings(response.data);
        } catch (error) {
            console.error('Error fetching standings:', error);
        }
    };

    const handleConferenceFilter = (conference) => {
        let filtered = [];
        if (conference === 'E' || conference === 'W') {
            filtered = standings.filter(team => team.conference === conference).sort((a, b) => a.rk - b.rk);
        } else if (conference === '') {
            filtered = [...standings].sort((a, b) => a.rk - b.rk);
        }
        setFilteredStandings(filtered);
        setShowConference(conference === '');
        setSelectedButton(conference); // Set the selected button
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/team/${teamToEdit.id}`, {
                wins: teamToEdit.wins,
                losses: teamToEdit.losses,
                eastWins: teamToEdit.eastWins,
                eastLosses: teamToEdit.eastLosses,
                westWins: teamToEdit.westWins,
                westLosses: teamToEdit.westLosses,
                conference: teamToEdit.conference
            });
            fetchStandings(); // Refresh data
            setShowEditModal(false); // Close modal after submission
        } catch (error) {
            console.error('Failed to update team:', error);
        }
    };

    const editTeam = (team) => {
        setTeamToEdit(team);
        setShowEditModal(true);
    };

    const getButtonClass = (button) => {
        return `px-4 py-2 font-semibold rounded-lg shadow-md ${
            selectedButton === button ? "bg-yellow-500" : "bg-gray-600 hover:bg-gray-700"
        } text-white`;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Team Standings</h1>
            <div className="flex space-x-4 mb-6 justify-center">
                <button onClick={() => handleConferenceFilter('E')} className={getButtonClass('E')}>Eastern Conference</button>
                <button onClick={() => handleConferenceFilter('W')} className={getButtonClass('W')}>Western Conference</button>
                <button onClick={() => handleConferenceFilter('')} className={getButtonClass('')}>League</button>
            </div>
            <div className="max-h-screen overflow-y-auto">
                <table className="w-full table-auto">
                    <thead className="bg-blue-900 text-white">
                        <tr className="text-center">
                            <th className="px-4 py-2">Rank</th>
                            <th className="px-4 py-2">Team</th>
                            {showConference && <th className="px-4 py-2">Conference</th>}
                            <th className="px-4 py-2">Wins</th>
                            <th className="px-4 py-2">Losses</th>
                            <th className="px-4 py-2">East Wins</th>
                            <th className="px-4 py-2">East Losses</th>
                            <th className="px-4 py-2">West Wins</th>
                            <th className="px-4 py-2">West Losses</th>
                            <th className="px-4 py-2">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStandings.map((team, index) => (
                            <tr key={index} className="text-center border-b hover:bg-gray-100">
                                <td className="px-4 py-2">{team.rk}</td>
                                <td className="px-4 py-2 text-blue-500">{team.team}</td>
                                {showConference && <td className="px-4 py-2">{team.conference}</td>}
                                <td className="px-4 py-2">{team.wins}</td>
                                <td className="px-4 py-2">{team.losses}</td>
                                <td className="px-4 py-2">{team.eastWins}</td>
                                <td className="px-4 py-2">{team.eastLosses}</td>
                                <td className="px-4 py-2">{team.westWins}</td>
                                <td className="px-4 py-2">{team.westLosses}</td>
                                <td className="px-4 py-2">
                                    <button onClick={() => editTeam(team)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showEditModal && (
                <Modal showModal={showEditModal} setShowModal={setShowEditModal}>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                            <label>Wins: </label>
                            <input
                                type="number"
                                value={teamToEdit.wins || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, wins: parseInt(e.target.value, 10) })}
                                className="border rounded-lg px-2 py-1"
                            />
                        </div>
                        <div>
                            <label>Losses: </label>
                            <input
                                type="number"
                                value={teamToEdit.losses || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, losses: parseInt(e.target.value, 10) })}
                                className="border rounded-lg px-2 py-1"
                            />
                        </div>
                        <div>
                            <label>East Wins: </label>
                            <input
                                type="number"
                                value={teamToEdit.eastWins || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, eastWins: parseInt(e.target.value, 10) })}
                                className="border rounded-lg px-2 py-1"
                            />
                        </div>
                        <div>
                            <label>East Losses: </label>
                            <input
                                type="number"
                                value={teamToEdit.eastLosses || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, eastLosses: parseInt(e.target.value, 10) })}
                                className="border rounded-lg px-2 py-1"
                            />
                        </div>
                        <div>
                            <label>West Wins: </label>
                            <input
                                type="number"
                                value={teamToEdit.westWins || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, westWins: parseInt(e.target.value, 10) })}
                                className="border rounded-lg px-2 py-1"
                            />
                        </div>
                        <div>
                            <label>West Losses: </label>
                            <input
                                type="number"
                                value={teamToEdit.westLosses || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, westLosses: parseInt(e.target.value, 10) })}
                                className="border rounded-lg px-2 py-1"
                            />
                        </div>
                        <div>
                            <label>Conference: </label>
                            <select
                                value={teamToEdit.conference || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, conference: e.target.value })}
                                className="border rounded-lg px-2 py-1"
                            >
                                <option value="">Select Conference</option>
                                <option value="E">Eastern</option>
                                <option value="W">Western</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Save Changes</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default TeamStandings;
