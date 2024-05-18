"use client"
import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

// Component to edit player details
const Player = ({ player, onPlayerUpdate, onPlayerDelete }) => {
    const Router = useRouter();
    const [showEditModal, setShowEditModal] = useState(false);
    const [playerToEdit, setPlayerToEdit] = useState({ ...player });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // function to handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayerToEdit((prevState) => ({
            ...prevState,
            [name]: ['MPG', 'PPG', 'RPG', 'APG', 'SPG', 'BPG'].includes(name) ? parseFloat(value) : value
        }));
    };

    // function to handle form submission
    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.patch(`/api/post/${player.id}`, playerToEdit)
            .then((res) => {
                console.log(res);
                if (onPlayerUpdate) onPlayerUpdate(player.id, playerToEdit);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setShowEditModal(false);
                Router.refresh();
            });
    };

    // function to handle player deletion using player id
    const handleDeletePlayer = () => {
        axios.delete(`/api/post/${player.id}`)
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
            <h1>{player.name}</h1>
            <p>{player.team}</p>
            <p>MPG: {player.MPG}</p>
            <p>PPG: {player.PPG}</p>
            <p>RPG: {player.RPG}</p>
            <p>APG: {player.APG}</p>
            <p>SPG: {player.SPG}</p>
            <p>BPG: {player.BPG}</p>
            <div>
                <button onClick={() => setShowEditModal(true)} className="bg-green-600 text-white mr-2" style={{ width: '80px' }}>Edit</button>
                <button onClick={() => setShowDeleteModal(true)} className="bg-red-600 text-white" style={{ width: '80px' }}>Delete</button>
            </div>
            {showEditModal && (
                <Modal showModal={showEditModal} setShowModal={setShowEditModal}>
                    <form onSubmit={handleEditSubmit} className="w-full px-5 pb-6">
                        {/* The input fields for editing player details */}
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            className="w-full p-2 mb-3"
                            value={playerToEdit.name || ''}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Team"
                            name="team"
                            className="w-full p-2 mb-3"
                            value={playerToEdit.team || ''}
                            onChange={handleChange}
                        />
                        {/* The statistical data inputs */}
                        <input
                            type="number"
                            placeholder="MPG"
                            name="MPG"
                            className="w-full p-2 mb-3"
                            value={playerToEdit.MPG || ''}
                            onChange={handleChange}
                            step="0.1"
                        />
                        <input
                            type="number"
                            placeholder="PPG"
                            name="PPG"
                            className="w-full p-2 mb-3"
                            value={playerToEdit.PPG || ''}
                            onChange={handleChange}
                            step="0.1"
                        />
                        <input
                            type="number"
                            placeholder="RPG"
                            name="RPG"
                            className="w-full p-2 mb-3"
                            value={playerToEdit.RPG || ''}
                            onChange={handleChange}
                            step="0.1"
                        />
                        <input
                            type="number"
                            placeholder="APG"
                            name="APG"
                            className="w-full p-2 mb-3"
                            value={playerToEdit.APG || ''}
                            onChange={handleChange}
                            step="0.1"
                        />
                        <input
                            type="number"
                            placeholder="SPG"
                            name="SPG"
                            className="w-full p-2 mb-3"
                            value={playerToEdit.SPG || ''}
                            onChange={handleChange}
                            step="0.1"
                        />
                        <input
                            type="number"
                            placeholder="BPG"
                            name="BPG"
                            className="w-full p-2 mb-3"
                            value={playerToEdit.BPG || ''}
                            onChange={handleChange}
                            step="0.1"
                        />
                        <button type="submit" className="bg-blue-700 text-white px-5 py-2">Update Player</button>
                    </form>
                </Modal>
            )}
            {/* Logic for conditional Modal */}
            {showDeleteModal && (
                <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
                    <div>
                        <p className="text-lg text-grey-600 font-semibold my-2">Are you sure you want to delete this player?</p>
                        <button onClick={() => handleDeletePlayer(player.id)} className="bg-red-700 text-white mr-2 font-bold">Yes</button>
                        <button onClick={() => setShowDeleteModal(false)} className="bg-blue-800 text-white font-bold">No</button>
                    </div>
                </Modal>
            )}
        </li>
    );
};

export default Player;
