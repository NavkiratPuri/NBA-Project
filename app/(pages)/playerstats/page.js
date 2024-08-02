"use client";

import React, { useState, useEffect } from "react";
import PlayerList from "@/components/Playerlist";
import AddPlayer from "@/components/Addplayer";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StatList from "@/components/StatList";

const PlayerStats = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/player", { cache: "no-cache" });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log("Data received:", data);
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-4">
        Modify Player
      </h1>
      <div className="flex-grow">
        <StatList players={players} />
        
      </div>
      <Footer />
    </div>
  );
};

export default PlayerStats;
