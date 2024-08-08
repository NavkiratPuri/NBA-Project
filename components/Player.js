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
                        {Object.keys(playerToEdit).map(key => {
                            if (key === "Pos") {
                                return (
                                    <div key={key} className="flex flex-col space-y-2">
                                        <label htmlFor={key} className="text-sm font-medium text-gray-700">{key}</label>
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
                                        <label htmlFor={key} className="text-sm font-medium text-gray-700">{key}</label>
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
                                        <label htmlFor={key} className="text-sm font-medium text-gray-700">{key}</label>
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
                        <button type="submit" disabled={isLoading} className="bg-blue-700 text-white px-5 py-2">Update Player</button>
                    </form>
                </Modal>
            )}
            {showDeleteModal && (
                <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
                    <div>
                        <p className="text-lg text-grey-600 font-semibold my-2">Are you sure you want to delete this player?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={handleDeletePlayer} className="bg-red-700 text-white px-8 py-4 mr-4 font-bold text-xl">Yes</button>
                            <button onClick={() => setShowDeleteModal(false)} className="bg-blue-800 text-white px-8 py-4 font-bold text-xl">No</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default Player;
