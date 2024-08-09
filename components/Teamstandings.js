import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Ensure the path is correct

const TeamStandings = () => {
    const [standings, setStandings] = useState([]);
    const [filteredStandings, setFilteredStandings] = useState([]);
    const [showConference, setShowConference] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [teamToEdit, setTeamToEdit] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedConference, setSelectedConference] = useState(''); // State to keep track of the selected conference

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
            setError('Error fetching standings.');
        }
    };

    const handleConferenceFilter = (conference) => {
        setSelectedConference(conference); // Update the selected conference state

        let filtered = [];
        if (conference === 'E' || conference === 'W') {
            filtered = standings.filter(team => team.conference === conference).sort((a, b) => a.rk - b.rk);
        } else {
            filtered = [...standings].sort((a, b) => a.rk - b.rk);
        }
        filtered = filtered.map((team, index) => ({ ...team, rank: index + 1 }));
        setFilteredStandings(filtered);
        setShowConference(conference === '');
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedStandings = [...filteredStandings].sort((a, b) => {
            const aValue = isNaN(a[key]) ? a[key] : parseFloat(a[key]);
            const bValue = isNaN(b[key]) ? b[key] : parseFloat(b[key]);

            if (aValue < bValue) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        const reRankedStandings = sortedStandings.map((team, index) => ({
            ...team,
            rank: index + 1
        }));

        setFilteredStandings(reRankedStandings);
    };

    const getSortDirectionIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '↑' : '↓';
        }
        return '';
    };

    const getButtonClass = (conference) => (
        conference === selectedConference 
            ? 'bg-orange-500 text-white px-4 py-2 rounded-lg'
            : 'bg-gray-500 text-white px-4 py-2 rounded-lg'
    );

    const handleEditClick = (team) => {
        setTeamToEdit(team);
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(`/api/team/${teamToEdit.id}`, teamToEdit);
            fetchStandings(); // Refresh standings after update
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating team:', error);
            setError('Error updating team.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalClose = () => {
        setShowEditModal(false);
        setTeamToEdit({});
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto px-2 sm:px-4 pb-8 mt-4 flex-grow">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">Team Standings</h1>
                <div className="flex space-x-4 mb-6 justify-center">
                    <button onClick={() => handleConferenceFilter('E')} className={getButtonClass('E')}>Eastern Conference</button>
                    <button onClick={() => handleConferenceFilter('W')} className={getButtonClass('W')}>Western Conference</button>
                    <button onClick={() => handleConferenceFilter('')} className={getButtonClass('')}>League</button>
                </div>
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-xs">
                            <thead className="bg-orange-400">
                                <tr className="text-center">
                                    <th onClick={() => handleSort('rank')} className="cursor-pointer px-2 py-1 text-left font-medium text-white uppercase tracking-wider">Rank {getSortDirectionIcon('rank')}</th>
                                    <th onClick={() => handleSort('team')} className="cursor-pointer px-2 py-1 text-left font-medium text-white text-center uppercase tracking-wider">Team {getSortDirectionIcon('team')}</th>
                                    {showConference && <th onClick={() => handleSort('conference')} className="cursor-pointer px-2 py-1 text-left font-medium text-white uppercase tracking-wider">Conference {getSortDirectionIcon('conference')}</th>}
                                    <th onClick={() => handleSort('wins')} className="cursor-pointer px-2 py-1 text-left font-medium text-white uppercase tracking-wider">Wins {getSortDirectionIcon('wins')}</th>
                                    <th onClick={() => handleSort('losses')} className="cursor-pointer px-2 py-1 text-left font-medium text-white uppercase tracking-wider">Losses {getSortDirectionIcon('losses')}</th>
                                    <th onClick={() => handleSort('eastWins')} className="cursor-pointer px-2 py-1 text-left font-medium text-white uppercase tracking-wider">Eastern Conference Wins {getSortDirectionIcon('eastWins')}</th>
                                    <th onClick={() => handleSort('eastLosses')} className="cursor-pointer px-2 py-1 text-left font-medium text-white uppercase tracking-wider">Eastern Conference Losses {getSortDirectionIcon('eastLosses')}</th>
                                    <th onClick={() => handleSort('westWins')} className="cursor-pointer px-2 py-1 text-left font-medium text-white uppercase tracking-wider">Western Conference Wins {getSortDirectionIcon('westWins')}</th>
                                    <th onClick={() => handleSort('westLosses')} className="cursor-pointer px-2 py-1 text-left font-medium text-white uppercase tracking-wider">Western Conference Losses {getSortDirectionIcon('westLosses')}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredStandings.length > 0 ? (
                                    filteredStandings.map((team, index) => (
                                        <tr key={index} className="text-center border-b hover:bg-gray-400 hover:text-white cursor-pointer" onClick={() => handleEditClick(team)}>
                                            <td className="px-4 py-2">{team.rank}</td>
                                            <td className="px-4 py-2">{team.team}</td>
                                            {showConference && <td className="px-4 py-2">{team.conference}</td>}
                                            <td className="px-4 py-2">{team.wins}</td>
                                            <td className="px-4 py-2">{team.losses}</td>
                                            <td className="px-4 py-2">{team.eastWins}</td>
                                            <td className="px-4 py-2">{team.eastLosses}</td>
                                            <td className="px-4 py-2">{team.westWins}</td>
                                            <td className="px-4 py-2">{team.westLosses}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center py-4">No teams found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showEditModal && (
                <Modal showModal={showEditModal} setShowModal={handleModalClose}>
                    <form onSubmit={handleEditSubmit} className="space-y-4 bg-gray-700 rounded-lg p-4">
                        <h1 className='text-white text-center text-2xl'>Editing...</h1>
                        <div>
                            <label className="block text-white">Rank:</label>
                            <input
                                type="number"
                                placeholder="Rank"
                                name="rk"
                                className="border rounded-lg px-2 py-1 w-full "
                                value={teamToEdit.rk || ''}
                                onChange={(e) => setTeamToEdit({ ...teamToEdit, rk: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-white">Team:</label>
                            <input
                                type="text"
                                placeholder="Team"
                                name="team"
                                className="border rounded-lg px-2 py-1 w-full"
                                value={teamToEdit.team || ''}
                                onChange={(e) => setTeamToEdit({ ...teamToEdit, team: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-white">Wins:</label>
                            <input
                                type="number"
                                placeholder="Wins"
                                name="wins"
                                className="border rounded-lg px-2 py-1 w-full"
                                value={teamToEdit.wins || ''}
                                onChange={(e) => setTeamToEdit({ ...teamToEdit, wins: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-white">Losses:</label>
                            <input
                                type="number"
                                placeholder="Losses"
                                name="losses"
                                className="border rounded-lg px-2 py-1 w-full"
                                value={teamToEdit.losses || ''}
                                onChange={(e) => setTeamToEdit({ ...teamToEdit, losses: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-white">Eastern Conference Wins:</label>
                            <input
                                type="number"
                                placeholder="Eastern Conference Wins"
                                name="eastWins"
                                className="border rounded-lg px-2 py-1 w-full"
                                value={teamToEdit.eastWins || ''}
                                onChange={(e) => setTeamToEdit({ ...teamToEdit, eastWins: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-white">Eastern Conference Losses:</label>
                            <input
                                type="number"
                                placeholder="Eastern Conference Losses"
                                name="eastLosses"
                                className="border rounded-lg px-2 py-1 w-full"
                                value={teamToEdit.eastLosses || ''}
                                onChange={(e) => setTeamToEdit({ ...teamToEdit, eastLosses: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-white">Western Conference Wins:</label>
                            <input
                                type="number"
                                placeholder="Western Conference Wins"
                                name="westWins"
                                className="border rounded-lg px-2 py-1 w-full"
                                value={teamToEdit.westWins || ''}
                                onChange={(e) => setTeamToEdit({ ...teamToEdit, westWins: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-white">Western Conference Losses:</label>
                            <input
                                type="number"
                                placeholder="Western Conference Losses"
                                name="westLosses"
                                className="border rounded-lg px-2 py-1 w-full"
                                value={teamToEdit.westLosses || ''}
                                onChange={(e) => setTeamToEdit({ ...teamToEdit, westLosses: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-white">Conference:</label>
                            <input
                                type="text"
                                placeholder="Conference"
                                name="conference"
                                className="border rounded-lg px-2 py-1 w-full"
                                value={teamToEdit.conference || ''}
                                onChange={(e) => setTeamToEdit({ ...teamToEdit, conference: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-orange-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-orange-600"
                        >
                            Save Changes
                        </button>
                    </form>
                </Modal>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default TeamStandings;
