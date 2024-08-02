'use client';
import React, { useEffect } from 'react';
import TeamStandings from "@/components/Teamstandings";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Teams = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated" || (session && !session.user.isAdmin)) {
            router.push("/");
        }
    }, [status, session, router]);

    if (status === "loading") {
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
