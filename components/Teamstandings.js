import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Ensure the path is correct
 
 
const TeamStandings = () => {
    const [standings, setStandings] = useState([]);
    const [filteredStandings, setFilteredStandings] = useState([]);
    const [showConference, setShowConference] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [teamToEdit, setTeamToEdit] = useState({});
 
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
                        </tr>
                    </thead>
                    <tbody className="text-center">
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
                                <td><button onClick={() => editTeam(team)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button></td>
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
                            />
                        </div>
                        <div>
                            <label>Losses: </label>
                            <input
                                type="number"
                                value={teamToEdit.losses || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, losses: parseInt(e.target.value, 10) })}
                            />
                        </div>
                        <div>
                            <label>Eastern Conference Wins: </label>
                            <input
                                type="number"
                                value={teamToEdit.eastWins || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, eastWins: parseInt(e.target.value, 10) })}
                            />
                        </div>
                        <div>
                            <label>Eastern Conference Losses: </label>
                            <input
                                type="number"
                                value={teamToEdit.eastLosses || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, eastLosses: parseInt(e.target.value, 10) })}
                            />
                        </div>
                        <div>
                            <label>Western Conference Wins: </label>
                            <input
                                type="number"
                                value={teamToEdit.westWins || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, westWins: parseInt(e.target.value, 10) })}
                            />
                        </div>
                        <div>
                            <label>Western Conference Losses: </label>
                            <input
                                type="number"
                                value={teamToEdit.westLosses || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, westLosses: parseInt(e.target.value, 10) })}
                            />
                        </div>
                        <div>
                            <label>Conference: </label>
                            <select
                                value={teamToEdit.conference || ''}
                                onChange={e => setTeamToEdit({ ...teamToEdit, conference: e.target.value })}
                            >
                                <option value="">Select Conference</option>
                                <option value="E">Eastern</option>
                                <option value="W">Western</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};
 
export default TeamStandings;