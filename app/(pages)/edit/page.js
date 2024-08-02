"use client";

import React, { useState, useEffect } from "react";
import PlayerList from "@/components/Playerlist";
import AddPlayer from "@/components/Addplayer";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Add = () => {
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
        setLoading(false);  
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);  
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated" || (session && !session.user.isAdmin)) {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-4">
        Modify Player
      </h1>
      <div className="flex-grow">
        <PlayerList players={players} />
        <div className="text-center">
          <AddPlayer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Add;
