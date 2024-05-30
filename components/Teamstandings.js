import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import your Modal component
import { useRouter } from 'next/navigation';

const TeamStandings = () => {
    const [standings, setStandings] = useState([]);
    const [filteredStandings, setFilteredStandings] = useState([]);
    const [showConference, setShowConference] = useState(true);
    const [teamToEdit, setTeamToEdit] = useState(null);
    const [editData, setEditData] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

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
        let filtered;
        let rankCounter = 1;

        if (conference === 'E' || conference === 'W') {
            const conferenceTeams = standings.filter(team => team.conference === conference);
            const sortedConferenceTeams = conferenceTeams.sort((a, b) => a.rk - b.rk);
            filtered = sortedConferenceTeams.map(team => ({ ...team, rk: rankCounter++ }));
        } else if (conference === '') {
            filtered = standings.sort((a, b) => a.rk - b.rk);
        } else {
            filtered = [];
        }

        setFilteredStandings(filtered);
        setShowConference(conference === '');
    };

    const handleEditClick = (index) => {
        setTeamToEdit(filteredStandings[index]);
        setEditData(filteredStandings[index]);
        setShowEditModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.patch(`/api/team/${teamToEdit.id}`, editData);
            console.log('Update response:', response);
            setShowEditModal(false);
            fetchStandings(); // Refresh standings after update
        } catch (err) {
            console.error('Error updating team details:', err.response ? err.response.data : err.message);
            setError('Failed to update team details.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (index) => {
        setTeamToEdit(filteredStandings[index]);
        setShowDeleteModal(true);
    };

    const handleDeleteTeam = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`/api/team/${teamToEdit.id}`);
            console.log('Delete response:', response);
            setShowDeleteModal(false);
            fetchStandings(); // Refresh standings after delete
        } catch (err) {
            console.error('Error deleting team:', err.response ? err.response.data : err.message);
            setError('Failed to delete team.');
        } finally {
            setIsLoading(false);
        }
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
                                <td className="px-4 py-2">{team.team}</td>
                                {showConference && <td className="px-4 py-2">{team.conference}</td>}
                                <td className="px-4 py-2">{team.wins}</td>
                                <td className="px-4 py-2">{team.losses}</td>
                                <td className="px-4 py-2">{team.eastWins}</td>
                                <td className="px-4 py-2">{team.eastLosses}</td>
                                <td className="px-4 py-2">{team.westWins}</td>
                                <td className="px-4 py-2">{team.westLosses}</td>
                                <td className="px-4 py-2">
                                    <button onClick={() => handleEditClick(index)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDeleteClick(index)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showEditModal && (
                <Modal showModal={showEditModal} setShowModal={setShowEditModal}>
                    <form onSubmit={handleEditSubmit} className="w-full px-5 pb-6">
                        {Object.keys(editData).map(key => (
                            <input
                                key={key}
                                type={typeof editData[key] === 'number' ? 'number' : 'text'}
                                placeholder={key}
                                name={key}
                                className="w-full p-2 mb-3"
                                value={editData[key] || ''}
                                onChange={handleInputChange}
                                step="0.1"
                            />
                        ))}
                        <button type="submit" className="bg-blue-700 text-white px-5 py-2" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Team'}
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </Modal>
            )}

            {showDeleteModal && (
                <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
                    <div>
                        <p className="text-lg text-grey-600 font-semibold my-2">Are you sure you want to delete this team?</p>
                        <button onClick={handleDeleteTeam} className="bg-red-700 text-white mr-2 font-bold">Yes</button>
                        <button onClick={() => setShowDeleteModal(false)} className="bg-blue-800 text-white font-bold">No</button>
                    </div>
                </Modal>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default TeamStandings;
