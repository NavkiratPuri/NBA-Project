"use client"
import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

// Component to add a new player
const Addplayer = () => {
    const Router = useRouter()
    //states to handle modal visibility and input fields
    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState({});

    // function to handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convert numeric fields from strings to numbers
        const isNumericField = ['MPG', 'PPG', 'RPG', 'APG', 'SPG', 'BPG'].includes(name);
        setInput(prevState => ({
            ...prevState,
            [name]: numericFields.includes(name) ? parseFloat(value) : value
        }));
    };

    // function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        //axios used to post data to the server
        axios.post("/api/post", input)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setInput({});
                setShowModal(false);
                Router.refresh();
            });
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-700 text-white p-3 cursor-pointer">
                Add New Player
            </button>
            {/* Overlay */}
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <form className="w-full px-5 pb-6" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold text-gray-800 my-4 mx-auto text-center">Add a New Player</h1>
                    <input
                        type="text"
                        placeholder="Name"
                        name="Player"
                        className="w-full p-2 mb-3"
                        value={input.Player || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Tm"
                        name="Tm"
                        className="w-full p-2 mb-3"
                        value={input.Tm || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="MP"
                        name="MP"
                        className="w-full p-2 mb-3"
                        value={input.MP || ''}
                        onChange={handleChange}
                        step="0.1"
                    />
                    <input
                        type="number"
                        placeholder="PTS"
                        name="PTS"
                        className="w-full p-2 mb-3"
                        value={input.PTS || ''}
                        onChange={handleChange}
                        step="0.1"
                    />
                    <input
                        type="number"
                        placeholder="TRB"
                        name="TRB"
                        className="w-full p-2 mb-3"
                        value={input.TRB || ''}
                        onChange={handleChange}
                        step="0.1"
                    />
                    <input
                        type="number"
                        placeholder="AST"
                        name="AST"
                        className="w-full p-2 mb-3"
                        value={input.AST || ''}
                        onChange={handleChange}
                        step="0.1"
                    />
                    <input
                        type="number"
                        placeholder="STL"
                        name="STL"
                        className="w-full p-2 mb-3"
                        value={input.STL || ''}
                        onChange={handleChange}
                        step="0.1"
                    />
                    <input
                        type="number"
                        placeholder="BLK"
                        name="BLK"
                        className="w-full p-2 mb-3"
                        value={input.BLK || ''}
                        onChange={handleChange}
                        step="0.1"
                    />
                    <button type="submit" className="bg-blue-700 text-white px-5 py-2">
                        Submit
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Addplayer;
