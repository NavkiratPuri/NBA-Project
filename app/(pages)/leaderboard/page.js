'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/header';
import Footer from '@/components/footer';
import LeaderboardHL from '@/components/Leaderboards/leaderboardHL';
import LeaderboardT from '@/components/Leaderboards/leaderboardT';

const Leaderboard = () => {
  const [highScoresHL, setHighScoresHL] = useState([]);
  const [highScoresT, setHighScoresT] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const response = await axios.get('/api/highscores');
        setHighScoresHL(response.data.highScoresHL || []);
        setHighScoresT(response.data.highScoresT || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighScores();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || 'An error occurred'}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow flex">
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
