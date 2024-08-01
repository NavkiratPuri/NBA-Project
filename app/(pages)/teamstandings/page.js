'use client'
import React from 'react';
import TeamStandings from "@/components/Teamstandings";
import Header from '@/components/header';
//import '../app/globals.css';
import Footer from '@/components/footer';
const Teams = () => {
    return (
        <div>
            <Header />
            <TeamStandings />
            <Footer />
        </div>
    );
};

export default Teams;
