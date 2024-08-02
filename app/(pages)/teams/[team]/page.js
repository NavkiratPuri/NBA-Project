"use client";
import React, { useEffect, useState } from "react";
import { fetchPlayerTeam } from "@/utils/fetchPlayerTeam";
import Header from "@/components/header";
import Footer from "@/components/footer";

const MyComponent = ({ params }) => {
  const { team } = params;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetchPlayerTeam(team);
        setPlayers(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, [team]);

  return (
    <div>
      <Header />
      {players?.map((val, x) => {
        return (
          <div key={x} className="text-center font-bold p-3">
            {val.Player}
          </div>
        );
      })}
      <Footer />
    </div>
  );
};

export default MyComponent;
