'use client'
import React from 'react';
import Header from '@/components/header';
//import '../app/globals.css';
import Footer from '@/components/footer';
import StandingsDisplay from '@/components/StandingsDisplay';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';




const Standings = () => {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
          router.push("/");
        } else if (status === "authenticated") {
          
            setLoading(false);
          
        }
    }, [status, router]);

    if (status === "loading" || loading) {
        return <p>Loading...</p>;
    }


    return (
        <div className='bg-gray-700'>
            <Header />
            <StandingsDisplay />
            <Footer />
        </div>
    );
};

export default Standings;
