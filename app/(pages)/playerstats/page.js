"use client";

import React, { useState, useEffect } from "react";
import PlayerList from "@/components/Playerlist";
import AddPlayer from "@/components/Addplayer";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StatList from "@/components/StatList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PlayerStats = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

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
    <div className="flex flex-col min-h-screen bg-gray-600">
      <Header />
      <h1 className="text-3xl font-bold text-center text-white mt-4 mb-4 ">
        Player Stats
      </h1>
      <div className="flex-grow">
        <StatList players={players} />

      </div>
      <Footer />
    </div>
  );
};

export default PlayerStats;
