"use client";
import React, { useState, useEffect } from "react";
import PlayerSelector from "@/components/PlayerSelector";
import CompareChart from "@/components/CompareChart";
import Header from "@/components/header";
import Footer from "@/components/footer";
import playerData from "@/utils/playerData";
import { allAvgStats } from "@/utils/allAvg";
import { calculatePlayerValue } from "@/utils/calculateValue";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const processPlayerData = (data, playerName) => {
  const playerData = data.filter((player) => player.Player === playerName);
  return {
    ages: playerData.map((player) => player.Age),
    Points: playerData.map((player) => player.PTS),
    Assists: playerData.map((player) => player.AST),
    Blocks: playerData.map((player) => player.BLK),
    Steals: playerData.map((player) => player.STL),
    Turnovers: playerData.map((player) => player.TOV),
    FTPercent: playerData.map((player) => player.FTPercent),
    eFGPercent: playerData.map((player) => player.eFGPercent),
    Games: playerData.map((player) => player.G),
    GamesStarted: playerData.map((player) => player.GS),
    Rebounds: playerData.map(
      (player) => (parseFloat(player.ORB) || 0) + (parseFloat(player.DRB) || 0)
    ),
    PersonalFouls: playerData.map((player) => player.PF),
    Minutes: playerData.map((player) => player.MP),
    TotalValue: playerData.map(
      (player) => calculatePlayerValue(player).totalValue
    ),
  };
};

const Compare = () => {
  const [players, setPlayers] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [category, setCategory] = useState("TotalValue");
  const [allPlayersAverages, setAllPlayersAverages] = useState(null);
  const [selectAllMode, setSelectAllMode] = useState(false);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await playerData();
        setPlayers(data);
        const averages = allAvgStats(data);
        setAllPlayersAverages(averages);
        console.log("Averages:", averages);
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

  const handleSelectAllPlayers = (category) => {
    if (allPlayersAverages) {
      setChartData({
        labels: allPlayersAverages.ages,
        datasets: [
          {
            label: `Average ${category}`,
            data: allPlayersAverages[category],
            borderColor: "green",
            borderWidth: 5,
            borderCapStyle: "round",
            fill: false,
          },
        ],
      });
    }
  };

  const statsFilter = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    if (selectAllMode) {
      handleSelectAllPlayers(newCategory);
    } else {
      createChart(player1, player2, newCategory);
    }
  };

  const toggleSelectAllMode = () => {
    setSelectAllMode(!selectAllMode);
    if (!selectAllMode) {
      handleSelectAllPlayers(category);
    } else {
      setChartData(null);
    }
  };

  useEffect(() => {
    if (selectAllMode) {
      handleSelectAllPlayers(category);
    } else if (player1 && player2) {
      createChart(player1, player2, category);
    }
  }, [selectAllMode, category, player1, player2]);

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
    <div className="bg-gray-700">
      <Header />
      <main className="flex flex-wrap m-2">
        <div className="flex flex-cols-1 md:flex-cols-2 gap-2 relative w-full order-1">
          {!selectAllMode && (
            <>
              <div className="w-full">
                <PlayerSelector
                  players={players}
                  onSelectPlayer={handleSelectPlayer1}
                  multiSelect={false}
                />
                {player1 && (
                  <div className="flex items-center mt-2">
                    <img
                      src={player1.image}
                      alt={player1.Player}
                      className="w-20 h-20 rounded-full border-2 border-gray-600 bg-white"
                    />
                    <span className="text-7xl font-bold text-red-600 ml-2">
                      {player1.Player}
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full">
                <PlayerSelector
                  players={players}
                  onSelectPlayer={handleSelectPlayer2}
                  multiSelect={false}
                />
                {player2 && (
                  <div className="flex items-center mt-2">
                    <img
                      src={player2.image}
                      alt={player2.Player}
                      className="w-20 h-20 rounded-full border-2 border-gray-600 bg-white"
                    />
                    <span className="text-7xl font-bold text-blue-600 ml-2">
                      {player2.Player}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="w-full flex-row mt-2 order-3">
          <CompareChart
            chartData={chartData}
            category={category}
            statsFilter={statsFilter}
          />
        </div>
        <div>
          <button
            onClick={toggleSelectAllMode}
            className="w-30 h-10 text-lg font-semibold bg-green-200 hover:bg-green-300 p-1 rounded-md ml-2 mb-2"
          >
            {selectAllMode ? "Compare Players" : "Select All Players"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Compare;
