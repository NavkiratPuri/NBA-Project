"use client";
import React from 'react';
import LeadersList from '@/components/Leagueleader'; // Adjust the path if necessary
import Header from '@/components/header';
import Footer from '@/components/footer';

const Page = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-700">
            <Header />
            <div className="flex-grow">
                <LeadersList />
            </div>
            <Footer className="mt-auto" />
        </div>
    );
};

export default Page;
