'use client'
import React, { useState } from 'react';
import Trivia from "@/components/Trivia";
import Header from '@/components/header';
import AddQuestion from "@/components/Addquestion";

const TriviaPage = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <Header />
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => setShowModal(true)}
            >
                Add a new trivia question
            </button>
            <Trivia />
            {showModal && (
                <AddQuestion showModal={showModal} setShowModal={setShowModal} />
            )}
        </div>
    );
};

export default TriviaPage;
