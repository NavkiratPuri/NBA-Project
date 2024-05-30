import React from 'react';
import Trivia from "../components/Trivia";
import Header from '../components/header';
import '../app/globals.css';

const TriviaPage = () => {
    return (
        <div>
            <Header />
            <Trivia />
        </div>
    );
};

export default TriviaPage;
