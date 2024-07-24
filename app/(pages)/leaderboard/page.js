'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/header';
import Footer from '@/components/footer';

const Leaderboard = () => {
  const [highScores, setHighScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/highscores')
      .then(response => {
        setHighScores(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow">
        <h1 className="text-3xl font-bold text-center mt-8">Leaderboard</h1>
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center mt-4 text-red-500">Error: {error.message}</p>}
        {!loading && !error && (
          <div className="max-w-2xl mx-auto mt-8">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Rank</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">High Score</th>
                </tr>
              </thead>
              <tbody>
                {highScores.map((user, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b text-center">{user.highScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
