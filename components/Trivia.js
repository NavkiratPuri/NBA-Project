import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Trivia() {
    const [questions, setQuestions] = useState([]); // Stores all fetched trivia questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks the current question index
    const [selectedAnswer, setSelectedAnswer] = useState(''); // Stores the user's selected answer
    const [error, setError] = useState(''); // Tracks any errors

    useEffect(() => {
        fetchRandomTrivia();
    }, []);

    // Fetches random trivia questions from the server using axios
    const fetchRandomTrivia = async () => {
        try {
            const response = await axios.get('/api/trivia/'); // Use axios to make the HTTP request
            setQuestions(response.data); // response.data contains the data returned from the server
            setSelectedAnswer(''); // Reset selected answer
        } catch (error) {
            setError(`Failed to load trivia questions: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        // Here you could also send the selected answer to the server or handle it however you need
    };

    const handleNextQuestion = () => {
        const nextIndex = (currentQuestionIndex + 1) % questions.length;
        setCurrentQuestionIndex(nextIndex);
        setSelectedAnswer(''); // Reset selected answer when moving to the next question
    };

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!questions.length) {
        return <p>Loading trivia questions...</p>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h3>{currentQuestion.question}</h3>
            <ul>
                {['optionA', 'optionB', 'optionC', 'optionD'].map(option => (
                    <li key={option} onClick={() => handleAnswerSelect(currentQuestion[option])}>
                        {currentQuestion[option]}
                    </li>
                ))}
            </ul>
            {selectedAnswer && <p>You selected: {selectedAnswer}</p>}
            <button onClick={handleNextQuestion}>Next Question</button>
        </div>
    );
}

export default Trivia;
