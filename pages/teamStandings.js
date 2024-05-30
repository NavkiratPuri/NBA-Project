import React from 'react';
import TeamStandings from "../components/Teamstandings";
import Header from '../components/header';
import '../app/globals.css';

const Teams = () => {
    return (
        <div>
            <Header />
            <TeamStandings />
        </div>
    );
};

export default Teams;
