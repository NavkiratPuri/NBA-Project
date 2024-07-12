'use client'

import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import TeamList from '@/components/TeamList'
import Footer from '@/components/footer';

const teams = () => {
    return (
        <div>
            <Header />
            <main className='min-h-screen'>
            <TeamList/>
            </main>
            <Footer/>
        </div>
    );
};

export default teams;
