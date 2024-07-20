"use client";
import React, { useState, useEffect } from "react";
import TeamSelect from "@/components/teamSelect";
import PlayerCard from "@/components/PlayerCard";
import Header from "@/components/header";
import Footer from "@/components/footer";
import playerData from "@/utils/playerData";
import calculatePlayerValue from "@/utils/calculateValue";
import Trade from "@/app/(pages)/trade/page";

const TeamTrade = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayersTeamA, setFilteredPlayersTeamA] = useState([]);
  const [filteredPlayersTeamB, setFilteredPlayersTeamB] = useState([]);
  const [teamATotalValue, setTeamATotalValue] = useState(0);
  const [teamBTotalValue, setTeamBTotalValue] = useState(0);
  const [isTrade, setIsTrade] = useState(false);

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

  const handleFilterPlayersTeamA = (filtered) => {
    setFilteredPlayersTeamA(filtered);
  };

  const handleFilterPlayersTeamB = (filtered) => {
    setFilteredPlayersTeamB(filtered);
  };

  const handleRemovePlayer = (index, team) => {
    if (team === "A") {
      setFilteredPlayersTeamA(
        filteredPlayersTeamA.filter((_, i) => i !== index)
      );
    } else if (team === "B") {
      setFilteredPlayersTeamB(
        filteredPlayersTeamB.filter((_, i) => i !== index)
      );
    }
  };

  const getTotalValue = (players, weights) => {
    return players.reduce((total, player) => {
      if (player) {
        return total + calculatePlayerValue(player, weights).totalValue;
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    const teamATotal = getTotalValue(filteredPlayersTeamA);
    const teamBTotal = getTotalValue(filteredPlayersTeamB);
    setTeamATotalValue(teamATotal);
    setTeamBTotalValue(teamBTotal);
  }, [filteredPlayersTeamA, filteredPlayersTeamB]);

  if (isTrade) {
    return <Trade />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-3">
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setIsTrade(true)}
          >
            Switch to Trade Sim
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 relative">
          <div className="pr-2 border-r-2 border-black">
            <h2 className="text-center text-xl font-bold mb-2">
              Team A (Click the cards for stats then click again for
              values!!!!!)
            </h2>
            <TeamSelect
              players={players}
              onFilterPlayers={handleFilterPlayersTeamA}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
              {filteredPlayersTeamA.map((player, index) => (
                <PlayerCard
                  key={index}
                  player={player}
                  onRemove={() => handleRemovePlayer(index, "A")}
                />
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="text-center text-xl font-bold mb-2">
              Team B (Click the cards for stats then click again for
              values!!!!!)
            </h2>
            <TeamSelect
              players={players}
              onFilterPlayers={handleFilterPlayersTeamB}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
              {filteredPlayersTeamB.map((player, index) => (
                <PlayerCard
                  key={index}
                  player={player}
                  onRemove={() => handleRemovePlayer(index, "B")}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex justify-center items-center gap-8">
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <p
                className={`text-2xl font-bold ${
                  teamATotalValue >= teamBTotalValue
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {teamATotalValue.toFixed(2)}
              </p>
            </div>
            <p className="font-bold text-2xl">VS</p>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <p
                className={`text-2xl font-bold ${
                  teamBTotalValue >= teamATotalValue
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {teamBTotalValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamTrade;
