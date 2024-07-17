'use client'
import React, { useState, useEffect } from 'react';
import PlayerSelector from '@/components/PlayerSelector';
import ChartComponent from '@/components/CompareChart';
import Header from '@/components/header';
import Footer from '@/components/footer';
import playerData from '@/utils/playerData';
import CompareChart from '@/components/CompareChart';

const processPlayerData = (data, playerName) => {
  const playerData = data.filter(player => player.Player === playerName);
  return {
    ages: playerData.map(player => player.Age),
    points: playerData.map(player => player.PTS)
  };
};

const Compare = () => {
  const [players, setPlayers] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await playerData();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPlayers();
  }, []);

  const createChart = (player1, player2) => {
    if (player1 && player2) {
      const player1Data = processPlayerData(players, player1.Player);
      const player2Data = processPlayerData(players, player2.Player);

      setChartData({
        labels: player1Data.ages,
        datasets: [
          {
            label: `${player1.Player} - Points`,
            data: player1Data.points,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false
          },
          {
            label: `${player2.Player} - Points`,
            data: player2Data.points,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false
          }
        ]
      });
    }
  };

  const handleSelectPlayer1 = (player) => {
    setPlayer1(player);
    createChart(player, player2);
  };

  const handleSelectPlayer2 = (player) => {
    setPlayer2(player);
    createChart(player1, player);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="">
            <PlayerSelector
              players={players}
              onSelectPlayer={handleSelectPlayer1}
              label="Select Player 1"
            />
          </div>
          <div className="">
            <PlayerSelector
              players={players}
              onSelectPlayer={handleSelectPlayer2}
              label="Select Player 2"
            />
          </div>
        </div>
        <div className="mt-8">
          <CompareChart chartData={chartData} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Compare;