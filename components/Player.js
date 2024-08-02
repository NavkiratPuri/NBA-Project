import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

const Player = ({ player, onPlayerUpdate, onPlayerDelete }) => {
    const Router = useRouter();
    const [showEditModal, setShowEditModal] = useState(false);
    const [playerToEdit, setPlayerToEdit] = useState({ ...player });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const positions = ["PG", "SG", "SF", "PF", "C", "PF-C", "SG-SF", "PG-SG", "SF-PF"];
    const teams = {
        ATL: "ATL",
        BOS: "BOS",
        BKN: "BKN",
        CHA: "CHA",
        CHI: "CHI",
        CLE: "CLE",
        DAL: "DAL",
        DEN: "DEN",
        DET: "DET",
        GSW: "GSW",
        HOU: "HOU",
        IND: "IND",
        LAC: "LAC",
        LAL: "LAL",
        MEM: "MEM",
        MIA: "MIA",
        MIL: "MIL",
        MIN: "MIN",
        NOP: "NOP",
        NYK: "NYK",
        OKC: "OKC",
        ORL: "ORL",
        PHI: "PHI",
        PHX: "PHX",
        POR: "POR",
        SAC: "SAC",
        SAS: "SAS",
        TOR: "TOR",
        UTA: "UTA",
        WAS: "WAS",
        TOT: "TOT",
    };

    const wholeNumberFields = ["Rk", "Age", "G", "GS"];
    const percentageFields = ["FGPercent", "threePPercent", "twoPPercent", "eFGPercent", "FTPercent"];
    const numericFields = [
        "Rk",
        "Age",
        "G",
        "GS",
        "MP",
        "FG",
        "FGA",
        "FGPercent",
        "threeP",
        "threePA",
        "threePPercent",
        "twoP",
        "twoPA",
        "twoPPercent",
        "eFGPercent",
        "FT",
        "FTA",
        "FTPercent",
        "ORB",
        "DRB",
        "TRB",
        "AST",
        "STL",
        "BLK",
        "TOV",
        "PF",
        "PTS",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericValue = parseFloat(value);

        if (name === "Player" && /\d/.test(value)) {
            setError("Player name should not contain numbers.");
            return;
        } else if (percentageFields.includes(name) && (numericValue > 1 || numericValue < 0)) {
            setError(`${name} should be between 0 and 1.`);
            return;
        } else if (numericFields.includes(name) && numericValue < 0) {
            setError(`${name} cannot be negative.`);
            return;
        } else {
            setError("");
        }

        setPlayerToEdit((prev) => ({
            ...prev,
            [name]: numericFields.includes(name) ? (numericValue || numericValue === 0 ? numericValue : "") : value,
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        for (const key in playerToEdit) {
            if (playerToEdit[key] === "") {
                setError("All fields must be filled.");
                return;
            }
        }

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
                setIsLoading(false);
                Router.refresh();
            });
    };

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
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.Rk}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.Player}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.Pos}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.Tm}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.G}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.GS}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.MP}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FG}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FGA}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FGPercent}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.threeP}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.threePA}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.threePPercent}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.twoP}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.twoPA}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.twoPPercent}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.eFGPercent}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FT}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FTA}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.FTPercent}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.ORB}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.DRB}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.TRB}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.AST}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.STL}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.BLK}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.TOV}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.PF}</td>
                <td className="px-4 py-2 hover:bg-gray-400 hover:text-white">{player.PTS}</td>
                <td>
                    <div className="flex">
                        <button onClick={() => setShowEditModal(true)} className="bg-green-600 text-white mr-2 rounded-lg p-2">Edit</button>
                        <button onClick={() => setShowDeleteModal(true)} className="bg-red-600 text-white rounded-lg p-2">Delete</button>
                    </div>
                </td>
            </tr>
            {showEditModal && (
                <Modal showModal={showEditModal} setShowModal={setShowEditModal}>
                    <form onSubmit={handleEditSubmit} className="w-full px-5 pb-6 bg-gray-700">
                        <h1 className="text-white text-2xl text-center mt-2 mb-2 pt-2">Edit Player</h1>
                        {Object.keys(playerToEdit).map(key => {
                            if (key === "Pos") {
                                return (
                                    <div key={key} className="flex flex-col space-y-2">
                                        <label htmlFor={key} className="text-sm font-medium text-white">{key}</label>
                                        <select
                                            id={key}
                                            name={key}
                                            value={playerToEdit[key]}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="">Select Position</option>
                                            {positions.map((position) => (
                                                <option key={position} value={position}>
                                                    {position}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            } else if (key === "Tm") {
                                return (
                                    <div key={key} className="flex flex-col space-y-2">
                                        <label htmlFor={key} className="text-sm font-medium text-white">{key}</label>
                                        <select
                                            id={key}
                                            name={key}
                                            value={playerToEdit[key]}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="">Select Team</option>
                                            {Object.keys(teams).map((team) => (
                                                <option key={team} value={team}>
                                                    {team}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={key} className="flex flex-col space-y-2">
                                        <label htmlFor={key} className="text-sm font-medium text-white">{key}</label>
                                        <input
                                            id={key}
                                            type={numericFields.includes(key) ? "number" : "text"}
                                            name={key}
                                            placeholder={key}
                                            value={playerToEdit[key] || ""}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            step={percentageFields.includes(key) ? "0.001" : wholeNumberFields.includes(key) ? "1" : "0.1"}
                                            min="0"
                                        />
                                    </div>
                                );
                            }
                        })}
                        {error && <p className="text-red-500">{error}</p>}
                        <button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 mt-2 rounded-lg">Update Player</button>
                    </form>
                </Modal>
            )}
            {showDeleteModal && (
                <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
                    <div className="bg-gray-700 p-6 rounded-lg h-full">
                        <p className="text-lg text-white font-semibold my-2 text-center mb-15 mt-20">Are you sure you want to delete this player?</p>
                        <div className="flex justify-center mt-4 items-center">
                            <button onClick={handleDeletePlayer} className="bg-red-700 hover:bg-red-700 text-white px-8 py-4 mr-4 font-bold text-xl rounded-lg">Yes</button>
                            <button onClick={() => setShowDeleteModal(false)} className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-4 font-bold text-xl rounded-lg">No</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default Player;
