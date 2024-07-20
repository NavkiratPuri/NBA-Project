"use client";
import React, { useState, useEffect } from "react";
import PlayerSelector from "@/components/PlayerSelector";
import CompareChart from "@/components/CompareChart";
import Header from "@/components/header";
import Footer from "@/components/footer";
import playerData from "@/utils/playerData";

const processPlayerData = (data, playerName) => {
  const playerData = data.filter((player) => player.Player === playerName);
  return {
    ages: playerData.map((player) => player.Age),
    Points: playerData.map((player) => player.PTS),
    assists: playerData.map((player) => player.AST),
    blocks: playerData.map((player) => player.BLK),
    steals: playerData.map((player) => player.STL),
  };
};

const Compare = () => {
  const [players, setPlayers] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [category, setCategory] = useState("Points");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await playerData();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPlayers();
  }, []);

  const createChart = (player1, player2, category) => {
    if (player1 && player2) {
      const player1Data = processPlayerData(players, player1.Player);
      const player2Data = processPlayerData(players, player2.Player);

      const allAges = [
        ...new Set([...player1Data.ages, ...player2Data.ages]),
      ].sort((a, b) => a - b);

      const getCategoryData = (ages, categoryData, allAges) => {
        const ageDataMap = new Map(
          ages.map((age, idx) => [age, categoryData[idx]])
        );
        return allAges.map((age) => ageDataMap.get(age) || null);
      };

      const player1CategoryData = getCategoryData(
        player1Data.ages,
        player1Data[category],
        allAges
      );
      const player2CategoryData = getCategoryData(
        player2Data.ages,
        player2Data[category],
        allAges
      );

      setChartData({
        labels: allAges,
        datasets: [
          {
            label: `${player1.Player}`,
            data: player1CategoryData,
            borderColor: "red",
            borderWidth: 5,
            borderCapStyle: "round",
            fill: false,
          },
          {
            label: `${player2.Player}`,
            data: player2CategoryData,
            borderColor: "blue",
            borderWidth: 5,
            fill: false,
          },
        ],
      });
    }
  };

  const handleSelectPlayer1 = (player) => {
    setPlayer1(player);
    createChart(player, player2, category);
  };

  const handleSelectPlayer2 = (player) => {
    setPlayer2(player);
    createChart(player1, player, category);
  };

  const statsFilter = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    createChart(player1, player2, newCategory);
  };

  return (
    <div>
      <Header />
      <main className="flex flex-wrap m-2">
        <div className="flex flex-cols-1 md:flex-cols-2 gap-2 relative w-full order-1">
          <div className="w-full">
            <PlayerSelector
              players={players}
              onSelectPlayer={handleSelectPlayer1}
            />
            {player1 && (
              <div className="flex items-center mt-2">
                <img
                  src={player1.image}
                  alt={player1.Player}
                  className="w-20 h-20 rounded-full border-2 border-gray-600"
                />
                <span className="text-7xl text-red-600 ml-2">
                  {player1.Player}
                </span>
              </div>
            )}
          </div>
          <div className="w-full">
            <PlayerSelector
              players={players}
              onSelectPlayer={handleSelectPlayer2}
            />
            {player2 && (
              <div className="flex items-center mt-2">
                <img
                  src={player2.image}
                  alt={player2.Player}
                  className="w-20 h-20 rounded-full border-2 border-gray-600"
                />
                <span className="text-7xl text-blue-600 ml-2">
                  {player2.Player}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mt-2 order-3">
          <CompareChart
            players={players}
            player1={player1}
            player2={player2}
            chartData={chartData}
            category={category}
            handleSelectPlayer1={handleSelectPlayer1}
            handleSelectPlayer2={handleSelectPlayer2}
            statsFilter={statsFilter}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Compare;
