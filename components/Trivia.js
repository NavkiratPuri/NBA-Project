import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Trivia() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRandomTrivia();
    }, []);

    const fetchRandomTrivia = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/trivia');
            setQuestions(response.data);
            setSelectedAnswers({});
            setCorrectAnswers({});
            setScore(null);
            setCurrentIndex(0);
        } catch (error) {
            setError(`Failed to load trivia questions: ${error.response ? error.response.data.message : error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleSubmitAnswers = () => {
        const newCorrectAnswers = {};
        let newScore = 0;
        questions.slice(currentIndex, currentIndex + 5).forEach(question => {
            const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
            newCorrectAnswers[question.id] = isCorrect;
            if (isCorrect) {
                newScore += 1;
            }
        });
        setCorrectAnswers(newCorrectAnswers);
        setScore(newScore);
    };

    const handleNextBatch = () => {
        let newIndex = currentIndex + 5;
        if (newIndex >= questions.length) {
            newIndex = 0;
            fetchRandomTrivia();
        }
        setCurrentIndex(newIndex);
        setSelectedAnswers({});
        setCorrectAnswers({});
        setScore(null);
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (loading) {
        return <p className="text-blue-500">Loading trivia questions...</p>;
    }

    if (!questions.length) {
        return <p className="text-gray-500">No questions available. Please refresh or try again later.</p>;
    }

    return (
        <div className="p-5">
            {questions.slice(currentIndex, currentIndex + 5).map(question => (
                <div key={question.id} className="mb-4">
                    <h3 className="text-lg font-bold">{question.question}</h3>
                    <ul className="list-none p-0">
                        {['optionA', 'optionB', 'optionC', 'optionD'].map(option => (
                            <li key={option} className="cursor-pointer hover:bg-gray-200 p-2" onClick={() => handleAnswerSelect(question.id, question[option])}>
                                {question[option]}
                            </li>
                        ))}
                    </ul>
                    {selectedAnswers[question.id] && <p className="text-green-600">You selected: {selectedAnswers[question.id]}</p>}
                    {correctAnswers[question.id] !== undefined && (
                        <p className="text-xl">{correctAnswers[question.id] ? 'Correct Answer!' : 'Wrong Answer, try again!'}</p>
                    )}
                </div>
            ))}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmitAnswers}>Submit Answers</button>
            {score !== null && (
                <>
                    <p className="text-lg">Your score: {score} out of {questions.slice(currentIndex, currentIndex + 5).length}</p>
                    {score <= 1 && <p>Maybe start watching badminton!</p>}
                    {score === 2 && <p>You're worse than Mid!</p>}
                    {score === 3 && <p>You're Mid!</p>}
                    {score === 4 && <p>Not too Shabby!</p>}
                    {score === 5 && <p>Go touch Grass!</p>}
                    <button className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextBatch}>Play Next Batch</button>
                </>
            )}
        </div>
    );
}

export default Trivia;
