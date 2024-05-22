"use client"
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
        <li className="p-3 my-5 bg-slate-300">
            <h1>{player.Player}</h1>
            <p>Position: {player.Pos}</p>
            {/* Other player details here */}
            <div>
                <button onClick={() => setShowEditModal(true)} className="bg-green-600 text-white mr-2">Edit</button>
                <button onClick={() => setShowDeleteModal(true)} className="bg-red-600 text-white">Delete</button>
            </div>
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
        </li>
    );
};

export default Player;
