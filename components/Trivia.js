import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

function Trivia() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState({
    id: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });
  const [answersSubmitted, setAnswersSubmitted] = useState(false);

  useEffect(() => {
    fetchTrivia();
  }, []);

  const fetchTrivia = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/trivia");
      setQuestions(response.data);
      setSelectedAnswers({});
      setCorrectAnswers({});
      setScore(null);
      setCurrentIndex(0);
      setAnswersSubmitted(false); // Reset the submitted state
    } catch (error) {
      setError(
        `Failed to load trivia questions: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmitAnswers = () => {
    const newCorrectAnswers = {};
    let newScore = 0;
    questions.slice(currentIndex, currentIndex + 5).forEach((question) => {
      const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
      newCorrectAnswers[question.id] = isCorrect;
      if (isCorrect) {
        newScore += 1;
      }
    });
    setCorrectAnswers(newCorrectAnswers);
    setScore(newScore);
    setAnswersSubmitted(true); // Set the submitted state
  };

  const handleNextBatch = () => {
    let newIndex = currentIndex + 5;
    if (newIndex >= questions.length) {
      newIndex = 0;
      fetchTrivia();
    }
    setCurrentIndex(newIndex);
    setSelectedAnswers({});
    setCorrectAnswers({});
    setScore(null);
    setAnswersSubmitted(false); // Reset the submitted state
  };

  const handleEditQuestion = (question) => {
    setQuestionToEdit(question);
    setShowModal(true);
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`/api/trivia/${questionId}`);
      fetchTrivia();
    } catch (error) {
      setError(
        `Failed to delete question: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setQuestionToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/trivia/${questionToEdit.id}`, questionToEdit);
      fetchTrivia();
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  };

  const allQuestionsAnswered = () => {
    return questions
      .slice(currentIndex, currentIndex + 5)
      .every((question) => selectedAnswers[question.id]);
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (loading) {
    return <p className="text-blue-500">Loading trivia questions...</p>;
  }

  if (!questions.length) {
    return (
      <p className="text-gray-500">
        No questions available. Please refresh or try again later.
      </p>
    );
  }

  return (
    <div className="p-5">
      {questions.slice(currentIndex, currentIndex + 5).map((question) => (
        <div key={question.id} className="mb-4">
          <h3 className="text-lg font-bold">{question.question}</h3>
          <ul className="list-none p-0">
            {["optionA", "optionB", "optionC", "optionD"].map((option) => (
              <li
                key={option}
                className="cursor-pointer hover:bg-gray-200 p-2"
                onClick={() =>
                  handleAnswerSelect(question.id, question[option])
                }
              >
                {question[option]}
              </li>
            ))}
          </ul>
          {selectedAnswers[question.id] && (
            <p className="text-green-600">
              You selected: {selectedAnswers[question.id]}
            </p>
          )}
          {correctAnswers[question.id] !== undefined && (
            <p className="text-xl">
              {correctAnswers[question.id]
                ? "Correct Answer!"
                : "Wrong Answer, try again!"}
            </p>
          )}
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => handleEditQuestion(question)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDeleteQuestion(question.id)}
          >
            Delete
          </button>
        </div>
      ))}
      {!allQuestionsAnswered() && (
        <p className="text-red-500 mb-4">
          You have to answer all questions before you can submit.
        </p>
      )}
      {!answersSubmitted && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmitAnswers}
          disabled={!allQuestionsAnswered()}
        >
          Submit Answers
        </button>
      )}
      {score !== null && (
        <>
          <p className="text-lg">
            Your score: {score} out of{" "}
            {questions.slice(currentIndex, currentIndex + 5).length}
          </p>
          {score <= 1 && <p>Maybe start watching badminton!</p>}
          {score === 2 && <p>You&apos;re worse than Mid!</p>}
          {score === 3 && <p>You&apos;re Mid!</p>}
          {score === 4 && <p>Not too Shabby!</p>}
          {score === 5 && <p>Go touch Grass!</p>}
          <button
            className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextBatch}
          >
            Play Next Batch
          </button>
        </>
      )}
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <form onSubmit={handleModalSubmit} className="p-5">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="question"
              >
                Question
              </label>
              <input
                type="text"
                id="question"
                name="question"
                value={questionToEdit.question}
                onChange={handleModalChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="optionA"
              >
                Option A
              </label>
              <input
                type="text"
                id="optionA"
                name="optionA"
                value={questionToEdit.optionA}
                onChange={handleModalChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="optionB"
              >
                Option B
              </label>
              <input
                type="text"
                id="optionB"
                name="optionB"
                value={questionToEdit.optionB}
                onChange={handleModalChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="optionC"
              >
                Option C
              </label>
              <input
                type="text"
                id="optionC"
                name="optionC"
                value={questionToEdit.optionC}
                onChange={handleModalChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="optionD"
              >
                Option D
              </label>
              <input
                type="text"
                id="optionD"
                name="optionD"
                value={questionToEdit.optionD}
                onChange={handleModalChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="correctAnswer"
              >
                Correct Answer
              </label>
              <select
                id="correctAnswer"
                name="correctAnswer"
                value={questionToEdit.correctAnswer}
                onChange={handleModalChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select the correct answer</option>
                <option value={questionToEdit.optionA}>
                  {questionToEdit.optionA}
                </option>
                <option value={questionToEdit.optionB}>
                  {questionToEdit.optionB}
                </option>
                <option value={questionToEdit.optionC}>
                  {questionToEdit.optionC}
                </option>
                <option value={questionToEdit.optionD}>
                  {questionToEdit.optionD}
                </option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Question
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default Trivia;
