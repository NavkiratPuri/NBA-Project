'use client'
import React from 'react';
import TeamStandings from "@/components/Teamstandings";
import Header from '@/components/header';
//import '../app/globals.css';
import Footer from '@/components/footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const Teams = () => {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated" ) {
          router.push("/");
        } 
        if (session && !session.user.isAdmin) {
          router.push("/");
        }
    }, [status, session, router]);

    if (status === "loading" || loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Header />
            <TeamStandings />
            <Footer />
        </div>
    );
};

export default Teams;
