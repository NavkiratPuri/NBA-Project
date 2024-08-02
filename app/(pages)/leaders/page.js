"use client";
import React from 'react';
import LeadersList from '@/components/Leagueleader'; // Adjust the path if necessary
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const Page = () => {

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
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
                <LeadersList />
            </div>
            <Footer className="mt-auto" />
        </div>
    );
};

export default Page;
