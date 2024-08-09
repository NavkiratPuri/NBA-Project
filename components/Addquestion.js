import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

function AddQuestion({ showModal, setShowModal }) {
    const [question, setQuestion] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [optionC, setOptionC] = useState('');
    const [optionD, setOptionD] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newQuestion = {
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAnswer
            };
            await axios.post('/api/trivia', newQuestion);
            setMessage('Question added successfully!');
            setError('');
            // Clear form fields
            setQuestion('');
            setOptionA('');
            setOptionB('');
            setOptionC('');
            setOptionD('');
            setCorrectAnswer('');
        } catch (error) {
            setError(`Failed to add question: ${error.response ? error.response.data.message : error.message}`);
            setMessage('');
        }
    };

    return (
        <Modal showModal={showModal} setShowModal={setShowModal}>
            <div className="p-5">
                <h2 className="text-2xl font-bold mb-4 text-white ">Add New Trivia Question</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 ">
                        <label className="block text-white  text-sm font-bold mb-2" htmlFor="question">
                            Question
                        </label>
                        <input
                            type="text"
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white  text-sm font-bold mb-2" htmlFor="optionA">
                            Option A
                        </label>
                        <input
                            type="text"
                            id="optionA"
                            value={optionA}
                            onChange={(e) => setOptionA(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white  text-sm font-bold mb-2" htmlFor="optionB">
                            Option B
                        </label>
                        <input
                            type="text"
                            id="optionB"
                            value={optionB}
                            onChange={(e) => setOptionB(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white  text-sm font-bold mb-2" htmlFor="optionC">
                            Option C
                        </label>
                        <input
                            type="text"
                            id="optionC"
                            value={optionC}
                            onChange={(e) => setOptionC(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="optionD">
                            Option D
                        </label>
                        <input
                            type="text"
                            id="optionD"
                            value={optionD}
                            onChange={(e) => setOptionD(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white  text-sm font-bold mb-2" htmlFor="correctAnswer">
                            Correct Answer
                        </label>
                        <select
                            id="correctAnswer"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select the correct answer</option>
                            <option value={optionA}>{optionA}</option>
                            <option value={optionB}>{optionB}</option>
                            <option value={optionC}>{optionC}</option>
                            <option value={optionD}>{optionD}</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Question
                    </button>
                </form>
                {message && <p className="text-green-500 mt-4">{message}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </Modal>
    );
}

export default AddQuestion;
