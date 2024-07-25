"use client";
import React from 'react';
import LeadersList from '@/components/Leagueleader'; // Adjust the path if necessary
import Header from '@/components/header';
const Page = () => {
    return (
        <div>
            <Header />
            <LeadersList />
        </div>
    );
};

export default Page;
