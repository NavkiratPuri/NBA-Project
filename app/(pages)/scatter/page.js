"use client";
import React, { useState, useEffect } from "react";
import PlayerSelector from "@/components/PlayerSelector";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Scatter } from "react-chartjs-2";
import playerData from "@/utils/playerData";
import { GlossaryWS } from "@/utils/glossaryWs"; // Import the GlossaryWS component
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
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false); // State to control glossary modal

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
        backgroundColor: "red",
        pointRadius: 5,
      },
      {
        label: "Team B",
        data: teamBPlayers.map((player) => ({
          x: player.WSfoureight,
          y: player.BPM,
          name: player.Player,
        })),
        backgroundColor: "blue",
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
        color: "white", // Data label color
      },
      legend: {
        labels: {
          color: "white", // Legend text color
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "WS/48",
          color: "white", // Axis title color
        },
        ticks: {
          stepSize: 0.025,
          color: "white", // Tick color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Grid line color
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "BPM",
          color: "white", // Axis title color
        },
        ticks: {
          stepSize: 0.5,
          color: "white", // Tick color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Grid line color
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

  return (
    <div className="bg-gray-700 "> {/* Make all text white */}
      <Header />
      <main className="flex flex-wrap m-2">
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-xl font-bold mb-2 text-white">Team A</h2>
          <PlayerSelector
            players={players}
            onSelectPlayer={(selectedPlayers) =>
              selectPlayers(selectedPlayers, "A")
            }
            multiSelect={true}
          />
          <p className="text-white">
            Averages: BPM: {teamAAverages.bpm.toFixed(2)}, WS/48:{" "}
            {teamAAverages.wsfoureight.toFixed(2)}
          </p>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-xl font-bold mb-2 text-white">Team B</h2>
          <PlayerSelector
            players={players}
            onSelectPlayer={(selectedPlayers) =>
              selectPlayers(selectedPlayers, "B")
            }
            multiSelect={true}
          />
          <p className="text-white">
            Averages: BPM: {teamBAverages.bpm.toFixed(2)}, WS/48:{" "}
            {teamBAverages.wsfoureight.toFixed(2)}
          </p>
        </div>
        <div className="w-full flex justify-center mt-4">
          <button
            className="bg-orange-500 text-white py-2 px-4 hover:bg-orange-600 rounded cursor-pointer"
            onClick={() => setIsGlossaryOpen(true)}
          >
            Open Glossary
          </button>
        </div>
        <div className="w-full mt-4">
          <Scatter data={scatterData} options={options} />
        </div>
      </main>
      <Footer />
      <GlossaryWS isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
    </div>
  );
};

export default ScatterChartPage;
