"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import TeamDetails from "@/components/TeamDetails";
import fetchPlayersBasedOnTeam from "@/utils/fetchPlayersBasedOnTeam";
import PlayerCard from "@/components/playerCard";

const TeamPage = ({ params }) => {
  const { team } = params;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const players = await fetchPlayersBasedOnTeam(team);
        setPlayers(players);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };
    loadPlayers();
  }, []);

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        {players.map((val, x) => {
          return <PlayerCard playerName={val.Player} />;
        })}
      </main>
      <Footer />
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const { team } = context.params;
//   const players = await fetchPlayers();
//   return { props: { team, players } };
// }

export default TeamPage;
