'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/header';
import Footer from '@/components/footer';
import LeaderboardHL from '@/components/Leaderboards/leaderboardHL';
import LeaderboardT from '@/components/Leaderboards/leaderboardT';
import LeaderboardTrivia from '@/components/Leaderboards/leaderboardTrivia'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Leaderboard = () => {
  const [highScoresHL, setHighScoresHL] = useState([]);
  const [highScoresT, setHighScoresT] = useState([]);
  const [highScoresTrivia, setHighScoresTrivia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const response = await axios.get('/api/highscores');
        setHighScoresHL(response.data.highScoresHL || []);
        setHighScoresT(response.data.highScoresT || []);
        setHighScoresTrivia(response.data.highScoresTrivia || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighScores();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      
        setLoading(false);
      
    }
  }, [status, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || 'An error occurred'}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen w-full border-b-2 ">
      <Header />
      <main className="flex-grow flex">
        <div className="flex-1 border-r border-gray-200">
          <LeaderboardTrivia highScores={highScoresTrivia}/>
        </div>
        <div className="flex-1 border-r border-gray-200">
          <LeaderboardHL highScores={highScoresHL} />
        </div>
        <div className="flex-1">
          <LeaderboardT highScores={highScoresT} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
