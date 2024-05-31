import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

const Player = ({ player, onPlayerUpdate, onPlayerDelete }) => {
    const Router = useRouter();
    const [showEditModal, setShowEditModal] = useState(false);
    const [playerToEdit, setPlayerToEdit] = useState({ ...player });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState(null); // Define the error state
    const [isLoading, setIsLoading] = useState(false);

    // function to handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['Age', 'G', 'GS', 'MP', 'FG', 'FGA', 'FGPercent', 'threeP', 'threePA', 'threePPercent', 'twoP', 'twoPA', 'twoPPercent', 'eFGPercent', 'FT', 'FTA', 'FTPercent', 'ORB', 'DRB', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF', 'PTS'];
        setPlayerToEdit(prev => ({
            ...prev,
            [name]: numericFields.includes(name) ? parseFloat(value) : value
        }));
    };

    // function to handle form submission
    const handleEditSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.patch(`/api/player/${player.id}`, playerToEdit)
            .then((res) => {
                console.log(res);
                if (onPlayerUpdate) onPlayerUpdate(player.id, playerToEdit);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to update player details.');
            })
            .finally(() => {
                setShowEditModal(false);
                Router.refresh();
            });
    };

    // function to handle player deletion using player id
    const handleDeletePlayer = () => {
        axios.delete(`/api/player/${player.id}`)
            .then((res) => {
                console.log(res);
                if (onPlayerDelete) onPlayerDelete(player.id);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setShowDeleteModal(false);
                Router.refresh();
            });
    };
    return (
        <>
            <tr>
                <td className="px-4 py-2">{player.Rk}</td>
                <td className="px-4 py-2">{player.Player}</td>
                <td className="px-4 py-2">{player.Pos}</td>
                <td className="px-4 py-2">{player.Tm}</td>
                <td className="px-4 py-2">{player.G}</td>
                <td className="px-4 py-2">{player.GS}</td>
                <td className="px-4 py-2">{player.MP}</td>
                <td className="px-4 py-2">{player.FG}</td>
                <td className="px-4 py-2">{player.FGA}</td>
                <td className="px-4 py-2">{player.FGPercent}</td>
                <td className="px-4 py-2">{player.threeP}</td>
                <td className="px-4 py-2">{player.threePA}</td>
                <td className="px-4 py-2">{player.threePPercent}</td>
                <td className="px-4 py-2">{player.twoP}</td>
                <td className="px-4 py-2">{player.twoPA}</td>
                <td className="px-4 py-2">{player.twoPPercent}</td>
                <td className="px-4 py-2">{player.eFGPercent}</td>
                <td className="px-4 py-2">{player.FT}</td>
                <td className="px-4 py-2">{player.FTA}</td>
                <td className="px-4 py-2">{player.FTPercent}</td>
                <td className="px-4 py-2">{player.ORB}</td>
                <td className="px-4 py-2">{player.DRB}</td>
                <td className="px-4 py-2">{player.TRB}</td>
                <td className="px-4 py-2">{player.AST}</td>
                <td className="px-4 py-2">{player.STL}</td>
                <td className="px-4 py-2">{player.BLK}</td>
                <td className="px-4 py-2">{player.TOV}</td>
                <td className="px-4 py-2">{player.PF}</td>
                <td className="px-4 py-2">{player.PTS}</td>
                <td>
                    <div>
                        <button onClick={() => setShowEditModal(true)} className="bg-green-600 text-white mr-2">Edit</button>
                        <button onClick={() => setShowDeleteModal(true)} className="bg-red-600 text-white">Delete</button>
                    </div>
                </td>
            </tr>
            {showEditModal && (
                <Modal showModal={showEditModal} setShowModal={setShowEditModal}>
                    <form onSubmit={handleEditSubmit} className="w-full px-5 pb-6">
                        {Object.keys(playerToEdit).map(key => (
                            <input
                                key={key}
                                type={typeof playerToEdit[key] === 'number' ? 'number' : 'text'}
                                placeholder={key}
                                name={key}
                                className="w-full p-2 mb-3"
                                value={playerToEdit[key] || ''}
                                onChange={handleChange}
                                step="0.1"
                            />
                        ))}
                        <button type="submit" disabled={isLoading} className="bg-blue-700 text-white px-5 py-2">Update Player</button>
                    </form>
                </Modal>
            )}
            {showDeleteModal && (
                <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
                    <div>
                        <p className="text-lg text-grey-600 font-semibold my-2">Are you sure you want to delete this player?</p>
                        <button onClick={handleDeletePlayer} className="bg-red-700 text-white mr-2 font-bold">Yes</button>
                        <button onClick={() => setShowDeleteModal(false)} className="bg-blue-800 text-white font-bold">No</button>
                    </div>
                </Modal>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
};

export default Player;
