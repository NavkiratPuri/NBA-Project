"use client";
import React, { useState, useEffect } from "react";
import PlayerSelector from "@/components/PlayerSelector";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Scatter } from "react-chartjs-2";
import playerData from "@/utils/playerData";
import { GlossaryWS } from "@/utils/glossaryWs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const calculateAverages = (players) => {
  if (players.length === 0) return { bpm: 0, wsfoureight: 0 };
  const totalBpm = players.reduce(
    (sum, player) => sum + parseFloat(player.BPM),
    0
  );
  const totalWsfoureight = players.reduce(
    (sum, player) => sum + parseFloat(player.WSfoureight),
    0
  );
  return {
    bpm: totalBpm / players.length,
    wsfoureight: totalWsfoureight / players.length,
  };
};

const ScatterChartPage = () => {
  const [players, setPlayers] = useState([]);
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [teamAAverages, setTeamAAverages] = useState({
    bpm: 0,
    wsfoureight: 0,
  });
  const [teamBAverages, setTeamBAverages] = useState({
    bpm: 0,
    wsfoureight: 0,
  });
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setTeamAAverages(calculateAverages(teamAPlayers));
    setTeamBAverages(calculateAverages(teamBPlayers));
  }, [teamAPlayers, teamBPlayers]);

  const selectPlayers = (selectedPlayers, team) => {
    if (team === "A") {
      setTeamAPlayers(selectedPlayers);
    } else {
      setTeamBPlayers(selectedPlayers);
    }
  };

  const scatterData = {
    datasets: [
      {
        label: "Team A",
        data: teamAPlayers.map((player) => ({
          x: player.WSfoureight,
          y: player.BPM,
          name: player.Player,
        })),
        backgroundColor: "rgb(252 211 77)",
        pointRadius: 5,
      },
      {
        label: "Team B",
        data: teamBPlayers.map((player) => ({
          x: player.WSfoureight,
          y: player.BPM,
          name: player.Player,
        })),
        backgroundColor: "rgb(2 132 199)",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          return context.dataset.data[context.dataIndex].name;
        },
        align: "end",
        anchor: "end",
        color: "white",
      },
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "WS/48",
          color: "white",
        },
        ticks: {
          stepSize: 0.025,
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "BPM",
          color: "white",
        },
        ticks: {
          stepSize: 0.5,
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

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

  const demo = () => {
    const teamAPlayersList = [
      { name: "LeBron James", year: 2024, team: "LAL" },
      { name: "Stephen Curry", year: 2024, team: "GSW" },
      { name: "Anthony Davis", year: 2024, team: "LAL" },
      { name: "Bam Adebayo", year: 2024, team: "MIA" },
      { name: "Devin Booker", year: 2024, team: "PHO" },
      { name: "Kevin Durant", year: 2024, team: "PHO" },
      { name: "Anthony Edwards", year: 2024, team: "MIN" },
      { name: "Joel Embiid", year: 2024, team: "PHI" },
      { name: "Tyrese Haliburton", year: 2024, team: "IND" },
      { name: "Jrue Holiday", year: 2024, team: "BOS" },
      { name: "Jayson Tatum", year: 2024, team: "BOS" },
      { name: "Derrick White", year: 2024, team: "BOS" },
    ];

    const teamBPlayersList = [
      { name: "Charles Barkley", year: 1992, team: "PHI" },
      { name: "Larry Bird", year: 1992, team: "BOS" },
      { name: "Clyde Drexler", year: 1992, team: "POR" },
      { name: "Patrick Ewing", year: 1992, team: "NYK" },
      { name: "Magic Johnson", year: 1992, team: "LAL" },
      { name: "Michael Jordan", year: 1992, team: "CHI" },
      { name: "Karl Malone", year: 1992, team: "UTA" },
      { name: "Chris Mullin", year: 1992, team: "GSW" },
      { name: "Scottie Pippen", year: 1992, team: "CHI" },
      { name: "David Robinson", year: 1992, team: "SAS" },
      { name: "John Stockton", year: 1992, team: "UTA" },
      { name: "Christian Laettner", year: 1992, team: "MIN" },
    ];

    const selectedTeamAPlayers = players.filter((player) =>
      teamAPlayersList.some(
        (p) =>
          p.name === player.Player &&
          p.year === parseInt(player.Year) &&
          p.team === player.Tm
      )
    );

    const selectedTeamBPlayers = players.filter((player) =>
      teamBPlayersList.some(
        (p) =>
          p.name === player.Player &&
          p.year === parseInt(player.Year) &&
          p.team === player.Tm
      )
    );

    selectPlayers(selectedTeamAPlayers, "A");
    selectPlayers(selectedTeamBPlayers, "B");
  };

  const clearAll = () => {
    setTeamAPlayers([]);
    setTeamBPlayers([]);
  };
  return (
    <div className="bg-gray-700 ">
      <Header />
      <div className="w-full flex justify-center mt-4">
        <button
          className="bg-orange-500 text-white py-2 px-4 hover:bg-orange-600 rounded w-1/5 m-2"
          onClick={demo}
        >
          Demonstrate
        </button>
        <button
          className="bg-orange-500 text-white py-2 px-4 hover:bg-orange-600 rounded w-1/5 m-2 cursor-pointer"
          onClick={() => setIsGlossaryOpen(true)}
        >
          Glossary
        </button>
        <button
          className="bg-orange-500 text-white py-2 px-4 hover:bg-orange-600 rounded w-1/5 m-2"
          onClick={clearAll}
        >
          Clear All
        </button>
      </div>
      <main className="flex flex-wrap m-2">
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-xl font-bold mb-2 text-amber-300 text-center">
            Team A
          </h2>
          <PlayerSelector
            players={players}
            onSelectPlayer={(selectedPlayers) =>
              selectPlayers(selectedPlayers, "A")
            }
            multiSelect={true}
          />
          <p className="text-amber-300 text-center font-bold text-2xl mt-8">
            BPM: {teamAAverages.bpm.toFixed(2)} - WS/48:{" "}
            {teamAAverages.wsfoureight.toFixed(2)}
          </p>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-xl font-bold mb-2 text--500 text-sky-300 text-center">
            Team B
          </h2>
          <PlayerSelector
            players={players}
            onSelectPlayer={(selectedPlayers) =>
              selectPlayers(selectedPlayers, "B")
            }
            multiSelect={true}
          />
          <p className="text-sky-300 text-center font-bold text-2xl mt-8">
            BPM: {teamBAverages.bpm.toFixed(2)} - WS/48:{" "}
            {teamBAverages.wsfoureight.toFixed(2)}
          </p>
        </div>

        <div className="w-full mt-4">
          <Scatter data={scatterData} options={options} />
        </div>
      </main>
      <Footer />
      <GlossaryWS
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
};

export default ScatterChartPage;
