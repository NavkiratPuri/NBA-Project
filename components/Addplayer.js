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
            [name]: isNumericField ? parseFloat(value) : value
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
                        name="name"
                        className="w-full p-2 mb-3"
                        value={input.name || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Team"
                        name="team"
                        className="w-full p-2 mb-3"
                        value={input.team || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="MPG"
                        name="MPG"
                        className="w-full p-2 mb-3"
                        value={input.MPG || ''}
                        onChange={handleChange}
                        step="0.1"
                    />
                    <input
                        type="number"
                        placeholder="PPG"
                        name="PPG"
                        className="w-full p-2 mb-3"
                        value={input.PPG || ''}
                        onChange={handleChange}
                        step="0.1"
                    />
                    <input
                        type="number"
                        placeholder="RPG"
                        name="RPG"
                        className="w-full p-2 mb-3"
                        value={input.RPG || ''}
                        onChange={handleChange}
                        step="0.1"
                    />
                    <input
                        type="number"
                        placeholder="APG"
                        name="APG"
                        className="w-full p-2 mb-3"
                        value={input.APG || ''}
                        onChange={handleChange}
                        step="0.1"
                    />
                    <input
                        type="number"
                        placeholder="SPG"
                        name="SPG"
                        className="w-full p-2 mb-3"
                        value={input.SPG || ''}
                        onChange={handleChange}
                        step="0.1"
                    />
                    <input
                        type="number"
                        placeholder="BPG"
                        name="BPG"
                        className="w-full p-2 mb-3"
                        value={input.BPG || ''}
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
