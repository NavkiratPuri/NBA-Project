"use client"
import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/router";

const AddPlayer = () => {
    const router = useRouter();

    // Initialize all fields from the schema with empty or default values
    const [input, setInput] = useState({
        Rk: '',
        Player: '',
        Pos: '',
        Age: '',
        Tm: '',
        G: '',
        GS: '',
        MP: '',
        FG: '',
        FGA: '',
        FGPercent: '',
        threeP: '',
        threePA: '',
        threePPercent: '',
        twoP: '',
        twoPA: '',
        twoPPercent: '',
        eFGPercent: '',
        FT: '',
        FTA: '',
        FTPercent: '',
        ORB: '',
        DRB: '',
        TRB: '',
        AST: '',
        STL: '',
        BLK: '',
        TOV: '',
        PF: '',
        PTS: ''
    });

    const [showModal, setShowModal] = useState(false);

    // Define which fields are numeric
    const numericFields = ['Rk', 'Age', 'G', 'GS', 'MP', 'FG', 'FGA', 'FGPercent', 'threeP', 'threePA', 'threePPercent', 'twoP', 'twoPA', 'twoPPercent', 'eFGPercent', 'FT', 'FTA', 'FTPercent', 'ORB', 'DRB', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF', 'PTS'];

    // Handles input changes, converts numeric fields appropriately
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput(prev => ({
            ...prev,
            [name]: numericFields.includes(name) ? parseFloat(value) || '' : value
        }));
    };

    // Handles form submission to POST data to the server
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/Player", input);
            console.log('Successfully added player:', response.data);
            setInput({}); // Reset form after successful submission
            setShowModal(false);
            router.reload(); // Reload or redirect as needed
        } catch (error) {
            console.error('Failed to submit player:', error);
        }
    };

    // Form input for each field
    return (
        <div>
            <button onClick={() => setShowModal(true)} className="bg-blue-700 text-white p-3 cursor-pointer">
                Add New Player
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <form onSubmit={handleSubmit} className="space-y-4 p-5">
                    <h2 className="text-xl font-bold">Add a New Player</h2>
                    {Object.keys(input).map(key => (
                        <input
                            key={key}
                            type={numericFields.includes(key) ? "number" : "text"}
                            name={key}
                            placeholder={key}
                            value={input[key] || ''}
                            onChange={handleChange}
                            className="w-full p-2"
                            step={numericFields.includes(key) ? "0.1" : undefined}
                        />
                    ))}
                    <button type="submit" className="mt-4 bg-blue-700 text-white px-5 py-2">
                        Submit
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default AddPlayer;
